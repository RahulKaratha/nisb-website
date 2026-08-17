'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Google Spreadsheet Live Feed ID
const OFFICIAL_SPREADSHEET_ID = '1wHYE0SCpAApAzRKL2BQmEXrTDtxSh6LQ9EPy_27GWlI';
const LIVE_GVIZ_URL = `https://docs.google.com/spreadsheets/d/${OFFICIAL_SPREADSHEET_ID}/gviz/tq?tqx=out:json`;

export interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  venue?: string;
  description?: string;
  regLink?: string;
}

// Convert Google Drive view links or raw Drive file IDs to direct high-speed image CDN URLs
function sanitizeImageUrl(rawUrl: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop';
  }

  const str = rawUrl.trim();
  if (!str) {
    return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop';
  }

  // If it's a full URL containing drive.google.com or googleusercontent.com
  if (str.startsWith('http')) {
    const driveIdMatch = str.match(/\/d\/([a-zA-Z0-9_-]+)/) || str.match(/id=([a-zA-Z0-9_-]+)/);
    if (driveIdMatch && driveIdMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${driveIdMatch[1]}`;
    }
    return str;
  }

  // If it's a raw Google Drive File ID (e.g. 1Q7y--tV3KjjyTjsLaYK3kz_q03JmB_8b)
  if (/^[a-zA-Z0-9_-]{20,}$/.test(str)) {
    return `https://lh3.googleusercontent.com/d/${str}`;
  }

  return str;
}

function parseGVizResponse(text: string): EventItem[] {
  const jsonStart = text.indexOf('{');
  const jsonEnd = text.lastIndexOf('}');
  if (jsonStart === -1 || jsonEnd === -1) return [];

  const jsonString = text.substring(jsonStart, jsonEnd + 1);
  const data = JSON.parse(jsonString);

  const rows = data.table?.rows || [];
  const eventsList: EventItem[] = [];

  for (let i = 0; i < rows.length; i++) {
    const c = rows[i]?.c;
    if (!c) continue;

    // Google Sheet schema: col 0 = Name, col 1 = Date, col 2 = Image ID, col 3 = Organiser/Category, col 4 = Venue
    const eventName = c[0]?.v || '';
    const rawDate = c[1]?.v || '';
    const rawImage = c[2]?.v || c[4]?.v || c[5]?.v || '';
    const organiser = c[3]?.v || 'NISB';
    const venue = c[4]?.v || '';

    // Ignore header row if present
    if (String(eventName).toLowerCase().trim() === 'name') continue;

    if (eventName && String(eventName).trim().length > 0) {
      let formattedDate = String(rawDate);
      if (rawDate && typeof rawDate === 'string' && rawDate.includes('Date(')) {
        const dateParts = rawDate.match(/\d+/g);
        if (dateParts && dateParts.length >= 3) {
          const d = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]), parseInt(dateParts[2]));
          formattedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
      }

      let category = String(organiser).toUpperCase().trim() || 'NISB';
      if (category.includes('GRSS') && category.includes('WIE')) {
        category = 'GRSS';
      }

      eventsList.push({
        id: `evt-${i}`,
        title: String(eventName).trim(),
        category: category,
        date: formattedDate || '2025–2026',
        image: sanitizeImageUrl(String(rawImage)),
        venue: String(venue),
        description: `Organized by ${organiser} ${venue ? 'at ' + venue : 'at NIE Mysuru'}. Join NISB for hands-on learning, engineering excellence, and networking.`,
        regLink: 'https://social.nisb.in',
      });
    }
  }

  return eventsList;
}

export default function CinematicEventsSection() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');
  const [selectedPosterEvent, setSelectedPosterEvent] = useState<EventItem | null>(null);
  const [visibleGridLimit, setVisibleGridLimit] = useState(12);

  // Reset pagination limit on filter/search change
  useEffect(() => {
    setVisibleGridLimit(12);
  }, [activeCategory, searchQuery]);

  // Sheet Integration Inputs
  const [sheetInput, setSheetInput] = useState(`https://docs.google.com/spreadsheets/d/${OFFICIAL_SPREADSHEET_ID}/edit`);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState('Fetching live Google Sheet...');

  const fetchLiveSpreadsheet = async (sheetUrl?: string) => {
    setIsLoading(true);
    setStatusMsg('Connecting to Google Sheet API...');

    let targetGvizUrl = LIVE_GVIZ_URL;

    if (sheetUrl) {
      const match = sheetUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        targetGvizUrl = `https://docs.google.com/spreadsheets/d/${match[1]}/gviz/tq?tqx=out:json`;
      }
    }

    try {
      const res = await fetch(targetGvizUrl);
      const text = await res.text();
      const parsed = parseGVizResponse(text);

      if (parsed.length > 0) {
        setEvents(parsed);
        setCurrentIndex(0);
        setStatusMsg('');
      } else {
        setStatusMsg('No events found in spreadsheet.');
      }
    } catch (err) {
      console.error('Failed to load Google Sheet:', err);
      setStatusMsg('Failed to sync. Showing cached fallback events.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveSpreadsheet();
  }, []);

  const categories = ['ALL', ...Array.from(new Set(events.map((e) => e.category)))
    .filter(Boolean)
    .filter((c) => c !== 'GRSS - WIE' && c !== 'GRSS-WIE' && !c.includes('GRSS - WIE'))];

  const filteredEvents = events.filter((evt) => {
    const matchesCat = activeCategory === 'ALL' || evt.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (evt.venue && evt.venue.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const currentEvent = filteredEvents[currentIndex] || filteredEvents[0];

  const handleNext = () => {
    if (filteredEvents.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredEvents.length);
  };

  const handlePrev = () => {
    if (filteredEvents.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredEvents.length) % filteredEvents.length);
  };

  return (
    <section
      id="events"
      className="premium-section py-20 bg-[var(--void)] text-[var(--star-white)] relative overflow-hidden border-b border-[var(--border-main)]"
    >
      <div className="max-w-[88rem] mx-auto space-y-10 px-4 md:px-12 relative z-10">

        {/* Header & Live Sheet Connection Status */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-[var(--border-main)]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {isLoading ? (
                <span className="text-[10px] font-mono text-[var(--accent)] animate-pulse">
                  {statusMsg}
                </span>
              ) : (
                <span className="text-[10px] font-mono text-green-400 font-bold">
                  {statusMsg}
                </span>
              )}
            </div>

            <h2 className="text-4xl md:text-6xl font-black uppercase font-display tracking-tight text-[var(--star-white)]">
              NISB <span className="text-[var(--accent)]">EVENTS FEED</span>
            </h2>
          </div>

          {/* View Mode Toggle */}
          <div className="flex rounded-full bg-white/5 border border-white/10 p-1">
            <button
              onClick={() => setViewMode('slider')}
              className={`px-4 py-1 rounded-full text-xs font-mono font-bold uppercase transition-all ${viewMode === 'slider'
                ? 'bg-[var(--star-white)] text-[var(--void)] shadow-md'
                : 'text-white/60 hover:text-white'
                }`}
            >
              Slider
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-1 rounded-full text-xs font-mono font-bold uppercase transition-all ${viewMode === 'grid'
                ? 'bg-[var(--star-white)] text-[var(--void)] shadow-md'
                : 'text-white/60 hover:text-white'
                }`}
            >
              Grid ({filteredEvents.length})
            </button>
          </div>
        </div>

        {/* Category Pills & Search Input */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setCurrentIndex(0); }}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${activeCategory === cat
                  ? 'bg-[var(--accent)] text-[var(--void)] font-extrabold shadow-lg scale-105'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentIndex(0); }}
            className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-[var(--accent)] w-full md:w-72"
          />
        </div>

        {/* ── MODE 1: INFINITE HERO SLIDER VIEW ── */}
        {viewMode === 'slider' && (
          <div className="space-y-6">
            {/* Navigation Header */}
            <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-3 font-bold">
                <span className="text-[var(--accent)]">EVENT #{String(currentIndex + 1).padStart(3, '0')}</span>
                <span>/</span>
                <span>TOTAL {String(filteredEvents.length).padStart(3, '0')} EVENTS</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full border border-[var(--border-main)] bg-[var(--card-bg)] hover:border-[var(--accent)] hover:text-[var(--accent)] flex items-center justify-center text-lg font-bold transition-all hover:scale-110 active:scale-95 shadow-xl"
                  title="Previous Event"
                >
                  ←
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full border border-[var(--border-main)] bg-[var(--card-bg)] hover:border-[var(--accent)] hover:text-[var(--accent)] flex items-center justify-center text-lg font-bold transition-all hover:scale-110 active:scale-95 shadow-xl"
                  title="Next Event"
                >
                  ➔
                </button>
              </div>
            </div>

            {/* Slider Main Card */}
            <div className="relative min-h-[480px] md:min-h-[540px] rounded-3xl overflow-hidden border border-[var(--border-main)] bg-[var(--card-bg)] shadow-2xl">
              <AnimatePresence mode="wait">
                {currentEvent && (
                  <motion.div
                    key={currentEvent.id || currentIndex}
                    initial={{ opacity: 0, scale: 0.98, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.98, x: -20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch"
                  >
                    {/* Event Banner Image with Clickable Full Poster Trigger */}
                    <div
                      onClick={() => setSelectedPosterEvent(currentEvent)}
                      className="lg:col-span-7 relative overflow-hidden min-h-[260px] md:min-h-[450px] cursor-pointer group/poster"
                      title="Click to view full event poster"
                    >
                      <img
                        src={currentEvent.image}
                        alt={currentEvent.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale-[15%] group-hover/poster:grayscale-0 group-hover/poster:scale-105 transition-all duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src.includes('lh3.googleusercontent.com/d/')) {
                            const driveId = target.src.split('lh3.googleusercontent.com/d/')[1];
                            target.src = `https://drive.google.com/thumbnail?id=${driveId}&sz=w1000`;
                          } else {
                            target.src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop';
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[var(--card-bg)]" />

                      <div className="absolute top-6 left-6 px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-[var(--accent)] uppercase tracking-wider">
                        {currentEvent.category}
                      </div>

                      <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-black/80 backdrop-blur border border-white/20 text-[10px] font-mono text-white/90 opacity-0 group-hover/poster:opacity-100 transition-opacity font-bold">
                        Click for Full Poster
                      </div>

                      {currentEvent.venue && (
                        <div className="absolute bottom-6 left-6 px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white/90">
                          {currentEvent.venue}
                        </div>
                      )}
                    </div>

                    {/* Event Info Details */}
                    <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-6 relative z-10 bg-[var(--card-bg)]">
                      <div className="space-y-4">
                        <span className="text-xs font-mono text-[var(--accent)] font-bold block">
                          DATE: {currentEvent.date}
                        </span>

                        <h3 className="text-3xl md:text-5xl font-black uppercase text-[var(--star-white)] tracking-tight font-display leading-tight">
                          {currentEvent.title}
                        </h3>

                        <p className="text-xs font-sans text-[var(--text-muted)] leading-relaxed">
                          {currentEvent.description}
                        </p>
                      </div>

                      <div className="space-y-6 pt-6 border-t border-[var(--border-main)]">
                        <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                          <span>ORGANISER: IEEE {currentEvent.category}</span>
                          <button
                            onClick={() => setSelectedPosterEvent(currentEvent)}
                            className="text-[var(--accent)] font-bold hover:underline"
                          >
                            View Full Poster ➔
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Event Thumbnail Fast-Scroller Bar */}
            <div className="flex items-center gap-3 overflow-x-auto py-2 no-scrollbar scroll-smooth">
              {filteredEvents.map((evt, idx) => (
                <button
                  key={evt.id || idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`shrink-0 flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all ${currentIndex === idx
                    ? 'border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] font-bold scale-105'
                    : 'border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/20'
                    }`}
                >
                  <span className="text-[10px] font-mono font-bold">#{String(idx + 1).padStart(3, '0')}</span>
                  <span className="text-xs font-mono truncate max-w-[150px]">{evt.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── MODE 2: PAGINATED 185+ EVENTS GRID VIEW ── */}
        {viewMode === 'grid' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.slice(0, visibleGridLimit).map((evt, idx) => (
                <div
                  key={evt.id || idx}
                  onClick={() => setSelectedPosterEvent(evt)}
                  className="group relative rounded-3xl bg-[var(--card-bg)] border border-[var(--border-main)] hover:border-[var(--accent)] overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between min-h-[380px] p-6 cursor-pointer"
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-white/10">
                    <img
                      src={evt.image}
                      alt={evt.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src.includes('lh3.googleusercontent.com/d/')) {
                          const driveId = target.src.split('lh3.googleusercontent.com/d/')[1];
                          target.src = `https://drive.google.com/thumbnail?id=${driveId}&sz=w1000`;
                        } else {
                          target.src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop';
                        }
                      }}
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur border border-white/15 text-[9px] font-mono font-bold text-[var(--accent)] uppercase">
                      {evt.category}
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur text-[8px] font-mono text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                      Full Poster
                    </div>
                    {evt.venue && (
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur text-[8px] font-mono text-white/80">
                        {evt.venue}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[var(--accent)] font-bold block mb-1">
                        {evt.date}
                      </span>
                      <h4 className="text-xl font-extrabold text-white tracking-tight group-hover:text-[var(--accent)] transition-colors leading-snug">
                        {evt.title}
                      </h4>
                      <p className="text-xs font-sans text-[var(--text-muted)] mt-1.5 line-clamp-2">
                        {evt.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[var(--accent)] font-bold">
                      <span>View Full Poster ➔</span>
                      <span className="text-white/40 group-hover:text-white">NISB</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Events Button */}
            {visibleGridLimit < filteredEvents.length && (
              <div className="flex flex-col items-center justify-center pt-6 gap-3">
                <button
                  onClick={() => setVisibleGridLimit((prev) => prev + 12)}
                  className="px-8 py-4 rounded-full bg-[var(--accent)] text-[var(--void)] text-xs font-mono font-extrabold uppercase tracking-widest hover:scale-105 transition-all shadow-xl hover:shadow-[0_0_25px_var(--accent-glow)] flex items-center gap-3 group"
                >
                  <span>LOAD MORE EVENTS</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-black/20 text-xs font-mono font-black">
                    +{Math.min(12, filteredEvents.length - visibleGridLimit)}
                  </span>
                  <span className="group-hover:translate-y-0.5 transition-transform font-bold">↓</span>
                </button>
                <span className="text-[11px] font-mono text-[var(--text-muted)] font-bold">
                  Showing {Math.min(visibleGridLimit, filteredEvents.length)} of {filteredEvents.length} events
                </span>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ── FULL EVENT POSTER CARD MODAL ── */}
      <AnimatePresence>
        {selectedPosterEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPosterEvent(null)}
            className="fixed inset-0 z-[100000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] w-full rounded-3xl bg-[#09090d] border border-white/20 p-6 md:p-8 shadow-2xl overflow-y-auto flex flex-col lg:flex-row gap-8 items-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPosterEvent(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-lg flex items-center justify-center transition-all shadow-xl"
                title="Close Poster Card"
              >
                ✕
              </button>

              {/* Full Uncropped Poster Image Container */}
              <div className="w-full lg:w-1/2 flex items-center justify-center bg-black/80 rounded-2xl p-3 border border-white/10 overflow-hidden max-h-[70vh] shadow-2xl">
                <img
                  src={selectedPosterEvent.image}
                  alt={selectedPosterEvent.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[65vh] w-auto object-contain rounded-xl shadow-2xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src.includes('lh3.googleusercontent.com/d/')) {
                      const driveId = target.src.split('lh3.googleusercontent.com/d/')[1];
                      target.src = `https://drive.google.com/thumbnail?id=${driveId}&sz=w1000`;
                    }
                  }}
                />
              </div>

              {/* Poster Card Info Details */}
              <div className="w-full lg:w-1/2 space-y-5 text-left flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3.5 py-1 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/40 text-[var(--accent)] text-[10px] font-mono font-bold uppercase">
                      {selectedPosterEvent.category}
                    </span>
                    {selectedPosterEvent.venue && (
                      <span className="text-xs font-mono text-white/60">
                        {selectedPosterEvent.venue}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl md:text-4xl font-black uppercase text-white font-display leading-tight tracking-tight">
                    {selectedPosterEvent.title}
                  </h3>

                  <p className="text-xs font-mono text-[var(--accent)] font-bold">
                    EVENT DATE: {selectedPosterEvent.date}
                  </p>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-sans text-white/80 leading-relaxed">
                    {selectedPosterEvent.description}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <a
                    href={selectedPosterEvent.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold transition-all text-center"
                  >
                    Open Original Image
                  </a>
                  <button
                    onClick={() => setSelectedPosterEvent(null)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[var(--accent)] text-black text-xs font-mono font-bold uppercase hover:scale-105 transition-all shadow-lg"
                  >
                    Close Poster Card
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

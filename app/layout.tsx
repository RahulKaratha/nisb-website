import type { Metadata } from "next";
import "./globals.css";
import "./cinematic-events.css";
import "./legacy-scroll.css";

export const metadata: Metadata = {
  title: "NISB",
  description: "NISB — Powering curiosity, igniting innovation. The premier IEEE student branch at National Institute of Engineering, Mysuru. Awarded Region 10 Best Student Chapter.",
  keywords: ["IEEE", "NISB", "NIE Mysuru", "National Institute of Engineering", "Student Branch", "Engineering", "Innovation", "Region 10"],
  icons: {
    icon: "/image.png",
    shortcut: "/image.png",
    apple: "/image.png",
  },
  openGraph: {
    title: "NISB — NIE IEEE STUDENT BRANCH",
    description: "Powering curiosity, igniting innovation. Join the NISB community at NIE Mysuru.",
    type: "website",
    images: ["/image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="blue">
      <head>
        <link rel="icon" href="/image.png" type="image/png" />
        <link rel="shortcut icon" href="/image.png" />
        <link rel="apple-touch-icon" href="/image.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}

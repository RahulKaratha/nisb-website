import urllib.request
from bs4 import BeautifulSoup
import json

with open('scratch_content.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

print("=== ALL HEADINGS AND SECTIONS ===")
for elem in soup.find_all(['h1', 'h2', 'h3', 'h4', 'section', 'div']):
    elem_id = elem.get('id', '')
    elem_class = ' '.join(elem.get('class', []))
    text = elem.get_text(separator=' ', strip=True)
    if elem_id in ['about', 'events', 'team', 'chapters', 'contact', 'magazines', 'execom', 'activities']:
        print(f"\n--- Section ID: {elem_id} (Class: {elem_class}) ---")
        print(text[:500])

print("\n=== NAV ITEMS ===")
for a in soup.find_all('a', class_='navbar-item'):
    print(a.get_text(strip=True), '->', a.get('href'))

print("\n=== PARAGRAPHS IN ABOUT ===")
about_div = soup.find(id='about')
if about_div:
    print(about_div.get_text(separator='\n', strip=True))

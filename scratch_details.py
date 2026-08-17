import sys
import urllib.request
from bs4 import BeautifulSoup
import json

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch_content.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

print("=== TEAM MEMBERS ===")
team_sec = soup.find(id='team')
if team_sec:
    for member in team_sec.find_all(class_='card'):
        name = member.find(class_='name') or member.find('h3') or member.find('p')
        role = member.find(class_='role') or member.find('h4') or member.find('span')
        img = member.find('img')
        img_src = img.get('src') if img else ''
        print(f"Name: {member.get_text(separator=' | ', strip=True)} | Img: {img_src}")

print("\n=== CHAPTERS ===")
chap_sec = soup.find(id='chapters')
if chap_sec:
    print(chap_sec.get_text(separator='\n', strip=True))

print("\n=== CONTACT ===")
contact_sec = soup.find(id='contact')
if contact_sec:
    print(contact_sec.get_text(separator='\n', strip=True))

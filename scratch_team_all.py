import sys
from bs4 import BeautifulSoup
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('scratch_content.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

team_sec = soup.find(id='team')
if team_sec:
    for member in team_sec.find_all(class_='team-div'):
        style = member.get('style', '')
        img_match = re.search(r"url\(['\"]?([^'\"]+)['\"]?\)", style)
        img_url = img_match.group(1) if img_match else ''
        name_h1 = member.find('h1')
        name = name_h1.get_text(strip=True) if name_h1 else ''
        roles = [h4.get_text(strip=True) for h4 in member.find_all('h4')]
        role_str = ' '.join(roles)
        print(f"Name: {name} | Role: {role_str} | Img: {img_url}")

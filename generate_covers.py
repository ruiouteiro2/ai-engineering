from pathlib import Path
import json,html,math,re,textwrap,random
B=Path(__file__).resolve().parent
items=json.loads((B/'catalog-seed.json').read_text(encoding='utf-8'))['products']
C=B/'assets/covers'; C.mkdir(parents=True,exist_ok=True)
colors={
 'FREE_RESOURCE':('#30ddd2','#2088e5','FREE RESOURCE'),
 'PDF_GUIDE':('#46d8d7','#5586ed','ENGINEERING HANDBOOK'),
 'VISUAL_ATLAS':('#9991ff','#426ee3','VISUAL ATLAS'),
 'AGENT_SKILL':('#ffc875','#e78552','AGENT SKILL'),
 'TEMPLATE':('#8dbbf2','#457dcb','REUSABLE TEMPLATE'),
 'LAB':('#e69afc','#a564e4','PRACTICAL LAB'),
 'PRODUCT_BLUEPRINT':('#7be5bc','#33ac97','PRODUCT BLUEPRINT'),
 'BUNDLE':('#f8d38a','#b89344','PROFESSIONAL COLLECTION')}

def wrap(s,max_len=22):
 words=s.replace('—','—').split()
 lines=[]; l=''
 for word in words:
  if len(l)+len(word)+1>max_len and l:
   lines.append(l);l=word
  else:l=(l+' '+word).strip()
 if l:lines.append(l)
 if len(lines)>5:
  lines=lines[:5];lines[-1]=lines[-1][:19]+'…'
 return lines

for i,item in enumerate(items):
 typ=item['type']; sku=item['sku']; title=item['title']; tier=item.get('tier',''); accent,sec,label=colors[typ]
 lines=wrap(title,25 if len(title)>37 else 23)
 fsize=39 if max(map(len,lines))<24 else 35
 if len(lines)>4: fsize=32
 # deterministic points with category-specific position pattern
 rnd=random.Random(sum(ord(a) for a in sku))
 lines_bg=''.join(f'<path d="M{int(x)} 0 V800" stroke="#ffffff" stroke-opacity=".027" stroke-width="1"/>' for x in range(0,601,40))
 lines_bg+=''.join(f'<path d="M0 {int(y)} H600" stroke="#ffffff" stroke-opacity=".025" stroke-width="1"/>' for y in range(0,801,40))
 mesh=''
 pts=[]
 for j in range(22):
  a=2*math.pi*j/22;rad=200+18*math.sin(j*2+i)
  x=300+rad*math.cos(a); y=535+rad*.65*math.sin(a)
  pts.append((x,y))
 for j,(x,y) in enumerate(pts):
  nx,ny=pts[(j+5)%len(pts)]
  mesh+=f'<path d="M{x:.1f} {y:.1f} L{nx:.1f} {ny:.1f}" stroke="{accent}" stroke-opacity=".21" stroke-width="1.5"/>'
  if j%2==0:mesh+=f'<circle cx="{x:.1f}" cy="{y:.1f}" r="3.7" fill="{accent}" fill-opacity=".73"/>'
 # Eye motif + concentric rings, edited visuals unique based on sku
 for j in range(5):
  mesh+=f'<ellipse cx="300" cy="535" rx="{60+j*36}" ry="{35+j*23}" fill="none" stroke="{sec}" stroke-opacity="{0.31-j*.04:.2f}" stroke-width="1.6" transform="rotate({20+i%35} 300 535)"/>'
 line_markup=''.join(f'<text x="42" y="{218+n*(fsize+12)}" font-family="Inter,Manrope,Arial,sans-serif" font-size="{fsize}" font-weight="750" fill="#f5f8ff" letter-spacing="-1">{html.escape(t)}</text>' for n,t in enumerate(lines))
 svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800" role="img" aria-label="Concept cover for {html.escape(title,quote=True)}">
 <defs>
 <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#080e1b"/><stop offset=".57" stop-color="#101a2a"/><stop offset="1" stop-color="#131d32"/></linearGradient>
 <radialGradient id="glow" cx="50%" cy="58%" r="52%"><stop offset="0" stop-color="{sec}" stop-opacity=".21"/><stop offset="1" stop-color="{sec}" stop-opacity="0"/></radialGradient>
 <linearGradient id="line" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{accent}"/><stop offset="1" stop-color="{sec}"/></linearGradient>
 <clipPath id="cut"><rect width="600" height="800" rx="16"/></clipPath>
 </defs>
 <g clip-path="url(#cut)">
 <rect width="600" height="800" fill="url(#bg)"/><rect width="600" height="800" fill="url(#glow)"/>
 {lines_bg}
 <path d="M0 0 H600 V7 H0" fill="url(#line)"/>
 <rect x="42" y="43" width="49" height="49" rx="12" fill="{accent}" fill-opacity=".12" stroke="{accent}" stroke-opacity=".58"/>
 <path d="M59 57 L51 67 L59 77 M75 57 L83 67 L75 77 M69 55 L63 79" fill="none" stroke="{accent}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
 <text x="107" y="66" fill="#e6eef8" font-size="18" font-family="Inter,Arial,sans-serif" font-weight="700" letter-spacing="1">AI ENGINEERING</text>
 <text x="108" y="85" fill="#8196ae" font-size="12" font-family="Inter,Arial,sans-serif" font-weight="600" letter-spacing="2.1">MASTERY SYSTEM</text>
 <rect x="42" y="132" width="{min(480,24+len(label)*10)}" height="32" rx="16" fill="{accent}" fill-opacity=".11" stroke="{accent}" stroke-opacity=".5"/>
 <text x="59" y="153" fill="{accent}" font-size="13" font-family="Inter,Arial,sans-serif" font-weight="700" letter-spacing="1.5">{label}</text>
 {line_markup}
 <rect x="42" y="{207+len(lines)*(fsize+12)+12}" width="65" height="4" rx="2" fill="url(#line)"/>
 <g>{mesh}</g>
 <rect x="42" y="711" width="516" height="1" fill="#526579" fill-opacity=".6"/>
 <text x="42" y="746" font-family="Inter,Arial,sans-serif" fill="#f2f6ff" font-weight="700" font-size="18" letter-spacing="1.3">{html.escape(sku)}</text>
 <text x="558" y="746" text-anchor="end" font-family="Inter,Arial,sans-serif" fill="#b9c8db" font-size="13" letter-spacing="1.5">{html.escape(tier)}</text>
 <text x="42" y="774" font-family="Inter,Arial,sans-serif" fill="#6d8095" font-size="11" letter-spacing="1.5">CONCEPT COVER · CONTENT IN PREPARATION</text>
 </g>
 </svg>'''
 (C/f'{sku}.svg').write_text(svg,encoding='utf-8')

brand=B/'assets/brand'
brand.mkdir(exist_ok=True)
logo='''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 140" width="660" height="140" role="img" aria-label="AI Engineering Mastery System logo">
<rect width="660" height="140" rx="15" fill="#090e18"/><rect x="25" y="32" width="76" height="76" rx="17" fill="#42D9D0" fill-opacity=".10" stroke="#42D9D0" stroke-width="2"/><path d="M52 53 L40 71 L52 89 M75 53 L87 71 L75 89 M69 49 L58 93" stroke="#42D9D0" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><text x="122" y="69" fill="#f4f7fc" font-family="Inter,Arial,sans-serif" font-size="30" font-weight="700" letter-spacing=".7">AI ENGINEERING</text><text x="124" y="98" fill="#b1c1d5" font-family="Inter,Arial,sans-serif" font-size="19" letter-spacing="5">MASTERY SYSTEM</text></svg>'''
(brand/'logo-concept.svg').write_text(logo,encoding='utf-8')
(brand/'favicon-concept.svg').write_text(logo.replace('viewBox="0 0 660 140" width="660" height="140"','viewBox="20 26 85 86" width="85" height="86"'),encoding='utf-8')
print('covers',len(list(C.glob('*.svg'))),'brand',len(list(brand.glob('*.svg'))))

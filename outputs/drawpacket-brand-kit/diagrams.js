/* Original editable SVG compositions. All example records are synthetic. */
function diagram(p, standalone=false){
 const dark=['wine','oxblood'].includes(p.surface), ink=dark?'#F5F5F1':'#252225',accent=dark?'#DFDBE8':'#642A37',line=dark?'#957985':'#B5ADB4',paper=dark?'#4A2A35':'#FFFFFF',tint=dark?'#5E3948':'#DFDBE8';
 const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
 const txt=(s,x,y,size=16,color=ink,extra='')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" ${extra}>${esc(s)}</text>`;
 const rule=(x1,y1,x2,y2)=>`<path class="trace" d="M${x1} ${y1}L${x2} ${y2}" stroke="${line}" fill="none"/>`;
 const box=(x,y,w,h,fill=paper)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}" stroke="${line}"/>`;
 const group=(s,i=0)=>`<g class="arrive" style="--i:${i}">${s}</g>`;
 const pill=(s,x,y)=>box(x,y,Math.max(126,s.length*8.8),32,tint)+txt(s,x+12,y+21,13);
 const title=txt('DEMO / SYNTHETIC DATA',28,30,11,accent,'letter-spacing="2"')+txt('BP-04 · SEPTEMBER 2026',28,53,11,ink);
 let a='';
 if(p.kind==='timeline'||p.kind==='expiry'){
  const days=p.kind==='expiry'?['05','08','10']:['05','06','07','08','10'];
  days.forEach((d,i)=>{const x=34+i*(540/(days.length-1));a+=rule(x,84,x,330)+txt(d,x+7,116,38,accent,'font-family="Georgia,serif"');});
  a+=group(box(38,155,350,88,tint)+txt('Stoneway Mechanical / PA-07',54,185,18)+txt('Review opened · 05 Oct',54,213,14),0);
  a+=group(box(394,249,208,72,dark?'#795126':'#FFF0C5')+txt('!  COI expires 08 Oct',406,278,15,dark?'#FFF':'#704800')+txt('Before review on 10 Oct',406,302,13,dark?'#FFF':'#704800'),1);
  a+=rule(28,351,610,351)+group(txt('$84,000',32,382,25)+txt('requested',32,405,12)+txt('$78,000',232,382,25)+txt('supported',232,405,12)+txt('$6,000',440,382,25,accent)+txt('variance',440,405,12),2);
 }else if(['variance','sources','chart'].includes(p.kind)){
  if(p.kind==='chart'){
   p.labels.forEach((s,i)=>{a+=group(rule(40,130+i*85,595,130+i*85)+txt(s,40,111+i*85,16)+txt('—',552,110+i*85,24,accent),i);});a+=txt('Pilot scorecard · no measured outcomes yet',40,393,14,accent);
  }else{
   a+=group(txt('REQUESTED',30,106,12)+txt('$84,000',30,152,42)+txt('SUPPORTED',330,106,12)+txt('$78,000',330,152,42),0);
   ['Current work','Stored materials','Approved CO-03'].forEach((s,i)=>a+=group(rule(30,188+i*48,600,188+i*48)+txt(s,40,218+i*48,16)+txt(['$65,000','$5,000','$8,000'][i],588,218+i*48,18,ink,'text-anchor="end"'),i));
   a+=group(box(30,351,570,64,tint)+txt('$6,000',48,392,28,accent)+txt('Needs evidence and review',220,390,17),3);
  }
 }else if(p.kind==='network'){
  a+=rule(320,146,320,192)+rule(320,252,320,303)+rule(320,192,100,192)+rule(100,192,100,302);
  a+=group(box(210,82,220,64)+txt('Bridgepine · GC',231,120,18),0);
  a+=group(box(210,192,220,60,tint)+txt('Stoneway · Subcontractor',223,228,15),1);
  a+=group(box(210,303,365,80)+txt('Cedar Supply · Lower tier',225,332,17)+txt('! Conditional waiver missing',225,361,15,accent),2);
  a+=group(txt('Tier identified',35,325,13)+txt('by GC',35,347,13),2);
  a+=txt('Illustrative relationships · no automated signing',28,421,13,accent);
 }else if(['packet','library','checklist','review'].includes(p.kind)){
  const names=p.kind==='packet'?['01  Application / PA-07-v2','02  Approved change / CO-03','03  Waiver evidence / pending','04  COI / reviewer decision','05  GC approval / pending']:p.kind==='library'?['01  Payment application guide','02  Conditional / unconditional','03  Source evidence checklist']:p.kind==='checklist'?['SOV + application','Changes + materials','Tiered waiver evidence','COI + contract requirements','Named GC approver']:['PA-07 · $84,000 requested','SOV + CO · $78,000 supported','Variance · $6,000','Waiver + COI · held','GC approval · pending'];
  a+=box(76,76,490,342)+txt(p.kind==='packet'?'OWNER PACKET / DRAFT':'SOURCE INDEX',100,111,14,accent);
  names.forEach((s,i)=>a+=group(rule(99,132+i*49,540,132+i*49)+txt(s,100,163+i*49,16)+txt(p.kind==='checklist'?'□':'↗',515,163+i*49,18,accent),i));
 }else if(p.kind==='map'){
  a+=`<g transform="translate(0 26)">${(typeof MAP_STATES!=='undefined'?MAP_STATES:[]).map(s=>`<path class="map-state ${s.id==='06'?'selected-state':''}" d="${s.d}" fill="${s.id==='06'?accent:tint}" stroke="${paper}" stroke-width="1.6"><title>${esc(s.name)}</title></path>`).join('')}</g>`;
  a+=group(box(300,340,310,74)+txt('California example only',317,369,18)+txt('Jurisdiction, not service coverage',317,394,13),2);
 }else if(['boundary','entry','architecture'].includes(p.kind)){
  a+=`<g class="arrive" transform="translate(405 83) scale(.85)" fill="${tint}"><path d="M0 112V42A42 42 0 0 1 84 42V80Z"/><path d="M0 128L84 96V154A42 42 0 0 1 0 154Z"/><path d="M94 172V102A42 42 0 0 1 178 102V140Z"/><path d="M94 188L178 156V214A42 42 0 0 1 94 214Z"/></g>`;
  p.labels.forEach((s,i)=>a+=group(rule(35,126+i*89,360,126+i*89)+txt('0'+(i+1),35,109+i*89,14,accent)+txt(s,80,109+i*89,18),i));
  a+=txt(p.kind==='entry'?'Enter demo — no account created':'Human authority remains outside automation',34,410,14,accent);
 }else if(p.kind==='cards'){
  p.labels.forEach((s,i)=>a+=group(box(32+i*13,80+i*62,526,52,i%2?tint:paper)+txt('0'+(i+1),48+i*13,113+i*62,14,accent)+txt(s,100+i*13,113+i*62,19),i));
 }else if(['process','connections','tour','data-lifecycle','access','recovery'].includes(p.kind)){
  p.labels.slice(0,3).forEach((s,i)=>{let x=40+i*200;a+=group(txt('0'+(i+1),x,137,56,accent,'font-family="Georgia,serif"')+rule(x,160,x+164,160)+box(x,190,164,114)+txt(s.length>22?s.slice(0,22):s,x+12,227,14)+txt(['Source / input','Review / context','Next action'][i],x+12,258,12,accent),i);if(i<2)a+=rule(x+164,247,x+200,247);});
  a+=group(txt(p.kind==='access'?'Focus stays visible. Content stays available.':p.kind==='recovery'?'Choose a destination to continue.':'Illustrative process · reviewer controlled',40,379,16,accent),3);
 }else if(p.kind==='institution'){
  const pictos=[`<path d="M5 70V26L55 5L105 26V70M0 75H110M14 30H96M24 36V68M53 36V68M82 36V68"/>`,`<path d="M4 75V32L56 6L108 32V75M18 75V49H45V75M62 47H91M62 58H91"/>`,`<path d="M20 75V8H89V75M9 75H101M35 23H47M61 23H73M35 40H47M61 40H73M48 75V56H65V75"/>`];
  p.labels.forEach((s,i)=>a+=group(`<g class="trace" transform="translate(${55+i*202} 120)" fill="none" stroke="${accent}" stroke-width="2.3">${pictos[i]}</g>`+txt('0'+(i+1),55+i*202,251,14,accent)+txt(s,38+i*202,285,14),i));a+=txt('Roles in the review · not customer logos',38,380,14,accent);
 }else if(p.kind==='lanes'){
  p.labels.forEach((s,i)=>{a+=group(box(30+i*22,100+i*88,310,59,i%2?tint:paper)+txt(s,45+i*22,136+i*88,17),i);a+=rule(384,131+i*88,525,131+i*88)});a+=rule(525,87,525,369)+txt('REVIEW',482,401,14,accent);
 }else{
  a+=txt(p.kind==='scope'?'ONE PROJECT / ONE CYCLE':'REVIEW NOTES',32,110,13,accent);p.labels.slice(0,3).forEach((s,i)=>a+=group(box(32,142+i*76,568,60,i===1?tint:paper)+txt('0'+(i+1),48,178+i*76,13,accent)+txt(s,98,178+i*76,18),i));a+=txt(p.kind==='scope'?'Hypothetical pricing · no checkout':'Purpose-limited concept preview',32,419,13,accent);
 }
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 450" role="img" aria-label="${esc(p.title)} — synthetic concept illustration"><style>text{font-family:'DM Sans',Arial,sans-serif;font-variant-numeric:tabular-nums}text[font-family]{font-family:'Bodoni Moda',Georgia,serif} .arrive{animation:enter .7s both;animation-delay:calc(var(--i,0)*.38s)}.trace{stroke-dasharray:1200;animation:draw 2s both}.selected-state{animation:state 1.8s both}@keyframes enter{from{opacity:.25;translate:0 12px}to{opacity:1;translate:0 0}}@keyframes draw{from{stroke-dashoffset:1200}to{stroke-dashoffset:0}}@keyframes state{from{opacity:.25}to{opacity:1}}@media(prefers-reduced-motion:reduce){*{animation:none!important}}</style>${title}${a}</svg>`;
}
if(typeof module!=='undefined')module.exports=diagram;

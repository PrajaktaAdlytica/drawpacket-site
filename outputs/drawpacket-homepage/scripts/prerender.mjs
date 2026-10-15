import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { render, routes, pages } from '../dist/ssr/entry-server.js';
const root=new URL('../dist/client/',import.meta.url);
const template=await readFile(new URL('index.html',root),'utf8');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
for(const path of ['/',...routes]){
 const page=pages[path];const title=page?`${page.label} — DrawPacket`:'DrawPacket — Bring the month into focus.';const description=page?.intro||'One project. One monthly cycle. Visible evidence and human review. Research-stage concept.';
 let html=template.replace('<div id="root"></div>',`<div id="root" data-route="${path}">${render(path)}</div>`).replace(/<title>.*?<\/title>/,`<title>${escape(title)}</title>`).replace(/(<meta\s+name="description"\s+content=")[^"]*/,`$1${escape(description)}`).replace(/(<meta\s+property="og:title"\s+content=")[^"]*/,`$1${escape(title)}`).replace(/(<meta\s+property="og:description"\s+content=")[^"]*/,`$1${escape(description)}`);
 const dir=new URL(path==='/'?'./':path.slice(1)+'/',root);await mkdir(dir,{recursive:true});await writeFile(new URL('index.html',dir),html);if(path==='/404')await writeFile(new URL('404.html',root),html);
}
console.log(`Prerendered homepage and ${routes.length} complete detail/recovery routes.`);

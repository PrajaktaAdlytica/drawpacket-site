import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { routes, pages, render } from '../dist/ssr/entry-server.js';
const base=new URL('../dist/client/',import.meta.url);
test('all IA routes have distinct titles, one heading and prerendered content',async()=>{
 assert.equal(routes.length,26);assert.equal(new Set(routes.map(r=>pages[r].title)).size,26);
 for(const route of ['/',...routes]){const file=new URL(route==='/'?'index.html':route.slice(1)+'/index.html',base);const html=await readFile(file,'utf8');assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,route);assert.ok(html.includes(`data-route="${route}"`));assert.ok(html.includes('Research-stage')||html.includes('research-stage'));}
});
test('every internal route and public asset resolves',async()=>{
 const known=new Set(['/',...routes]);
 for(const route of ['/',...routes]){const html=render(route);for(const [,href] of html.matchAll(/<a[^>]*href="([^"#][^"]*)"/g)){if(href.startsWith('/')&&!href.startsWith('//'))assert.ok(known.has(href.split(/[?#]/)[0]),`${route}: ${href}`);}
 for(const [,src] of html.matchAll(/src="(\/[^\"]+)"/g))await access(new URL(src.slice(1),base));}
});
test('five module pages retain their specific inputs, limits and pilot selection',()=>{
 for(let n=1;n<=5;n++){const entry=Object.entries(pages).find(([,p])=>p.module===n);assert.ok(entry);const html=render(entry[0]);assert.ok(html.includes(`/request-pilot?offer=${n}`));assert.ok(html.includes('synthetic'));assert.equal(entry[1].sections[0].items.length,3);assert.equal(entry[1].sections[1].type,'ledger');}
});
test('unknown routes render the branded recovery page',()=>{assert.ok(render('/not-a-page').includes('This page is'));assert.ok(render('/not-a-page').includes('Back to the month'));});

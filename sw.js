const CACHE='omok-v1';
self.addEventListener('install',e=>{self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','manifest.webmanifest','icon-192.png','icon-512.png'])));});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request; if(r.method!=='GET') return;
  e.respondWith(fetch(r).then(res=>{const copy=res.clone(); caches.open(CACHE).then(c=>c.put(r,copy)).catch(()=>{}); return res;})
    .catch(()=>caches.match(r,{ignoreSearch:r.mode==='navigate'}).then(m=>m||(r.mode==='navigate'?caches.match('./'):Response.error()))));});

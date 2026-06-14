const CACHE="mk-tv-v1";
const ASSETS=["prueba.html","tv-retro.jpg","icon-192.png","icon-512.png","manifest.json"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS)}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==CACHE}).map(function(x){return caches.delete(x)}))}))});
self.addEventListener("fetch",function(e){
    var url=new URL(e.request.url);
    if(url.hostname.indexOf("bozztv.com")!==-1)return;
    if(url.pathname.indexOf("programacion.json")!==-1)return;
    e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request)}));
});
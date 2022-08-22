//Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v11';
//Add list of files to cache here.
const FILES_TO_CACHE = ['index.html','apropos.html','menu.html','reservation.html','./css/style.css' , './assets/images/background1.png','./assets/images/burger-11.webp','./assets/images/burger-12.webp','./assets/images/burger-background.webp','./assets/images/burger-background2.webp','./assets/images/burger-icon.png','./assets/images/burger7.jpg','./assets/images/burger8.png','./assets/images/burger9.jpg','./assets/images/burger10.webp','./assets/images/chef1.jpg','./assets/images/chef2.jpg','./assets/images/chef3.jpg','./assets/images/chef4.jpg','./assets/images/chef5.jpg','./assets/images/chef6.jpg','./assets/images/hamburger1.jpg','./assets/images/hamburger2.jpg','./assets/images/hamburger3.jpg','./assets/images/hamburger4.jpg','./assets/images/hotdog.webp','./assets/images/mission.jpeg','./assets/images/planete.jpg','./assets/images/planete.webp','./assets/images/planete2.webp','./assets/images/planete3.jpg','./assets/images/restaurant.jpg','./assets/images/veganBurger.jpg'];
self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    // Precache static resources here.
    evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
    console.log('[ServiceWorker] Pre-caching offline page');
    return cache.addAll(FILES_TO_CACHE);
    })
    );
    self.skipWaiting();
    });
//Update cache names any time any of the cached files change.


self.addEventListener('activate', (evt) => {
console.log('[ServiceWorker] Activate');
//Remove previous cached data from disk.
evt.waitUntil(
caches.keys().then((keyList) => {
return Promise.all(keyList.map((key) => {
if (key !== CACHE_NAME) {
console.log('[ServiceWorker] Removing old cache',
key);
return caches.delete(key);
}
}));
})
);
self.clients.claim();
});
self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    //Add fetch event handler here.
    if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return;
    }
    evt.respondWith(
    fetch(evt.request)
    .catch(() => {
    return caches.open(CACHE_NAME)
    .then((cache) => {
    return cache.match('offline.html' );
    });
    })
    );
    });
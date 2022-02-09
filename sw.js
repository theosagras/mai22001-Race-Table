self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('mai22001').then((cache) => cache.addAll([
            '/mai22001-Race-Table/',
            '/mai22001-Race-Table/index.html',
            '/mai22001-Race-Table/uomTrack.js',
            '/mai22001-Race-Table/main.css',
            '/mai22001-Race-Table/assets/uomTitle.png',
            '/mai22001-Race-Table/assets/rubbish.svg',
            '/mai22001-Race-Table/assets/copy.svg',
        ])),
    );
});

self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});

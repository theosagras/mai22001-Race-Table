self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('mai22001-store').then((cache) => cache.addAll([
            '/https://theosagras.github.io/mai22001-Race-Table/',
            '/https://theosagras.github.io/mai22001-Race-Table/index.html',
            '/https://theosagras.github.io/mai22001-Race-Table/uomTrack.js',
            '/https://theosagras.github.io/mai22001-Race-Table/main.css',
            '/https://theosagras.github.io/mai22001-Race-Table/assets/uomTitle.jpg',
            '/https://theosagras.github.io/mai22001-Race-Table/assets/rubbish.svg',
            '/https://theosagras.github.io/mai22001-Race-Table/assets/copy.svg',
        ])),
    );
});

self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});
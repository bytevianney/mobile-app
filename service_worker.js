
const FilesToCache = [
  "/app.js",
  "/index.html",
  "/app.css",
  "/jelpi.js",
  "/manifest.json",
  "/images/icon_128x128.png",
  "/images/icon_144x144.png",
  "/images/icon_152x152.png",
  "/images/icon_192x192.png",
  "/images/icon_256x256.png",
  "/images/icon_32x32.png",
  "/images/icon_512x512.png",
  "/images/pico8_logo_vector.png",
  "/images/rotate.gif"
];


const CacheName = "pico8-game-cache-v2";


self.addEventListener("install", event => {
  console.log("Caching your JavaScripts...");
  event.waitUntil(cacheJavaScripts());

  
  self.skipWaiting();
});


self.addEventListener("activate", event => {
  console.log("Deleting stale caches...");
  event.waitUntil(deleteStaleCaches());

  
  self.clients.claim();
});


self.addEventListener("fetch", event => {
  console.log("Fetching", event.request.url);
  event.respondWith(handleFetch(event.request));
});



async function cacheJavaScripts() {
  const cache = await caches.open(CacheName);
  return cache.addAll(FilesToCache);
}

async function deleteStaleCaches() {
  const keyList = await caches.keys();
  return keyList.map(cacheKey =>
    cacheKey !== CacheName ? caches.delete(cacheKey) : null
  );
}


async function handleFetch(req) {
  try {
    const cache = await caches.open(CacheName);
    const contents = await cache.match(req.url);
    if (!contents) throw new Error("Cache is empty.");
    return contents;
  } catch (err) {
    console.error(
      `Failed to fetch from cache for ${req.url}, trying network.`,
      err
    );
    const res = await fetch(req);
    return res;
  }
}

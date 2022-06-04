'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "58f20dd670994cffcc92f3302921349e",
"assets/assets/fonts/black.ttf": "9ded577f93b24331f4faadfc5f834ae6",
"assets/assets/fonts/bold.ttf": "8669b8706bbbdd1482e2fccc4ed96850",
"assets/assets/fonts/light.ttf": "81cd217e4a8160a930c6d5fb8d1e8e82",
"assets/assets/fonts/pnu_bold.ttf": "4363d9c9ec9845a2dbe13c881d204e0e",
"assets/assets/fonts/pnu_light.ttf": "a65d140001676e27e37dc6d6e138c458",
"assets/assets/fonts/pnu_medium.ttf": "a18a53e2baa5e07c4acf87dc49f9d292",
"assets/assets/fonts/pnu_regular.ttf": "a5145dd6e710b1ec18f06be74f1570df",
"assets/assets/icons/face.svg": "73fc5499eb81c22ddfcf3ea74e8266ba",
"assets/assets/icons/google.svg": "dab26bb780b1f03a7225695947eb14e4",
"assets/assets/icons/icon_login.svg": "c9e342e50c0a7bc9273516dd05eb475a",
"assets/assets/icons/twiter.svg": "0a50b089ac226608886d890a572bda98",
"assets/assets/images/active.png": "1ad9956ae0c3e6e18694b6b27ad912de",
"assets/assets/images/advertising.png": "b8874606857704f3afd5e082147df302",
"assets/assets/images/auction.png": "ce6d14089fc0bdaa73da2ea7c71778ad",
"assets/assets/images/backround_login.png": "f3fd919f8889cdd70f4b281d7a1b24ce",
"assets/assets/images/back_home.png": "f3fd919f8889cdd70f4b281d7a1b24ce",
"assets/assets/images/country.png": "971f5e39bcf2bf1a00820cad732af8c6",
"assets/assets/images/fixing.png": "81bfebaf1a313d14223d7b9952ae6db3",
"assets/assets/images/functionlibiral.png": "2bbd717ed6c438837391e33c0d39685c",
"assets/assets/images/img_add_add.png": "5eebf25c93d900c1840a7d52e9c86182",
"assets/assets/images/img_pro.png": "a6c45c3955f08d68ae25c86a2567ced2",
"assets/assets/images/logoicon.jpg": "80f42b2ec5b2aa47497b98651cb8eb75",
"assets/assets/images/logo_back.png": "10061d6672447551e2ff4e6a7a746c16",
"assets/assets/images/logo_final.png": "cc2d37afd9448dfed926f49b9d4cb237",
"assets/assets/images/mazad.png": "4e5659f1f33ac18a01620f3976b9eb5a",
"assets/assets/images/megaphone.png": "8a85e9a9d252f3b31bc4ab0cd7753c4d",
"assets/assets/images/photo.png": "c78a59ea104324e7758c591d7d5c837d",
"assets/assets/images/rejected.png": "5fa451d0c83d08627d009de7154a1f35",
"assets/assets/images/whatsapp.png": "42966a7973858d3143bf99091cd79714",
"assets/assets/images/X.png": "b056c0bd5ae678eb7e08732960eb6c71",
"assets/FontManifest.json": "be7af7cc02c18604b0c321ce1cc93d7d",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "bca9f8d7cbf7601607e4c24367ee518a",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/wakelock_web/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "0816e65a103ba8ba51b174eeeeb2cb67",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "212a6fe5051d8e959d9488c8ceb6a881",
"/": "212a6fe5051d8e959d9488c8ceb6a881",
"main.dart.js": "384fcfb6df6ccea8dccfe8b62095d493",
"manifest.json": "293841ac7343e2cea10494c3df14f60f",
"version.json": "ee87c0254db5a73893b75e81c7357967"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}

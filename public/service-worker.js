// function receivePushNotification(event) {
//   console.log("[Service Worker] Push Received.");

//   //const { image, tag, url, title, text } = event.data.json();
//   const notificationText = event.data.text();
//   const title = "Link Leito:"

//   const options = {
//     //data: url,
//     //data: "something you want to send within the notification, such an URL to open",
//     body: notificationText,
//     icon: "./logo-img.png",
//     vibrate: [200, 100, 200],
//     //tag: tag,
//     //image: image,
//     badge: "https://res.cloudinary.com/dxblalpv2/image/upload/v1588194718/favicon_cdghd2.ico",
//     //actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
//   };
//   //call the method showNotification to show the notification
//   event.waitUntil(self.registration.showNotification(title, options));
// }
self.addEventListener("push", (event) => {
  console.log("CHEOU NO PUSH")
  const options = {
    body: 'HELLO PUSH NOTIFICATIONS',
    icon: "./the-chat-logo.jpg",
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    //tag: tag,
    //image: image,
    actions: [
        {
          action: "explore",
          title: "Explorethis new world",
          icon: "./the-chat-logo-512x512.png"
        }
    ]
  };
  event.waitUntil(self.registration.showNotification('HELLO WORD!', options));
});
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
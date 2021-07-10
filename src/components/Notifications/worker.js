console.log('Service Worker Loaded...')

self.addEventListener('push', e => {
    const data = e.data.json()
    console.log('Push Recived...');
    self.registration.showNotification(data.title, {
        body: 'Notified by Traversy media!',
        icon: 'http://image.ibb.co/frY0Fd/tmlogo.png'
    })
})
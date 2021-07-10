<template>
  <div>
      <h1> Notificações </h1>
      <button @click="pushRegister()"> ativar notificações </button>
  </div>
</template>

<script>
export default {
    data: () => ({
      publicKey: "BBm-WpaMA52nM8uvH1gCeyoHvDrSrV6O8xsozro_uGant31hJeAZkDcc2lQagDB0n5VAGQQ4UWzpTVkP7QXbr_4"
    }),

    methods: {
      async pushRegister(){
        console.log('FOI AQUI')
        const vapidPublicKey = "BBm-WpaMA52nM8uvH1gCeyoHvDrSrV6O8xsozro_uGant31hJeAZkDcc2lQagDB0n5VAGQQ4UWzpTVkP7QXbr_4"
        const convertedVapidKey = this.urlBase64ToUint8Array(vapidPublicKey);

        console.log('CHEGOU NA FUNC DO SERVICE')
        navigator.serviceWorker.getRegistration().then(reg => {
          console.log('AGORA VEM O PUSH')
          reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey
          }).then(async (body) => {
            console.log('DEU CERTO ?')
            const resp = await this.$http.post(this.$url + '/subscribe', body )
            console.log('RESP', resp)
          })
        })
      },

      checkServiceWorker() {
        if ('serviceWorker' in navigator) {
          this.send().catch(err => { console.log(err) })
        }
      },

      async send(){
        console.log('Registering service worker...');

        const register = await navigator.ServiceWorker.register('./worker.js', {
            scope:'/'
        })
        console.log('Service worker Registered...');

        console.log('Registering Push...')
        console.log('this.publicKey', this.publicKey)
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.urlBase64ToUint8Array(this.publicKey)
        }).then( async (resp) => { console.log('RESPONSE DO SEVICE WORK', resp) })
        console.log('Push Registered...')

        const resp = await this.$http.post(this.$url + '/subscribe', JSON.stringify(subscription) )

        console.log('Push sent...', resp)


      },


      urlBase64ToUint8Array(base64String) {

        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
          .replace(/-/g, '+')
          .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }

        return outputArray;
      },
    }
}
</script>
<template>
  <div>
      <h1> Notificações </h1>
      <button @click="pushRegister()"> ativar notificações </button>
      <vs-button @click="sendNotification()"> Enviar notificação </vs-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data: () => ({

    }),

    computed:{
      ...mapGetters({
        userData: 'userData',
      }),
    },

    methods: {
      async pushRegister(){
        const vapidPublicKey = "BBm-WpaMA52nM8uvH1gCeyoHvDrSrV6O8xsozro_uGant31hJeAZkDcc2lQagDB0n5VAGQQ4UWzpTVkP7QXbr_4"
        const convertedVapidKey = this.urlBase64ToUint8Array(vapidPublicKey);

        navigator.serviceWorker.getRegistration().then(reg => {
          reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey
          }).then(async (subData) => {
            let body = {
              user_id: this.userData._id,
              subscribeData: subData
            }
            const resp = await this.$http.post(this.$url + '/subscribe', body )
            console.log('RESP', resp)
          })
        })
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

      async sendNotification() {
        const body = {
          user_id: this.userData._id
        }

        const resp = await this.$http.post(this.$url + '/notification/send', body)
        console.log('ENVIOU NOTIFICAÇÃO', resp)

      }
    }
}
</script>
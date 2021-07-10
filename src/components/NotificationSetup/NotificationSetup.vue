<template>
    <div>

        <h1> NOTIFICAÇÃO </h1>

    </div>
</template>

<script>
export default {
    data:() => ({
        default: ''
    }),

    methods: {
        async pushRegister() {

            const vapidPublicKey = 'BMkBPdr3rDmemWN5-H5AQhPkuCklR57bTyZZHRgnRIEpJyvQBw-kVnBKahAMr_1kURDIMRqU-h9T30IKKliGv5g'

            const convertedVapidKey = this.urlBase64ToUint8Array(vapidPublicKey);

            navigator.serviceWorker.getRegistration().then(reg => {
                reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey
                }).then(async function (body) {

                await this.$http.post(this.$url + '/subscribe', body).then(response => {
                    if (response) {
                        console.log('REGISTRADO PARA RECEBER NOTIFICAÇÃO')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })

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

    }
}
</script>
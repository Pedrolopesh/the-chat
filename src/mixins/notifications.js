export default {
    data:() => ({

    }),

    created() {
    },

    methods: {
        recivedMessage(){
            this.$vs.notification({
                color: 'dark',
                position: 'top-center',
                title: 'Nova mensagem recebida 🙌🏾',
            })
        }
    }
}

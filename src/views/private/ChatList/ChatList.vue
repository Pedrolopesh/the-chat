<template>
    <div>
        <h1 class="mt-3">SUAS CONVERSAS</h1>

        <div class="container-chatlist">
            <div class="container-chats" v-if="chatItems !== '' ">
                <div v-for="(item ,i) in chatItems" :key="i" class="contact-message">
                    <div class="container-contact-info" v-if="userData._id !== item.user_response">
                        <div class="mr-4">
                            <Avatar :img_profile="item[i].img_profile" />
                        </div>
                        <span class="clr-white">
                            {{ item[i].name }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="container-messagens">
                <div>
                    Suas mensagens estrão aqui
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from '../../../components/Avatar/Avatar'
import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        Avatar
    },

    computed: {

        ...mapGetters({
            userData:'userData',
            chatId:'chatId'
        })
    },

    data:() => ({
        propsImageSrc: '',
        chatItems: ''
    }),

    methods: {
        ...mapActions({
            getUserData: 'getUserData'
        }),

        async listChatConections(){

            let userId = this.userData
            if (!userId) {
                return this.getUserData()
            }
            const respChatItems = await this.$http.get(this.$url + `/chats/userid/${userId._id}`).catch(err => { console.log(err) })
            // this.chatItems = respChatItems.data
            this.formatChatMessages(respChatItems.data)
        },

        formatChatMessages(chatItemsParam) {
            console.log("LOGED USER IS =>", this.userData)
            const allChatItens = chatItemsParam
            let newChatItens = []
            for (let i in allChatItens) {
                if (this.userData._id === allChatItens[i].user_response[0]._id) {
                    newChatItens.push(allChatItens[i].user_origin)
                }
                if (this.userData._id === allChatItens[i].user_origin[0]._id) {
                    newChatItens.push(allChatItens[i].user_response)
                }
            }
            this.chatItems = newChatItens
        }
    },

    created() {
        this.listChatConections()
    },

    watch: {
        userData() {
            this.listChatConections()
        }
    }

}
</script>

<style lang="scss">
    .container-chatlist{
        display: flex;
        max-width: 100%;
        width: 100%;
        justify-content: center;
    }

    .container-chats{
        display: block;

        .contact-message{
            display: block;
            max-width: 100%;
            width: 250px;
            background: rgb(116, 116, 116);
            padding: 10px;
            margin-left: 10px;
            border-radius: 15px;

            .container-contact-info{
                display: flex;
            }
        }
    }

    .container-messagens{
        display: block;
        text-align: center;
        max-width: 100%;
        width: 50%;
    }
</style>
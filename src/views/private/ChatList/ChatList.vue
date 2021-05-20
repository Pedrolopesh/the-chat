<template>
    <div>
        <h1 class="mt-3">SUAS CONVERSAS</h1>

        <div class="container-chatlist">
            <div class="container-chats" v-if="chatItems.items !== '' ">
                <div v-for="(item ,i) in chatItems" :key="i" class="contact-message">
                    <button
                        :class="selectedChatId === item.chatInfo._id ? 'select-contact-message' : '' "
                        @click="selectedChatId = item.chatInfo._id , selectedUserName = item.userData"
                        class="container-contact-info"
                    >
                        <div class="mr-4">
                            <Avatar :img_profile="item.userData.img_profile" />
                        </div>
                        <span class="clr-white">
                            {{ item.userData.name }}
                        </span>
                    </button>
                </div>
            </div>

            <div class="container-messagens">
                <div v-if="!selectedChatId">
                    Suas mensagens estrão aqui
                </div>
                <div v-else>
                    <ChatModal :chatId="selectedChatId" :reciverUserName="selectedUserName" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from '../../../components/Avatar/Avatar'
import { mapActions, mapGetters } from 'vuex';
import ChatModal from '../../../components/cpmChatmodal';
export default {
    components: { Avatar, ChatModal },

    computed: {
        ...mapGetters({
            userData:'userData',
            chatId:'chatId'
        })
    },

    data:() => ({
        propsImageSrc: '',
        chatItems: '',
        selectedChatId: '',
        selectedUserName: '',
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
            let formatedItens = [...respChatItems.data.user_response_mesage, ...respChatItems.data.user_origin_message]
            this.formatChatMessages(formatedItens)
        },

        formatChatMessages(chatItemsParam) {
            // console.log("LOGED USER IS =>", chatItemsParam)
            const allChatItens = chatItemsParam
            console.log("ALL DATA =>", allChatItens)
            let newChatItens = []
            for (let i in allChatItens) {
                if (this.userData._id === allChatItens[i].user_response[0]._id) {
                    newChatItens.push({
                        userData: allChatItens[i].user_origin[0],
                        chatInfo: allChatItens[i]
                    })
                }
                if (this.userData._id === allChatItens[i].user_origin[0]._id) {
                    newChatItens.push({
                        userData: allChatItens[i].user_response[0],
                        chatInfo: allChatItens[i]
                    })
                }
            }
            console.log("DATA =>", newChatItens)
            this.chatItems = newChatItens
        },

        selectedChatConnection(item) {
            console.info(item.chatInfo._id)
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
        min-height: 685px;
    }

    .container-chats{
        display: block;
        background: #ffc5c5;
        border-radius: 10px 10px 0px 10px;

        .contact-message{
            display: block;
            margin-top: 20px;

            &:first-child {
                margin-top: 0px;
            }

            .container-contact-info{
                display: flex;
                max-width: 100%;
                width: 250px;
                background: #ffc5c5;
                padding: 10px;
                border: none;

                span {
                    font-size: 20px;
                    font-weight: 500;
                }
            }
        }
    }

    .container-messagens{
        display: block;
        text-align: center;
        max-width: 100%;
        width: 50%;
    }

    .select-contact-message {
        transition: 1s;
        background-color: #ff9f9f !important;
        border: 1px solid rgb(189, 189, 189) !important;
        border-radius: 10px !important;
        box-shadow: -10px 6px 15px rgb(0 0 0 / 36%) !important;
    }
</style>
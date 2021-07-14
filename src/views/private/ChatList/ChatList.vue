<template>
    <div>
        <div v-if="chatItems.length === 0 ">
            <h2>Você ainda não Possue Mensagens com nenhum usuário</h2>
            <h4>Navegue até a aba de usuário e adicione amigos para conversar</h4>

            <vs-button
                class="display-b ac mt-5"
                size="large"
                gradient
                warn
                animation-type="scale"
                to="/SearchUser"
            >
                Adicionar amigos
            </vs-button>
        </div>

        <div v-else class="container-chatlist">
            <div class="container-chats" :class="toogleChatsMenu ? 'hideMenu': 'showMenu' " v-if="chatItems.items !== '' ">

                <SearchPersonInput />

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


        <Loading />
    </div>
</template>

<script>
import Avatar from '../../../components/Avatar/Avatar'
import { mapActions, mapGetters } from 'vuex';
import ChatModal from '../../../components/cpmChatmodal';
import SearchPersonInput from '../../../components/SearchPersonInput/SearchPersonInput'

export default {
    components: { Avatar, ChatModal, SearchPersonInput },

    computed: {
        ...mapGetters({
            userData:'userData',
            chatId:'chatId',
            chatCreated:'chatCreated',
            toogleChatsMenu: 'toogleChatsMenu'
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
            getUserData: 'getUserData',
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
        },

        toogleChatsMenu(){
            console.log('chatlist', this.toogleChatsMenu)
        },

        chatCreated() {
            if(this.chatCreated) {
                this.listChatConections()
            }
        }
    }

}
</script>

<style lang="scss">
    .container-chatlist{
        display: flex;
        max-width: 100%;
        width: 100%;
    }

    .container-chats{
        display: block;
        position: absolute;
        z-index: 10;
        background: #ffc5c5;
        border-radius: 0px 10px 0px 0px;
        min-height: 95.8vh;

        /* @media screen and (max-width: 1700px) {
            min-height: 90.8vh;
        } */

        @media screen and (max-width: 600px) {
            min-height: 83vh;
        }

        .contact-message{
            display: block;
            margin-top: 20px;

            &:first-child {
                margin-top: 0px;
            }

            .container-contact-info{
                margin: 0px 15px 0px 5px;
                display: flex;
                max-width: 100%;
                width: 335px;
                background: #ffc5c5;
                padding: 10px;
                border: none;
                border-radius: 10px;

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
        width: 70%;
        margin-left: auto;
        margin-right: auto;
        @media screen and (max-width: 600px) {
            width: 100%;
        }
    }

    .select-contact-message {
        transition: 1s;
        background-color: #ff9f9f !important;
        border: 1px solid #ffffff !important;
        border-radius: 10px !important;
        box-shadow: -10px 6px 15px rgb(0 0 0 / 20%) !important;
    }

    .showMenu{
        display: block;
        animation: 1;
        animation-name: animation-toogle-menu-show;
        animation-duration: 1s;
        animation-timing-function: linear;
        transform: translateX(0);
    }

    @keyframes animation-toogle-menu-show{
        0% {
            transform: translateX(-500px);
            display: none;
            opacity: 0;
            }
        100%{
            transform: translateX(0);
            opacity: 1;
            display: block;
        }
    }

    .hideMenu {
        animation: 1;
        animation-name: animation-toogle-menu;
        animation-duration: 1s;
        animation-timing-function: linear;
        transform: translateX(-500px);
    }

    @keyframes animation-toogle-menu{
        0% {
            transform: translateX(0);
            display: block;
            opacity: 1;
         }
        100%{
            transform: translateX(-500px);
            opacity: 0;
            display: none;
         }
    }


</style>
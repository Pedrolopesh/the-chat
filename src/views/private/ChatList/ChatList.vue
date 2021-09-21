<template>
    <div>

        <div class="container-chatlist">
            <div class="container-chats" :class="toogleChatsMenu ? 'hideMenu': 'showMenu' " v-if="chatItems.items !== '' ">
                <SearchPersonInput :chatSelected="chatSelectedState" @inputSearchActive="changeChatSelectedState"/>
                <ChatsConections @setSelectedUser="setSelectedUserName"/>
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
import SearchPersonInput from '../../../components/SearchPersonInput/SearchPersonInput.vue';
import ChatsConections from '../../../components/ChatsConections/ChatsConections.vue';


export default {
    components: {
        Avatar, ChatModal,
        SearchPersonInput, ChatsConections
    },

    computed: {
        ...mapGetters({
            userData:'userData',
            chatId:'chatId',
            chatCreated:'chatCreated',
            savedChatConections:'savedChatConections',
            toogleChatsMenu: 'toogleChatsMenu'
        })
    },

    data:() => ({
        propsImageSrc: '',
        chatItems: '',
        selectedChatId: '',
        selectedUserName: '',
        chatSelectedState: false,
    }),

    methods: {
        ...mapActions({
            getUserData: 'getUserData',
            listChatConections: 'listChatConections',
        }),

        setSelectedUserName(selectedUserNameParam, selectedChatIdParam) {
            this.chatSelectedState = true
            this.selectedUserName = selectedUserNameParam
            this.selectedChatId = selectedChatIdParam
        },

        changeChatSelectedState() {
            this.chatSelectedState = false
        }
    },

    created() {},

    watch: {
        toogleChatsMenu(){},

        chatCreated() {
            if(this.chatCreated) {
                this.listChatConections()
            }
        },
        chatId() {
            if(this.chatId.success == true){
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
        height: 95.8vh;

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
            transform: translateX(-680px);
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
        transform: translateX(-680px);
    }

    @keyframes animation-toogle-menu{
        0% {
            transform: translateX(0);
            display: block;
            opacity: 1;
         }
        100%{
            transform: translateX(-680px);
            opacity: 0;
            display: none;
         }
    }


</style>
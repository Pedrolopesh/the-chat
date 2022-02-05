<template>
    <div>

        <div class="container-toolsbar">

            <div class="p5">
                <vs-button class="m0" gradient warn animation-type="scale" @click="toogleChatInfo()" style="min-width: 50px">
                    <BIconLayoutSidebarInsetReverse class="icon-size-15"/>
                </vs-button>
            </div>

            <!-- <div>
                <vs-button to="/ChatList" gradient style="min-width: 50px" color="rgb(59,222,200)" animation-type="scale">
                    <BIconPeopleFill class="icon-size-15"/>
                </vs-button>
            </div> -->
            <!--<div>
                TODO: FIX ERRORS AND TEST THE FUNCTION
                <vs-button @click="notificationConfig = !notificationConfig" gradient style="min-width: 50px" warn animation-type="scale">
                    <BIconBellFill class="icon-size-15"/>
                </vs-button>
            </div> -->

            <div class="p5">
                <vs-button class="m0" @click="configProfile = !configProfile" gradient style="min-width: 50px" animation-type="scale">
                    <BIconGearWideConnected class="icon-size-15"/>
                </vs-button>
            </div>

            <div class="p5">
                <vs-button class="m0" @click="newChat = !newChat" gradient style="min-width: 50px" animation-type="scale" success>
                    <BIconPlusCircleFill class="icon-size-15"/>
                </vs-button>
            </div>

            <div class="p5">
                <vs-button class="m0" danger animation-type="scale" @click="tryLogout" style="min-width: 50px">
                    <BIconPower class="icon-size-15"/>
                </vs-button>
            </div>

            <div class="container-logo ml-a">
                <span v-html="Svgs.logo" class="icon-header-toolbar center mr-2"></span>
                <span class="font-logo center">the chat </span>
            </div>
        </div>

        <!-- NOTIFICATIONS -->
        <vs-dialog prevent-close blur v-model="notificationConfig">
            <h4 class="not-margin">
                <b>Notificações</b>
            </h4>
            <div>
                <Notifications @closeNoficationsModal="closeModalNotifications"/>
            </div>
        </vs-dialog>
        <!-- NOTIFICATIONS -->

        <!-- ACCOUNT CONFIG -->
        <vs-dialog prevent-close blur v-model="configProfile">
            <h4 class="not-margin">
                Configurações de <b>Conta</b>
            </h4>
            <div>
                <ProfileConfigData />
            </div>
        </vs-dialog>
        <!-- ACCOUNT CONFIG -->

        <!-- NEW CHAT -->
        <vs-dialog prevent-close blur v-model="newChat">
            <h4 class="not-margin">
                Iniciar Nova <b>conversa</b>
            </h4>
            <div>
                <NewChatModal @selectedUser="changeButtonState" @closeNewChatModal="closeModalNewChat"/>
            </div>
        </vs-dialog>
        <!-- NEW CHAT -->

        <vs-dialog prevent-close blur v-model="configProfile">
            <h4 class="not-margin">
                Configurações de <b>conta</b>
            </h4>
            <div>
                <ProfileConfigData />
            </div>
        </vs-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Svgs from  '../../assets/svg'
import { BIconBellFill, BIconPeopleFill, BIconGearWideConnected, BIconPlusCircleFill, BIconLayoutSidebarInsetReverse } from 'bootstrap-vue';
import NewChatModal from '../NewChat/NewChat.vue'
import ProfileConfigData from '../ProfileConfigData/ProfileConfigData.vue'
import Notifications from '../Notifications/Notifications.vue'
export default {

    components:{
        Notifications,
        BIconBellFill, BIconPeopleFill,
        BIconGearWideConnected, BIconPlusCircleFill,
        NewChatModal, ProfileConfigData,
        BIconLayoutSidebarInsetReverse
    },

    computed: {
        ...mapGetters({
            newChatModal:'newChatModal',
            toogleChatsMenu: 'toogleChatsMenu'
        })
    },

    data:() => ({
        Svgs: Svgs,
        newChat: false,
        configProfile: false,
        addDisable: true,
        notificationConfig: false,
        toogleChatInfoState: false
    }),


    methods : {
        ...mapActions({
            changeToogleChatsMenu: 'changeToogleChatsMenu'
        }),

        changeButtonState(selectedParam) {
            if (selectedParam) this.addDisable = false
        },

        toogleChatInfo() {
            const currentPath = document.location.hash
            if(currentPath === '#/Introduction'){
                this.$router.push('/ChatList')
            }
            this.$store.commit('setToogleChatsMenu', !this.toogleChatInfoState)
            this.toogleChatInfoState = !this.toogleChatInfoState
        },

        openModalNewChat() {
            this.newChat = true;
        },

        closeModalNewChat() {
            this.newChat = false;
        },

        closeModalNotifications() {
            this.notificationConfig = false;
        },

        tryLogout(){
            this.$vs.notification({color: 'dark', position: 'top-center', title: 'Tchau tchau, nos vemos logo 🤩', })
            localStorage.removeItem('token');
            localStorage.removeItem('_id');
            this.$router.push('/Home')
        },
    },

    watch: {
        toogleChatsMenu(){
            console.log('toolbar', this.toogleChatsMenu)
        },
    }

}
</script>

<style lang="scss">
.container-toolsbar{
    display: flex;
    max-width: 100%;
    width: 100%;
    /* padding: 2px 0px 2px 0px; */
}

.container-logo{
    display: flex;
}

.icon-header-toolbar{
    display: block;
    width: 35px;
}

.center{
    margin: auto;
}

.submitValue{
    display: block;
    border: none;
    font-size: 13px;
    border-radius: 7px;
    color: white;
    padding: 10px;
    background-color: #ffbbbb;
}

.disableSubmit{
    background-color: #d6d6d6;
}

.enableSubmit{
    box-shadow: -10px 6px 15px rgb(0 0 0 / 20%) !important;
}
</style>
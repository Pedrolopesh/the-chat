<template>
    <div>
        <h1 class="mt-3">SUAS CONVERSAS</h1>

        <!-- <vs-button
            @click="openNotification">
            Open Notification
        </vs-button> -->
        <div>
            <ChatsConections :openChatProps="chatData"/>
        </div>


    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import ActiveChat from '../../components/ActiveChat';
import ChatsConections from '../../components/ChatsConections';

export default {
    components:{
        ActiveChat,
        ChatsConections
    },
    data:() => ({
        chatData:''
    }),
    methods:{
        openNotification(){
            this.$vs.notification({
                color: 'dark',
                position: 'bottom-rigth',
                title: 'Documentation Vuesax 4.0+',
                text: `These documents refer to the latest version of vuesax (4.0+),
                to see the documents of the previous versions you can do it here 👉 Vuesax3.x`
            })
        },

        checkRedirect(){
           
            let sessionChatId = JSON.parse(sessionStorage.getItem('chatId'))
            if(this.sessionChatId !='' && this.chatCreated){
                this.chatData = sessionChatId.doc._id
                this.$store.commit('setChatCreated', false)
            }
        }
    },

    computed:{
        ...mapGetters({
            chatId:'chatId',
            chatCreated:'chatCreated'
        })
    },

    created(){
        // this.redirect()
        // console.log("!@!@#$#%#%@#%#@%@#")
        // console.log(this.chatCreated)
        setTimeout(() => (this.checkRedirect()), 100)
    },

}
</script>

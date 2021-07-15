<template>
    <div id="app_p">

        <!-- <vs-alert class="global-alert-message" dark :progress="progress" v-show="active"> -->
        <ToolsBar/>
        <router-view/>

        <!-- <vs-button @click="active=true">
            Alerta ae
        </vs-button> -->
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import ToolBar from '../components/ToolBar';
import ToolsBar from '../components/ToolsBar/ToolsBar';
import notificationRecived from '../mixins/notifications';

export default {
    mixins: [notificationRecived],

    components:{
        ToolsBar, ToolBar
    },
    data:() => ({
        progress: 0,
        active: true,
        time: 6000,
        chatItems: []
    }),

    created(){
        this.listChatConections()
        this.getUserData()
    },

    computed: {

        onload(){
            this.listChatConections()
        },

        ...mapGetters({
            newMessage: 'newMessage',
            userData: 'userData',
        }),

    },

    methods: {
        ...mapActions({
            getUserData: 'getUserData',
            listChatConections: 'listChatConections',
        }),

        recivedMessage1(){
          this.recivedMessage()
        },
    },
    watch: {
        active(val) {
          if(val) {
            var interval = setInterval(() => {
              this.progress++
            }, this.time / 100);

            setTimeout(() => {
            //   this.active = false
              clearInterval(interval)
              this.progress = 0
            }, this.time);
          }
        },
        userData() {
            this.listChatConections()
        },

    }

}
</script>
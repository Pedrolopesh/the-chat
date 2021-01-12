<template>
    <div id="app_p">

        <!-- <vs-alert class="global-alert-message" dark :progress="progress" v-show="active"> -->
        <ToolBar/>
        <router-view/>

        <!-- <vs-button @click="active=true">
            Alerta ae
        </vs-button> -->
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import ToolBar from '../components/ToolBar';
import notificationRecived from '../mixins/notifications';

export default {
    mixins: [notificationRecived],

    components:{
        ToolBar
    },
    data:() => ({
        progress: 0,
        active: true,
        time: 6000,
    }),

    created(){
        this.getUserData()
    },

    computed: {

        ...mapGetters({
            
            newMessage: 'newMessage',

        }),

    },
    
    methods: {
        ...mapActions({
            getUserData: 'getUserData',
        }),

        recivedMessage1(){
          this.recivedMessage()
        }
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
        }
        
    }

}
</script>
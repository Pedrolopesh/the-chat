<template>
    <div id="app_p">

        <!-- <vs-alert class="global-alert-message" dark :progress="progress" v-show="active"> -->
        <vs-alert class="global-alert-message ac" danger :progress="progress" v-show="active">
            <template #title>
            Nova mensagem
            </template>
           Nova mensagem recebida
        </vs-alert>
        <ToolBar/>
        <router-view/>

        <!-- <vs-button @click="active=true">
            Alerta ae
        </vs-button> -->
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import ToolBar from '../components/ToolBar'
export default {
    components:{
        ToolBar
    },
    data:() => ({
        progress: 0,
        active: false,
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
            getUserData: 'getUserData'
        })
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
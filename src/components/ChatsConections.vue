<template>
  <div>
      <!-- {{ items }} -->
          
          
        <div class="ac">
            <!-- <p>usuário logado é essse: {{ userData.email }}</p> -->
            <p>Olá <strong> {{ userData.name }} </strong>, seja a seguir as suas conversas</p>
        </div>
    <div v-if="items == '' " class="ac">
          <div class="ac display-b container-alert" relief>
            <h1>
            Aviso!
            </h1>
            <h3 class="">Você não possui mensagens ainda, tente ir até a seção de usuários para iniciar uma nova conversa.</h3>
        </div>
    </div>
    
    <div v-if="!chatModalDialog && items != '' ">

        <div class="" v-for="(item ,index) in items" :key="index">
            <vs-button
                v-if="userData._id != item.user_response[0]._id"
                class="ac mt-2"
                size="large"
                gradient
                animation-type="scale"
                :active="active == 0"
                @click="openActiveChat(item)"
            >
                <BIconEnvelope class="icon-size-20"/>
                <span class="ml-2"> {{ item.user_response[0].name }} </span>
                <b-avatar 
                    v-if="item.user_response[0].img_profile != '' " 
                    class="ml-2" 
                    :src='item.user_response[0].img_profile'
                ></b-avatar>
                
                <template #animate >
                    Send message
                </template>
            </vs-button>

            <vs-button
                v-if="userData._id != item.user_origin[0]._id"
                class="ac mt-2"
                size="large"
                gradient
                animation-type="scale"
                :active="active == 1"
                @click="openActiveChat(item)"
            >
                <BIconEnvelope class="icon-size-20"/>
                <span class="ml-2"> {{ item.user_origin[0].name }} </span>
                <b-avatar 
                    v-if="item.user_origin[0].img_profile != '' "
                    class="ml-2" :src='item.user_origin[0].img_profile'
                ></b-avatar>
                
                <template #animate >
                    Send message 
                </template>
            </vs-button>

        </div>

      </div>

        <div v-if="chatModalDialog">
            <BIconArrowLeftCircle class="display-b mr-a ml-3 icon-back mb-3" @click="chatModalDialog = false"/>
            <ChatModal :chatId="propsChatData"/>
        </div>
        
            <!-- <vs-dialog prevent-close :loading="false" v-model="chatModalDialog">
                <ChatModal :chatId="propsChatData"/>
            </vs-dialog> -->

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ChatModal from './cpmChatmodal';
import { BIconEnvelope, BIconArrowLeftCircle } from 'bootstrap-vue';

export default {
    data:() =>({
        items:[],
        active: 0,
        propsChatData: '',
        chatModalDialog: false,
    }),

    components:{
        ChatModal,
        BIconEnvelope,
        BIconArrowLeftCircle
    },

    methods:{
        ...mapActions({
            getUserData: 'getUserData'
        }),

        listChatConections(){

            let userId = this.userData
            this.$http.get(this.prodUrl + `/chats/userid/${userId._id}`)
            .then(resp => {
                console.log("@#$%¨&*(*&¨%$#@")
                console.log(resp)
                this.items = resp.data
            })
            .catch(err => {
                console.log(err)
            })
        },

        async checkUserData(){
            if(this.userData != ''){
                this.listChatConections()
            }else{
                await this.getUserData()
            }
        },

        openActiveChat(param){
            console.log(param._id)
            this.propsChatData = param._id
            this.chatModalDialog = true
        }
    },
    created(){
        this.checkUserData()
    },
    computed: {
        ...mapGetters({
            prodUrl: 'prodUrl',
            userData:'userData'
        })
    },

    watch:{
        async userData(){
            if(this.userData != ''){
                this.listChatConections()
            }else{
                await this.getUserData()
            }
        }
    }
}
</script>

<style lang="scss">
    .container-alert{
        max-width: 70%;
        width: 100%;
    }

    .icon-back{
        font-size: 30px;
    }
</style>
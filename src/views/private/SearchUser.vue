<template>
    <div>
        <h1 class="mt-3">TODO OS USUÁRIOS DO APP</h1>
        <p>Olá <strong> {{ userData.name }} </strong>, veja a seguir todos os usuários que utilizam o nosso app</p>
        <div @click="createChat(item)" class="container-list-chats ac mt-5" v-for="(item, i) in items" :key='i'>
            <vs-button
                v-if="userData._id != item._id"
                class="display-b ac mt-2"
                size="large"
                gradient
                warn
                animation-type="scale"
            >

                <BIconEnvelope class="icon-size-20"/>
                <span class="ml-2">{{ item.name }} </span>
                <b-avatar class="ml-2" :src='item.img_profile'></b-avatar>
                
                <template #animate >
                    Send message 
                </template>

            </vs-button>
        </div>

    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { BIconEnvelope } from 'bootstrap-vue';
import dayjs from 'dayjs';

export default {
    data:() => ({
        userType:'',
        items:[],
        selectedChatId:'',
        chatModal:false,

    }),
    components:{
        BIconEnvelope
    },
    computed:{
        ...mapGetters({
            userData:'userData',
            apiLoading:'apiLoading',
            prodUrl:'prodUrl'
        })
    },
    methods:{
        getAllUsers(){
            this.$store.commit('setApiLoading', true)


            this.$http.get(this.prodUrl + '/list/users')
                .then(resp => {
                if(resp.data == ''){ this.$store.commit('setApiLoading', false)}
                else{ this.$store.commit('setApiLoading', false) }

                this.items = resp.data
                // setTimeout( () => {  this.checkDatas() }, 200);
            })
            .catch(err => {
                console.log(err)
            })

            let logedId = localStorage.getItem('id')

        },
        checkTypeUser(param){
            
            let logedId = localStorage.getItem('id')

            console.log("USUÁRIO LOGADO")
            console.log(logedId)
            console.log("USUÁRIO ORIGEM")
            console.log(param)
            
            for(let i in itens){
                console.log(i)
            }
            // console.log("USUÁRIO RESPOSTA")
            // console.log(param.user_response[0]._id)
            // console.log("aqui aqui aqui aqui")
            // console.log(param)

            if( logedId == param.user_origin[0]._id ){
                
                // console.log("User é origin")
                // console.log("IDS SÃO IGUAIS")
                // console.log(param.user_response[0])

                //se o usuário que está logado for o usuário origem, o usertype é response para que mostra as informações do user response.
                this.userType = 'user_response'
                // this.requestPreferences = true
                
                // this.items.push(param.user_response[0])

            }else{
                
                // console.log("User é response")
                // console.log("IDs diferentes")
                // this.items.push(param.user_origin[0])
                
                this.userType = 'user_origin'
                // this.requestPreferences = false
            
            }
        },
        createChat(param){
            console.log(param)
            var now = dayjs()
            let time = now.format("HH:mm")
            let date = now.format("DD/MM/YYYY")

            let chatData = [{ sender: "origin", message: "olá, mensagem enviada pela web", timestamp: date + '-' + time}]
            let body = {
                user_origin:this.userData._id,
                user_response:param._id,
                chatData:chatData
            }

            this.$http.post(this.prodUrl + '/create/chat', body)
            .then(resp =>{
                console.log(resp)
                if(resp.data.error == 'Alredy have a chat'){
                    console.log(resp.data.message._id)
                    this.$vs.notification({
                        color: 'danger',
                        position: 'top-center',
                        title: 'você já possui uma conversa com esse usuário. vá em conversas 😓',
                    })

                }
            })
            .catch(err => {
                console.log(err)
            })
            
            // this.selectedChatId = param._id

            // this.$store.commit("setSelectedChatData", param);
            
            // this.chatModal = true
            
        },
    },
    created(){
        this.getAllUsers()
    }
}
</script>
<style lang="scss">
    
</style>
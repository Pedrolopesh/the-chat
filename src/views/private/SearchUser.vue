<template>
    <div>
        <h1>conversas</h1>
        <br/>
        <br/>
        <!-- {{ items[0].user_origin }} -->
        <br/>
        <br/>
        <br/>
        <div @click="selectUser(item)" class="container-list-chats ac" v-for="(item, i) in items" :key='i'>
                <div v-if=" userType == 'user_response' ">
                    <!-- Informações do usuário response -->
                        <!-- {{ item.user_response[i].name }} -->

                    <div v-for="(item, i) in item.user_response" :key="i">

                    <vs-button
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

                <div v-else>
                    <div v-for="(item, i) in item.user_origin" :key="i">
                    {{ item.email}}
                    <vs-button
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
        </div>

    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { BIconEnvelope } from 'bootstrap-vue';

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
        checkAciveChats(){
            this.$store.commit('setApiLoading', true)

            // console.log(this.userData.chats)
            let logedId = localStorage.getItem('id')
            this.$http.get(this.prodUrl + `/user/${logedId}`).then(response => {
                
                let chats = response.data.chats
                for(let i in chats){
                    
                    let id = chats[i]
                    
                    this.$http.get(this.prodUrl + `/chat/messages/${id}`)
                    
                    .then(resp => {
                        if(resp.data == ''){
                            this.$store.commit('setApiLoading', false)

                        }else{
                            this.$store.commit('setApiLoading', false)

                        }
                        // console.log(resp.data)
                        this.items.push(resp.data)
                        // setTimeout( () => {  this.checkDatas() }, 200);
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
                this.checkTypeUser(this.items)
                // console.log("skadkpsadkposakdposkadpa")
                // console.log(this.items)
            })
            .catch(err => {
                console.log(err)
            })
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
        selectUser(param){
            
            this.selectedChatId = param._id

            // this.$store.commit("setSelectedChatData", param);
            
            this.chatModal = true
            
        },
    },
    created(){
        this.checkAciveChats()
    }
}
</script>
<style lang="scss">
    
</style>
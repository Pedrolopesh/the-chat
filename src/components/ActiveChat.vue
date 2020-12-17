<template>
    <div>
        {{ userData.name }}
        <br/>
        {{ userData.email }}
        <div class="container-person-icon ac">
            <vs-input 
                type="text" 
                icon-after 
                v-model="searchUser" 
                placeholder="Pesquisar por conversa"
                state="primary"
                primary
                class="input-outlined-primary ac"
            >
                <template #icon>
                    <BIconSearch/>
                </template>
            </vs-input>
            
        </div>
        <!-- {{ userData._id }} -->
        <div v-for="(item ,i) in items" :key="i">
                <vs-button
                    v-if="userData._id != item._id"
                    :active="active == i"
                    @click="createChat(item, i)"
                    border
                    class="ac d-block"
                    color="danger"
                    shadow
                >
                    <div v-if="!items[i].img_profile">
                        <BIconPersonCircle class="avatar-icon-size"/>
                    </div>

                    <vs-avatar
                        v-if="items[i].img_profile"
                        class="cp" 
                        size="70" 
                        badge
                        badge-color="danger" 
                        badge-position="top-right"
                    >
                        <img v-if="items[i].img_profile != '' " :src="items[i].img_profile" alt="avatar">
                        <template #badge>
                            28
                        </template>
                    </vs-avatar>

            

                    <h5 class="ml-3">{{ items[i].name }}</h5>

                </vs-button>
        </div>


            {{ chatModalDialog }}

            <vs-dialog prevent-close :loading="false" v-model="chatModalDialog">
                <ChatModal :chatId="propsChatData"/>
            </vs-dialog>

    </div>
</template>
<script>
import { BIconPersonPlus, BIconSearch, BIconPersonCircle } from 'bootstrap-vue';
// import ChatModal from './ChatModal';
import ChatModal from './cpmChatmodal';
import { mapGetters } from "vuex"

export default {
    data:() => ({
        active: '',
        searchUser: '',
        items:'',
        propsChatData:'',

        chatModalDialog: false
    }),
    components:{
        ChatModal,
        BIconPersonPlus,
        BIconSearch,
        BIconPersonCircle
    },

    methods:{
        createChat(param, activeItem){
            this.active = activeItem

            // console.log("User respnse: " + param._id)
            // console.log("User respnse name: " + param.name)
            // console.log("\n")
            // console.log("User origin: " + this.userData._id)
            // console.log("User origin: " + this.userData.name)

            let user_origin = this.userData._id
            let user_response = param._id

            let body = {
                user_origin:user_origin,
                user_response:user_response,
                chatData:[
                    {
                        sender: "origin",
                        message: "olá, " + param.name,
                        timestamp:"19:51 29/07/2020"
                    }
                ]
            }
            // console.log(body)
            this.$http.post(this.prodUrl + '/create/chat', body)
            .then(resp => { 
                // console.log(resp)

                if(resp.data.success == true){
                    this.chatModalDialog = true
                    this.propsChatData = resp.data.doc._id

                }else if(resp.error = "Alredy have a chat"){
                    this.chatModalDialog = true
                    this.propsChatData = resp.data.message._id
                }

            })
            .catch((err) => {
                console.log(err)
            })
    
        },

        
        listUsers(){
            this.$http.get(this.prodUrl + '/list/users')
            .then(resp => {
                console.log(resp)
                this.items = resp.data
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created(){
        this.listUsers()
    },

    computed: {
        ...mapGetters({
            prodUrl: 'prodUrl',
            userData:'userData'
        })
    },
}
</script>
<style lang="scss">
    .color-button{
        background-color: orange;
    }
    .container-person-icon{
        display: flex;
        max-width: 30%;
        width: 100%;
        @media screen  and( max-width: 700px){
            max-width: 100%;
        }
        .personAdd-icon{
            font-size: 50px;
        }
    }
    .avatar-icon-size{
        width: 70px;
        height: 70px;
    }
</style>

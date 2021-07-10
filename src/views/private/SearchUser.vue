<template>
    <div>
        <h2 class="mt-3 mb-4">TODO OS USUÁRIOS DO APP</h2>
        <h3>Olá <strong> {{ userData.name }} </strong>, veja a seguir todos os usuários que utilizam o nosso app</h3>
        <div v-if="items == '' " class="mt-6">
            <h5>ainda não há usuários cadastrados 😕, compartilhe o app com seus amigos.</h5>
        </div>


        <div class="container-card-users">
            <div @click="createChat(item)" v-for="(item, i) in items" :key='i' class="ac">
                <CardUser
                    :img_src=item.img_profile
                    :imageTitle="item.name"
                    v-if="userData._id != item._id"
                />
            </div>

            <!-- <vs-button
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
                    Enviar Mensagem
                </template>

            </vs-button> -->
        </div>

    </div>
</template>
<script>
import CardUser from '../../components/CardUsers/CardUsers'
import { mapGetters } from 'vuex';
import { BIconEnvelope } from 'bootstrap-vue';
import dayjs from 'dayjs';

export default {
    components:{
        BIconEnvelope,
        CardUser
    },

    data:() => ({
        userType:'',
        items:[],
        selectedChatId:'',
        chatModal:false,

    }),
    computed:{
        ...mapGetters({
            userData:'userData',
            apiLoading:'apiLoading',
            prodUrl:'prodUrl'
        })
    },
    methods:{
        async getAllUsers(){
            this.$store.commit('setApiLoading', true)
            const resp = await this.$http.get(this.prodUrl + '/list/users').catch(err => { console.log(err) })
            if(resp.data == ''){ this.$store.commit('setApiLoading', false)}
            else{ this.$store.commit('setApiLoading', false) }
            this.rebuildUsersArray(resp.data)
        },
        rebuildUsersArray(allUsers) {
            const filterArray = allUsers.filter((item) => {
                return item._id !== this.userData._id
            })
            this.items = filterArray
        },
        createChat(param){
            console.log(param)
            var now = dayjs()
            let time = now.format("HH:mm")
            let date = now.format("DD/MM/YYYY")

            let chatData = [{ sender: "origin", message: "olá", timestamp: date + '-' + time}]
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
                }else{
                    console.log(resp.data)
                    sessionStorage.setItem('chatId', JSON.stringify(resp.data));
                    this.$store.commit('setChatCreated', true)
                    this.$store.commit('setChatId', resp.data)
                    this.$router.push('/ChatList')

                }
            })
            .catch(err => {
                console.log(err)
            })
        },
    },
    created(){
        this.getAllUsers()
    }
}
</script>
<style lang="scss">
    .container-card-users {
        flex-wrap: wrap;
        max-width: 100%;
        width: 100%;
        display: flex;
    }
</style>
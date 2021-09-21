<template>
    <div>

        <div>

        <div class="ac chat-container">
          {{ reciverUserName.name }}
            <!-- <perfect-scrollbar> -->
          <div id="container-chat" v-if="chatMessages != ''" class="chat-content">
            {{ checkOriginUser() }}

            <div v-for="(messageObj, i) in chatMessages" :key="i" class="">
              <div class="message-block">
                <div v-if="messageObj.sender == 'origin'">
                    <div
                      class="container-message p10"
                      :class="[userData.name == chatOrigin.user_origin.name ?'flex-reverse' : '']"
                      >
                        <div v-if="chatOrigin.user_origin.img_profile != '' ">
                          <b-avatar :src='chatOrigin.user_origin.img_profile' class="mr-a display-b mt-3"></b-avatar>
                        </div>
                      <!-- <span class="display-b alg-txt-s"> <strong>Usuário:</strong> {{ chatOrigin.user_origin.name }} </span> -->
                      <span class="display-b alg-txt-s chip-pink ml-2 mr-2 mt-3"> {{ messageObj.message }} </span>
                    </div>

                </div>

                <div v-else>
                  <div
                    class="container-message p10"
                    :class="[userData.name == chatResponder.user_response.name ?'flex-reverse' : 'ue']"
                  >
                  <!-- {{ userData._id }} -->
                  <!-- {{ chatOrigin.user_response._id }} -->

                  <div v-if="chatResponder.user_response.img_profile != '' ">
                    <b-avatar :src='chatResponder.user_response.img_profile' class="mr-a display-b mt-3"></b-avatar>
                  </div>
                  <span class="display-b alg-txt-s chip-pink ml-2 mr-2 mt-3">{{ messageObj.message }} </span>

                  <!-- <span class="display-b alg-txt-s"> <strong>Usuário:</strong> {{ chatResponder.user_response.name }} </span> -->
                  <!-- <small class="display-b alg-txt-s">{{ messageObj.timestamp }}</small> -->
                  </div>
                </div>

                <span v-if="i + 1 == chatMessages.length">
                  <!-- here we call the function if it is the last item of the array,
                  the problem is...this item is always here, so it would render anytime there was ANY update on the page...and we dont want that..
                  so.... -->
                    {{testFunction()}}
                </span>


              </div>
          </div>
          <span id="lastSendedMessage"></span>

          </div>
            <!-- </perfect-scrollbar> -->
            <div class="text-box-chat">
              <div class="d-flex">
                  <textarea @keyup="checkEnterKey" class="text-input-chat" v-model="newMessage"/>
                  <vs-button :loading="newMessageLoading" type="submit" :disabled="newMessage ? false : true">
                    <BIconCursor @click="createMessage()" class="cp send-message-icon"/>
                  </vs-button>
              </div>
            </div>

          </div>

      </div>


      </div>
</template>
<script>
import {
  mapGetters, mapActions
} from 'vuex';
// import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import dayjs from 'dayjs';
import notificationRecived from '../mixins/notifications';

export default {
  mixins: [notificationRecived],
  props:['chatId', 'reciverUserName'],

    comments:{
      // PerfectScrollbar
    },

    data:() => ({
      // socket: io('http://localhost:3333/'),
      socket: io('https://the-chat-api.herokuapp.com/'),
        messagens:[
          {sendedName:'Fernanda', SendedMessage:'olá pedro, esse vai ser o nosso chat', sendedTimestamp:'08:00'},
        ],

        stringTest:'',
        newMessage:'',

        userType:'',

        newSocketMessage:[],

        chatMessages:[],
        chatOrigin: {},
        chatResponder: {},

        contentScrolled: false,
        newMessageLoading: false,
        // we se a variable to decide if we want to call the last message function or not

    }),
    computed: {
      ...mapGetters({
          userData: 'userData',
          chatById: 'chatById',
          selectedChatData: 'selectedChatData',
          prodUrl: 'prodUrl',
        }),
    },


    updated(){
      // alert('testeeeee ahhhhhh ahh')
    },

    created() {
        this.loadChatById()
        let vm = this;
        this.socket.on('connection', (socket) => {
          console.log('User conected on socket')
        })

        this.socket.on('messageRecived', function(message) {
          vm.newSocketMessage.push(message)
        })

    },

    methods: {
      emitReciveMessage(){
        this.recivedMessage()
      },
      testFunction(){
        if(!this.contentScrolled){
          // alert('ha, go go power rangers')
          this.scrollToLastMessage();
          this.contentScrolled = true;
          //  I et it to true right after calling the scroll to mesage function (so it will only run again IF we set it to alse with a new request)
        }
      },
      ...mapActions({
        changeChatById: 'changeChatById',
      }),

      async loadChatById(){
        // alert('chat id is' + this.chatId)
        // let chatData = await this.changeChatById(this.chatId);
        // console.log(chatData)
        this.$http.get(this.prodUrl + `/chat/messages/${this.chatId}`)
        .then(response => {
          let resp = response.data;

            this.chatCreator = resp.user_response

            let newOriginOBJ = {
              chat_data: resp.user_response,
              user_origin: resp.user_origin[0]
            }
            this.chatOrigin = newOriginOBJ;

            let newResponderOBJ = {
              chat_data: resp.user_response,
              user_response: resp.user_response[0]
            }
            this.chatResponder = newResponderOBJ

            this.chatMessages = resp.chatData;
            this.contentScrolled = false;
            //I eser the variable to false right after I call the get function to re dender the chat
          // this.selectedChatData = response.data

        })
        .catch(err => {
          console.log(err)
              this.$vs.notification({
                  color: 'red',
                  position: 'top-center',
                  title: 'ops! algo deu errado.',
              })
        })
      // this.scrollToLastMessage()

      },


      checkTypeUser(){
        let logedId = localStorage.getItem('id')

        if(logedId == this.chatCreator[0]._id){
          this.userType = "response"

        }else{
          this.userType = "origin"

        }
      },

      createMessage(){
        this.newMessageLoading = true
        if(this.newMessage == ''){
          this.$vs.notification({
            color: 'danger',
              position: 'top-center',
              title: 'ops! algo deu errado, parece que não há nada digitado 😋',
          })
          this.newMessageLoading = false
        }else{

        this.checkTypeUser()

            // var today = new Date();
            var now = dayjs()
            let time = now.format("HH:mm")
            let date = now.format("DD/MM/YYYY")

            let body = {
              chat_id:this.chatId,

                chatData: {
                  sender: this.userType,
                  message: this.newMessage,
                  timestamp: date + '-' + time
                }
            }
          this.socket.emit('sendMessage', body.chatData);


          this.$http.put(this.prodUrl + '/send/message', body)
          .then(resp => {
            if(resp.status == 200){
              this.newMessage = ''
              setTimeout( () => { this.loadChatById() }, 500);
              this.newMessageLoading = false
            }else{
              this.newMessageLoading = false
              alert('erro ao manda mensagem')

            }

          })

          .catch(err => {
            console.log(err)
                this.$vs.notification({
                  color: 'danger',
                    position: 'top-center',
                    title: 'ops! algo deu errado.',
                })
          })

        }
      },


      listenMessages(){
        let socket = this.socket
        this.socket.on('messageRecived', function(message) {
          this.originUserMessage.push(param)
        })
      },

      rendermessage(param){
        this.originUserMessage.push(param)
      },

      renderchatMessages(){
        this.chatMessages.push(this.selectedChatData)
      },

      scrollToLastMessage(){
        this.$nextTick(() => {
          // here we use "$nextTick so it will only excecute the content of this function on the next rander ..meaning ,the next render after our request (on v -for_)"
          let scrollContainer = document.querySelector('#container-chat')
          scrollContainer.scrollTop = scrollContainer.scrollHeight;

        })
      },

      checkEnterKey(e) {
        if(e.which == 13){
          this.createMessage()
        }
      },

      checkOriginUser(){
        // console.info(this.chatOrigin)
        // console.info(this.userData)
      }

      // formatMessage(){
      //   let newString = "aouttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt"
      //   // newString.replace(/(.{80})/g, "$1<br>")
      //   newString.split(/,/g, ',<br>')

      //   console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      //   console.log(newString)
      //   this.stringTest =  newString
      //   // newString.split("\n")
      //   // newString.join(' </br> ')

      // }
    },

    watch:{
      newSocketMessage(){
        this.emitReciveMessage()
        setTimeout(() => (this.loadChatById()), 2000)
      },

      chatId(){
        this.loadChatById()
      },
    }
}
</script>
<style lang="scss">
  .container-message{
    align-items: center;
    display: flex;
  }

  .flex-reverse{
    flex-direction: row-reverse;
  }
</style>
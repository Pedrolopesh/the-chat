<template>
  <div>
    <div class="center">
      
      <vs-button size="large" class="ac mt-2 home-button-size" color="rgb(59,222,200)" @click="showSignupDialog=!showSignupDialog">
        Signin
      </vs-button>


      <vs-dialog prevent-close :loading="apiLoading" v-model="showSignupDialog">
        
        <template #header>
          <h4 class="not-margin">
            Bem vindo ao<b class="font-modal-logo"> the chat</b>
          </h4>
        </template>

        <div class="con-form">

            <vs-input 
                class="input-outlined-primary" 
                v-model="userData.email" 
                label-placeholder="Email"
                primary
                state="primary"
            >
                <template #icon>
                @
                </template>
            </vs-input>

            <vs-input
                type="password"
                class="mt-3 input-outlined"
                v-model="userData.password"
                label-placeholder="Senha"
                :visiblePassword="hasVisiblePassword"
                icon-after
                autocapitalize="none"
                primary
                state="primary"
                @click-icon="hasVisiblePassword = !hasVisiblePassword"
            >

                <template #icon>
                    <BIconEyeSlash v-if="!hasVisiblePassword"/>
                    <BIconEye v-else />
                </template>

                <div class="height-alert">
                    <span v-if="ConfirmPasswordInputState == 'danger' " class="clr-red">Senha ou email incorretos</span>
                </div>

            </vs-input>


            
          <div class="flex">
            <p class="alg-txt-s mb-0 mt-3">Savar Login?</p>
            <vs-switch class="switch-color" v-model="saveLoginState" />
          </div>
          
          <div class="flex">

            <!-- <a href="#">Forgot Password?</a> -->
          </div>
        </div>

        <template #footer>
          <div class="footer-dialog">
            <vs-button block @click="trySignin">
              Sign In
            </vs-button>

            <a class="mt-3" href="#">Esqueceu sua senha?</a>

            <div class="new">
              Novo aqui? <a href="#">Crie sua conta</a>
            </div>
          </div>
        </template>

      </vs-dialog>

    </div>
  </div>
</template>
<script>
import { BIconEye, BIconEyeSlash, BIconParagraph} from 'bootstrap-vue';
import { mapGetters, mapActions } from "vuex";

export default {
  components:{
    BIconEye,
    BIconEyeSlash,
    BIconParagraph
  },
  data:() => ({
    showSignupDialog: false,
    saveLogin:false,
    value: '',
    hasVisiblePassword: false,
    
    saveLoginState:false,

    ConfirmPasswordInputState: 'primary',
    passwordProgress: 0,

    userData:{
      email:'',
      password:'123123'
    }
  }),

  methods:{
    ...mapActions({
      customAlert: 'alertsVuex/customAlert',
    }),

    trySignin(){
      this.$store.commit('setApiLoading', true)
      this.$http.post(this.prodUrl + '/login', this.userData)

      .then(resp => {

        if(resp.data.success == true){

          this.$vs.notification({
              color: 'dark',
              position: 'top-center',
              title: 'Sucesso ao entrar, bem vindo de volta 🙌🏾',
          })

          localStorage.setItem('token', resp.data.token)
          localStorage.setItem('id', resp.data.user_id)

          let userData = {
            token: resp.data.token,
            _id:resp.data.user_id
          }

          this.$store.commit('setUserData', userData)
          this.$store.commit('setApiLoading', false)

          this.showSignupDialog = false

          this.$router.push('/ChatList')


          this.checkSavedUser()
        }
      })
      .catch(err => {

        console.log(err)
        this.$store.commit('setApiLoading', true)

      })
    },

      // openNotification(param){
      //   console.log(param)
      //     this.$vs.notification({
      //         color: 'dark',
      //         position: 'bottom-rigth',
      //         title: 'Documentation Vuesax 4.0+',
      //         text: `These documents refer to the latest version of vuesax (4.0+),
      //         to see the documents of the previous versions you can do it here 👉 Vuesax3.x`
      //     })
      // },

    checkSavedUser(){
      if(this.saveLoginState == true){
        let email = {
          saveLoginState: true,
          email: this.userData.email
        }
        localStorage.setItem('savedLogin', JSON.stringify(email));

      }else{
        localStorage.removeItem('savedLogin');
      }
    },

    checkSavedLogin(){
      let savedParam = JSON.parse(localStorage.getItem('savedLogin'))
      console.log(savedParam)
      if(savedParam){
        this.saveLoginState = savedParam.saveLoginState
        this.userData.email = savedParam.email
      }
    }
  },

  created(){
    this.checkSavedLogin()
  },

  computed: {
    
    ...mapGetters({
      prodUrl: 'prodUrl',
      apiLoading:'apiLoading',
    })

  },

  watch:{

  }
}
</script>
<style lang="scss">
  .input-outlined{
      input{
          border: 0.3px solid #195bff;
          // border: 0.3px solid #2fb2a0;
      }
  }
 .height-alert{
    min-height: 27px;
  }

  .switch-color{
    background-color: #a4d0ff;

    &:hover{
      background-color:#a4d0ff;
    }
  }
</style>
<template>
  <div>
    <div class="center">

      <vs-button size="large" class="ac mt-2 home-button-size" color="rgb(199, 96, 44)" @click="showSigninDialog=!showSigninDialog">
        Signin
      </vs-button>


      <vs-dialog prevent-close :loading="apiLoading" v-model="showSigninDialog">

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

            <a class="mt-3" @click="requestUpdatePassword()" >Esqueceu sua senha?</a>

            <div class="new">
              Novo aqui? <a @click="goToSignup()" >Crie sua conta</a>
            </div>
          </div>
        </template>

      </vs-dialog>

      <vs-dialog prevent-close :loading="apiLoading" v-model="showRecoveryDialog">
        <template #header>
          <h4 class="not-margin">
            Preencha com email
          </h4>
        </template>
      
        <vs-input
          class="input-outlined-primary"
          v-model="userRecoveryemail"
          label-placeholder="Email"
          primary
          state="primary"
        >
          <template #icon>
          @
          </template>
        </vs-input>

        <div class="d-flex">
          <vs-button class="ml-a" flat @click="showRecoveryDialog = false" > cancelar </vs-button>
          <vs-button class="mr-a" :disabled="!userRecoveryemail" @click="requestRecoveryPass()" :loading="apiLoading"> continuar </vs-button>
        </div>

      </vs-dialog>

      <vs-dialog prevent-close :loading="apiLoading" v-model="showCodeDialog">
        <template #header>
          <h4 class="not-margin">
            Preencha com o <strong>PIN</strong>
          </h4>
        </template>
      
        <vs-input
          class="input-outlined-primary"
          v-model="userRecoveryCode"
          label-placeholder="pin"
          primary
          state="primary"
        >
          <template #icon>
          @
          </template>
        </vs-input>

        <div class="d-flex">
          <vs-button class="ml-a" flat @click="showRecoveryDialog = false" > cancelar </vs-button>
          <vs-button class="mr-a" :disabled="!userRecoveryemail" @click="requestConfirmRecoveryPass()" :loading="apiLoading"> continuar </vs-button>
        </div>

      </vs-dialog>


    </div>
  </div>
</template>
<script>
import { BIconEye, BIconEyeSlash, BIconParagraph } from 'bootstrap-vue';
import { mapGetters, mapActions } from "vuex";

export default {
  components:{
    BIconEye,
    BIconEyeSlash,
    BIconParagraph
  },
  data:() => ({
    showSigninDialog: false,
    showRecoveryDialog: false,
    saveLogin:false,
    value: '',
    hasVisiblePassword: false,
    
    showCodeDialog: false,
    saveLoginState:false,

    ConfirmPasswordInputState: 'primary',
    passwordProgress: 0,
    userRecoveryemail:'',
    userRecoveryCode:'',

    userData:{
      email:'',
      password:''
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

          this.showSigninDialog = false

          this.checkSavedUser()
        }
      })
      .catch(err => {

        console.log(err)

            this.$vs.notification({
              color: 'danger',
              position: 'top-center',
              title: 'erro ao entrar, login ou senha invalidos',
          })
        this.$store.commit('setApiLoading', false)

      })
    },

    goToSignup(){
      // signupOption()
      this.$store.commit('setSinupOptionFromSignin', true)
      this.showSigninDialog = false;
    },

    checkSavedUser(){
      // console.log(this.saveLoginState)
      if(this.saveLoginState == true){
        let email = {
          saveLoginState: true,
          email: this.userData.email
        }
        localStorage.setItem('savedLogin', JSON.stringify(email));

      }else{
        localStorage.removeItem('savedLogin');
      }

      this.$router.push('/ChatList')
    },

    checkSavedLogin(){
      let savedParam = JSON.parse(localStorage.getItem('savedLogin'))
      if(savedParam){
        this.saveLoginState = savedParam.saveLoginState
        this.userData.email = savedParam.email
      }
    },

    requestUpdatePassword(){
      this.showSigninDialog = false
      this.showRecoveryDialog = true
    },

    async requestRecoveryPass() {
      this.$store.commit('setApiLoading', true)
      const body = {
        email:this.userRecoveryemail
      }

      const requestRecoveryAPI = await this.$http.post(this.$url+'/forgot/pass', body).catch(err => { console.log(err) })
      if(requestRecoveryAPI.status === 200 && requestRecoveryAPI.data.success === true){
        this.$store.commit('setApiLoading', false)
        localStorage.setItem('recoveryEmailSelected', this.userRecoveryemail)
        this.$vs.notification({ color: 'dark', position: 'top-center', title: 'Emial de recuperação de senha foi enviado!', })
        this.showRecoveryDialog = false
        this.showCodeDialog = true
      }else{
        this.$store.commit('setApiLoading', false)
        this.$vs.notification({ color: 'danger', position: 'top-center', title: 'Ops! Algo deu errado, tente novamente', })
      }
    },

    async requestConfirmRecoveryPass(){
      this.$store.commit('setApiLoading', true)
        const body = {
          email:this.userRecoveryemail,
          code: this.userRecoveryCode
        }

        const confirmRecovery = await this.$http.post(this.$url+'/confirm/recovery/code', body).catch(err => { console.log(err) })
        if(confirmRecovery.status === 200 && confirmRecovery.data.success === true){
          this.$store.commit('setApiLoading', false)
          this.$vs.notification({ color: 'dark', position: 'top-center', title: 'Escolha sua nova senha', })
          localStorage.setItem('savedStep', 'password_selection')
          this.$router.push(`/recovery/password/${this.userRecoveryCode}`)
        
        }else{
          this.$store.commit('setApiLoading', false)
          this.$vs.notification({ color: 'danger', position: 'top-center', title: 'Ops! Algo deu errado, tente novamente', })
        }

    },
  },

  created(){
    this.checkSavedLogin()
  },

  computed: {
    
    ...mapGetters({
      prodUrl: 'prodUrl',
      apiLoading:'apiLoading',
      signinOptionFromSinup: 'signinOptionFromSinup'
    })

  },

  watch:{
    signinOptionFromSinup(){
      if(this.signinOptionFromSinup){
        this.showSigninDialog = true
      }
    },

    showSigninDialog() {
      if(!this.showSigninDialog) {
        this.$store.commit('setSigninOptionFromSinup', false)
      }
    }
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
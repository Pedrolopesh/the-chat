<template>
  <div>
    <div class="center">
      
      <vs-button size="large" class="ac home-button-size" danger @click="showSignupDialog=!showSignupDialog">
        Cadastre-se
      </vs-button>

      <vs-dialog :loading="apiLoading" prevent-close v-model="showSignupDialog">
        <div v-if="!imageProfileOption">

        <template>
          <h4 class="not-margin">
            Bem vindo ao<b class="font-modal-logo"> the chat</b>
          </h4>
        </template>

        <div class="con-form">
          <vs-input 
            class="input-outlined-primary mt-3" 
            v-model="userData.name"
            label-placeholder="Nome"
            primary
            state="primary"
          >
            <template #icon>
              <BIconParagraph/>
            </template>
          </vs-input>

          <vs-input 
            v-model="userData.email"
            autocapitalize="none"
            label-placeholder="Email"
            class="mt-3"
            :class="emailInput"
            :color="emailInputState"
            primary
            :state="emailInputState"
          >
            <template #icon>
              @
            </template>
          </vs-input>

          <vs-input
            type="password"
            class="mt-3 input-outlined-primary"
            v-model="userData.password"
            label-placeholder="Senha"
            :visiblePassword="hasVisiblePassword"
            icon-after
            primary
            state="primary"
            @keyup="checkPasswordMatch"
            @click-icon="hasVisiblePassword = !hasVisiblePassword">

            <template #icon>
              <BIconEyeSlash v-if="!hasVisiblePassword"/>
              <BIconEye v-else />
            </template>

          </vs-input>

          <vs-input
            type="password"
            class="mt-3"
            :class="ConfirmPasswordInput"
            :color="ConfirmPasswordInput"
            v-model="ConfirmPassword"
            label-placeholder="Confirmação de senha"
            :visiblePassword="hasVisiblePassword"
            icon-after
            primary
            :state="ConfirmPasswordInputState"
            :error="true"
            @keyup="checkPasswordMatch"
            @click-icon="hasVisiblePassword = !hasVisiblePassword">

            <template #icon>
              <BIconEyeSlash v-if="!hasVisiblePassword"/>
              <BIconEye v-else />
            </template>

          </vs-input>

          <div class="height-alert">
            <span v-if="ConfirmPasswordInputState == 'danger' " class="clr-red">Senhas não são iguais, verifique os campos</span>
          </div>


        </div>

        <template>
          <div class="footer-dialog">
            <vs-button
              block 
              @click="trySignup"
            >
              Cadastre-se
            </vs-button>

            <vs-button
              class="mt-1"
              block 
              @click="imageProfileOption = true"
            >
              Escolher avatar
            </vs-button>

            <div class="new">
              Já possui uma conta? <a href="#">faça seu login</a>
            </div>
          </div>
        </template>
        
        </div>

        <div v-else>
          <ChooseAvatar />
        </div>

      </vs-dialog>



    </div>
  </div>
</template>
<script>
import { BIconEye, BIconEyeSlash, BIconParagraph} from 'bootstrap-vue';
import { mapActions, mapGetters } from "vuex";
import ChooseAvatar from './ChooseAvatar'

export default {
  components:{
    BIconEye,
    ChooseAvatar,
    BIconEyeSlash,
    BIconParagraph
  },
  data:() => ({
    showSignupDialog: false,
    saveLoginState:false,
    ConfirmPassword:'',
    value: '',
    hasVisiblePassword: false,
    imageProfileOption: false,

    ConfirmPasswordInput:'input-outlined-primary',
    ConfirmPasswordInputState:'primary',

    emailInput:'input-outlined-primary',
    emailInputState:'primary',

    userData:{
      name:'',
      email:'',
      password:''
    }
  }),
  methods:{
    ...mapActions({
      darkAlert: 'alerts/darkAlert',
    }),

    checkPasswordMatch(){
      if(this.userData.password != this.ConfirmPassword){
        this.ConfirmPasswordInput = 'input-outlined-red'
        this.ConfirmPasswordInputState = 'danger'
      }else{
        this.ConfirmPasswordInput = 'input-outlined-primary'
        this.ConfirmPasswordInputState = 'primary'
      }
    },

    saveLogin(){

    },

    trySignup(){
      this.$store.commit('setApiLoading', true)
      this.$http.post(this.prodUrl + '/signup', this.userData)
      .then(resp =>{
        console.log(resp)
        if(resp.data.success == true && resp.data.message != "User Alredy exist"){
          console.log("sucesso")
          
          this.$vs.notification({
            color: 'success',
              position: 'top-center',
              title: 'Sucesso ao se registrar 🗯',
          })
          localStorage.setItem('token', resp.data.token)
          localStorage.setItem('id', resp.data._id)

          this.$store.commit('setApiLoading', false)
          this.imageProfileOption = true
        
        }else if(resp.data.success == false && resp.data.message == "User Alredy exist"){
          console.log("erro")
          this.emailInput = 'input-outlined-red'
          this.emailInputState = 'danger'
          this.$vs.notification({
            color: 'danger',
            position: 'top-center',
            title: 'Email já existe, tente fazer login 😌',
          })

        }
        this.$store.commit('setApiLoading', false)
      })
      .catch(err => {
        console.log(err)
        this.$store.commit('setApiLoading', false)
      })
    }
  },

  computed: {
    getProgress() {
      let progress = 0

      // at least one number

      if (/\d/.test(this.value)) {
        progress += 20
      }

      // at least one capital letter

      if (/(.*[A-Z].*)/.test(this.value)) {
        progress += 20
      }

      // at menons a lowercase

      if (/(.*[a-z].*)/.test(this.value)) {
        progress += 20
      }

      // more than 5 digits

      if (this.value.length >= 6) {
        progress += 20
      }

      // at least one special character

      if (/[^A-Za-z0-9]/.test(this.value)) {
        progress += 20
      }

      return progress
    },

    ...mapGetters({
      prodUrl: 'prodUrl',
      apiLoading:'apiLoading',

    })
  },

  created(){

  },

  watch:{
    saveLoginState(val){
      console.log("teste teste teste")
      // if(this.saveLoginState){
      //   let email = this.userData.email
      //   localStorage.setItem('savedEmail', JSON.stringify(email));
      // }
    }
  }
}
</script>
<style lang="scss">
  .height-alert{
    min-height: 27px;
  }

  .switch-color{
    background-color: #a4d0ff;

    &:hover{
      background-color:#a4d0ff;
    }
  }

  .font-modal-logo{
    font-size: 30px !important;
    color: #195bff;
    font-family: 'Bungee Shade', cursive;
  }
</style>
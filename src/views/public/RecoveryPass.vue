<template>
  <div class="home mt-7">

    <div>
      <span v-html="Svgs.logo" class="home-icon ac"></span>
      <h1 class="font-logo font-size-logo mt-3">The Chat</h1>
    </div>

    <div v-if="step === 'code_selection'" class="container-card-recory">
        <div class="card ac mt-5">
            <p class="title-recovery">Insira o código de segurança</p>
            <hr>
            <p>Verifique se você recebeu um email contendo seu código. Seu código tem 6 números.</p>

            <input class="codeInput" type="text" name="" v-model="codeInput">
            <div class="display-info-email-sent mt-3">
                Enviamos seu código para:
                <strong>{{ emailSented }}</strong>
            </div>
            <hr>

            <div class="container-button-recovery">
                <vs-button class="btn-recovery ml-a" flat to="/"> cancelar </vs-button>
                <vs-button class="btn-recovery mr-a" :disabled="!codeInput" @click="confirmRecoveryPass()" :loading="apiLoading"> continuar </vs-button>
            </div>

            <a @click="resendCode()" class="mt-3 d-block"> não recebeu nenhum código ? </a>
        </div>
    </div>

    <div v-else-if="step === 'password_selection'" class="container-pass-recory ac">
        
            <div class="container-inputs ac">

                <vs-input
                    type="password"
                    class="mt-3 input-outlined"
                    v-model="newUserPassword"
                    label-placeholder="Nova Senha"
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

                </vs-input>

                <vs-input
                    type="password"
                    class="mt-3 input-outlined"
                    v-model="newUserPasswordConfirm"
                    label-placeholder="Nova Senha"
                    :visiblePassword="hasVisibleConfirmPassword"
                    icon-after
                    autocapitalize="none"
                    primary
                    state="primary"
                    @click-icon="hasVisibleConfirmPassword = !hasVisibleConfirmPassword"
                >

                    <template #icon>
                        <BIconEyeSlash v-if="!hasVisibleConfirmPassword"/>
                        <BIconEye v-else />
                    </template>

                </vs-input>

            </div>

            <div class="d-flex">
                <vs-button class="btn-recovery ml-a" flat @click="backStep"> cancelar </vs-button>
                <vs-button class="btn-recovery mr-a" :disabled="!newUserPassword || !newUserPasswordConfirm" @click="confirmNewPasswordRequest()" :loading="apiLoading"> confirmar </vs-button>
            </div>

    </div>

 </div>
</template>

<script>
import Svgs from  '../../assets/svg'
import { BIconEye, BIconEyeSlash} from 'bootstrap-vue';
import { mapGetters } from 'vuex'
export default {
  name: 'RecoveryPass',
  
  data:() => ({
    Svgs: Svgs,
    codeInput:'',
    emailSented:'',
    step:'code_selection',
    hasVisiblePassword: false,
    hasVisibleConfirmPassword: false,
    newUserPassword: '',
    newUserPasswordConfirm:'',
  }),

    created() {
        const codePath = document.location.href
        this.codeInput = codePath.substring(codePath.lastIndexOf('/') + 1)

        const recoveryEmailSelected = localStorage.getItem('recoveryEmailSelected')
        this.emailSented = recoveryEmailSelected
        
        const savedStepVariable = localStorage.getItem('savedStep')
        if(savedStepVariable){
            this.step = savedStepVariable 
        }
    },

  components: {
      BIconEyeSlash,
      BIconEye
  },
  
  computed: {
    
    ...mapGetters({
      apiLoading:'apiLoading',
    })

  },

  methods: {
      async confirmRecoveryPass(){

        const body = {
            email:this.emailSented,
            code: this.codeInput
        }

        const confirmRecovery = await this.$http.post(this.$url+'/confirm/recovery/code', body).catch(err => { console.log(err) })
        if(confirmRecovery.status === 200 && confirmRecovery.data.success === true){
            this.$vs.notification({ color: 'dark', position: 'top-center', title: 'Escolha sua nova senha', })
            this.step = 'password_selection';
            localStorage.setItem('savedStep', 'password_selection');
            localStorage.setItem('codeSented', this.codeInput);
            
            this.$router.push(`/recovery/password/${this.codeInput}`);
        }

      },

      async resendCode() {
        this.$store.commit('setApiLoading', true)
        const body = {
            email:this.emailSented
        }

        const requestRecoveryAPI = await this.$http.post(this.$url+'/forgot/pass', body).catch(err => { console.log(err) })
        if(requestRecoveryAPI.status === 200 && requestRecoveryAPI.data.success === true){
            this.$vs.notification({ color: 'dark', position: 'top-center', title: 'Emial de recuperação de senha foi enviado!', })
            this.$store.commit('setApiLoading', false)
        }else{
            this.$vs.notification({ color: 'danger', position: 'top-center', title: 'Ops! Algo deu errado, tente novamente', })
            this.$store.commit('setApiLoading', false)
        }
      },

      async confirmNewPasswordRequest() {
        this.$store.commit('setApiLoading', true)
        const body = {
            email:this.emailSented,
            code: this.codeInput,
            password: this.newUserPassword,
            confirmPassword: this.newUserPasswordConfirm,
        }

        const confirmUpdatePassword = await this.$http.patch(this.$url+'/update/user/password', body).catch(err => { console.log(err) })
        if(confirmUpdatePassword.status === 201 && confirmUpdatePassword.data.success === true){
            this.$vs.notification({ color: 'success', position: 'top-center', title: 'Senha Atualizada com successo!', })
            this.$store.commit('setApiLoading', false)

            localStorage.removeItem('savedStep')
            localStorage.removeItem('codeSented')
            
            localStorage.setItem('token', confirmUpdatePassword.data.token)
            localStorage.setItem('id', confirmUpdatePassword.data.id)

            this.$router.push(`/ChatList`);
        }else{
            this.$vs.notification({ color: 'danger', position: 'top-center', title: 'Ops! Algo deu errado, tente novamente', })
            this.$store.commit('setApiLoading', false)
        }
      },

      backStep() {
          this.step = 'code_selection'
      }
  }
}
</script>

<style lang="scss">
.container-card-recory{
    display: block;

    .card {
        display: block;
        max-width: 100%;
        width: 30%;
    }


    .codeInput{
        display: inline-block;
        border-radius: 5px;
        border: 1px solid gray;
        padding: 5px;
    }


    .display-info-email-sent{
        margin-left: 15px;
        display: inline-block;
    }

    .container-button-recovery{
        display: flex;
    }

    .title-recovery{
        font-weight: bold;
        font-size: 25px;
        text-align: start;
        margin: 30px 0px 0px 20px;
    }
}


.container-pass-recory{
    max-width: 100%;
    width: 50%;
}

.container-inputs{
    max-width: 100%;
    width: 60%;

    @media screen and (max-width:700px) {
        width: 95%;
    }
}
</style>
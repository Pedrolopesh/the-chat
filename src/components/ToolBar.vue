<template>
    <div>
      <!-- <vs-sidebar
        absolute
        v-model="active"
        reduce
        :open.sync="activeSidebar"
        >
        <template #logo>
            <BIconChatDots/>
        </template>

        <vs-sidebar-item exact to="/ChatList" id="home">
          <template #icon>
              <span @click="goToPage('ChatList')">
                <BIconHouse/>
              </span>
          </template>
          Conversas
        </vs-sidebar-item>

        <vs-sidebar-item exact to="/SearchUser" id="market">
          <template #icon>
              <span @click="goToPage('SearchUser')">
                <BIconChatDots/>
              </span>
          </template>
          Usuários
        </vs-sidebar-item>

        <vs-sidebar-item exact to="/Profile" id="Music">
          <template #icon>
              <span @click="goToPage('Profile')">
                <BIconGear />
              </span>
          </template>
          Configurações de perfil
        </vs-sidebar-item>

        <template #footer>
          <vs-row class="ml-3" justify="space-between">
            <vs-avatar badge-color="danger" badge-position="top-right">
                <span v-if="!userData.img_profile">
                    <BIconPersonCircle/>
                </span>
              <img v-else :src="userData.img_profile" alt="">
              <template #badge>
                1
              </template>
            </vs-avatar>

            <vs-avatar>
                <vs-button danger @click="tryLogout">
                    <BIconPower class="logout-icon"/>
                </vs-button>
            </vs-avatar>


          </vs-row>
        </template>
      </vs-sidebar> -->

      <div class="footer-bar ac">
        
        <vs-button to="/ChatList" gradient class="ac button-toolbar-first">
          <BIconHouse/>
          <span class="display-b">Home</span>
        </vs-button>
        
        <vs-button to="/SearchUser" gradient class="ac button-toolbar-midle">
          <BIconChatDots/>
          <span class="display-b">Conversas</span>
        </vs-button>
        
        <vs-button to="/Profile" gradient class="ac button-toolbar-end">
          <BIconGear/>
          <span class="display-b">Opções</span>
        </vs-button>
      
      </div>
    </div>
</template>
<script>
import { BIconHouse, BIconChatDots, BIconGear, BIconPersonCircle, BIconPower } from 'bootstrap-vue';
import { mapGetters } from "vuex"
export default {
    components:{
        BIconHouse,
        BIconChatDots,
        BIconGear,
        BIconPersonCircle,
        BIconPower
    },
    data:() => ({
      active: 'home',
      activeSidebar: true
    }),

    methods:{
        goToPage(route){
            this.$router.push(route)
        },

        tryLogout(){
          this.$vs.notification({
            color: 'dark',
            position: 'top-center',
            title: 'Tchau tchau, nos vemos logo 🤩',
          })
          localStorage.removeItem('token');
          localStorage.removeItem('_id');
          this.$router.push('/Home')
        }
    },

    computed:{
        ...mapGetters({
            userData: 'userData'
        })
    }
}
</script>
<style lang="scss">
  .footer-bar{
    width: 100%;
    display: flex;
    max-width: 30%;
    background-color: rgb(255, 255, 255);
    border-radius: 0px 0px 20px 20px;
    box-shadow: 7px 6px 15px rgba(0, 0, 0, 0.356) !important;

    @media screen and (max-width: 700px){
      max-width: 100%;
      width: 100%;
    }

    .button-toolbar,
    .button-toolbar-first,
    .button-toolbar-midle,
    .button-toolbar-end{
      margin-top: 0px;
      margin-bottom: 0px;
      display: block !important;
      border: none;
      padding: 6px;
      max-width: 100%;
      width: 100%;

      div{
        padding: 0;
        display: block !important;
      }
      // transition-timing-function: ease-out;
      // border-radius: 0px 0px 20px 20px;

      &:hover{
        transition:  0.2s;
        background-image: linear-gradient(to right, #195bff , #873bff);
        color: white;
      }

    }

    .button-toolbar-midle{
      border-radius: 0px !important;
    }

    .button-toolbar-first{
      border-radius: 0px 0px 0px 20px;
    }

    .button-toolbar-end{
      border-radius: 0px 0px 20px 0px;
    }
  }
</style>
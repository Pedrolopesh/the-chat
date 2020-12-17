<template>
    <div class="hidden">
      <vs-sidebar
        absolute
        v-model="active"
        reduce
        :open.sync="activeSidebar"
        >
        <template #logo>
          <!-- ...img logo -->
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
      </vs-sidebar>
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
<template>
  <div class="home mt-7">

    <div>
      <span v-html="Svgs.logo" class="home-icon ac"></span>
      <h1 class="font-logo mt-3">The Chat</h1>
    </div>

    <div class="container ac mt-8">
        <Signup />
        <Signin />
    </div>

    <!-- <vs-button to="/ChatList">
      Chats
    </vs-button> -->

 </div>
</template>

<script>
// @ is an alias to /src
import Signup from '../../components/Signup';
import Signin from '../../components/Signin';
import ChooseAvatar from '../../components/ChooseAvatar'
import Svgs from  '../../assets/svg'

export default {
  name: 'Home',
  components: {
    ChooseAvatar,
    Signup,
    Signin,
  },

  data:() => ({
    Svgs: Svgs
  })
}
</script>

<style lang="scss">
  .home-icon{
      display: block;
      max-width: 15%;
      width: 100%;

    svg{
      display: block;
    }
  }

  .font-logo{
    font-size: 50px;
    color: #e38622;
    font-family: 'Bungee Shade', cursive;
  }
</style>
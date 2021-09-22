import Vue from 'vue';
import Vuex from 'vuex';
import { axios } from '../main';
import UserListVuex from './modules/UserListVuex';
import ToolbarVuex from './modules/ToolbarVuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    prodUrl: process.env.VUE_APP_PROD_URL,
    userData:'',
    apiLoading:false,
    toogleChatsMenu:false,
    sinupOptionFromSignin:false,
    signinOptionFromSinup:false,
  },
  getters:{
    prodUrl: state => state.prodUrl,
    userData: state => state.userData,
    toogleChatsMenu: state => state.toogleChatsMenu,
    apiLoading: state => state.apiLoading,
    sinupOptionFromSignin: state => state.sinupOptionFromSignin,
    signinOptionFromSinup: state => state.signinOptionFromSinup,
  },
  mutations: {
    setProdUrl(state, data){
      state.prodUrl = data
    },
    setUserData(state, data){
      state.userData = data
    },
    setToogleChatsMenu(state, data){
      state.toogleChatsMenu = data
    },
    setApiLoading(state, data){
      state.apiLoading = data
    },
    setSinupOptionFromSignin(state, data){
      state.sinupOptionFromSignin = data
    },
    setSigninOptionFromSinup(state, data){
      state.signinOptionFromSinup = data
    },
  },
  actions: {
    async getUserData(context){
      let userId = localStorage.getItem('id')
      await axios.get(process.env.VUE_APP_PROD_URL + `/user/${userId}`)
      .then(resp => {
        context.commit('setUserData', resp.data.content)
      })
      .catch(err => {
        console.log(err)
      })
    },

    changeToogleChatsMenu(context, data) {
      console.log(data)
      context.commit('setToogleChatsMenu', data)
    }
  },
  modules: {
    UserListVuex,
    ToolbarVuex
  }
})

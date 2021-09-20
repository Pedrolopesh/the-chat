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
  },
  getters:{
    prodUrl: state => state.prodUrl,
    userData: state => state.userData,
    toogleChatsMenu: state => state.toogleChatsMenu,
    apiLoading: state => state.apiLoading,
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
  },
  actions: {
    async getUserData(context){
      console.log('vue xxxxx')
      let userId = localStorage.getItem('id')
      await axios.get(process.env.VUE_APP_PROD_URL + `/user/${userId}`)
      .then(resp => {
        console.log('resp', resp.data)
        context.commit('setUserData', resp.data)
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

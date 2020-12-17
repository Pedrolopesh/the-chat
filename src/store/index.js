import Vue from 'vue';
import Vuex from 'vuex';
import { axios } from '../main';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    prodUrl: process.env.VUE_APP_PROD_URL,
    userData:'',
    apiLoading:false,
  },
  getters:{
    prodUrl: state => state.prodUrl,
    userData: state => state.userData,
    apiLoading: state => state.apiLoading,
  },
  mutations: {
    setProdUrl(state, data){
      state.prodUrl = data
    },
    setUserData(state, data){
      state.userData = data
    },
    setApiLoading(state, data){
      state.apiLoading = data
    }
  },
  actions: {
    async getUserData(context){
      let userId = localStorage.getItem('id')
      await axios.get(process.env.VUE_APP_PROD_URL + `/user/${userId}`)
      .then(resp => {
        // console.log(resp)
        context.commit('setUserData', resp.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  modules: {
  }
})

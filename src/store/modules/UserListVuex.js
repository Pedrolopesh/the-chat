// import { axios } from '../../main'

export default {


    state: {
        chatId:'',
        chatCreated:false,

    },

    getters: {
        chatId: state => state.chatId,
        chatCreated: state => state.chatCreated,
    },

    mutations: {
        setChatId(state, data){
            state.chatId = data
        },
        setChatCreated(state, data){
            console.log("batata", data)
            state.chatCreated = data
        },
    },

    actions: {
        async setChatId(context, newData){
            context.commit('setChatId', newData)
        },
    }
}
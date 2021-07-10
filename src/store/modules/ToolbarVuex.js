export default {
    state: {
        newChatModal:false,
    },

    getters: {
        newChatModal: state => state.newChatModal,
    },

    mutations: {
        setNewChatModal(state, data){
            state.setNewChatModal = data
        },
    },

    actions: {
        async setNewChatModalAction(context, newData){
            context.commit('setNewChatModal', newData)
        },
    }
}
import { axios } from '../../main'

export default {


    state: {
        chatId:'',
        chatCreated:false,
        savedChatConections:'',
    },

    getters: {
        chatId: state => state.chatId,
        chatCreated: state => state.chatCreated,
        savedChatConections: state => state.savedChatConections,
    },

    mutations: {
        setChatId(state, data){
            state.chatId = data
        },
        setChatCreated(state, data){
            console.log("batata", data)
            state.chatCreated = data
        },
        setSavedChatConections(state, data){
            state.savedChatConections = data
        }
    },

    actions: {
        async setChatId(context, newData){
            context.commit('setChatId', newData)
        },


        async listChatConections(context){
            let userId = localStorage.getItem('id')
            if (!userId) {
                console.log('LOGOUT ?')
                //logout
                const currentPath = document.location.origin
                document.location.href = `${currentPath}/`
                return
            }
            const respChatItems = await axios.get(process.env.VUE_APP_PROD_URL + `/chats/userid/${userId}`).catch(err => { console.log(err) })
            let formatedItens = [...respChatItems.data.user_response_mesage, ...respChatItems.data.user_origin_message]

            const allChatItens = formatedItens
            let newChatItens = []
            for (let i in allChatItens) {
                if (userId === allChatItens[i].user_response[0]._id) {
                    newChatItens.push({
                        userData: allChatItens[i].user_origin[0],
                        chatInfo: allChatItens[i]
                    })
                }
                if (userId === allChatItens[i].user_origin[0]._id) {
                    newChatItens.push({
                        userData: allChatItens[i].user_response[0],
                        chatInfo: allChatItens[i]
                    })
                }
            }
            context.commit('setSavedChatConections', newChatItens)
        },
    }
}
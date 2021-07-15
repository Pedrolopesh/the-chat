<template>
  <div>
        <div v-for="(item ,i) in savedChatConections" :key="i" class="contact-message">
            <button
                :class="selectedComponentChatId === item.chatInfo._id ? 'select-contact-message' : '' "
                @click="setSelectedChatOption(item.userData, item.chatInfo._id)"
                class="container-contact-info"
            >
                <div class="mr-4">
                    <Avatar :img_profile="item.userData.img_profile" />
                </div>
                <span class="clr-white">
                    {{ item.userData.name }}
                </span>
            </button>
        </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Avatar from '../Avatar/Avatar.vue';

export default {
    components:{ Avatar },
    props:['chatConnections'],
    data:() =>({
        selectedComponentChatId: ''
    }),
    computed: {
        ...mapGetters({
            userData:'userData',
            savedChatConections: 'savedChatConections',
        })
    },
    methods:{
        ...mapActions({
            getUserData: 'getUserData',
        }),

        setSelectedChatOption(selectedChat, selectedChatInfoId) {
            this.selectedComponentChatId = selectedChatInfoId
            this.$emit('setSelectedUser', selectedChat, selectedChatInfoId)
        }
    },

    watch:{}
}
</script>

<style lang="scss">
    .chat-messages-container{
        max-width: 40%;
        width: 100%;

        @media screen and (max-width: 700px) {
            max-width: 100%;
        }

        margin-left: auto;
        margin-right: auto;
    }

    .container-alert{
        max-width: 70%;
        width: 100%;
    }

    .icon-back{
        font-size: 30px;
    }
</style>
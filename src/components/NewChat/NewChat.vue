<template>
    <div>

        <div class="d-flex" v-for="(items, index) in items" :key="index">
            <button
                :class="activeSelected === index ? 'activeSelected' : 'notSelected' "
                class="mt-2 button-contact"
                :active="active == 0"
                @click="tryCreateChat(items, index)"
            >
                <b-avatar
                    v-if="items.img_profile != '' "
                    class="ml-2"
                    :src='items.img_profile'
                ></b-avatar>
                <div class="center ml-2"> {{ items.name }} </div>
            </button>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { BIconEnvelope } from 'bootstrap-vue';

export default {
    components: {
        BIconEnvelope
    },

    data:() => ({
        active:true,
        activeSelected: false,
        items: '',
        userData: ''
    }),

    computed:{
        ...mapGetters({
            apiLoading:'apiLoading',
        })
    },

    methods:{

        async getAllUsers(){
            console.info('REQUEST')
            this.$store.commit('setApiLoading', true)
            const resp = await this.$http.get(this.$url + '/list/users').catch(err => { console.log(err) })
            if(resp.data == ''){ this.$store.commit('setApiLoading', false)}
            else{ this.$store.commit('setApiLoading', false) }
            this.rebuildUsersArray(resp.data)
        },

        rebuildUsersArray(allUsers) {
            console.info('allUsers', allUsers)
            const filterArray = allUsers.filter((item) => {
                return item._id !== this.userData
            })
            console.info('filterArray', filterArray)
            this.items = filterArray
        },

        tryCreateChat(param, index) {
            this.activeSelected = index
            this.$emit('selectedUser', param)
        }
    },

    created() {
        this.userData = localStorage.getItem('id')
        this.getAllUsers()
    }
}
</script>


<style lang="scss">
.button-contact {
    cursor: pointer;
    border: none;
    padding: 10px;
    max-width: 100%;
    width: 100%;
    align-items: end;
    justify-content: end;
    display: inline-flex;
    border-radius: 10px;
    background: none;

    &:hover {
        transition: 0.7s;
        border-radius: 10px;
        background-color: #ffe2e2 !important;
        box-shadow: -10px 6px 15px rgb(0 0 0 / 20%) !important;
    }

    &:not(:hover){
        transition: 0.7s;
    }
}

.activeSelected {
    transition: 0.7s;
    border-radius: 10px;
    background-color: #ffe2e2 !important;
    box-shadow: -10px 6px 15px rgb(0 0 0 / 20%) !important;
}

.notSelected {
    border-radius: 0;
    background: none;
    box-shadow: none;
}
</style>
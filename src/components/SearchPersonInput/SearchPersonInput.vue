<template>
    <div>

        <div class="mt-3 container-input-search">

          <vs-input
            class="inputSearch"
            type="text"
            :class=" 'input-outlined-pink icon-search' "
            :color=" 'input-outlined-pink' "
            v-model="searchInput"
            placeholder="Procurar por conversa"
            icon-after
            :state="primary"
            @keyup="checkInput()"
        >
            <!-- @click-icon="hasVisiblePassword = !hasVisiblePassword" -->

            <template #icon>
              <BIconSearch class="icon-color-pink"/>
            </template>

          </vs-input>
        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { BIconPlusCircleFill, BIconSearch } from 'bootstrap-vue';

export default {
    props:['chatSelected'],
    components: {
        BIconPlusCircleFill,
        BIconSearch
    },

    data:() => ({
        searchInput: ''
    }),

    computed: {
        ...mapGetters({
            userData:'userData',
            savedChatConections:'savedChatConections',
        })
    },

    methods: {
        ...mapActions({
            listChatConections: 'listChatConections',
        }),

        functionFilterTest(textParam){
            const filterItems = (query) => {
                return this.savedChatConections.filter(el => el.userData.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
            };

            this.$store.commit('setSavedChatConections', filterItems(textParam))
        },

        checkInput(){
            if(this.searchInput === ''){
                this.listChatConections()
            }
        },

        clearInputAndSearch() {
            this.searchInput = ''
            this.listChatConections()
        }
    },

    watch: {
        searchInput() {
            this.functionFilterTest(this.searchInput)
            this.$emit('inputSearchActive', false)
        },

        chatSelected() {
            console.log('chatSelected', this.chatSelected)
            if(this.chatSelected) {
                this.clearInputAndSearch()
            }
        }
    }
}
</script>

<style lang="scss">
    .container-input-search {
        display: flex;
    }

    .searchInputStyle {
        display: block;
        border: none;
        max-width: 100%;
        width: 80%;
        border-radius: 10px;
    }

    .icon-search{
        span {
            border: 1px solid #ff9a9a;
        }
    }

    .button-newChat{
        height: 35px;
        margin-top: 13px;

    }

    .icon-color-pink{
        color: #ff9a9a;
    }

    .inputSearch {
        width: 100%;
        margin: 0px 10px 0px 10px;
    }
</style>
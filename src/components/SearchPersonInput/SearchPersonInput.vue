<template>
    <div>

        <div class="mt-3 container-input-search">
            <vs-button
                gradient
                icon
                color="success"
                animation-type="scale"
                size="xl"
                class="ml-2 mr-2 button-newChat"
            >
                <BIconPlusCircleFill />
            </vs-button>

          <vs-input
            type="password"
            :class=" 'input-outlined-pink icon-search' "
            :color=" 'input-outlined-pink' "
            v-model="searchInput"
            placeholder="Procurar por conversa"
            icon-after
            :state="primary"
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
import { BIconPlusCircleFill, BIconSearch } from 'bootstrap-vue';

export default {
    components: {
        BIconPlusCircleFill,
        BIconSearch
    },

    data:() => ({
        searchInput: ''
    })
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
</style>
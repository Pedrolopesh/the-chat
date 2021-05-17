<template>
    <div>
        <vs-button
            v-if="userData._id != item.user_origin[0]._id"
            class="ac mt-2"
            size="large"
            gradient
            animation-type="scale"
            :active="active == 1"
            @click="openActiveChat(item)"
        >
            <BIconEnvelope class="icon-size-20"/>
            <span class="ml-2"> {{ item.user_origin[0].name }} </span>
            <b-avatar
                v-if="item.user_origin[0].img_profile != '' "
                class="ml-2" :src='item.user_origin[0].img_profile'
            ></b-avatar>

            <template #animate >
                Enviar Mensagem
            </template>
        </vs-button>
    </div>
</template>

<script>
    import { BIconEnvelope } from 'bootstrap-vue';

    export default {
        props:['userData'],

        components: {
            BIconEnvelope
        }
    }
</script>

<template>
    <vs-card class="card-item ac" type="2">

    <template #title>
        <h3>{{ checkEmptyValues(imageTitle) }}</h3>
    </template>

    <template #img>
        <img :src="img_src ? img_src : 'https://res.cloudinary.com/publi-node-uploads/image/upload/v1617649089/no-image-1_enke1u.png' " alt="Card Image">
    </template>

    <template #text>
        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum harum doloremque esse voluptas
        </p>
    </template>

    <template #interactions>

        <vs-button danger icon>
            <i class='bx bx-heart'></i>
        </vs-button>

        <vs-button class="btn-chat" shadow primary>
            <i class='bx bx-chat' ></i>
            <span class="span">
            54
            </span>
        </vs-button>

    </template>
</vs-card>
</template>

<script lang="ts">
    export default {
        props:['img_src', 'imageTitle'],

        methods: {
            checkEmptyValues(value) {
                if (value.length === 0)
                    return '-'
                else
                    return value
            }
        }
    }
</script>

<style lang="scss">
    .card-item{
        display: block;
    }
</style>
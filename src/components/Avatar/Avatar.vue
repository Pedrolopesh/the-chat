<template>
    <div>
        <vs-avatar
            v-if="img_profile"
            class="cp"
            size="70"
            badge-position="top-right"
        >
            <img v-if="img_profile != '' " :src="img_profile" alt="avatar">
            <!-- <template #badge>
                badge
                badge-color="danger"
                28
            </template> -->
        </vs-avatar>

        <vs-avatar
            v-else
            class="cp"
            size="60"
            badge
            badge-color="danger"
            badge-position="top-right"
        >
            <img src="https://res.cloudinary.com/publi-node-uploads/image/upload/v1617649089/no-image-1_enke1u.png" alt="avatar">
            <template #badge>
                28
            </template>
        </vs-avatar>
    </div>
</template>

<script>

export default {
    props:['img_profile']
}
</script>

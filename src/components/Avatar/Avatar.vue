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
    </div>
</template>

<script>

export default {
    props:['img_profile']
}
</script>

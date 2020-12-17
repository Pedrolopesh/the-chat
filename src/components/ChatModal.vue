<template>
    <div>
        <!-- <vs-button @click="showChatDialog=!showChatDialog">
            open chat modal
        </vs-button> -->
        {{ propsChatData }}

    </div>
</template>
<script>
export default {
    props:["propsChatData"],
    data:() => ({
        showChatDialog: false
    })
}
</script>
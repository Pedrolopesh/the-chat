<template>
    <div>
        <h1>SUAS CONVERSAS</h1>

        <!-- <vs-button
            @click="openNotification">
            Open Notification
        </vs-button> -->
        <div>
            <!-- <ActiveChat/> -->
            <ChatsConections/>
        </div>


    </div>
</template>
<script>
import ActiveChat from '../../components/ActiveChat';
import ChatsConections from '../../components/ChatsConections';

export default {
    components:{
        ActiveChat,
        ChatsConections
    },
    data:() => ({
    }),
    methods:{
        openNotification(){
            this.$vs.notification({
                color: 'dark',
                position: 'bottom-rigth',
                title: 'Documentation Vuesax 4.0+',
                text: `These documents refer to the latest version of vuesax (4.0+),
                to see the documents of the previous versions you can do it here 👉 Vuesax3.x`
            })
        },

    },

}
</script>

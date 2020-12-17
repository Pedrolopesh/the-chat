<template>
    <div>
        <h1>LISTA DE CONVERSAS</h1>

        <!-- <vs-button
            @click="openNotification">
            Open Notification
        </vs-button> -->
        <div>
            <ActiveChat/>
        </div>


    </div>
</template>
<script>
import ActiveChat from '../../components/ActiveChat'
export default {
    components:{
        ActiveChat,
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

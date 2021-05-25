<template>
    <div>

        <div class="container-toolsbar">
            <div class="container-logo">
                <span v-html="Svgs.logo" class="icon-header-toolbar center mr-2"></span>
                <span class="font-logo center">the chat </span>
                <span class="center ml-4 mr-4">|</span>
            </div>

            <div>
                <vs-button gradient style="min-width: 50px" color="rgb(59,222,200)" animation-type="scale">
                    <BIconPeopleFill class="icon-size-15"/>
                </vs-button>
            </div>

            <div>
                <vs-button gradient style="min-width: 50px" warn animation-type="scale">
                    <BIconBellFill class="icon-size-15"/>
                </vs-button>
            </div>

            <div>
                <vs-button gradient style="min-width: 50px" animation-type="scale">
                    <BIconGearWideConnected class="icon-size-15"/>
                </vs-button>
            </div>
        </div>

        <vs-dialog prevent-close blur v-model="newChat">
            <h4 class="not-margin">
                Iniciar Nova <b>Conversa</b>
            </h4>
            <div>
                <NewChatModal />
            </div>
            <template #footer>
                <div class="footer-dialog">
                    <div class="new">
                        <button>
                            Adicionar
                        </button>
                    </div>
                </div>
            </template>
        </vs-dialog>
    </div>
</template>

<script>
import Svgs from  '../../assets/svg'
import { BIconBellFill, BIconPeopleFill, BIconGearWideConnected } from 'bootstrap-vue';
import NewChatModal from '../NewChat/NewChat.vue'
export default {

    components:{
        BIconBellFill, BIconPeopleFill, BIconGearWideConnected, NewChatModal
    },

    data:() => ({
        Svgs: Svgs,
        newChat: true
    })
}
</script>

<style lang="scss">
.container-toolsbar{
    display: flex;
    max-width: 100%;
    width: 100%;
}

.container-logo{
    display: flex;
}

.icon-header-toolbar{
    display: block;
    width: 35px;
}

.center{
    margin: auto;
}
</style>
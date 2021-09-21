<template>
    <div>
        <!-- <vs-button size="large" class="ac" warn @click="showAvatarDialog=!showAvatarDialog">
            Escolha o avatar
        </vs-button> -->


        <!-- <vs-dialog prevent-close v-model="showAvatarDialog"> -->

            <vs-avatar
                size="100"
                circle
                class="cp ac"
                @click="pickAvatar"
            >
                <img :src="imageUrl" alt="" v-if="selectedFile">
                <input
                    ref="fileInput"
                    type="file"
                    v-show="false"
                    accept="image/*"
                    @change="onFilePicked"
                >
                <BIconPersonCircle class="icon-user" v-if="!selectedFile"/>
            </vs-avatar>

            <vs-button success class="ac" @click="uploadImage">
                Concluir
            </vs-button>

            <vs-button class="ac mt-1" @click="skip">
                Escolher depois
            </vs-button>

        <!-- </vs-dialog> -->
    </div>
</template>
<script>
import { BIconPersonCircle } from 'bootstrap-vue';
import { mapActions, mapGetters } from 'vuex';
export default {
    props:['propsData'],
    components:{
        BIconPersonCircle
    },
    data:() => ({
        selectedFile:false,
        showAvatarDialog:false,
        src:"https://f.i.uol.com.br/fotografia/2020/04/23/15876703105ea1ed267c377_1587670310_1x1_md.jpg",
        imageUrl:'',
        userData:'',
        selectedSourceFile:'',
    }),
    methods:{
        ...mapActions({
            getUserData:'getUserData'
        }),
        onFilePicked(event){
            const files = event.target.files;
            this.selectedSourceFile = event.target.files[0];
            this.selectedFile = true
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => { this.imageUrl = fileReader.result })
            fileReader.readAsDataURL(files[0])
        },
        async pickAvatar() {
            this.$refs.fileInput.click();
        },

        uploadImage(){

            const fd = new FormData();
            fd.append('photo', this.selectedSourceFile)
            fd.append('user_id', localStorage.getItem('id'))
            this.$http.patch(this.$url + '/upload/user/image', fd)
            .then(resp => {
                this.$vs.notification({
                    color: 'dark',
                    position: 'top-center',
                    title: 'Sucesso ao atualizar imagem de perfil 📸',
                })

                this.$router.push('/Introduction')
            })
        },

        async getLocalUserdata(){
            let userId = localStorage.getItem('id')
            this.$http.get(this.prodUrl + `/user/${userId}`)
            .then(resp => {
                this.userData = resp.data
            })
            .catch(err => {
                console.log(err)
            })
        },

        async skip(){
            let userId = localStorage.getItem('id')
            const body = {
                img_profile:'https://res.cloudinary.com/publi-node-uploads/image/upload/v1617649089/no-image-1_enke1u.png'
            }

            const resp = await this.$http.patch(`${this.$url}/update/user/image/${userId}`, body).catch(err => { console.log(err) })
            if(resp.status === 200 && resp.data.success === true){
                this.$vs.notification({ color: 'dark', position: 'top-center', title: 'Sucesso ao atualizar imagem de perfil 📸', })
                this.$router.push('/Introduction')
            }else{
                this.$vs.notification({ color: 'danger', position: 'top-center', title: 'erro ao atualizar foto', })
            }

        }
    },
    computed:{
        ...mapGetters({
            prodUrl: 'prodUrl',
        })
    },
    created(){
        this.getLocalUserdata()
    }
}
</script>
<style lang="scss">
    .icon-user{
        height: 100px;
        width: 100px;
    }
</style>
<template>
    <div class="center con-avatars">
        <div>
            <vs-avatar size="170" class="mt-6 ac">
                <template #text>
                </template>

                <span v-if="!userData.img_profile && !selectedSourceFile">
                    <BIconPersonCircle class="icon-user"/>
                </span>

                <span v-if="!selectedSourceFile">
                    <img :src="userData.img_profile" alt="">
                </span>

                <span v-else>
                    <img :src="imageUrl" alt="">
                </span>

                <input
                    ref="fileInput"
                    type="file"
                    v-show="false"
                    accept="image/*"
                    @change="onFilePicked"
                >

                <template #badge>
                    <vs-button v-if="!selectedSourceFile" @click="pickAvatar">
                        <BIconPen/>
                    </vs-button>

                    <button
                        v-if="selectedSourceFile"
                        :loading="apiLoading"
                        @click="confirmUpdateImage"
                        class="confirm-update-image"
                    >
                        <BIconCheck2All class="ml-2 font-25"/>
                    </button>

              </template>
              

            </vs-avatar>
                    <vs-button
                        danger
                        v-if="selectedSourceFile"
                        :loading="apiLoading"
                        @click="selectedSourceFile = false"
                        class="ac mt-4"
                    >
                            <!-- class="confirm-update-image" -->
                        <BIconXCircle class="font-25"/>
                    </vs-button>

            <div class="mt-4 containe-update-data">
                <h3 class="p10">{{ userData.email }}</h3>
                <div class="d-flex">
                    <span v-if="!enableChange" type="text" class="inputEdit not-allow ac">{{ userData.name }}</span>
                    <input v-else type="text" class="inputEdit ac" v-model="nameEdit">
                </div>
            </div>

            <button v-if="!enableChange" class=" ac mt-5 button-edit" @click="enableChange = !enableChange"> <BIconPen/> </button>
            <div v-else class="d-flex">
                <button class=" ac mt-5 button-sucess" @click="updateInfoData"> Confirmar </button>
                <button class=" ac mt-5 button-danger" @click="enableChange = !enableChange"> Cancelar </button>
            </div>

            <!-- <span class="mt-3">{{ userData }}</span>        -->
        </div>

    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { BIconPen, BIconCheck2All, BIconXCircle, BIconPersonCircle } from 'bootstrap-vue';

export default {

    components:{
        BIconPen,
        BIconCheck2All,
        BIconPersonCircle
    },
    data:() => ({
        selectedSourceFile:'',
        selectedUser: '',
        imageUrl:'',
        nameEdit: '',
        enableChange: false,
    }),
    computed:{
        ...mapGetters({
            userData: 'userData',
            prodUrl:'prodUrl',
            apiLoading: 'apiLoading',
        }),
    },
    mounted(){},
    methods:{
        ...mapActions({
            getUserData: 'getUserData',
        }),

        onFilePicked(event){
            const files = event.target.files;
            this.selectedSourceFile = event.target.files[0];

            // this.src = files
            // this.selectedFile = true

            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => { this.imageUrl = fileReader.result })
            fileReader.readAsDataURL(files[0])
        },
        async pickAvatar() {
            this.$refs.fileInput.click();
        },

        confirmUpdateImage(){
            this.$store.commit('setApiLoading', true)


            const fd = new FormData();
            fd.append('photo', this.selectedSourceFile)
            fd.append('user_id', this.userData._id)

            this.$http.patch(this.prodUrl + '/upload/user/image', fd)
            .then(resp => {
                this.$vs.notification({
                    color: 'dark',
                    position: 'top-center',
                    title: 'Sucesso ao atualizar imagem de perfil 📸',
                })
                this.getUserData()
                this.$store.commit('setApiLoading', false)

                this.selectedSourceFile = '';
            })
        },

        async updateInfoData(){
            if(!this.nameEdit){
                this.$vs.notification({
                    color: 'dark',
                    position: 'top-center',
                    title: 'É necessário digitar algum nome, ou cancele a operação!',
                })
                return
            }

            const userId = this.userData._id
            const body = {name:this.nameEdit}
            const resp = await this.$http.put(this.$url + `/update/user/${userId}`, body)
            if(resp.data.success){
                this.nameEdit = ''
                this.getUserData()
                this.$vs.notification({
                    color: 'success',
                    position: 'top-center',
                    title: 'Usuário alterado com sucesso! 😁',
                })
                this.enableChange = false
                return
            }

        //   localStorage.removeItem('token');
        //   localStorage.removeItem('_id');
        //   this.$router.push('/Home')
        },

        // getImageProfile(){
        //     console.log(this.userData)
        // }
    },
    watch: {
        userData(){
            this.selectedUser = this.userData
        }
    },
    created() {
        if(this.userData === null){
            this.getUserData()
        }
    }
}
</script>
<style lang="scss">
    .inputEdit{
        border: 0.5px solid #e8e8e8;
        border-radius: 8px;
        padding: 4px 0px 4px 10px;
        text-align: start;
        max-width: 100%;
        width: 80%;
        box-shadow: 10px 10px 20px rgb(0 0 0 / 14%) !important;
        color: #868686;
        font-size: 20px;
    }

    .confirm-button, .button-sucess, .button-edit, .button-danger {
        display: block;
        border: none;
        max-width: 100%;
        width: 30%;
        height: 40px;
        color: white;
        border-radius: 8px;
        box-shadow: 6px 7px 10px rgb(0 0 0 / 20%);
        margin-left: 10px;
        transition: 0.5s;

        &:hover{
            transform: translateY(-8px);
        }
    }

    .button-sucess{
        background-color: #05b532e9;

        &:hover{
            box-shadow: 0px 6px 10px #05dd5490;
        }
    }

    .button-edit {
        background-color: #ff5900db;

        &:hover{
            box-shadow: 0px 6px 10px #ff59009f;
        }
    }

    .button-danger {
        background-color: #ff0000db;

        &:hover{
            box-shadow: 0px 6px 10px #ff00009f;
        }
    }

    .containe-update-data{
        justify-content: center;
    }

    .not-allow{
        cursor: not-allowed;
    }

    .confirm-update-image{
        border: none;
        background: none;
        color: white;

        svg{
            padding: 5px;
            margin: 0% !important;
            font-size: 30px !important;
        }
    }

</style>
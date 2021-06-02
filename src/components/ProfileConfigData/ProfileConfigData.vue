<template>
    <div class="center con-avatars">
        <h1>Profile</h1>
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
                    <vs-button @click="pickAvatar">
                        <BIconPen/>
                    </vs-button>            
              </template>
            </vs-avatar>

            <h2 class="mt-3">{{ userData.name }}</h2>    
            <h2 class="mt-3">{{ userData.email }}</h2>    

                <vs-button class="ac mt-5" danger @click="tryLogout">
                    <BIconPower class="logout-icon"/>
                </vs-button>

            <!-- <span class="mt-3">{{ userData }}</span>        -->
        </div>

            <vs-button
                :loading="apiLoading"
                color="rgb(40,167,69)"
                gradient
                v-if="selectedSourceFile"  
                @click="confirmUpdateImage"
                class="ac mt-3"
            >
                Condirmar
                <BIconCheck2All class="ml-2 icon-size-20"/>
            </vs-button>

            
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { BIconPen, BIconCheck2All, BIconPersonCircle } from 'bootstrap-vue';

export default {

    components:{
        BIconPen,
        BIconCheck2All,
        BIconPersonCircle
    },
    data:() => ({
        selectedSourceFile:'',
        imageUrl:'',
    }),
    computed:{
        ...mapGetters({
            userData: 'userData',
            prodUrl:'prodUrl',
            apiLoading: 'apiLoading',
        }),
    },
    mounted(){
    },
    methods:{
        ...mapActions({
            getUserData: 'getUserData',
        }),

        onFilePicked(event){
            const files = event.target.files;
            this.selectedSourceFile = event.target.files[0];
            
            // console.log(files)
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

        tryLogout(){
            this.$vs.notification({
            color: 'dark',
            position: 'top-center',
            title: 'Tchau tchau, nos vemos logo 🤩',
          })
          localStorage.removeItem('token');
          localStorage.removeItem('_id');
          this.$router.push('/Home')
        },

        getImageProfile(){
            console.log(this.userData)
            
        }
    },
    created(){
    }
}
</script>
<style lang="scss">
</style>
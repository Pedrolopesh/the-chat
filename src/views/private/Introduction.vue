<template>
    <div>
          <vs-card-group class="intro-container ac">
            <vs-card v-for="(item,i) in 3" @click="handleClick" :key="i">
                <template #title>
                    <h3>Pot with a plant</h3>
                </template>

                <template #img>
                    <img :src="`https://vuesax.com/foto${i+1}.png`" alt="">
                </template>

                <template #text>
                    <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
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
        </vs-card-group>

            <vs-button to="/ChatList" class="ac">
                Pular
            </vs-button>


    </div>
</template>
<script>
export default {
    methods:{
        handleClick(){
            console.log("kdpoakpdkapodksakpskap")
        }
    }
}
</script>
<style lang="scss">
    .intro-container{
        display: flex;
        max-width: 65%;
        width: 100%;

        @media screen and (max-width: 800px){
            max-width: 100%;
            width: 100%;
        }
    }
</style>
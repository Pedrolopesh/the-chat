<template>
    <div>
        <Intro />
    </div>
</template>
<script>
import Intro from '../../components/Intro'
export default {
    methods:{},
    components:{Intro}
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

    .container-text{
        display: block;
        text-align: start;
        padding: 20px;
        max-width: 100%;
        width: 50%;

        @media screen and (max-width: 800px){
            max-width: 100%;
            width: 80%;
        }
    }

    .image-size-10{
        max-width: 100%;
        width: 6%;

        @media screen and (max-width: 800px){
            max-width: 100%;
            width: 10%;
        }
    }
</style>
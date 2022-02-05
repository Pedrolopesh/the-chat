<template>
    <div>
        <div class="container-text ac">

            <h1>BEM VINDO!</h1>

            <p>Bem vindo ao the chat app, um lugar único com infinitas possibilidade de conexões com pessoas ao redor do mundo, conversa com amigos e muito mais </p>

            <p>Veja a seguir algumas possibilidades que o the chat app oferece.</p>

            <h4 class="mt-5 display-b">Menu de conversas</h4>
            <p>Para abrir o menu com todas as conversas que você está envolvido, clique em <img src="../../assets/toogle-button.png" class="image-size-10" />, aqui você pode ver todas as conversas que você já iniciou com algum usuário.</p>

            <h4 class="mt-5 display-b">Configurações</h4>
            <p>Para abrir as configurações, clique em <img src="../../assets/settings-button.png" class="image-size-10" />, aqui você pode modificar suas informações de usuário e fodo de perfil para melhor se apresentar dentro do app.</p>

            <h4 class="mt-5 display-b">Procurar amigos.</h4>
            <p>para adicionar novos amigos clique sobe o icone <img src="../../assets/add-friend.png" class="image-size-10" />, aqui irá mostrar todos os usuários da rede do the chat para você se conectar</p>

            <h4 class="mt-5 display-b">Configurações</h4>
            <p>Para sair do app basta clicar em <img src="../../assets/logout-button.png" class="image-size-10" /> </p>

            <!-- <vs-button to="/ChatList" class="ac mt-6 display-b">
                Pular
            </vs-button> -->

        </div>
    </div>
</template>

<script>
export default {
    methods:{}
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
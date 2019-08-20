<template>
    <div class="layout layout--default">
        <Header></Header>
        <Alerts></Alerts>
        <main>
            <router-view />
        </main>
    </div>
</template>

<script>
    import Header from '../components/layout/Header'
    import Alerts from '../components/layout/Alerts'
    import Footer from '../components/layout/Footer'

    export default {
        data(){
            return {
                menuOptions: []
            }
        },
        components: {
            Header,
            Alerts,
            Footer,
        }
    }
</script>

<style type="scss" scoped>
    main{
        padding: 2rem;
    }
</style>
<template>
    <div class="layout layout--messages">
        <Header></Header>
        <Alerts></Alerts>
        <main>
            <slot />
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

    }
</style>
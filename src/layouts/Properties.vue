<template>
    <div class="layout layout--properties">
        <Header></Header>
        <Alerts></Alerts>
        <main>
            <slot />
        </main>

        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '../components/layout/Header'
    import Alerts from '../components/layout/Alerts'
    import Footer from '../components/layout/Footer'

    export default {
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
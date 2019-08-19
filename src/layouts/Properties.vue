<template>
    <div class="layout layout--properties">
        <Header></Header>

        <main>
            <slot />
        </main>

        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '../components/layout/Header'
    import Footer from '../components/layout/Footer'

    export default {
        components: {
            Header,
            Footer,
        }
    }
</script>

<style type="scss" scoped>
    main{
        padding: 2rem;
    }
</style>
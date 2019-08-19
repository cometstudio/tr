<template>
    <div class="layout layout--default">
        <Header></Header>
        <main>
            <router-view />
        </main>
    </div>
</template>

<script>
    import Header from '../components/layout/Header'
    import Footer from '../components/layout/Footer'

    export default {
        data(){
            return {
                menuOptions: []
            }
        },
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
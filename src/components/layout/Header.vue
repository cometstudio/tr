<template>
    <header class="header">
        <ui-toolbar
                brand="Awesome app"
                remove-brand-divider
                text-color="white"
                type="colored"
                :loading="loading">

            <div slot="icon">
                <ui-icon-button v-if="isBrowser"
                        color="white"
                        icon="search"
                        size="large"
                        type="secondary"
                        @click="stepBack">
                    <font-awesome-icon icon="times"></font-awesome-icon>
                </ui-icon-button>
                <router-link v-else to="browser">
                    <ui-icon-button
                            color="white"
                            icon="search"
                            size="large"
                            type="secondary">
                        <font-awesome-icon icon="bars"></font-awesome-icon>
                    </ui-icon-button>
                </router-link>
            </div>

            <div slot="actions">
                <nav>
                    <span>Guest</span>
                    <router-link to="browser">Login</router-link>
                </nav>
            </div>
        </ui-toolbar>
    </header>
</template>

<script>
    import UiButton from "keen-ui/src/UiButton";
    export default {
        name: "Header",
        components: {UiButton},
        computed: {
            loading(){
                return this.$store.getters.loading
            },
            isBrowser(){
                return this.$route.name === 'browser'
            }
        },
        methods: {
            stepBack(){
                window.history.length > 1 ? this.$router.back() : this.$router.push('/')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ui-toolbar{
        padding: 3rem 2rem;
        nav{
            span, a{
                display: inline-block;
                float: left;
                margin-left: 1.5rem;
                color: white;
                text-decoration: none;
            }
        }
    }
</style>
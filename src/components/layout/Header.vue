<i18n src="@/i18n/user.json"></i18n>

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
                <nav v-if="user.id === null">
                    <span>{{ $t('user.name') }}</span>
                    <router-link :to="{ name: 'login'}">{{ $t('user.login.button') }}</router-link>
                </nav>
                <nav v-else>
                    <span>{{ user.name }}</span>
                    <a href="" @click.prevent="logout">{{ $t('user.logout.button') }}</a>
                </nav>
            </div>
        </ui-toolbar>
    </header>
</template>

<script>
    import UiButton from "keen-ui/src/UiButton"
    import { mapActions } from 'vuex'
    import { RESET_STORE } from "@/store/types"

    export default {
        name: "Header",
        components: {UiButton},
        computed: {
            loading(){
                return this.$store.getters.loading
            },
            isBrowser(){
                return this.$route.name === 'browser'
            },
            user(){
                return this.$store.getters.user
            }
        },
        methods: {
            ...mapActions([
                RESET_STORE
            ]),
            stepBack(){
                window.history.length > 1 ? this.$router.back() : this.$router.push('/')
            },
            logout(){
                this.RESET_STORE().then(()=>{
                    this.$router.push({name: 'login'})
                }).catch((error)=>{})
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
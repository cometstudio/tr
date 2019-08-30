<i18n src="@/i18n/user.json"></i18n>

<template>
    <header class="header">
        <ui-toolbar
                brand="Application"
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
                <router-link v-else :to="{ name: 'browser' }">
                    <ui-icon-button
                            color="white"
                            icon="search"
                            size="large"
                            type="secondary">
                        <font-awesome-icon icon="bars"></font-awesome-icon>
                    </ui-icon-button>
                </router-link>
            </div>

            <div class="locale_switch" @click="toggleLocale" slot="default">
                {{ languages[locale] }}
            </div>

            <div slot="actions">
                <nav v-if="isLoggedIn">
                    <router-link :to="{ name: 'user.profile' }">{{ user.name }}</router-link>
                    <a href="" @click.prevent="logout">{{ $t('user.logout.button') }}</a>
                </nav>
                <nav v-else>
                    <span>{{ $t('user.name') }}</span>
                    <router-link :to="{ name: 'user.login'}">{{ $t('user.login.button') }}</router-link>
                </nav>
            </div>
        </ui-toolbar>
    </header>
</template>

<script>
    import { mapActions } from 'vuex'
    import { USER_SET, RESET_STORE, SET_LOCALE } from "@/store/types"

    export default {
        name: "Header",
        data(){
            return {
                languages: {
                    ru: 'Русский',
                    en: 'English'
                },
            }
        },
        computed: {
            loading(){
                return this.$store.getters.loading
            },
            isBrowser(){
                return this.$route.name === 'browser'
            },
            locale(){
                return this.$store.getters.locale
            },
            user(){
                return this.$store.getters.user
            },
            isLoggedIn(){
                return this.$store.getters.isLoggedIn
            }
        },
        created(){
            this.USER_SET()
            this.setLocale()
        },
        methods: {
            ...mapActions([
                USER_SET,
                RESET_STORE,
                SET_LOCALE
            ]),
            stepBack(){
                window.history.length > 1 ? this.$router.back() : this.$router.push({ name: 'index' })
            },
            setLocale(locale = undefined){
                this.SET_LOCALE(locale).then(()=>{
                    this.$root.$i18n.locale = this.$store.getters.locale
                    this.$moment.locale(this.$store.getters.locale)
                })

            },
            toggleLocale(){
                this.setLocale(_.first(_.xor(_.keys(this.languages), [this.$store.getters.locale])))
            },
            logout(){
                this.RESET_STORE().then(()=>{
                    this.$router.push({ name: 'user.login' })
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
        .locale_switch{
            cursor: pointer;
        }
    }
</style>
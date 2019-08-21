<i18n src="../i18n/user.json"></i18n>

<template>
    <div class="login">
        <h3>{{ $t('auth.login') }}</h3>
        <form class="form" @submit.prevent="authenticate">
            <ui-textbox
                    floating-label
                    type="text"
                    placeholder="Enter your Email"
                    v-model="auth.email">{{ $t('data.email') }}</ui-textbox>
            <ui-textbox
                    floating-label
                    type="password"
                    placeholder="Enter a password"
                    v-model="auth.password">{{ $t('data.password') }}</ui-textbox>
            <ui-button color="primary">{{ $t('auth.loginButton') }}</ui-button>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        data () {
            return {
                auth: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            ...mapActions([
                'loading',
                'pushAlert'
            ]),
            authenticate () {
                this.loading()

                this.$axios.post('/api/user/login', this.auth)
                    .then((response) => {
                        this.$store.dispatch('setApiToken', response.data.apiToken)
                        this.$store.dispatch('setUser', response.data.user)

                        this.$router.push('/')
                    }).catch((error) => {
                        this.pushAlert(error.response.data)
                    }).then(()=>{
                        this.loading(false)
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

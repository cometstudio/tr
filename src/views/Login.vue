<i18n src="../i18n/user.json"></i18n>

<template>
    <div class="login">
        <h3>{{ $t('user.login') }}</h3>
        <form class="form" @submit.prevent="authenticate">
            <ui-textbox
                    floating-label
                    type="text"
                    placeholder="Enter your Email"
                    v-model="auth.email">{{ $t('user.email') }}</ui-textbox>
            <ui-textbox
                    floating-label
                    type="password"
                    placeholder="Enter a password"
                    v-model="auth.password">{{ $t('user.password') }}</ui-textbox>
            <ui-button color="primary">{{ $t('user.login') }}</ui-button>

            <ul>
                <li><router-link :to="{ name: 'signup'}">{{ $t('user.signup') }}</router-link></li>
            </ul>
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
                'login'
            ]),
            authenticate () {
                this.login(this.auth)
                    .then(()=>{
                        this.$router.push({name: 'properties'})
                    }).catch((error)=>{})
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

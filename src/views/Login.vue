<i18n src="../i18n/user.json"></i18n>

<template>
    <div class="login">
        <h3>{{ $t('user.login.title') }}</h3>
        <form class="form" @submit.prevent="login">
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
            <ui-button color="primary">{{ $t('user.login.button') }}</ui-button>

            <ul>
                <li><router-link :to="{ name: 'signup'}">{{ $t('user.signup.title') }}</router-link></li>
            </ul>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { LOGIN, PUSH_ERROR_ALERT } from "../store/types"

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
                LOGIN,
                PUSH_ERROR_ALERT,
            ]),
            login() {
                this.LOGIN(this.auth)
                    .then(()=>{
                        this.$router.push({name: 'properties'})
                    }).catch((error)=>{
                        this.PUSH_ERROR_ALERT({
                            message: this.$t(error.response.data.message)
                        })
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

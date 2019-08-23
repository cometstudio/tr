<i18n src="../i18n/user.json"></i18n>

<template>
    <div class="login">
        <h3>{{ $t('user.signup.title') }}</h3>
        <form class="form" @submit.prevent="signup">
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
            <ui-button color="primary">{{ $t('user.signup.button') }}</ui-button>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { SIGNUP, PUSH_ERROR_ALERT } from "../store/types"

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
                SIGNUP,
                PUSH_ERROR_ALERT,
            ]),
            signup () {
                this.SIGNUP(this.auth)
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

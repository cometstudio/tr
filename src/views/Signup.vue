<i18n src="../i18n/user.json"></i18n>

<template>
    <div class="login">
        <h3>{{ $t('user.signup.title') }}</h3>
        <form class="form" @submit.prevent="signup">
            <ui-textbox
                    floating-label
                    type="text"
                    placeholder="Enter your Email"
                    v-model="form.data.email"
                    :maxlength="32"
                    :invalid="form.validation.errors.email.length > 0 || form.data.email.length > 32"
                    :help="$t(form.validation.hints.email())">{{ $t('user.email') }}</ui-textbox>
            <ui-textbox
                    floating-label
                    type="password"
                    placeholder="Enter a password"
                    v-model="form.data.password"
                    :invalid="form.validation.errors.password.length > 0"
                    :help="$t(form.validation.hints.password())">{{ $t('user.password') }}</ui-textbox>
            <ui-button color="primary">{{ $t('user.signup.button') }}</ui-button>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { SIGNUP, PUSH_ERROR_ALERT } from "../store/types"

    const errors = ()=>{
        return {
            email: [],
            password: []
        }
    }

    export default {
        data () {
            return {
                form: {
                    data: {
                        email: '',
                        password: ''
                    },
                    validation: {
                        errors: errors(),
                        hints: {
                            email: ()=>{
                                return this._.first(this.form.validation.errors.email)
                            },
                            password: ()=>{
                                return this._.first(this.form.validation.errors.password)
                            },
                        },
                    },
                },
            }
        },
        methods: {
            ...mapActions([
                SIGNUP,
                PUSH_ERROR_ALERT,
            ]),
            resetErrors()
            {
                this.form.validation.errors = errors()
            },
            signup()
            {
                this.resetErrors()

                this.SIGNUP(this.form.data)
                    .then(()=>{
                        this.$router.push({name: 'properties'})
                    }).catch((error)=>{
                        Object.assign(this.form.validation.errors, error.response.data.errors)

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

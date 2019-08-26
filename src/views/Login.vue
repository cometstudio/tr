<i18n src="../i18n/user.json"></i18n>

<template>
    <div class="login">
        <h3>{{ $t('user.login.title') }}</h3>
        <form class="form" @submit.prevent="login">
            <ui-textbox
                    floating-label
                    type="text"
                    placeholder="Enter your Email"
                    :help="form.validation.hints.email()"
                    :invalid="form.validation.errors.email.length > 0"
                    v-model="form.data.email">{{ $t('user.email') }}</ui-textbox>
            <ui-textbox
                    floating-label
                    type="password"
                    placeholder="Enter a password"
                    :help="form.validation.hints.password()"
                    :invalid="form.validation.errors.password.length > 0"
                    v-model="form.data.password">{{ $t('user.password') }}</ui-textbox>
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
                                return this.form.validation.errors.email.join(', ')
                            },
                            password: ()=>{
                                return this.form.validation.errors.password.join(', ')
                            },
                        },
                    },
                },

            }
        },
        methods: {
            ...mapActions([
                LOGIN,
                PUSH_ERROR_ALERT,
            ]),
            resetErrors()
            {
                this.form.validation.errors = errors()
            },
            login()
            {
                this.resetErrors()

                this.LOGIN(this.form.data)
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

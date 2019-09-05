<i18n src="../../i18n/user.json"></i18n>

<template>
    <div class="user__login">
        <h3>{{ $t('user.login.title') }}</h3>
        <form class="form" @submit.prevent="login">
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
                    :type="form.password.type"
                    placeholder="Enter a password"
                    v-model="form.data.password"
                    :invalid="form.validation.errors.password.length > 0"
                    :help="$t(form.validation.hints.password())"
                    icon-position="right">
                        {{ $t('user.password') }}
                        <div slot="icon" v-if="form.data.password">
                            <font-awesome-icon icon="eye" v-if="this.form.password.type === 'password'" @click="togglePassword"></font-awesome-icon>
                            <font-awesome-icon icon="eye-slash" v-else @click="togglePassword"></font-awesome-icon>
                        </div>
            </ui-textbox>
            <ui-button color="primary">{{ $t('user.login.button') }}</ui-button>

            <ul>
                <li><router-link :to="{ name: 'user.signup'}">{{ $t('user.signup.title') }}</router-link></li>
            </ul>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { USER_LOGIN, PUSH_ERROR_ALERT } from "@/store/types"

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
                    password: {
                      type: 'password'
                    },
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
                USER_LOGIN,
                PUSH_ERROR_ALERT,
            ]),
            resetErrors()
            {
                this.form.validation.errors = errors()
            },
            togglePassword(){
                this.form.password.type = this.form.password.type === 'password' ? 'text' : 'password'
            },
            login()
            {
                this.resetErrors()

                this.USER_LOGIN(this.form.data)
                    .then(()=>{
                        this.$router.push({ name: 'index' })
                    }).catch((error)=>{
                        if(error.response !== undefined) Object.assign(this.form.validation.errors, error.response.data.errors)

                        let message = error.response !== undefined ? this.$t(error.response.data.message) : error

                        this.PUSH_ERROR_ALERT(message)
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .user__login{
        form{
            .fa-eye, .fa-eye-slash{
                cursor: pointer;
            }
        }
    }
</style>

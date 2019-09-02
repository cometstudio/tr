<i18n src="../../i18n/user.json"></i18n>

<template>
    <div class="user__profile">
        <h3>{{ $t('user.profile.title') }}</h3>
        <form class="form" @submit.prevent="save">
            <ui-textbox
                    floating-label
                    type="text"
                    placeholder="Enter your name"
                    v-model="form.data.name"
                    :maxlength="32"
                    :invalid="form.validation.errors.name.length > 0 || form.data.name.length > 32"
                    :help="$t(form.validation.hints.name())">{{ $t('user.name') }}</ui-textbox>
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
            <ui-button color="primary">{{ $t('button.save') }}</ui-button>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { USER_SET, USER_SAVE, PUSH_ALERT, PUSH_ERROR_ALERT } from "@/store/types"

    const errors = ()=>{
        return {
            name: [],
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
                        name: '',
                        email: '',
                        password: ''
                    },
                    validation: {
                        errors: errors(),
                        hints: {
                            name: ()=>{
                                return this._.first(this.form.validation.errors.name)
                            },
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
        created(){
            this.USER_SET().then(()=>{
                this.form.data = this._.merge(this.form.data, this.user)
            })
        },
        computed: {
            user(){
                return this.$store.getters.user
            },
        },
        methods: {
            ...mapActions([
                USER_SET,
                USER_SAVE,
                PUSH_ALERT,
                PUSH_ERROR_ALERT,
            ]),
            resetErrors()
            {
                this.form.validation.errors = errors()
            },
            togglePassword(){
                this.form.password.type = this.form.password.type === 'password' ? 'text' : 'password'
            },
            save()
            {
                this.resetErrors()

                this.USER_SAVE(this.form.data)
                    .then((response)=>{
                        this.PUSH_ALERT({
                            message: this.$t(response.message)
                        })
                    }).catch((error)=>{
                        if(error.response !== undefined) Object.assign(this.form.validation.errors, error.response.data.errors)

                        this.PUSH_ERROR_ALERT(error)
                    })
            }
        }
    }
</script>

<style scoped>

</style>
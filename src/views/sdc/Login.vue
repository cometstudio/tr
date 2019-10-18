<template>
    <div class="sdc">
        <h3>Smart Delivery Login</h3>
        <div class="sdc__login">
            {{ login.name }}
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { mapActions } from 'vuex'
    import { START_LOADING, STOP_LOADING, PUSH_ERROR_ALERT } from "@/store/types"

    export default {
        data () {
            return {

            }
        },
        computed: {
            login() {
                this.$store.commit(START_LOADING)

                axios.get('/api/sdc/login')

                // axios.get('/api/sdc/login')
                //     .then((resolve) => {
                //         resolve()
                //
                //         return {
                //             "id": 1,
                //             "name": "Login_1",
                //             "sid": 3005
                //         }
                //     }).catch((error) => {
                //         return Promise.reject(error)
                //     }).then(()=>{
                //         this.$store.commit(STOP_LOADING)
                // })

                this.$store.commit(STOP_LOADING)

                return {
                    "id": 1,
                    "name": "Login_1",
                    "sid": 3005
                }
            }
        },
        methods: {
            ...mapActions([
                PUSH_ERROR_ALERT,
            ]),

        }
    }
</script>

<style lang="scss" scoped>
    .sdc{
        &__login{

        }
    }

    @media (max-width: $mobileMaxWidth) {}
</style>

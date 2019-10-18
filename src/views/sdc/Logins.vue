<template>
    <div class="sdc">
        <h3>Smart Delivery Logins</h3>
        <div class="sdc__logins">
            <div class="sdc__login" v-for="login in logins" :key="login.id">
                <div>{{ login.sid }}</div>
                <div><router-link :to="{ name: 'sdc.login', params: { id: login.id } }">{{ login.name }}</router-link></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { PUSH_ERROR_ALERT } from "@/store/types"

    export default {
        data () {
            return {
                logins: [
                    {
                        "id": 1,
                        "name": "Login_1",
                        "sid": 3005
                    },
                    {
                        "id": 2,
                        "name": "Login_2",
                        "sid": 3005
                    }
                ]
            }
        },
        methods: {
            ...mapActions([
                PUSH_ERROR_ALERT,
            ])
        }
    }
</script>

<style lang="scss" scoped>
    .sdc{
        &__logins{
            display: grid;
            grid-row-gap: $globalPadding / 2;
        }
        &__login{
            display: grid;
            grid-template-rows: auto;
            grid-template-columns: auto 3fr;
            grid-gap: $globalPadding;
        }
    }

    @media (max-width: $mobileMaxWidth) {}
</style>

<template>
    <div class="alerts">
        <ui-alert @dismiss="DISMISS_ALERT(index)" v-for="(alert, index) in alerts" :type="alert.type">
            {{ alert.message }}
        </ui-alert>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { DISMISS_ALERT } from "@/store/types"

    export default {
        name: "Alerts",
        computed: {
            alerts(){
                return this.$store.getters.alerts
            }
        },
        methods: {
            ...mapActions([
                DISMISS_ALERT
            ])
        }
    }
</script>
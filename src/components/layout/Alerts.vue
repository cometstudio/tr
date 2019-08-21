<template>
    <div class="alerts">
        <ui-alert @dismiss="dismiss(index)" v-for="(alert, index) in alerts" :type="alert.type">
            {{ alert.message }}
        </ui-alert>
        <ui-button @click="push">Push an alert</ui-button>
        <ui-button @click="reset">Remove all alerts</ui-button>
    </div>
</template>

<script>
    export default {
        name: "Alerts",
        computed: {
            alerts(){
                return this.$store.getters.alerts
            }
        },
        methods: {
            reset(){
                this.$store.dispatch('resetAlerts')
            },
            push(){
                this.$store.dispatch('pushAlert', {
                    content: 'Test error ' + Math.random()
                })
            },
            dismiss(index){
                this.$store.dispatch('dismissAlert', index)
            }
        }
    }
</script>

<style scoped>

</style>
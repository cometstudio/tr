<template>
    <div class="alerts">
        <ui-alert @dismiss="dismiss(index)" v-for="(alert, index) in alerts" :type="alert.type">
            {{ alert.message }}
        </ui-alert>
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
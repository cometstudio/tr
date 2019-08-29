<template>
    <div class="properties__filter">
        <form method="get">
            <div>
                <ui-select
                        has-search
                        disableFilter
                        multiple
                        placeholder="Select places..."
                        search-placeholder="Find..."
                        type="basic"
                        :loading="loading"
                        :options="areas"
                        @query-change="getAreas"
                        @select="onChange"
                        v-model="form.areas">

                        <template slot-scope="props" slot="option">
                            <font-awesome-icon icon="map-marker-alt"></font-awesome-icon> {{ props.option.name }}
                        </template>
                </ui-select>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { START_LOADING, STOP_LOADING, PUSH_ERROR_ALERT } from "@/store/types"

    export default {
        name: "PropertyFilter",
        data(){
            return {
                loading: false,
                areas: [],
                form: {
                    areas: []
                }
            }
        },
        created(){
            this.getAreas()
        },
        methods: {
            ...mapActions([
                PUSH_ERROR_ALERT,
            ]),
            getAreas(q){
                this.loading = true

                this.$axios.get('/api/areas', {
                        params: {
                            q: q
                        }
                    })
                    // Success
                    .then((res) => {
                        this.areas = res.data
                    // Failed
                    }).catch((err) => {
                        this.PUSH_ERROR_ALERT(err.response)
                    // Always
                    }).then(()=>{
                        this.loading = false
                    })
            },
            onChange(){
                this.$emit('change', this.form)
            }
        }
    }
</script>

<style scoped>

</style>
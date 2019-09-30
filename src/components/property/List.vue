<template>
    <div class="property-list">
        <div class="property-cards">
            <div v-for="property in properties" v-bind:key="property.id" class="property-card">
                <div class="property-card__images">
                    <img src="_https://tavridadom.ru/upload/iblock/d95/d95918e963b00c7d291ec437d6730201.jpg" />
                </div>
                <div class="property-card__title">
                    {{ property.name }}
                </div>
                <div v-if="property.price" class="property-card__price">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { START_LOADING, STOP_LOADING, PUSH_ERROR_ALERT } from "@/store/types"

    export default {
        name: "PropertyList",
        props: [
            'filter'
        ],
        data(){
            return {
                properties: []
            }
        },
        created(){
            //this.resetFilter()
            //this.getRegions()
            //this.$watch('filter.form', this.filterUpdated, {deep: true})
            this.getProperties()
        },
        watch: {
            filter: {
                handler(v){
                    console.log('Filter changed')
                    console.log(v)
                    this.getProperties()
                }, deep: true
            }
        },
        methods: {
            ...mapActions([
                PUSH_ERROR_ALERT,
            ]),
            getRegions()
            {
                // this.$store.commit(START_LOADING)
                //
                // this.$axios.get('/api/regions')
                //     // Success
                //     .then((res) => {
                //         // Set data
                //         this.regions = res.data
                //         // Set regions from the URL
                //         this.filter.form.regions = this.$route.query.regions || null
                //
                //         this.onRegionChange()
                //     // Failed
                //     }).catch((err) => {
                //         this.PUSH_ERROR_ALERT(err.response)
                //     // Always
                //     }).then(()=>{
                //         this.$store.commit(STOP_LOADING)
                //     })
            },
            getDistricts()
            {
                // this.$store.commit(START_LOADING)
                //
                // this.$axios.get('/api/regions')
                //     // Success
                //     .then((res) => {
                //         // Set data
                //         this.regions = res.data
                //         // Set regions from the URL
                //         this.filter.form.regions = this.$route.query.regions || null
                //
                //         this.onRegionChange()
                //     // Failed
                //     }).catch((err) => {
                //         this.PUSH_ERROR_ALERT(err.response)
                //     // Always
                //     }).then(()=>{
                //         this.$store.commit(STOP_LOADING)
                //     })
            },
            getProperties()
            {
                this.$store.commit(START_LOADING)

                this.$axios.post('/api/properties', this.filter.form)
                    // Success
                    .then((res) => {
                        this.properties = res.data
                    // Failed
                    }).catch((error) => {
                        if(error.response !== undefined) Object.assign(this.form.validation.errors, error.response.data.errors)

                        let message = error.response !== undefined ? this.$t(error.response.data.message) : error

                        this.PUSH_ERROR_ALERT(message)
                    // Always
                    }).then(()=>{
                        this.$store.commit(STOP_LOADING)
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .property{
        &-list {
            display: grid;
            grid-template-columns: 4fr;
            grid-template-rows: auto;
            grid-gap: 2rem;
        }
        &__filter{
            grid-row: 1;
            margin-bottom: 2rem;
            form{
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: flex-end;
                > div{
                    flex-basis: 20%;
                }
            }
        }
        &-cards{
            grid-row: 2;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: auto;
            grid-gap: 2rem;
        }
        &-card{
            &__images{
                img{
                    max-width: 100%;
                }
            }
            &__title, &__price{
                padding: 1rem 0 0;
            }
            &__price{
                font-size: 1.1rem;
                font-weight: bold;
            }
        }
    }
</style>
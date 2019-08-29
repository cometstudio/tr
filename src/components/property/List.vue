<template>
    <div class="property-list">
        <div class="property-filter">
            Property filter
            <form method="get">
                <div v-if="filter.on">
                    <a href="" @click.prevent="resetFilter">Reset filter</a>
                </div>
                <ui-select
                        has-search
                        label="Regions"
                        multiple
                        placeholder="Select..."
                        type="basic"
                        :options="allRegions"
                        v-model="regions"
                ></ui-select>
            </form>
        </div>
        <div class="property-cards">
            <div v-for="property in properties" v-bind:key="property.id" class="property-card">
                <div class="property-card__images">
                    <img src="https://media-cdn.tripadvisor.com/media/vr-splice-j/04/c3/00/df.jpg" />
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
    import { START_LOADING, STOP_LOADING, PUSH_ERROR_ALERT } from "@/store/types"

    const filter = () => {
        return {
            on: true,
            form: {
                regions: '',
                districts: [],
            }
        }
    }

    export default {
        name: "PropertyList",
        data(){
            return {
                filter: filter(),
                regions: '',
                districts: [],
                properties: [],
                allRegions: [
                    {
                        label: 'Antalya',
                        value: 1
                    },
                    {
                        label: 'Alaniya',
                        value: 2
                    }
                ]
            }
        },
        created(){
            this.resetFilter()
            //this.getRegions()
            //this.$watch('filter.form', this.filterUpdated, {deep: true})
            this.getProperties()
        },
        methods: {
            ...mapActions([
                PUSH_ERROR_ALERT,
            ]),
            resetFilter(){
                this.filter = filter()
            },
            filterUpdated(newV, oldV) {
                this.filter.on = true

                //this.getProperties()
            },
            getRegions()
            {
                this.$store.commit(START_LOADING)

                this.$axios.get('/api/regions')
                    // Success
                    .then((res) => {
                        // Set data
                        this.regions = res.data
                        // Set regions from the URL
                        this.filter.form.regions = this.$route.query.regions || null

                        this.onRegionChange()
                    // Failed
                    }).catch((err) => {
                        this.PUSH_ERROR_ALERT(err.response)
                    // Always
                    }).then(()=>{
                        this.$store.commit(STOP_LOADING)
                    })
            },
            onRegionChange(){
                //console.log(this.filter.form)
                // Set data
                if(this.filter.form.regions !== null && this.filter.form.regions.length){
                    this.filter.form.regions.every((v)=>{
                        //console.log(v)
                        //this.districts.push(this.regions[this.filter.form.region].districts)
                    })

                }
                // Set districts from the URL
                this.filter.form.districts = this.$route.query.districts || null
            },
            getProperties()
            {
                this.$store.commit(START_LOADING)

                this.$axios.get('/api/properties', {params: this.filter.form })
                    // Success
                    .then((res) => {
                        this.properties = res.data
                    // Failed
                    }).catch((err) => {

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
        &-list{
            display: grid;
            grid-template-columns: 4fr;
            grid-template-rows: auto;
            grid-gap: 2rem;
        }
        &-filter{
            grid-row: 1;
            margin-bottom: 2rem;
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
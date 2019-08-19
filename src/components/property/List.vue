<template>
    <div class="property-list">
        <div class="property-filter">
            <form method="get">
                <div v-if="filter.on">
                    <a href="" @click.prevent="resetFilter">Reset filter</a>
                </div>
                <div v-for="region in regions" v-bind:key="region.id">
                    <label><input v-bind:value="region.id" v-model="filter.form.regions" type="checkbox">{{ region.name }}</label>
                </div>
                <div v-if="districts.length">
                    <div v-for="district in districts" v-bind:key="district.id">
                        <label><input v-bind:value="district.id" v-model="filter.form.districts" type="checkbox">{{ district.name }}</label>
                    </div>
                </div>
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
                    {{ property.price }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const filter = () => {
        return {
            on: false,
            form: {
                regions: [],
                districts: [],
            }
        }
    }

    export default {
        name: "PropertyList",
        data(){
            return {
                filter: filter(),
                regions: [],
                districts: [],
                properties: []
            }
        },
        created(){
            this.resetFilter()
            this.getRegions()
            //this.$watch('filter.form', this.filterUpdated, {deep: true})
        },
        methods: {
            resetFilter(){
                this.filter = filter()
            },
            filterUpdated(newV, oldV) {
                console.log('filter updated', newV)
                this.filter.on = true

                //this.getProperties()
            },
            getRegions()
            {
                // Show the progress bar
                this.$Progress.start()

                this.$axios.get('/api/regions')
                // Success
                    .then((res) => {
                        // Hide the progress bar
                        this.$Progress.finish()
                        // Set data
                        this.regions = res.data
                        // Set regions from the URL
                        this.filter.form.regions = this.$route.query.regions || null

                        this.onRegionChange()
                        // Failed
                    }).catch((err) => {
                        console.log(err)
                        // Switch to the error progress bar
                        this.$Progress.fail()
                    })
            },
            onRegionChange(){
                console.log(this.filter.form)
                // Set data
                if(this.filter.form.regions !== null && this.filter.form.regions.length){
                    this.filter.form.regions.every((v)=>{
                        console.log(v)
                        //this.districts.push(this.regions[this.filter.form.region].districts)
                    })

                }
                // Set districts from the URL
                this.filter.form.districts = this.$route.query.districts || null
            },
            getProperties()
            {
                // Show the progress bar
                this.$Progress.start()

                this.$axios.get('/api/properties', {params: this.filter.form })
                    // Success
                    .then((res) => {
                        // Hide the progress bar
                        this.$Progress.finish()
                        // Set data
                        this.properties = res.data
                        // Failed
                    }).catch((err) => {
                        // Switch to the error progress bar
                        this.$Progress.fail()
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .property{
        &-list{
            display: grid;
            grid-template-columns: 1fr 3fr;
            grid-template-rows: auto;
            grid-gap: 2rem;
        }
        &-filter{
            grid-column: 1;
            margin-bottom: 2rem;
        }
        &-cards{
            grid-column: 2;
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
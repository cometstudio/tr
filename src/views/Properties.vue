<template>
    <div class="properties">
        <PropertyFilter @change="onFilterChange"></PropertyFilter>
        <PropertyList v-bind:filter="filter"></PropertyList>
    </div>
</template>

<script>
  import PropertyFilter from '../components/property/Filter'
  import PropertyList from '../components/property/List'

export default {
    name: 'Properties',
    data(){
        return {
            filter: {
                form: {
                    data: {}
                }
            }
        }
    },
    components: {
        PropertyFilter,
        PropertyList
    },
    methods: {
        onFilterChange(data){
            this.filter.form.data = data
        }
    }
}
</script>

<style type="scss" scoped>

</style>
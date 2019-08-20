<template>
  <div class="about">
    <h3>Flexbox testing</h3>
    <div class="test-flex">
        <div v-for="i in 5">{{ i }}</div>
    </div>
  </div>
</template>

<script>
    export default {
        data(){
            return{
                loading: this.$store.getters.loading,
                position: 'left'
            }
        },
        computed: {
            height(){
                return () => Math.random() * 100
            }
        },
        watch: {
            loading(){
                this.$store.commit('setLoading', this.loading)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .test-flex{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: baseline;
        min-height: 200px;
        > div{
            @include bg('secondary');
            @include color('white');

            padding: 1rem;
            &:nth-child(1){
                flex-basis: 20%;
            }
            &:nth-child(3){
                flex-grow: 1;
            }
        }
    }
</style>

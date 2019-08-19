<template>
  <div class="about">
    <h3>Flexbox testing</h3>
    <div class="test-flex">
        <div v-for="i in 3">{{ i }}</div>
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
        > div{
            @include bg('secondary');
            @include color('white');

            padding: 1rem;
        }
    }
</style>

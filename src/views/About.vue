<template>
  <div class="about">
    About view
      <p>
        <ui-button>Raised</ui-button>
        <ui-button color="primary">Raised primary</ui-button>
      </p>
      <p>
          <ui-radio-group
                  name="icon_position"
                  :options="['left', 'right']"
                  v-model="position">Icon Position</ui-radio-group>
      </p>
      <p>
          <ui-switch v-model="loading">
              Loading: <code>{{ loading ? 'true' : 'false' }}</code>
          </ui-switch>
      </p>
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

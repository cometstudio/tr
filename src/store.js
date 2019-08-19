import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
  },
  getters: {
      loading: state => {
          return state.loading
      }
  },
  mutations: {
      setLoading: (state, visible) => {
          state.loading = visible
      },
  },
  actions: {
      loadBegins: (context) => {
          context.commit('setLoading', true)
      },
      loadEnds: (context) => {
          context.commit('setLoading', false)
      },
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const defaultUser = () => {
    return {
        id: null,
        name: 'guest'
    }
}

const defaultState = () => {
    return {
        loading: false,
        locale: 'ru',
        apiToken: null,
        user: defaultUser()
    }
}

export default new Vuex.Store({
  state: defaultState(),
  getters: {
      loading: state => {
          return state.loading
      },
      locale: state => {
          return state.locale
      },
      user: state => {
          return state.user
      },
  },
  mutations: {
      reset: state => {
          // Clear the local storage
          window.localStorage.clear()
          // Set default app state
          Object.assign(state, defaultState())

          console.log(state)
      },
      setLoading: (state, visible) => {
          state.loading = visible
      },
      setLocale: (state, locale) => {
          if(locale === undefined){
              // Get locale being stored
              let storedLocale = window.localStorage.getItem('locale')
              // Set state locale if stored
              if(storedLocale !== null) state.locale = storedLocale
          }else{
              // Save locale in the local storage
              window.localStorage.setItem('locale', locale)
              // Set state locale
              state.locale = locale
          }
      },
      setApiToken: (state, apiToken) => {
          if(apiToken === undefined){
              // Set token being stored
              state.apiToken = window.localStorage.getItem('apiToken')
          }else{
              // Save token in the local storage
              window.localStorage.setItem('apiToken', apiToken)
              // Set state token
              state.apiToken = apiToken
          }
      },
      setUser: (state, user) => {
          if(user === undefined){
              // Get user being stored
              let storedUser = window.localStorage.getItem('user')
              // Set default user if no stored one
              state.user = storedUser === null ? defaultUser() : JSON.parse(storedUser)
          }else{
              // Save user in the local storage
              window.localStorage.setItem('user', JSON.stringify(user))
              // Set state user
              state.user = user
          }
      },
  },
  actions: {
      reset: context => {
          context.commit('reset')
      },
      loadBegins: (context) => {
          context.commit('setLoading', true)
      },
      loadEnds: (context) => {
          context.commit('setLoading', false)
      },
      setLocale: (context, payload) => {
          context.commit('setLocale', payload)
      },
      setUser: (context, payload) => {
          context.commit('setUser', payload)
      },
      setApiToken: (context, payload) => {
          context.commit('setApiToken', payload)
      }
  }
})

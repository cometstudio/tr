import Vue from 'vue'
import Vuex from 'vuex'

import * as types from './mutation_types';

Vue.use(Vuex)


const defaultAlert = () => {
    return {
        timeout: undefined,
        type: 'success',
        content: String
    }
}

const defaultUser = () => {
    return {
        id: null,
        name: 'guest'
    }
}

const defaultState = () => {
    return {
        loading: false,
        alerts: [],
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
      alerts: state => {
          return state.alerts
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
          Object.assign(state, defaultState())
      },
      setLoading: (state, visible) => {
          state.loading = visible
      },
      [types.RESET_ALERTS](state){
          state.alerts = []
      },
      [types.PUSH_ALERT](state, alert){
          state.alerts.push(alert)
      },
      [types.DISMISS_ALERT](state, index){
          if(index === undefined){
              state.alerts.shift()
          }else{
              state.alerts.splice(index, 1)
          }
      },
      setLocale: (state, locale) => {
          state.locale = locale
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
          window.localStorage.clear()
          context.commit('reset')
      },
      loadBegins: context => {
          context.commit('setLoading', true)
      },
      resetAlerts: ({ commit }, payload) => {
          commit(types.RESET_ALERTS, payload)
      },
      pushAlert: ({ commit }, payload) => {
          const alert = Object.assign(defaultAlert(), payload)

          return new Promise((resolve) => {
              commit(types.PUSH_ALERT, alert)

              setTimeout(() => {
                  commit(types.DISMISS_ALERT)
                  resolve()
              }, 3000)
          })
      },
      dismissAlert: ({ commit }, index) => {
          commit(types.DISMISS_ALERT, index)
      },
      loadEnds: (context) => {
          context.commit('setLoading', false)
      },
      setLocale: (context, locale) => {
          if(locale === undefined){
              // Get locale being stored
              let storedLocale = window.localStorage.getItem('locale')
              // Set state locale if stored
              if(storedLocale !== null) context.commit('setLocale', storedLocale)
          }else{
              // Save locale in the local storage
              window.localStorage.setItem('locale', locale)
              // Set state locale
              context.commit('setLocale', locale)
          }
      },
      setUser: (context, payload) => {
          context.commit('setUser', payload)
      },
      setApiToken: (context, payload) => {
          context.commit('setApiToken', payload)
      }
  }
})

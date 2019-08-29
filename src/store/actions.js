import * as types from "./types"
import { defaultAlert } from './defaults'
import axios from 'axios'

export default {
    [types.RESET_STORE]: ({commit}) => {
        return new Promise((resolve) => {
            window.localStorage.clear()
            commit(types.RESET_STORE)
            resolve()
        })
    },
    [types.RESET_ALERTS]: ({ commit }, payload) => {
        commit(types.RESET_ALERTS, payload)
    },
    [types.PUSH_ALERT]: ({ commit }, payload) => {
        const alert = Object.assign(defaultAlert(), payload)

        return new Promise((resolve) => {
            commit(types.PUSH_ALERT, alert)

            setTimeout(() => {
                commit(types.DISMISS_ALERT)
                resolve()
            }, 3000)
        })
    },
    [types.PUSH_ERROR_ALERT]: ({ dispatch }, payload) => {
        const alert = Object.assign(defaultAlert(), {type: 'error'}, payload)

        dispatch(types.PUSH_ALERT, alert)
    },
    [types.PUSH_WARNING_ALERT]: ({ dispatch }, payload) => {
        const alert = Object.assign(defaultAlert(), {type: 'warning'}, payload)

        dispatch(types.PUSH_ALERT, alert)
    },
    [types.DISMISS_ALERT]: ({ commit }, index) => {
        commit(types.DISMISS_ALERT, index)
    },
    [types.SET_LOCALE]: ({commit}, locale) => {
        if(locale === undefined){
            // Get locale being stored
            let storedLocale = window.localStorage.getItem('locale')
            // Set state locale if stored
            if(storedLocale !== null) commit(types.SET_LOCALE, storedLocale)
        }else{
            // Save locale in the local storage
            window.localStorage.setItem('locale', locale)
            // Set state locale
            commit(types.SET_LOCALE, locale)
        }
    },
    [types.SIGNUP]: ({ commit, dispatch }, payload)=>{
        return new Promise((resolve, reject) => {
            commit(types.START_LOADING)

            axios.post('/api/user/signup', payload)
                .then((response) => {
                    dispatch(types.LOGIN, payload)
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                }).then(()=>{
                    commit(types.STOP_LOADING)
                })
        })
    },
    [types.LOGIN]: ({ commit, dispatch }, payload)=>{
        return new Promise((resolve, reject) => {
            commit(types.START_LOADING)

            axios.post('/api/user/login', payload)
                .then((response) => {
                    commit(types.SET_API_TOKEN, response.data.api_token)
                    commit(types.SET_USER, response.data.user)
                    resolve(response.data.user)
                }).catch((error) => {
                    reject(error)
                }).then(()=>{
                    commit(types.STOP_LOADING)
                })
        })
    },
    [types.SET_USER]: (context, payload) => {
        context.commit(types.SET_USER, payload)
    },
    [types.SET_API_TOKEN]: (context, payload) => {
        context.commit('setApiToken', payload)
    }
}
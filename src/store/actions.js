import * as types from "./types"
import { defaultAlert } from './defaults'
import axios from 'axios'
import i18n from '@/i18n'

export default {
    [types.RESET_STORE]: ({commit}) => {
        return new Promise((resolve, reject) => {
            commit(types.START_LOADING)

            axios.post('/api/user/logout')
                .then(() => {
                    window.localStorage.clear()
                    commit(types.RESET_STORE)
                    resolve()
                }).catch((error) => {
                    reject(error)
            }).then(()=>{
                commit(types.STOP_LOADING)
            })
        })
    },
    [types.RESET_ALERTS]: ({ commit }, payload) => {
        commit(types.RESET_ALERTS, payload)
    },
    [types.PUSH_ALERT]: ({ commit }, payload) => {
        let alert = Object.assign(defaultAlert(), payload)

        return new Promise((resolve) => {
            commit(types.PUSH_ALERT, alert)

            setTimeout(() => {
                commit(types.DISMISS_ALERT)
                resolve()
            }, 3000)
        })
    },
    [types.PUSH_SUCCESS_ALERT]: ({ dispatch }, payload) => {
        let alert = Object.assign({ message: message })
        dispatch(types.PUSH_ALERT, alert)
    },
    [types.PUSH_ERROR_ALERT]: ({ dispatch }, message) => {
        let alert = Object.assign({ message: message, type: 'error' })
        dispatch(types.PUSH_ALERT, alert)
    },
    [types.PUSH_WARNING_ALERT]: ({ dispatch }, message) => {
        let alert = Object.assign({ message: message, type: 'warning' })
        dispatch(types.PUSH_ALERT, alert)
    },
    [types.DISMISS_ALERT]: ({ commit }, index) => {
        commit(types.DISMISS_ALERT, index)
    },
    [types.SET_LOCALE]: ({ commit }, locale) => {
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
    [types.USER_SIGNUP]: ({ commit, dispatch }, payload)=>{
        return new Promise((resolve, reject) => {
            commit(types.START_LOADING)

            axios.post('/api/user/signup', payload)
                .then((response) => {
                    dispatch(types.USER_LOGIN, payload)
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                }).then(()=>{
                    commit(types.STOP_LOADING)
                })
        })
    },
    [types.USER_LOGIN]: ({ commit, dispatch }, payload)=>{
        return new Promise((resolve, reject) => {
            commit(types.START_LOADING)

            axios.post('/api/user/login', payload)
                .then((response) => {
                    commit(types.SET_API_TOKEN, response.data.api_token)
                    commit(types.USER_SET, response.data.user)
                    resolve(response.data.user)
                }).catch((error) => {
                    reject(error)
                }).then(()=>{
                    commit(types.STOP_LOADING)
                })
        })
    },
    [types.USER_SAVE]: ({ commit, dispatch }, payload)=>{
        return new Promise((resolve, reject) => {
            commit(types.START_LOADING)

            axios.post('/api/user', payload)
                .then((response) => {
                    commit(types.USER_SET, response.data.user)
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                }).then(()=>{
                    commit(types.STOP_LOADING)
                })
        })
    },
    [types.USER_SET]: (context, payload) => {
        context.commit(types.USER_SET, payload)
    },
    [types.SET_API_TOKEN]: (context, payload) => {
        context.commit('setApiToken', payload)
    }
}
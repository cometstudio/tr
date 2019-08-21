import * as types from "./types"
import { defaultAlert } from './defaults'

export default {
    reset: ({commit}) => {
        window.localStorage.clear()
        commit(types.RESET)
    },
    loading: ({ commit }, payload)=>{
        switch (payload){
            default:
                commit(types.SET_LOADING, 1)
            break
            case false:
                commit(types.SET_LOADING, -1)
            break
        }
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
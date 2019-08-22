import * as types from "./types"
import { defaultUser, defaultState } from './defaults'

export default {
    [types.RESET](state){
        Object.assign(state, defaultState())
    },
    [types.SET_LOADING](state, value){
        state.loading += value
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
    setApiToken: (state, api_token) => {
        if(api_token === undefined){
            // Set token being stored
            state.api_token = window.localStorage.getItem('api_token')
        }else{
            // Save token in the local storage
            window.localStorage.setItem('api_token', api_token)
            // Set state token
            state.api_token = api_token
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
}
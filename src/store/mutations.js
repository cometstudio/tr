import * as types from "./types"
import { defaultState, defaultUser } from './defaults'

export default {
    [types.RESET_STORE](state){
        Object.assign(state, defaultState())
    },
    [types.START_LOADING](state){
        state.loading += 1
    },
    [types.STOP_LOADING](state){
        state.loading -= 1
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
    [types.SET_LOCALE]: (state, locale) => {
        console.log(locale)
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
import { defaultUser } from './defaults'

export default {
    loading: state => {
        return state.loading > 0
    },
    alerts: state => {
        return state.alerts
    },
    locale: state => {
        return state.locale
    },
    user: state => {
        return state.user.id === null ? defaultUser() : state.user
    },
    isLoggedIn: state => {
        return state.user.id !== null
    },
}
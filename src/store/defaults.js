export const defaultState = () => {
    return {
        loading: 0,
        alerts: [],
        locale: 'ru',
        apiToken: null,
        user: defaultUser()
    }
}

export const defaultAlert = () => {
    return {
        timeout: undefined,
        type: 'error',
        message: String('Error')
    }
}

export const defaultUser = () => {
    return {
        id: null,
        name: 'guest',
        apiToken: 'guest'
    }
}
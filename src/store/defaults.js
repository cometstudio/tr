export const defaultState = () => {
    return {
        loading: 0,
        alerts: [],
        locale: 'en',
        api_token: '',
        user: defaultUser()
    }
}

export const defaultAlert = () => {
    return {
        timeout: null,
        message: 'Success',
        type: 'success',
        code: 200,
    }
}

export const defaultUser = () => {
    return {
        id: null,
        name: String('guest')
    }
}
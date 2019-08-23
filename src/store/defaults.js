export const defaultState = () => {
    return {
        loading: Number(0),
        alerts: Array(),
        locale: String('ru'),
        api_token: String(),
        user: defaultUser()
    }
}

export const defaultAlert = () => {
    return {
        timeout: null,
        message: String('Success'),
        type: String('success'),
        code: Number(200),
    }
}

export const defaultUser = () => {
    return {
        id: null,
        name: String('guest')
    }
}
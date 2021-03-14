import api from './apiConfig'

export const signUp = async credentials => {
    try {
        const resp = await api.post('auth/sign-up', credentials)
        localStorage.setItem('token', resp.data.token)
        return resp.data
    } catch (error) {
        throw error
    }
}

export const signInUser = async credentials => {
    
    try {
        const resp = await api.post('/auth/sign-in', credentials)
        localStorage.setItem('token', resp.data.token)
        return resp.data
    } catch (error) {
        throw error
    }
}

export const signOut = async user => {
    try {
        await localStorage.clear()
        return true
    } catch (error) {
        throw error
    }
}

export const changePassword = async (passwords, user) => {
    try {
        const resp = await api.post('/')
        return resp.data
    } catch (error) {
        throw error
    }
}

export const verifyUser = async () => {
    const token = localStorage.getItem('token')
    // console.log(token)
    if (token) {
        const res = await api.get('/auth/verify')
        return res.data
    }
    return false
}

export const removeToken = () => {
    
    api.defaults.headers.common.authorization = null
  }
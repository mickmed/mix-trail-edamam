import api from './apiConfig'

export const getRecipes = async () => {
    try {
        const resp = await api.get('/recipes')
        return resp.data
    } catch (error) {
        throw error
    }
}

export const getRecipeById = async id => {
    try {
        const resp = await api.get(`recipes/${id}`)
        
        return resp.data
    } catch (error) {
        throw error
    }
}

export const createRecipe = async item => {
    try {
        const resp = await api.post('/recipes', item)
        return resp
    } catch (error) {
        throw error
    }
}

export const updateRecipe = async (id, item) => {
    try {
        const resp = await api.put(`/recipes/${id}`, item)
        return resp.data
    } catch (error) {
        throw error
    }
}

export const deleteRecipe = async id => {
    try {
        const resp = await api.delete(`/recipes/${id}`)
        return resp.data
    } catch (error) {
        throw error
    }
}

export const getUserRecipes = async id => {
    try{
        const resp = await api.get(`/recipes/users/${id}`)
        return resp.data
    }catch (error) {
        throw error
    }
}

export const searchRecipes = async name => {
    console.log(name)
    try{
        const resp = await api.get(`/recipes/search/${name}`)
        return resp.data
    }catch (error){
        throw error
    }
}
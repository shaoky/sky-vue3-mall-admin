import * as types from '../types'
import { getUserInfo } from '../..//api/getData'

const state = {
    userInfo: null,
    token: JSON.parse(window.localStorage.getItem('token')) || {}
}

const getters = {
    getUserInfo (state) {
        return state.userInfo
    },
    getToken (state) {
        return state.token
    }
}

// 异步调用
const actions = {
    async [types.AGetUserInfo] ({commit}) {
        commit(types.MSetUserInfo, await getUserInfo())
        // http.get('admins/current').then(resp => {
        //     commit(types.MSetUserInfo, resp.data)
        // })
    }
}

// 同步调用
const mutations = {
    [types.MSetUserInfo] (state, user) {
        // console.log(state, user)
        state.userInfo = user.data
        // window.localStorage.setItem('user', JSON.stringify(user))
    },
    [types.MSetToken] (state, user) {
        console.log(333)
        state.token = user
        console.log(222)
        window.localStorage.setItem('token', JSON.stringify(user))
    },
    [types.MDelToken] (state, token) {
        state.token = ''
        window.localStorage.removeItem('token')
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

import {doLogin, getUserInfoByToken} from '@/api/request'
import {setStore, clearStore, getStore} from '@/utils/storeUtils'

const userModule = {
    state: {
        user: null,
        jwt: null
    },
    mutations: {
        SET_USER(state, userMsg) {
            let {uname, city, age} = userMsg
            let user = null

            if (state.user == null) {
                state.user = {}
            }
            user = state.user
            user.uuid = userMsg.uuid
            user.username = uname
            user.city = city
            user.age = age
            setStore({
                name: 'userInfo',
                content: user
            })
        },
        SET_JWT(state, jwt) {
            state.jwt = jwt
            setStore({
                name: 'userJwt',
                content: jwt
            })
        },
        CLEAR_MODULE(state) {
            state.user = null
            state.jwt = null
            clearStore({ type: 'clearAll'} )
        }
    },
    actions: {
        login({commit}, payload) {
            let {username, password} = payload
            return doLogin(username, password)
                .then(res => {
                    let {user, jwt} = res
                    commit('SET_USER', user)
                    commit('SET_JWT', jwt)
                }).catch(err =>
                    {
                        // return Promise.reject(err)
                        return err
                    }
                )
        },
        logout({commit}) {
            commit('CLEAR_MODULE')
        },
        getInfo({commit}) {
            return getUserInfoByToken().then(res => {
                let { user } = res
                commit('SET_USER', user)
            }).catch(err => {
                return Promise.reject(err)
            })
        }
    },
    getters: {
        getUser(state) {
            let user = state.user

            if (!user) {
                user = getStore({
                    name: 'userInfo'
                })
            }
            return user
        }
    }
}

export default userModule
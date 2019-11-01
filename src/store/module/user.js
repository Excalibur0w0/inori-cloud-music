import {doLogin, getUserInfoByToken, updateUser} from '@/api/request'
import {setStore, clearStore, getStore} from '@/utils/storeUtils'
import {dateFormat} from '@/utils/transdate'

const userModule = {
    state: {
        user: null,
        jwt: null
    },
    mutations: {
        SET_USER(state, userMsg) {
            let {uname, city, age, description, gender, birthday} = userMsg
            let user = null

            if (state.user == null) {
                state.user = {}
            }
            user = state.user
            user.uuid = userMsg.uuid
            user.uname = uname
            user.city = city
            user.gender = gender
            user.age = age
            if (birthday) {
                user.birthday = dateFormat("YYYY-mm-dd", new Date(birthday))
            }
            user.description = description
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
            let {uname, password} = payload
            return doLogin(uname, password)
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
        },
        updateUser({commit}, form) {
            return updateUser(form).then(user => {
                commit('SET_USER', user)
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
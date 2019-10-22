import router from './index'
import {getToken} from '@/utils/tokenUitls'
import store from '@/store'

router.beforeEach((to, from, next) => {
    let user = store.getters.getUser;

    if (to.path !== '/login') {
        if (!user) {
            if (getToken()) {
                store.dispatch('getInfo').then(res => {
                    // eslint-disable-next-line no-console
                    console.log(res)
                    store.commit('SET_USER', res)
                    next();
                }).catch(() => {
                    next('/login')
                })
            } else {
                // 跳转登陆
                next('/login')
            }
        } else {
            next()
        }
    } else {
        next()
    }
})
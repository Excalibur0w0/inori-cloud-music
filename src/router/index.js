import Vue from 'vue'
import Router from 'vue-router'
import AppMain from '@/AppMain'

import Home from '@/pages/Home'
import UserCenter from '@/pages/UserCenter'
import Login from '@/pages/Login.vue'
import Sheet from '@/pages/Sheet'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'AppMain',
            component: AppMain,
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    name: 'Home',
                    component: Home
                },
                {
                    path: '/userCenter',
                    name: 'UserCenter',
                    component: UserCenter
                },
                {
                    path: '/sheet/:id',
                    name: 'Sheet',
                    component: Sheet
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})


export default router
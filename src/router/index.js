import Vue from 'vue'
import Router from 'vue-router'
import AppMain from '@/AppMain'

import Home from '@/pages/Home'
import UserCenter from '@/pages/UserCenter'
import Login from '@/pages/Login.vue'
import Sheet from '@/pages/Sheet'
import SearchSongList from '@/pages/SearchSongList'
import LikeSongList from '@/pages/LikeSongList'
import Discovery from '@/pages/Discovery'
import AlterUser from '@/pages/AlterUser'


import Test from '@/components/ImageCuter'

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
                },
                {
                    path: '/searchSongList',
                    name: 'SearchSongList',
                    component: SearchSongList
                },
                {
                    path: '/likeSongList/:id',
                    name: 'LikeSongList',
                    component: LikeSongList
                },
                {
                    path: '/discovery',
                    name: 'Discovery',
                    component: Discovery
                },
                {
                    path: '/alterUser/:id',
                    name: 'AlterUser',
                    component: AlterUser
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/test',
            name: 'Test',
            component: Test
        }
    ]
})


export default router
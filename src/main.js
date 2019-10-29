import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import './theme/theme-red.scss'
// import 'vue-material/dist/theme/default-dark.css' // This line here
import router from './router'
import Prompt from '@/public/Prompt'
import ProgressSpinner from '@/public/ProgressSpinner.vue'
import { installComponent } from './utils/install'
import store from './store';
import Alert from '@/public/Alert'
import './router/preRouter'
import '@/api/interceptor'
import VueCarousel from 'vue-carousel';

Vue.use(VueMaterial)
Vue.use(VueCarousel);
// material没有提供全局函数，所以只能自己封装
Vue.use(installComponent(Prompt, '$prompt'))
Vue.use(installComponent(ProgressSpinner, '$progress'))
Vue.use(installComponent(Alert, '$alert'))

Vue.config.productionTip = false

export default new Vue({
    render: h => h(App),
    router: router,
    store
}).$mount('#app')

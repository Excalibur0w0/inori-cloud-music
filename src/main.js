import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css' // This line here
import 'material-design-icons/iconfont/material-icons.css'
import router from './router/router'

Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router: router
}).$mount('#app')

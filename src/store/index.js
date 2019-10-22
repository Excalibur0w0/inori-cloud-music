import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import userModule from "@/store/module/user";
import sheetModule from '@/store/module/sheet'

Vue.use(Vuex)

const store = new Store({
    modules: {
        userModule,
        sheetModule
    }
})

export default store;
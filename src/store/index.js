import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import userModule from "@/store/module/user";
import sheetModule from '@/store/module/sheet'
import songModule from '@/store/module/song'
import audioModule from '@/store/module/audio'

Vue.use(Vuex)

const store = new Store({
    modules: {
        userModule,
        sheetModule,
        songModule,
        audioModule
    }
})

export default store;
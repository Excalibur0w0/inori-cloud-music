

const audioModule = {
    state: {
        playList: [

        ],
        curPlay: {}
    },
    mutations: {
        SET_CUR_PLAY(state, music) {
            state.curPlay = music
        }
    },
    actions: {
        changeCurPlay({commit}, music) {
            commit('SET_CUR_PLAY', music)
        }
    },
    getters: {
        curPlay: state => state.curPlay
    }
}

export default audioModule
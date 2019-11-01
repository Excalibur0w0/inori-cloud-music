import index from 'vue-carousel/src'

const PLAY_MODEL = {
    DEFAULT: "DEFAULT",
}
const stateObj = {
    playList: [

    ],
    recordPlayList: [],
    curPlay: {},
    // curIndex: 0,
    playModel: PLAY_MODEL.DEFAULT
}
let curIndex = -1
Object.defineProperty(stateObj, "curIndex", {
    get() {
        return curIndex;
    },
    set(value) {
        if (!Number.isNaN(value)) {
            let nextSong = stateObj.playList[value]
            if (!nextSong) {
                throw new Error("不存在 index为: " + value + "的歌曲")
            }
            stateObj.curPlay = nextSong;
            curIndex = value;
        } else {
            throw new Error("curIndex不能为NaN！")
        }
    }
})

const audioModule = {
    state: stateObj,
    mutations: {
        SET_CUR_PLAY(state, music) {
            state.curPlay = music
        },
        RREFRESH_LIST(state, list) {
            state.playList = list
            // 如果当前有播放的歌曲，找到其所在位置
            if (state.curPlay.uuid && state.curPlay.uuid.length > 0) {
                state.curIndex = list.indexOf(song => song.uuid === state.curPlay)

            }
        },
        NEXT_SONG(state) {
            let hasError = false;
            let oldIndex = state.curIndex;
            try {
                if (state.playModel === PLAY_MODEL.DEFAULT) {
                    state.curIndex = (state.curIndex + 1) % state.playList.length;
                }
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error(e);
                hasError = true
            }

            if (!hasError) {
                state.recordPlayList.push(oldIndex)
            }
        },
        PREV_SONG(state) {

        }

    },
    actions: {
        changeCurPlay({commit}, music) {
            commit('SET_CUR_PLAY', music)
        },
        refreshList({commit}, list) {
            commit('REFRESH_LIST', list);
        },
        nextSong({commit}) {
            commit('NEXT_SONG')
        }
    },
    getters: {
        curPlay: state => state.curPlay
    }
}

export default audioModule
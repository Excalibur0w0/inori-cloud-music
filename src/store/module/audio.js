import index from 'vue-carousel/src'

const PLAY_MODEL = {
    DEFAULT: "DEFAULT",
    RANDOM: "RANDOM"
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
        GET_CUR_INDEX(state) {
            return state.curIndex;
        },
        SET_CUR_PLAY(state, music) {
            state.curPlay = music
        },
        SET_CUR_INDEX(state, index) {
            if (index < state.playList.length) {
                state.curIndex = index;
            } else {
                throw new Error("选定的曲子在播放列表中的序号不能大于播放列表的长度");
            }
        },
        REFRESH_PLAY_LIST(state, list) {
            if (state.playList !== list) {
                state.playList = list
                state.recordPlayList = []
                // 如果当前有播放的歌曲，找到其所在位置
                if (state.curPlay.uuid && state.curPlay.uuid.length > 0) {
                    let number = list.findIndex(song => {
                        return song.uuid === state.curPlay.uuid
                    })
                    state.curIndex = number

                }
            }
        },
        NEXT_SONG(state) {
            let hasError = false;
            let oldIndex = state.curIndex;

            try {
                if (state.playModel === PLAY_MODEL.DEFAULT) {
                    state.curIndex = (state.curIndex + 1) % state.playList.length;
                } else if (state.playModel === PLAY_MODEL.RANDOM) {
                    state.curIndex = Math.floor(Math.random(0, state.playList.length) * 10)
                }
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error(e);
                hasError = true
            }

            if (!hasError) {
                let prevSong = state.playList[oldIndex]
                if (prevSong) {
                    state.recordPlayList.push(prevSong)
                }
            }
        },
        PREV_SONG(state) {
            if (state.recordPlayList && state.recordPlayList.length > 0) {
                state.curPlay = state.recordPlayList.pop()
                let computedIndex = state.playList.findIndex(s => s.uuid === state.curPlay.uuid);
                if (computedIndex > -1) {
                    state.curIndex = computedIndex
                }
            }
        }

    },
    actions: {
        changeCurPlay({commit}, music) {
            commit('SET_CUR_PLAY', music)
        },
        refreshList({commit}, list) {
            commit('REFRESH_PLAY_LIST', list);
        },
        nextSong({commit}) {
            commit('NEXT_SONG')
        },
        prevSong({commit}) {
            commit('PREV_SONG')
        },
        setCurIndex({commit}, index) {
            commit('SET_CUR_INDEX', index)
        }
    },
    getters: {
        curPlay: state => state.curPlay,
        plays: state => state.playList,
        // curIndex: () => curIndex
        // 因为闭包的声明方式,getter无法获得真实的值
    }
}

export default audioModule
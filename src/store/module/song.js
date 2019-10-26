import { searchSongs } from '@/api/request'

const songModule = {
    state: {
        songList: null,
        curSongInfo: {}
    },
    mutations: {
        ADD_TO_SONG(state, song) {
            if (!state.songList) {
                state.songList = []
            }

            state.songList.push(song);
        },
        REFRESH_SONG_LIST(state, songs) {
            state.songList = songs;
        },
        CLEAR_SONG_LIST(state) {
            state.songList = [];
        },
        SET_CUR_SONG(state, song) {
            state.curSongInfo = song
        }
    },
    actions: {
        searchSongs({commit}, keywords) {
            return searchSongs(keywords).then(data => {
                commit('REFRESH_SONG_LIST', data);
            })
        }
    },
    getters: {
        songs: state => state.songList,
    }
}

export default songModule
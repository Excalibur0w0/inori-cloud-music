import {
    searchSongs,
    likeSong,
    dislikeSong,
    collectSong,
    cancelCollect,
    getSongsByLikeId,
    getSongsBySheetId
} from '@/api/request'

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
        SET_CUR_SONGINFO(state, song) {
            state.curSongInfo = song
        }
    },
    actions: {
        searchSongs({commit}, keywords) {
            return searchSongs(keywords).then(data => {
                commit('REFRESH_SONG_LIST', data);
            })
        },
        getLikeSongs({commit}, likeId) {
            return getSongsByLikeId(likeId).then(data => {
                commit('REFRESH_SONG_LIST', data)
            })
        },
        getSheetSongs({commit}, sheetId) {
            return getSongsBySheetId(sheetId).then(data => {
                commit('REFRESH_SONG_LIST', data)
            })
        },
        likeSong({ commit }, songId) {
            return likeSong(songId)
        },
        dislikeSong({ commit }, songId) {
            return dislikeSong(songId)
        },
        collectSong({ commit }, { songId, sheetId }) {
            return collectSong(songId, sheetId)
        },
        cancelCollect({ commit }, { songId, sheetId }) {
            return cancelCollect(songId, sheetId)
        }

    },
    getters: {
        songs: state => state.songList,
    }
}

export default songModule
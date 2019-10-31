import {getCommnetsBySongId, createComment} from '@/api/request'

const commentModule = {
    state: {
        commentList: [],
    },
    mutations: {
        REFRESH_COMMENTS(state, comments) {
            state.commentList = comments
        },
        ADD_TO_COMMENTS(state, comment) {
            if (!Array.isArray(state.commentList)) {
                state.commentList = []
            }
            state.commentList.push(comment)
        },
        CLEAR_COMMENTS(state) {
            state.commentList = null;
        }
    },
    actions: {
        getCommentsBySongId ({commit}, songId) {
            return getCommnetsBySongId(songId).then(data => {
                commit('REFRESH_COMMENTS', data);
            })
        },
        createComment({commit, rootGetters}, {songId, content}) {
            return createComment(songId, content).then(data => {
                data.uname = rootGetters['getUser'].uname
                console.log('uuu', rootGetters['getUser'])
                commit('ADD_TO_COMMENTS', data);
            })
        }
    },
    getters: {
        comments: state => state.commentList
    }
}

export default commentModule
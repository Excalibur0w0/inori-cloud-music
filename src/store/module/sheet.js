import {deleteSheet, createEmptySheet, getAllSheet, getSheetInfo} from '@/api/request'

const sheetModule = {
    state: {
        mySheetList: [],
        curSheetInfo: {

        }
    },
    mutations: {
        ADD_TO_MY_SHEET(state, sheet) {
            if (!state.sheetList) {
                state.mySheetList = []
            }

            state.mySheetList.push(sheet);
        },
        REFRESH_MY_SHEET_LIST(state, sheets) {
            state.mySheetList = sheets;
        },
        REMOVE_ONE_MY_SHEET(state, sheetId) {
            let index = state.mySheetList.findIndex(sheet => sheet.uuid === sheetId);
            state.mySheetList.splice(index, 1);
        },
        CLEAR_MY_SHEET_LIST(state) {
            state.mySheetList = [];
        },
        SET_CUR_SHEET(state, sheet) {
            state.curSheetInfo = sheet
        }

    },
    actions: {
        createEmptySheet({commit}, { sheetName, desc, userId }) {
            return createEmptySheet(sheetName, desc, userId)
                .then((data) => {
                      commit('ADD_TO_MY_SHEET', data);
                })
        },
        getAllMySheet({commit}, {userId}) {
            return getAllSheet(userId).then((data) => {
                commit('REFRESH_MY_SHEET_LIST', data);
            });
        },
        clearMySheets({commit}) {
            commit('CLEAR_MY_SHEET_LIST')
        },
        getSheetInfo({commit}, sheetId) {
            getSheetInfo(sheetId).then(res => {
                commit('SET_CUR_SHEET', res)
            })
        },
        removeMySheet({commit}, sheetId) {
            return deleteSheet(sheetId).then(success => {
                if (success) {
                    commit('REMOVE_ONE_MY_SHEET', sheetId)
                }
            })
        }
    },
    getters: {
        mySheets: state => state.mySheetList,
        curSheetInfo: state => state.curSheetInfo
    }
}
export default sheetModule
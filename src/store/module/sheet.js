import {deleteSheet, createEmptySheet, getAllSheet, getSheetInfo} from '@/api/request'

const sheetModule = {
    state: {
        sheetList: [],
        curSheetInfo: {

        }
    },
    mutations: {
        ADD_TO_SHEET(state, sheet) {
            if (!state.sheetList) {
                state.sheetList = []
            }

            state.sheetList.push(sheet);
        },
        REFRESH_SHEET_LIST(state, sheets) {
            state.sheetList = sheets;
        },
        REMOVE_ONE_SHEET(state, sheetId) {
            let index = state.sheetList.findIndex(sheet => sheet.uuid === sheetId);
            state.sheetList.splice(index, 1);
        },
        CLEAR_SHEET_LIST(state) {
            state.sheetList = [];
        },
        SET_CUR_SHEET(state, sheet) {
            state.curSheetInfo = sheet
        }

    },
    actions: {
        createEmptySheet({commit}, { sheetName, desc, userId }) {
            return createEmptySheet(sheetName, desc, userId)
                .then((data) => {
                      commit('ADD_TO_SHEET', data);
                })
        },
        getAllSheet({commit}, {userId}) {
            return getAllSheet(userId).then((data) => {
                commit('REFRESH_SHEET_LIST', data);
            });
        },
        clearSheets({commit}) {
            commit('CLEAR_SHEET_LIST')
        },
        getSheetInfo({commit}, sheetId) {
            getSheetInfo(sheetId).then(res => {
                commit('SET_CUR_SHEET', res)
            })
        },
        removeSheet({commit}, sheetId) {
            return deleteSheet(sheetId).then(success => {
                if (success) {
                    commit('REMOVE_ONE_SHEET', sheetId)
                }
            })
        }
    },
    getters: {
        sheets: state => state.sheetList,
        curSheetInfo: state => state.curSheetInfo
    }
}
export default sheetModule
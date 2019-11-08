import {
    deleteSheet,
    createEmptySheet,
    getSheetInfo,
    getAllSheetsByCreator,
    getAllSheetsByCollector, collectSheet, cancelCollectSheet
} from '@/api/request'

const sheetModule = {
    state: {
        mySheetList: [],
        collectSheetList: [],
        curSheetInfo: {

        }
    },
    mutations: {
        ADD_TO_MY_SHEET(state, sheet) {
            if (!state.mySheetList) {
                state.mySheetList = []
            }

            state.mySheetList.push(sheet);
        },
        ADD_TO_COLLECT_SHEET(state, sheet) {
            if (!state.collectSheetList) {
                state.collectSheetList = []
            }

            state.collectSheetList.push(sheet);
        },
        REMOVE_ONE_MY_SHEET(state, sheetId) {
            let index = state.mySheetList.findIndex(sheet => sheet.uuid === sheetId);
            state.mySheetList.splice(index, 1);
        },
        REMOVE_ONE_COLLECT_SHEET(state, sheetId) {
            let index = state.collectSheetList.findIndex(sheet => sheet.uuid === sheetId);
            state.collectSheetList.splice(index, 1);
        },
        REFRESH_MY_SHEET_LIST(state, sheets) {
            state.mySheetList = sheets;
        },
        REFRESH_MYCOLLECT_SHEET_LIST(state, sheets) {
            state.collectSheetList = sheets
        },
        CLEAR_MY_SHEET_LIST(state) {
            state.mySheetList = [];
        },
        SET_CUR_SHEET(state, sheet) {
            state.curSheetInfo = sheet
        }

    },
    actions: {
        collectOneSheet({commit}, sheetId) {
            return collectSheet(sheetId).then((sheet) => {
                console.log("sheet is ", sheet)
                if (sheet) {
                    commit('ADD_TO_COLLECT_SHEET', sheet)
                }
            })
        },
        cancelOneCollect({commit}, sheetId) {
            return cancelCollectSheet(sheetId).then((success) => {
                if(success) {
                    commit('REMOVE_ONE_COLLECT_SHEET', sheetId)
                }
            })
        },
        createEmptySheet({commit}, { sheetName, desc, userId }) {
            return createEmptySheet(sheetName, desc, userId)
                .then((data) => {
                      commit('ADD_TO_MY_SHEET', data);
                })
        },
        removeMySheet({commit}, sheetId) {
            return deleteSheet(sheetId).then(success => {
                if (success) {
                    commit('REMOVE_ONE_MY_SHEET', sheetId)
                }
            })
        },
        getAllMySheets({commit}, userId) {
            return getAllSheetsByCreator(userId).then((data) => {
                commit('REFRESH_MY_SHEET_LIST', data);
            });
        },
        getAllSheetsByCollector({commit}, userId) {
            return  getAllSheetsByCollector(userId).then((data) => {
                commit('REFRESH_MYCOLLECT_SHEET_LIST', data)
            })
        },
        clearMySheets({commit}) {
            commit('CLEAR_MY_SHEET_LIST')
        },
        getSheetInfo({commit}, sheetId) {
            getSheetInfo(sheetId).then(res => {
                commit('SET_CUR_SHEET', res)
            })
        },
    },
    getters: {
        mySheets: state => state.mySheetList,
        myCollectSheets: state => state.collectSheetList,
        curSheetInfo: state => state.curSheetInfo
    }
}
export default sheetModule
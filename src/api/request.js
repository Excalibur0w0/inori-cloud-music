import { Service } from './servie';
import qs from "qs";

export function doLogin (username, password) {
     return Service({
        url: '/provider-auth' + '/auth/login',
        params: { username: username, password: password },
        method: 'POST'
    })
}

export function getUserBasicInfo(userId) {
    return Service({
        url: '/provider-auth' + '/user/getUserBasicInfo',
        method: 'GET',
        params: {
            userId
        }
    })
}

export function getUserInfoByToken () {
    return Service({
        url: '/provider-auth' + '/auth/getUserInfoByToken',
        method: 'GET',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export function createEmptySheet(sheetName, desc, userId) {

    return Service({
        url: '/provider-music' + '/createEmptySheet',
        method: 'POST',
        data: qs.stringify({
            sheetName: sheetName,
            creator: userId,
            desc: desc
        })
    })
}

export function createSheet (shtName, desc, userId, songIds) {
    return Service({
        url: '/provider-music' + '/createSheet',
        method: 'POST',
        data: qs.stringify({
            shtName: shtName,
            creator: userId,
            desc: desc,
            songIds: songIds
        }, {arrayFormat: 'repeat'})
    })
}

export function getAllSheet (userId) {
    return Service({
        url: '/provider-music' + '/getAllSheet',
        method: 'GET',
        params: {
            userId: userId
        }
    })
}

export function getSheetInfo (sheetId) {
    return Service({
        url: '/provider-music' + '/getSheetInfo',
        method: 'GET',
        params: {
            sheetId: sheetId
        }
    })
}
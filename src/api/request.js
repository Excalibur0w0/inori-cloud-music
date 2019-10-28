import {Service} from './servie'
import qs from 'qs'
import SparkMD5 from 'spark-md5'


export function doLogin(username, password) {
    return Service({
        url: '/provider-auth' + '/auth/login',
        params: {username: username, password: password},
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

export function getUserInfoByToken() {
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
        url: '/provider-music' + '/sheet',
        method: 'POST',
        data: qs.stringify({
            sheetName: sheetName,
            creator: userId,
            desc: desc
        })
    })
}

export function createSheet(shtName, desc, userId, songIds) {
    return Service({
        url: '/provider-music' + '/sheet',
        method: 'POST',
        data: qs.stringify({
            shtName: shtName,
            creator: userId,
            desc: desc,
            songIds: songIds
        }, {arrayFormat: 'repeat'})
    })
}

export function deleteSheet(sheetId) {
    return Service({
        url: '/provider-music' + '/sheet',
        method: 'DELETE',
        data: qs.stringify({
            sheetId: sheetId
        })
    })
}

export function getAllSheet(userId) {
    return Service({
        url: '/provider-music' + '/sheets',
        method: 'GET',
        params: {
            userId: userId
        }
    })
}

export function getSheetInfo(sheetId) {
    return Service({
        url: '/provider-music' + '/sheet',
        method: 'GET',
        params: {
            sheetId: sheetId
        }
    })
}

export function getSongsBySheetId(sheetId) {
    return Service({
        url: '/provider-music' + '/songs',
        method: 'GET',
        params: {
            sheetId: sheetId
        }
    })
}

export function getSongsByUploader(uploaderId) {
    return Service({
        url: '/provider-music' + '/songs',
        method: 'GET',
        params: {
            uploaderId: uploaderId
        }
    })
}

export function getSongsByAuthor(authorName) {
    return Service({
        url: '/provider-music' + '/songs',
        method: 'GET',
        params: {
            author: authorName
        }
    })
}

export function searchSongs(keywords) {
    return Service({
        url: '/provider-music' + '/songs',
        method: 'GET',
        params: {
            keywords: keywords
        }
    })
}

export function getSongsBySheet(sheetId) {
    return Service({
        url: '/provider-music' + '/songs',
        method: 'GET',
        params: {
            sheetId: sheetId
        }
    })
}

export function getSongsByLikeId(userId) {
    return Service({
        url: '/provider-music' + '/songs',
        method: 'GET',
        params: {
            likeId: userId
        }
    })
}

export function uploadSingleFile(file, uploadId) {
    const chunkSize = 1024 * 1024
    let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
    let chunkTotal = Math.ceil(file.size / chunkSize)
    let currentChunk = 0
    let sparkTotal = new SparkMD5.ArrayBuffer()
    let fileReader = new FileReader()

    fileReader.onload = (e) => {
        // eslint-disable-next-line no-console
        console.log('read chunk nr', currentChunk + 1, 'of', chunkTotal)
        sparkTotal.append(e.target.result) // Append array buffer
        currentChunk++

        if (currentChunk < chunkTotal) {
            loadNext()
        } else {
            let md5Hash = sparkTotal.end()
            // eslint-disable-next-line no-console
            console.info('computed hash', md5Hash)  // Compute hash
            asyncUploadChunk(file, chunkSize, md5Hash, uploadId)
        }
    }

    fileReader.onerror = () => {
        // eslint-disable-next-line no-console
        console.warn('oops, something went wrong.')
    }

    const loadNext = () => {
        let start = currentChunk * chunkSize
        let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize

        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
    }

    loadNext()

    // return uploadChunk(file, 0, chunkSize, file.name);
}

export function asyncUploadChunk(file, chunkSize, md5Hash, uploadId) {
    let chunkTotal = Math.ceil(file.size / chunkSize) // 总的chunk数;
    let pros = []
    let num = 0
    for (; num < chunkTotal - 2; num++) {
        pros.push(uploadChunk(file, num, chunkTotal, chunkSize, md5Hash, uploadId))
    }

    Promise.all(pros).then(() => {
        uploadChunk(file, num + 1, chunkTotal, chunkSize, md5Hash, uploadId).then((data) => {
            console.log(data)
            console.log('all data trans completed')
            if (data && data.badChunks) {
                data.badChunks.forEach(errNum => {
                    uploadChunk(file, errNum, chunkTotal, chunkSize, md5Hash, uploadId, true)
                })
            }
        })
    }).catch((errs) => {
        // eslint-disable-next-line no-console
        console.error(errs);
    })
}

export function uploadChunk(file, num, chunkTotal, chunkSize, md5, uploadId, checkRightNow = false) {
    console.log(file, num, chunkSize, md5, uploadId)
    let formData = new FormData()
    let nextSize = Math.min((num + 1) * chunkSize, file.size)
    let fileData = file.slice(num * chunkSize, nextSize)
    let afterFix = file.name.match(/\..+/);
    let extenstion = ""
    if (afterFix) {
       extenstion = afterFix[0]
    }


    if (num >= chunkTotal) {
        // eslint-disable-next-line no-console
        console.log('传输块数请求完毕')
        return
    }

    formData.append('file', fileData)
    formData.append('md5', md5)
    formData.append('chunkIndex', num)
    formData.append('chunkTotal', chunkTotal)
    formData.append('uploader', uploadId)
    formData.append('extenstion', extenstion)
    formData.append('checkRightNow', checkRightNow)

    return Service({
        url: '/provider-music' + '/io/upload',
        method: 'POST',
        header: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
    //     .then(data => {
    //     // 上传块
    //     if (data && data.canContinue) {
    //         uploadChunk(file, num + 1, chunkSize,  md5, uploadId)
    //     }
    // })
}

export function downloadFile(md5) {
    return Service({
        url: '/provider-music' + '/io/download',
        method: 'GET',
        params: {
            md5: md5
        },
        responseType: 'blob'
    }).then(data => {
        if (data) {
            let url = window.URL.createObjectURL(data)
            window.open(url, '_blank')
            window.URL.revokeObjectURL(url)
            // window.location.href = url;
        }
    })
}

export function likeSong(songId) {
    return Service({
        url: '/provider-music' + '/song/like',
        method: 'POST',
        data: qs.stringify({
            songId: songId
        })
    })
}
export  function dislikeSong(songId) {
    return Service({
        url: '/provider-music' + '/song/like',
        method: 'DELETE',
        data: qs.stringify({
            songId: songId
        })
    })
}

export function collectSong(songId, sheetId) {
    return Service({
        url: '/provider-music' + '/song/collect',
        method: 'POST',
        data: qs.stringify({
            songId: songId,
            sheetId: sheetId
        })
    })
}

export function cancelCollect(songId, sheetId) {
    return Service({
        url: '/provider-music' + '/song/collect',
        method: 'DELETE',
        data: qs.stringify({
            songId: songId,
            sheetId: sheetId
        })
    })
}
import { createResponseInterceptor, createRequestInterceptor } from './servie';
import _this from '@/main.js'
import {getToken} from '@/utils/tokenUitls'

createRequestInterceptor((config) => {
    _this.$progress({ show: true })
    let token = getToken();
    if (token && token.length > 0) {
        config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
})

createResponseInterceptor(() => {
    _this.$progress({ show: false })
}, (error) => {
    _this.$progress({ show: false })
    if (error && error.response) {
        _this.$alert({ show: true, content: error.response.data, title: 'ERROR' })
    }
})

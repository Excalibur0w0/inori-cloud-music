import axios from 'axios'
import {DEV_GATE_WAY} from './baseUrl'

const ConfigBaseURL = DEV_GATE_WAY //默认路径，这里也可以使用env来判断环境
//使用create方法创建axios实例
export const Service = axios.create({
    timeout: 7000, // 请求超时时间
    baseURL: ConfigBaseURL,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8'
        // 'Content-Type': 'application/json;charset=UTF-8'
    }
})

export const createRequestInterceptor = (callback) => {
    // 添加请求拦截器
    Service.interceptors.request.use(config => {
        return callback(config);
    })
}

export const createResponseInterceptor = (succssed, failed) => {
    // 添加响应拦截器
    Service.interceptors.response.use(response => {
        succssed(response)
        // eslint-disable-next-line no-console
        console.log(response)
        return response.data
    }, error => {
        failed(error)
        // eslint-disable-next-line no-console
        // console.error('TCL: error', error)
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // eslint-disable-next-line no-console
            console.error(error.response);

            return Promise.reject(error.response)
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            // eslint-disable-next-line no-console
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            // eslint-disable-next-line no-console
            console.log('Error', error.message);
        }
        // console.log(error.config);

        return Promise.reject(error)
    })
}
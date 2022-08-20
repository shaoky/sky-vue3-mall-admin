import axios from 'axios'
import router from '../router'
import { baseURL } from './env'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { IModels } from '../rapper/request'

const CancelToken = axios.CancelToken
const source = CancelToken.source()
window.axiosSource = []

axios.interceptors.request.use(
    (config) => {
        if (config.cancelToken) {
            const cancelToken = axios.CancelToken.source()
            window.axiosSource.push(cancelToken)
            config.cancelToken = cancelToken.token
        }
        return config
    }
)

axios.interceptors.response.use(
    (response) => {
        const message = response.data.message
        if (response.data.code === 200 && message) {
            ElMessage({
                type: 'success',
                message: message,
            })
        }
        if (response.data.code === 401) {
            ElMessage({
                type: 'error',
                message: '登录超时',
            })
            router.push({
                path: '/'
            })
        }
        if (response.data.code === 500) {
            ElMessage.error(response.data.error)
        }
        return response
    },
    (error) => {
        console.log(error)
    }
)

export default async function<T extends keyof IModels> (
    url: T,
    params: IModels[T]['Req']
    // @ts-ignore
) :Promise<IModels[T]['Res']['data']> {
    return new Promise((resolve, reject) => {
        let method
        const urlRep = url.replace(/GET/g, '')
                        .replace(/POST/g, '')

        if (url.indexOf('GET') > -1) {
            method = 'get'
        } else {
            method = 'post'
        }
        axios({
            baseURL,
            url: urlRep,
            method,
            params: method === 'get' ? params : {},
            data: method === 'post' ? params : {},
            responseType: 'json',
            headers: {
                Authorization: window.localStorage.getItem('token') || '',
            },
            cancelToken: source.token
        }).then(res => {
            if (res.data.code === 200) {
                resolve(res.data.data)
            } else {
                reject(res.data)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * 取消接口
 * @description 用于tab栏的高频切换，或者后端接口返回慢，多次请求造成页面数据显示错误
 */
export function cancelAxiosSource() {
    window?.axiosSource.forEach(item => {
        item.cancel('取消请求')
    })
}
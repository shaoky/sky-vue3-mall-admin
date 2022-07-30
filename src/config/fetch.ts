import axios from 'axios';
import router from '../router'
import { baseURL } from './env'
import { ElMessage } from 'element-plus'
import { IModels } from '../rapper/request'

axios.interceptors.response.use(
    (response) => {
        if (response.data.code === 401) {
            ElMessage({
                type: 'error',
                message: '登录超时',
            });
            router.push({
                path: '/'
            })
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
        const token = window.localStorage.getItem('token') || ''
        let urlRep = url.replace(/GET/g, '')
        urlRep = urlRep.replace(/POST/g, '')

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
                Authorization: token,
            }
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


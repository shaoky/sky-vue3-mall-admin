import axios from 'axios';
// import router from 'vue-router'
import router from '../router'
import { ENVIR, baseURL } from './env'

// import { HttpModel } from './requestt';

// export default async<T extends keyof HttpModel> (
// const router = useRouter()
axios.interceptors.response.use(
    (response) => {
        if (response.data.code === 401) {
            router.push({
                path: '/'
            })
        }
        return response
    },
    (error: any) => {
        console.log(error)
    }
)


export default async (
    url: string = '',
    // url: T,
    params: object,
    method: 'get' | 'post' = 'get',
) => {
    return new Promise((resolve, reject) => {
        const token = window.localStorage.getItem('token') || ''
        axios({
            baseURL,
            url,
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


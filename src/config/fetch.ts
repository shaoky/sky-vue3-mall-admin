import axios from 'axios';
// import { HttpModel } from './requestt';

// export default async<T extends keyof HttpModel> (
export default async (
    url: string = '',
    // url: T,
    params: object,
    method: any = 'get',
) => {
    return new Promise((resolve, reject) => {
        const token = window.localStorage.getItem('token') || ''
        axios({
            baseURL: 'http://t.wzyyyy.com',
            url,
            method,
            params: method === 'get' ? params : {},
            data: method === 'post' ? params : {},
            responseType: 'json',
            headers: {
                Authorization: token,
            }
        }).then(res => {
            console.log(res)
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
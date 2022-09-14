// @ts-ignore
const ENVIR = process.env.NODE_ENV === 'development' ? 'DEVELOPMENT' : 'PRODUCTION'

let baseURL = ''
let imgBaseUrl = ''


if (ENVIR === 'DEVELOPMENT') {
    // baseURL = 'http://api.shop.shaoky.com'
    // baseURL = 'http://t.wzyyyy.com'
    baseURL = 'http://api.sky.com'
}

if (ENVIR === 'PRODUCTION') {
    baseURL = 'http://api.shop.shaoky.com'
}
imgBaseUrl = `${baseURL}/common/image/add`

export {
    ENVIR,
    baseURL,
    imgBaseUrl,
}
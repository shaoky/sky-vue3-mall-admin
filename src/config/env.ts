// @ts-ignore
const ENVIR = process.env.NODE_ENV === 'development' ? 'DEVELOPMENT' : 'PRODUCTION'

let baseURL = ''
let imgBaseUrl = ''


if (ENVIR === 'DEVELOPMENT') {
    baseURL = 'http://t.wzyyyy.com'
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
import fetch from '../config/fetch'
// import { HttpModel } from '../config/requestt';

export const login = (data: any) => fetch('/admin/login', data, 'post')
export const getIndexData = (data: any) => fetch('/h5/index/data', data, 'post')
// export const getGoodsList = (data: any) => fetch('/h5/goods/list', data, 'post')
export const getUserList = (data: any) => fetch('/h5/goods/list', data, 'post')
export const getUserInfo = () => fetch('/admin/user/admin/info', {} , 'get')
export const resetPassword = () => fetch('/admin/user/admin/password', {} , 'post')

// 广告内容管理
export const getAdListApi = (data: any) => fetch('/admin/ad/list', data, 'get')
export const getAdInfoApi = (data: any) => fetch('/admin/ad/info', data, 'get')
export const addAd = (data: any) => fetch('/admin/ad/add', data, 'post')
export const updateAd = (data: any) => fetch('/admin/ad/update', data, 'post')
export const delAd = (data: any) => fetch('/admin/ad/delete', data, 'post')

//  广告位置管理
export const getAdPositionListApi = () => fetch('/admin/ad/position/list', {}, 'get')
export const addAdPosition = (data: any) => fetch('/admin/ad/position/add', data, 'post')
export const updateAdPosition = (data: any) => fetch('/admin/ad/position/update', data, 'post')
export const delAdPosition = (data: any) => fetch('/admin/ad/position/delete', data, 'post')

//  文章类型管理
export const getArticleTypeList = () => fetch('/admin/article/type/list', {}, 'get')
export const addArticleType = (data: any) => fetch('/admin/article/type/add', data, 'post')
export const updateArticleType = (data: any) => fetch('/admin/article/type/update', data, 'post')
export const deleteArticleType = (data: any) => fetch('/admin/article/type/delete', data, 'post')

//  文章类型管理
export const getArticleListApi = (data: any) => fetch('/admin/article/list', data, 'get')
export const getArticleInfoApi = (data: any) => fetch('/admin/article/info', data, 'get')
export const addArticle = (data: any) => fetch('/admin/article/add', data, 'post')
export const updateArticle = (data: any) => fetch('/admin/article/update', data, 'post')
export const deleteArticle = (data: any) => fetch('/admin/article/delete', data, 'post')

// 产品管理
export const getGoodsList = (data: any) => fetch('/admin/goods/list', data, 'get')
export const addGoods = (data: any) => fetch('/admin/goods/add', data, 'post')
export const deleteGoods = (data: any) => fetch('/admin/goods/delete', data, 'post')
export const updateGoods = (data: any) => fetch('/admin/goods/update', data, 'post')
export const goodsGoodsInfo = (data: any) => fetch('/admin/goods/info', data, 'get')


/**
 * 数据管理
 */

// 产品类目
export const getGoodsTypeList = (data: any) => fetch('/admin/goods/type/list', data, 'get')
export const addGoodsType = (data: any) => fetch('/admin/goods/type/add', data, 'post')
export const updateGoodsType = (data: any) => fetch('/admin/goods/type/update', data, 'post')
export const deleteGoodsType = (data: any) => fetch('/admin/goods/type/delete', data, 'post')

/**
 * 系统设置
 */
export const getWebsite = (data: any) => fetch('/admin/system/web/config/info', data, 'get')
export const updateWebsite = (data: any) => fetch('/admin/system/web/config/update', data, 'post')
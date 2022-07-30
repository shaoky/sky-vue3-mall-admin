import fetch from '../config/fetch'
import { IModels } from '../rapper/request';

export const login = (data: IModels['POST/admin/login']['Req']) => fetch('POST/admin/login', data)
export const getUserInfo = () => fetch('GET/admin/user/admin/info', {})
export const resetPassword = (data: IModels['POST/admin/user/admin/password']['Req']) => fetch('POST/admin/user/admin/password', data)

// 广告内容管理
export const getAdListApi = (data: IModels['GET/admin/ad/list']['Req']) => fetch('GET/admin/ad/list', data)
export const getAdInfoApi = (data: IModels['GET/admin/ad/info']['Req']) => fetch('GET/admin/ad/info', data)
export const addAd = (data: IModels['POST/admin/ad/add']['Req']) => fetch('POST/admin/ad/add', data)
export const updateAd = (data: IModels['POST/admin/ad/update']['Req']) => fetch('POST/admin/ad/update', data)
export const delAd = (data: IModels['POST/admin/ad/delete']['Req']) => fetch('POST/admin/ad/delete', data)

//  广告位置管理
export const getAdPositionListApi = () => fetch('GET/admin/ad/position/list', {})
export const addAdPosition = (data: IModels['POST/admin/ad/position/add']['Req']) => fetch('POST/admin/ad/position/add', data)
export const updateAdPosition = (data: IModels['POST/admin/ad/position/update']['Req']) => fetch('POST/admin/ad/position/update', data)
export const delAdPosition = (data: IModels['POST/admin/ad/position/delete']['Req']) => fetch('POST/admin/ad/position/delete', data)

//  文章类型管理
export const getArticleTypeList = () => fetch('GET/admin/article/type/list', {})
export const addArticleType = (data: IModels['POST/admin/article/type/add']['Req']) => fetch('POST/admin/article/type/add', data)
export const updateArticleType = (data: IModels['POST/admin/article/type/update']['Req']) => fetch('POST/admin/article/type/update', data)
export const deleteArticleType = (data: IModels['POST/admin/article/type/delete']['Req']) => fetch('POST/admin/article/type/delete', data)

//  文章管理
export const getArticleListApi = (data: IModels['GET/admin/article/list']['Req']) => fetch('GET/admin/article/list', data)
export const getArticleInfoApi = (data: IModels['GET/admin/article/info']['Req']) => fetch('GET/admin/article/info', data)
export const addArticle = (data: IModels['POST/admin/article/add']['Req']) => fetch('POST/admin/article/add', data)
export const updateArticle = (data: IModels['POST/admin/article/update']['Req']) => fetch('POST/admin/article/update', data)
export const deleteArticle = (data: IModels['POST/admin/article/delete']['Req']) => fetch('POST/admin/article/delete', data)

// 产品管理
export const getGoodsList = (data: IModels['GET/admin/goods/list']['Req']) => fetch('GET/admin/goods/list', data)
export const addGoods = (data: IModels['POST/admin/goods/add']['Req']) => fetch('POST/admin/goods/add', data)
export const deleteGoods = (data: IModels['POST/admin/goods/delete']['Req']) => fetch('POST/admin/goods/delete', data)
export const updateGoods = (data: IModels['POST/admin/goods/update']['Req']) => fetch('POST/admin/goods/update', data)
export const goodsGoodsInfo = (data: IModels['GET/admin/goods/info']['Req']) => fetch('GET/admin/goods/info', data)
export const setGoodsIsOpen = (data: IModels['POST/admin/goods/isOpen/set']['Req']) => fetch('POST/admin/goods/isOpen/set', data)

// 订单管理
export const getOrderList = (data: IModels['GET/admin/order/list']['Req']) => fetch('GET/admin/order/list', data)
export const getOrderInfo = (data: IModels['GET/admin/order/info']['Req']) => fetch('GET/admin/order/info', data)
export const setOrderDelivery = (data: IModels['POST/admin/order/delivery']['Req']) => fetch('POST/admin/order/delivery', data)


/**
 * 数据管理
 */

// 产品类目
export const getGoodsTypeList = (data: IModels['GET/admin/goods/type/list']['Req']) => fetch('GET/admin/goods/type/list', data)
export const addGoodsType = (data: IModels['POST/admin/goods/type/add']['Req']) => fetch('POST/admin/goods/type/add', data)
export const updateGoodsType = (data: IModels['POST/admin/goods/type/update']['Req']) => fetch('POST/admin/goods/type/update', data)
export const deleteGoodsType = (data: IModels['POST/admin/goods/type/delete']['Req']) => fetch('POST/admin/goods/type/delete', data)
export const getGoodsTypeInfo = (data: IModels['GET/admin/goods/type/info']['Req']) => fetch('GET/admin/goods/type/info', data)
// 规格
export const getGoodsSpecList = (data: IModels['GET/admin/goods/spec/list']['Req']) => fetch('GET/admin/goods/spec/list', data)
export const addGoodsSpec = (data: IModels['POST/admin/goods/spec/add']['Req']) => fetch('POST/admin/goods/spec/add', data)
export const updateGoodsSpec = (data: IModels['POST/admin/goods/spec/update']['Req']) => fetch('POST/admin/goods/spec/update', data)
export const deleteGoodsSpec = (data: IModels['POST/admin/goods/spec/delete']['Req']) => fetch('POST/admin/goods/spec/delete', data)
// 属性
export const getGoodsAttrList = (data: IModels['GET/admin/goods/attr/list']['Req']) => fetch('GET/admin/goods/attr/list', data)
export const addGoodsAttr = (data: IModels['POST/admin/goods/attr/add']['Req']) => fetch('POST/admin/goods/attr/add', data)
export const updateGoodsAttr = (data: IModels['POST/admin/goods/attr/update']['Req']) => fetch('POST/admin/goods/attr/update', data)
export const deleteGoodsAttr = (data: IModels['POST/admin/goods/attr/delete']['Req']) => fetch('POST/admin/goods/attr/delete', data)


/**
 * 系统设置
 */
export const getWebsite = () => fetch('GET/admin/system/web/config/info', {})
export const updateWebsite = (data: IModels['POST/admin/system/web/config/update']['Req']) => fetch('POST/admin/system/web/config/update', data)
export const getLogLogin = (data: IModels['GET/admin/system/log/login']['Req']) => fetch('GET/admin/system/log/login', data)
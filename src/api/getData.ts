import fetch from '../config/fetch'
import type { Models } from '@/rapper'

export const login = (data: Models['POST/admin/login']['Req']) => fetch('POST/admin/login', data)
export const getUserInfo = () => fetch('GET/admin/user/admin/info', {})
export const resetPassword = (data: Models['POST/admin/user/admin/password']['Req']) => fetch('POST/admin/user/admin/password', data)

// 广告内容管理
export const getAdList = (data: Models['GET/admin/ad/list']['Req']) => fetch('GET/admin/ad/list', data)
export const getAdInfo = (data: Models['GET/admin/ad/info']['Req']) => fetch('GET/admin/ad/info', data)
export const addAd = (data: Models['POST/admin/ad/add']['Req']) => fetch('POST/admin/ad/add', data)
export const updateAd = (data: Models['POST/admin/ad/update']['Req']) => fetch('POST/admin/ad/update', data)
export const deleteAd = (data: Models['POST/admin/ad/delete']['Req']) => fetch('POST/admin/ad/delete', data)

//  广告位置管理
export const getAdPositionList = () => fetch('GET/admin/ad/position/list', {})
export const addAdPosition = (data: Models['POST/admin/ad/position/add']['Req']) => fetch('POST/admin/ad/position/add', data)
export const updateAdPosition = (data: Models['POST/admin/ad/position/update']['Req']) => fetch('POST/admin/ad/position/update', data)
export const deleteAdPosition = (data: Models['POST/admin/ad/position/delete']['Req']) => fetch('POST/admin/ad/position/delete', data)

//  文章类型管理
export const getArticleTypeList = () => fetch('GET/admin/article/type/list', {})
export const addArticleType = (data: Models['POST/admin/article/type/add']['Req']) => fetch('POST/admin/article/type/add', data)
export const updateArticleType = (data: Models['POST/admin/article/type/update']['Req']) => fetch('POST/admin/article/type/update', data)
export const deleteArticleType = (data: Models['POST/admin/article/type/delete']['Req']) => fetch('POST/admin/article/type/delete', data)

//  文章管理
export const getArticleList = (data: Models['GET/admin/article/list']['Req']) => fetch('GET/admin/article/list', data)
export const getArticleInfoApi = (data: Models['GET/admin/article/info']['Req']) => fetch('GET/admin/article/info', data)
export const addArticle = (data: Models['POST/admin/article/add']['Req']) => fetch('POST/admin/article/add', data)
export const updateArticle = (data: Models['POST/admin/article/update']['Req']) => fetch('POST/admin/article/update', data)
export const deleteArticle = (data: Models['POST/admin/article/delete']['Req']) => fetch('POST/admin/article/delete', data)

// 产品管理
export const getGoodsList = (data: Models['GET/admin/goods/list']['Req']) => fetch('GET/admin/goods/list', data)
export const addGoods = (data: Models['POST/admin/goods/add']['Req']) => fetch('POST/admin/goods/add', data)
export const deleteGoods = (data: Models['POST/admin/goods/delete']['Req']) => fetch('POST/admin/goods/delete', data)
export const updateGoods = (data: Models['POST/admin/goods/update']['Req']) => fetch('POST/admin/goods/update', data)
export const goodsGoodsInfo = (data: Models['GET/admin/goods/info']['Req']) => fetch('GET/admin/goods/info', data)
export const setGoodsIsOpen = (data: Models['POST/admin/goods/isOpen/set']['Req']) => fetch('POST/admin/goods/isOpen/set', data)

// 订单管理
export const getOrderList = (data: Models['GET/admin/order/list']['Req']) => fetch('GET/admin/order/list', data)
export const getOrderInfo = (data: Models['GET/admin/order/info']['Req']) => fetch('GET/admin/order/info', data)
export const setOrderDelivery = (data: Models['POST/admin/order/delivery']['Req']) => fetch('POST/admin/order/delivery', data)


/**
 * 数据管理
 */

// 产品类目
export const getGoodsTypeList = (data: Models['GET/admin/goods/type/list']['Req']) => fetch('GET/admin/goods/type/list', data)
export const addGoodsType = (data: Models['POST/admin/goods/type/add']['Req']) => fetch('POST/admin/goods/type/add', data)
export const updateGoodsType = (data: Models['POST/admin/goods/type/update']['Req']) => fetch('POST/admin/goods/type/update', data)
export const deleteGoodsType = (data: Models['POST/admin/goods/type/delete']['Req']) => fetch('POST/admin/goods/type/delete', data)
export const getGoodsTypeInfo = (data: Models['GET/admin/goods/type/info']['Req']) => fetch('GET/admin/goods/type/info', data)
// 规格
export const getGoodsSpecList = (data: Models['GET/admin/goods/spec/list']['Req']) => fetch('GET/admin/goods/spec/list', data)
export const addGoodsSpec = (data: Models['POST/admin/goods/spec/add']['Req']) => fetch('POST/admin/goods/spec/add', data)
export const updateGoodsSpec = (data: Models['POST/admin/goods/spec/update']['Req']) => fetch('POST/admin/goods/spec/update', data)
export const deleteGoodsSpec = (data: Models['POST/admin/goods/spec/delete']['Req']) => fetch('POST/admin/goods/spec/delete', data)
// 属性
export const getGoodsAttrList = (data: Models['GET/admin/goods/attr/list']['Req']) => fetch('GET/admin/goods/attr/list', data)
export const addGoodsAttr = (data: Models['POST/admin/goods/attr/add']['Req']) => fetch('POST/admin/goods/attr/add', data)
export const updateGoodsAttr = (data: Models['POST/admin/goods/attr/update']['Req']) => fetch('POST/admin/goods/attr/update', data)
export const deleteGoodsAttr = (data: Models['POST/admin/goods/attr/delete']['Req']) => fetch('POST/admin/goods/attr/delete', data)


/**
 * 系统设置
 */
export const getWebsite = () => fetch('GET/admin/system/web/config/info', {})
export const updateWebsite = (data: Models['POST/admin/system/web/config/update']['Req']) => fetch('POST/admin/system/web/config/update', data)
export const getLogLogin = (data: Models['GET/admin/system/log/login']['Req']) => fetch('GET/admin/system/log/login', data)

/**
 * 权限
 */

// 菜单
export const getColumnList = (data: Models['GET/admin/column/list']['Req'] = {}) => fetch('GET/admin/column/list', data)
export const addeColumn = (data: Models['POST/admin/column/add']['Req']) => fetch('POST/admin/column/add', data)
export const updateColumn = (data: Models['POST/admin/column/update']['Req']) => fetch('POST/admin/column/update', data)
export const deleteColumn = (data: Models['POST/admin/column/delete']['Req']) => fetch('POST/admin/column/delete', data)
// 管理员
export const getAdminUserList = (data: Models['GET/admin/user/admin/list']['Req']) => fetch('GET/admin/user/admin/list', data)
export const addAdminUser = (data: Models['POST/admin/user/admin/add']['Req']) => fetch('POST/admin/user/admin/add', data)
export const updateAdminUser = (data: Models['POST/admin/user/admin/update']['Req']) => fetch('POST/admin/user/admin/update', data)
export const deleteAdminUser = (data: Models['POST/admin/user/admin/delete']['Req']) => fetch('POST/admin/user/admin/delete', data)
// 角色
export const getRoleList = () => fetch('GET/admin/role/list', {})
export const getRoleInfo = (data: Models['GET/admin/role/info']['Req']) => fetch('GET/admin/role/info', data)
export const addRole = (data: Models['POST/admin/role/add']['Req']) => fetch('POST/admin/role/add', data)
export const updateRole = (data: Models['POST/admin/role/update']['Req']) => fetch('POST/admin/role/update', data)
export const deleteRole = (data: Models['POST/admin/role/delete']['Req']) => fetch('POST/admin/role/delete', data)
/* md5: a923b75afe69dc2053ba6da2930927a2 */
/* Rap仓库id: 295591 */
/* Rapper版本: 1.3.1 */
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

/**
 * 本文件由 Rapper 同步 Rap 平台接口，自动生成，请勿修改
 * Rap仓库 地址: http://rap2.taobao.org/repository/editor?id=295591
 */

import * as commonLib from 'rap/runtime/commonLib'

export interface IModels {
  /**
   * 接口名：获取短信
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=493311&itf=2165647
   */
  'POST/common/sms': {
    Req: {
      /**
       * 手机号码
       */
      tel: string
    }
    Res: {
      code: string
      data: {
        code: number
      }
    }
  }

  /**
   * 接口名：获取地区
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=493311&itf=2182498
   */
  'GET/common/region': {
    Req: {}
    Res: {
      code: number
      data: {
        list: {
          code: string
          name: string
        }[]
      }
    }
  }

  /**
   * 接口名：图片上传
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=493311&itf=2204944
   */
  'POST/common/image/add': {
    Req: {
      file: string
    }
    Res: {
      code: number
      data: {
        url: string
      }
    }
  }

  /**
   * 接口名：登录
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=493321&itf=2165753
   */
  'POST/h5/login': {
    Req: {
      /**
       * 手机号码
       */
      tel: string
      /**
       * 短信
       */
      code: string
    }
    Res: {
      code: number
      data: {
        token: string
        name: string
      }
    }
  }

  /**
   * 接口名：新增
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=492376&itf=2160324
   */
  'POST/h5/cart/add': {
    Req: {
      goodsId: number
      goodsNum: number
      skuId?: number
    }
    Res: {
      code: number
      data: boolean
    }
  }

  /**
   * 接口名：删除
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=492376&itf=2164894
   */
  'POST/h5/cart/delete': {
    Req: {
      goodsId: number
    }
    Res: {
      code: number
      data: boolean
    }
  }

  /**
   * 接口名：列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=492376&itf=2167559
   */
  'GET/h5/cart/list': {
    Req: {}
    Res: {
      code: number
      data: {
        list: {
          goodsId: number
          goodsNum: number
          isSelected: boolean
          title: string
          imageUrl: string
          price: string
          stock: number
          skuSpec: string
          skuId: number
        }[]
      }
    }
  }

  /**
   * 接口名：更新
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=492376&itf=2168529
   */
  'POST/h5/cart/update': {
    Req: {
      list: {
        goodsNum: number
        goodsId: number
        isSelected: boolean
        skuId: number
      }[]
    }
    Res: {
      code: number
      data: boolean
    }
  }

  /**
   * 接口名：新增
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=494514&itf=2172165
   */
  'POST/h5/user/address/add': {
    Req: {
      /**
       * 用户姓名
       */
      userName: string
      /**
       * 用户手机
       */
      userTel: number
      /**
       * 详细地址
       */
      address: string
      /**
       * 是否默认
       */
      isDefault: boolean
      /**
       * 省id
       */
      provinceId?: number
      /**
       * 市id
       */
      cityId?: number
      /**
       * 区县id
       */
      countyId?: number
      areaCode?: string
      province: string
      city: string
      county: string
    }
    Res: {
      code: number
      data: boolean
    }
  }

  /**
   * 接口名：详情
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=494514&itf=2182639
   */
  'GET/h5/user/address/info': {
    Req: {
      id: number
    }
    Res: {
      code: number
      data: {
        info: {
          id: number
          userName: string
          userTel: string
          address: string
          areaCode: string
          province: string
          city: string
          county: string
          isDefault: boolean
        }
      }
    }
  }

  /**
   * 接口名：列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=494514&itf=2172169
   */
  'GET/h5/user/address/list': {
    Req: {}
    Res: {
      code: number
      data: {
        list: {
          address: string
          provinceId: number
          countyId: number
          cityId: number
          userTel: number
          userName: string
          province: string
          county: string
          city: string
          isDefault: boolean
          areaCode: number
          id: number
        }[]
      }
    }
  }

  /**
   * 接口名：更新
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=494514&itf=2172171
   */
  'POST/h5/user/address/update': {
    Req: {}
    Res: {}
  }

  /**
   * 接口名：删除
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=494514&itf=2172172
   */
  'POST/h5/user/address/delete': {
    Req: {
      id: number
    }
    Res: {
      code: number
      data: boolean
    }
  }

  /**
   * 接口名：获取默认
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=494514&itf=2172173
   */
  'GET/h5/user/address/default': {
    Req: {}
    Res: {
      code: number
      data: {
        info: {
          address: string
          city: string
          county: string
          id: number
          province: string
          userName: string
          userTel: string
          isDefault: boolean
        }
      }
    }
  }

  /**
   * 接口名：设置默认
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=494514&itf=2172196
   */
  'POST/h5/user/address/set-default': {
    Req: {
      id: string
    }
    Res: {
      code: number
      data: boolean
    }
  }

  /**
   * 接口名：购物车预览
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=497588&itf=2189433
   */
  'GET/h5/order/preview': {
    Req: {
      /**
       * 不传，会查找该用户下的购物车商品
       */
      goodsId?: number
      goodsNum?: number
    }
    Res: {
      code: number
      data: {
        goodsList: {
          goodsNum: number
          id: number
          imageUrl: string
          price: string
          skuId: number
          skuSpec: string
          title: string
        }[]
        totalMoney: string
        payMoney: string
        deliverMoney: string
      }
    }
  }

  /**
   * 接口名：订单列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=497588&itf=2190328
   */
  'GET/h5/order/list': {
    Req: {
      page: number
      size: number
      /**
       * 1. 待付款 2. 待发货 3. 待收货 4. 交易成功
       */
      status?: number
    }
    Res: {
      code: number
      data: {
        list: {
          id: number
          createTime: string
          status: number
          statusName: string
          totalMoney: string
          goodsList: {
            id: number
            imageUrl: string
            number: number
            price: string
            skuSpec: string
            title: string
          }[]
        }[]
        count: string
      }
    }
  }

  /**
   * 接口名：订单详情
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=497588&itf=2190329
   */
  'GET/h5/order/info': {
    Req: {
      id: number
    }
    Res: {
      code: number
      data: {
        info: {
          no: number
          province: string
          city: string
          county: string
          userTel: string
          userName: string
          address: string
          remark: string
          createTime: string
          status: number
          statusName: string
          remainingTime: number
          totalMoney: string
          freightMoney: string
          payMoney: string
          goodsList: any[]
        }
        systemTime: number
      }
    }
  }

  /**
   * 接口名：创建订单
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=497588&itf=2195053
   */
  'POST/h5/order/add': {
    Req: {
      addressId: number
      goodsList: {
        goodsId: number
        goodsNum: number
      }[]
      remark?: string
    }
    Res: {
      code: number
      data: {
        /**
         * 订单编号
         */
        orderNo: string
        /**
         * 订单ID
         */
        orderId: number
      }
    }
  }

  /**
   * 接口名：订单取消
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=497588&itf=2196218
   */
  'POST/h5/order/cancel': {
    Req: {
      id: number
    }
    Res: {
      code: number
      data: boolean
    }
  }

  /**
   * 接口名：订单删除
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=497588&itf=2196222
   */
  'POST/h5/order/delete': {
    Req: {
      id: number
    }
    Res: {
      code: number
      data: boolean
    }
  }

  /**
   * 接口名：商品预览
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=497588&itf=2247758
   */
  'GET/h5/order/goodsPreview': {
    Req: {
      goodsId: number
      goodsNum: number
      skuId?: number
    }
    Res: {
      code: number
      data: {
        payMoney: string
        deliverMoney: string
        goodsList: any[]
        totalMoney: string
      }
    }
  }

  /**
   * 接口名：支付订单
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=497588&itf=2252256
   */
  'POST/h5/order/pay': {
    Req: {
      id: number
    }
    Res: {
      code: number
      data: boolean
    }
  }

  /**
   * 接口名：订单确认
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=497588&itf=2257707
   */
  'POST/h5/order/confirm': {
    Req: {
      id: number
    }
    Res: {
      code: number
      data: boolean
    }
  }

  /**
   * 接口名：用户详情
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=499304&itf=2199147
   */
  'GET/h5/user/info': {
    Req: {}
    Res: {
      code: number
      data: {
        user: {
          name: string
          tel: string
          photo: string
        }
      }
    }
  }

  /**
   * 接口名：用户更新
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=499304&itf=2204939
   */
  'POST/h5/user/info/update': {
    Req: {
      photo: string
      name: string
    }
    Res: {
      code: number
      data: boolean
    }
  }

  /**
   * 接口名：商品列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=503900&itf=2307545
   */
  'GET/h5/goods/list': {
    Req: {
      page?: number
      size?: number
      keyword?: string
    }
    Res: {
      code: string
      data: {
        list: {
          id: number
          imageUrl: string
          price: string
          title: string
        }[]
        count: number
      }
    }
  }

  /**
   * 接口名：商品详情
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=503900&itf=2224267
   */
  'GET/h5/goods/info': {
    Req: {
      id: number
    }
    Res: {
      code: number
      data: {
        info: {
          id: number
          imageUrl: string
          /**
           * 是否收藏
           */
          isCollect: boolean
          price: string
          stock: number
          subtitle: string
          title: string
          attr: {
            name: string
            value: string
          }[]
          sku: {
            id: number
            goodsId: number
            imageUrl: string
            price: string
            spec: string
            stock: number
          }[]
          spec: {
            name: string
            value: any[]
          }[]
          content: string
          bannerList: any[]
          saleCount: number
        }
      }
    }
  }

  /**
   * 接口名：新增收藏
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=503900&itf=2224269
   */
  'POST/h5/goods/collect/add': {
    Req: {
      /**
       * 商品id
       */
      id: number
    }
    Res: {
      code: number
      data: boolean
    }
  }

  /**
   * 接口名：删除收藏
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=503900&itf=2224271
   */
  'POST/h5/goods/collect/delete': {
    Req: {
      /**
       * 商品id
       */
      id: number
    }
    Res: {
      code: number
      data: boolean
    }
  }

  /**
   * 接口名：收藏列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=503900&itf=2228675
   */
  'GET/h5/goods/collect/list': {
    Req: {}
    Res: {
      code: number
      data: {
        list: {
          title: string
          price: string
          difference: string
          imageUrl: string
          goodsId: string
          adjustPrice: string
        }[]
      }
    }
  }

  /**
   * 接口名：首页
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=503900&itf=2307536
   */
  'GET/h5/index': {
    Req: {}
    Res: {
      code: number
      data: {
        adList: {
          imageUrl: string
          id: number
          title: string
        }[]
        iconList: {
          id: number
          imageUrl: string
          title: string
        }[]
      }
    }
  }

  /**
   * 接口名：广告列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308437
   */
  'GET/admin/ad/list': {
    Req: {
      title?: string
      page?: number
      size?: number
    }
    Res: {
      code: number
      data: {
        list: {
          id: number
          imageUrl: string
          isOpen: boolean
          operation: string
          positionId: number
          positionTitle: string
          sort: number
          title: string
          type: number
        }[]
        count: number
      }
    }
  }

  /**
   * 接口名：广告详情
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308438
   */
  'GET/admin/ad/info': {
    Req: {
      id?: number
    }
    Res: {
      code: number
      data: {
        info: {
          id: number
          title: string
          imageUrl: string
          isOpen: boolean
          sort: number
          type: number
          operation: string
          positionId: number
        }
      }
    }
  }

  /**
   * 接口名：广告添加
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308445
   */
  'POST/admin/ad/add': {
    Req: {
      imageUrl: string
      isOpen: boolean
      operation: string
      type: number
      sort: number
      positionId: number
      title: string
    }
    Res: {
      code: number
      data: string
    }
  }

  /**
   * 接口名：广告更新
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308476
   */
  'POST/admin/ad/update': {
    Req: {
      id: number
      imageUrl: string
      isOpen: boolean
      operation: string
      type: number
      sort: number
      positionId: number
      title: string
    }
    Res: {
      code: number
      data: string
    }
  }

  /**
   * 接口名：广告删除
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308477
   */
  'POST/admin/ad/delete': {
    Req: {
      id: number
    }
    Res: {
      code: string
      data: string
    }
  }

  /**
   * 接口名：广告位置添加
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308484
   */
  'POST/admin/ad/position/add': {
    Req: {
      title: string
      description: string
      width: number
      height: number
      mark: string
      isOpen: boolean
    }
    Res: {
      code: number
      data: string
    }
  }

  /**
   * 接口名：广告位置列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308479
   */
  'GET/admin/ad/position/list': {
    Req: {}
    Res: {
      code: number
      data: {
        count: number
        list: {
          id: number
          title: string
          description: string
          mark: string
          isOpen: boolean
          width: number
          height: number
        }[]
      }
    }
  }

  /**
   * 接口名：广告位置更新
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308481
   */
  'POST/admin/ad/position/update': {
    Req: {
      id: number
      title: string
      description: string
      mark: string
      isOpen: boolean
      width: number
      height: number
    }
    Res: {
      code: number
      data: string
    }
  }

  /**
   * 接口名：广告位置删除
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308483
   */
  'POST/admin/ad/position/delete': {
    Req: {
      id: number
    }
    Res: {
      code: number
      data: string
    }
  }

  /**
   * 接口名：文章类型添加
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308487
   */
  'POST/admin/article/type/add': {
    Req: {
      sort: number
      title: string
      imageUrl: string
    }
    Res: {
      code: number
      data: string
    }
  }

  /**
   * 接口名：文章类型列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308488
   */
  'GET/admin/article/type/list': {
    Req: {}
    Res: {
      code: number
      data: {
        count: number
        list: {
          id: number
          title: string
          imageUrl: string
          sort: number
        }[]
      }
    }
  }

  /**
   * 接口名：文章类型更新
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308490
   */
  'POST/admin/article/type/update': {
    Req: {
      id: number
      title: string
      imageUrl: string
      sort: number
    }
    Res: {
      code: number
      data: string
    }
  }

  /**
   * 接口名：文章类型删除
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308491
   */
  'POST/admin/article/type/delete': {
    Req: {
      id: number
    }
    Res: {
      code: number
      data: string
    }
  }

  /**
   * 接口名：文章列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308492
   */
  'GET/admin/article/list': {
    Req: {
      page: number
      size: number
      title?: string
      typeId?: number
    }
    Res: {
      code: number
      data: {
        list: {
          id: number
          title: string
          imageUrl: string
          isOpen: boolean
          sort: number
          type: number
          operation: string
          positionId: number
          positionTitle: string
        }[]
        count: number
      }
    }
  }

  /**
   * 接口名：文章详情
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308493
   */
  'GET/admin/article/info': {
    Req: {
      id: number
    }
    Res: {
      code: number
      data: {
        info: {
          id: number
          title: string
          imageUrl: string
          isOpen: boolean
          sort: number
          typeId: number
          operation: string
          positionId: number
          content: string
        }
      }
    }
  }

  /**
   * 接口名：文章更新
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308494
   */
  'POST/admin/article/update': {
    Req: {
      id: number
      title: string
      imageUrl: string
      isOpen: boolean
      sort: number
      typeId: number
    }
    Res: {
      code: number
      data: string
    }
  }

  /**
   * 接口名：文章增加
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308495
   */
  'POST/admin/article/add': {
    Req: {
      imageUrl: string
      isOpen: boolean
      typeId: number
      sort: number
      title: string
      content: string
    }
    Res: {
      code: number
      data: string
    }
  }

  /**
   * 接口名：文章删除
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308496
   */
  'POST/admin/article/delete': {
    Req: {
      id: number
    }
    Res: {
      code: number
      data: string
    }
  }

  /**
   * 接口名：产品列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518530&itf=2308498
   */
  'GET/admin/goods/list': {
    Req: {
      page: number
      size: number
      isOpen?: number
      title?: string
      goodsClassId?: number
    }
    Res: {
      code: number
      data: {
        list: {
          id: number
          goodsClassId: number
          title: any[]
          subtitle: any[]
          imageUrl: any[]
          price: any[]
          memberPrice: any[]
          stock: any[]
          saleCount: number
          spec: any[]
          attr: any[]
          content: any[]
          isOpen: any[]
          sort: number
          createTime: any[]
          goodsClassName: any[]
        }[]
        count: number
      }
    }
  }

  /**
   * 接口名：产品新增
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518530&itf=2308499
   */
  'POST/admin/goods/add': {
    Req: {
      imageUrl: string
      isOpen: boolean
      content: string
      saleCount: number
      sort: number
      goodsClassId: number
      title: string
      subtitle: string
      price: string
      memberPrice: string
      stock: number
      bannerList: any[]
      attr: string
      spec: string
      sku?: {
        id?: number
        imageUrl?: string
        stock: number
        price: string
        spec: string
      }[]
    }
    Res: {
      code: number
      data: string
    }
  }

  /**
   * 接口名：产品更新
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518530&itf=2308500
   */
  'POST/admin/goods/update': {
    Req: {
      id: number
      goodsClassId: number
      title: string
      subtitle: string
      imageUrl: string
      price: string
      memberPrice: string
      stock: number
      saleCount: number
      spec: string
      attr: string
      content: string
      isOpen: boolean
      sort: number
      createTime: number
      bannerList: {
        id?: number
        imageUrl: string
      }[]
      goodsClassIds: number[]
      goodsSkuList: {
        id?: number
        goodsId?: number
        stock?: number
        price?: string
        spec?: string
        imageUrl?: any[]
      }[]
      sku?: {
        imageUrl?: string
        stock: number
        price: string
        spec: string
        id?: number
      }[]
    }
    Res: {
      code: number
      data: string
    }
  }

  /**
   * 接口名：产品详情
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518530&itf=2308501
   */
  'GET/admin/goods/info': {
    Req: {
      id: number
    }
    Res: {
      code: number
      data: {
        info: {
          id: number
          goodsClassId: number
          title: string
          subtitle: string
          imageUrl: string
          price: string
          memberPrice: string
          stock: number
          saleCount: number
          spec: string
          attr: {
            name: string
            value: string
          }[]
          content: string
          isOpen: boolean
          sort: number
          createTime: number
          bannerList: {
            id: number
            imageUrl: string
          }[]
          goodsClassIds: number[]
          goodsSkuList: {
            id: number
            goodsId: number
            stock: number
            price: string
            spec: string
            imageUrl: string
          }[]
        }
      }
    }
  }

  /**
   * 接口名：产品删除
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518530&itf=2308502
   */
  'POST/admin/goods/delete': {
    Req: {
      id: number
    }
    Res: {
      code: number
      data: string
    }
  }

  /**
   * 接口名：产品上架/下架
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518530&itf=2308786
   */
  'POST/admin/goods/isOpen/set': {
    Req: {
      id: number
      /**
       * 0下架，1上架
       */
      isOpen: number
    }
    Res: {
      code: number
      data: string
    }
  }

  /**
   * 接口名：订单列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518530&itf=2308503
   */
  'GET/admin/order/list': {
    Req: {
      page: number
      size: number
      no?: string
      title?: string
    }
    Res: {
      code: number
      data: {
        list: {
          id: number
          no: any[]
          userId: number
          province: string
          city: string
          county: string
          userTel: string
          userName: string
          address: string
          remark: any[]
          createTime: any[]
          receiveTime: null
          deliveryTime: any[]
          confirmTime: any[]
          remainingTime: number
          paymentTime: any[]
          status: number
          totalMoney: any[]
          payMoney: any[]
          freightMoney: any[]
          courierName: any[]
          courierNo: any[]
          statusName: any[]
        }[]
        count: number
      }
    }
  }

  /**
   * 接口名：订单详情
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518530&itf=2308504
   */
  'GET/admin/order/info': {
    Req: {
      id: number
    }
    Res: {
      code: number
      data: {
        info: {
          id: number
          no: string
          userId: number
          province: string
          city: string
          county: string
          userTel: string
          userName: string
          address: string
          remark: string
          createTime: string
          receiveTime: string
          deliveryTime: string
          confirmTime: string
          remainingTime: number
          paymentTime: string
          status: number
          totalMoney: string
          payMoney: string
          freightMoney: string
          courierName: string
          courierNo: string
          goodsList: {
            id: number
            orderId: number
            number: number
            price: string
            title: string
            skuSpec: string
            imageUrl: string
            createTime: number
          }[]
          statusName: string
        }
      }
    }
  }

  /**
   * 接口名：订单发货
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518530&itf=2308505
   */
  'POST/admin/order/delivery': {
    Req: {}
    Res: {}
  }

  /**
   * 接口名：产品分类列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2307747
   */
  'GET/admin/goods/type/list': {
    Req: {
      /**
       * 1是扁平化，2是层级
       */
      type: number
      /**
       * 0是关闭1是打开，不传是全部
       */
      isOpen?: number
    }
    Res: {
      code: number
      data: {
        list: {
          id: number
          imageUrl: string
          isOpen: boolean
          level: number
          parentId: number
          sort: number
          title: string
          children: any[]
        }[]
      }
    }
  }

  /**
   * 接口名：产品分类增加
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308599
   */
  'POST/admin/goods/type/add': {
    Req: {
      sort: number
      title: string
      isOpen: boolean
      /**
       * 父id
       */
      parentId?: number
      imageUrl: string
    }
    Res: {
      code: number
      data: string
    }
  }

  /**
   * 接口名：产品分类更新
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308600
   */
  'POST/admin/goods/type/update': {
    Req: {
      id: number
      parentId?: number
      title: string
      imageUrl: string
      isOpen: boolean
      sort: number
      level?: number
    }
    Res: {
      code: number
      data: string
    }
  }

  /**
   * 接口名：产品分类删除
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308601
   */
  'POST/admin/goods/type/delete': {
    Req: {
      id: number
    }
    Res: {
      code: number
      data: string
    }
  }

  /**
   * 接口名：产品分类详情
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308602
   */
  'GET/admin/goods/type/info': {
    Req: {
      id: number
    }
    Res: {
      code: number
      data: {
        goodsAttr: {
          id: number
          goodsClassId: number
          name: string
          type: number
          content: string[]
          sort: number
          isOpen: number
          tip: null
          value: string
        }[]
        goodsSpec: {
          id: number
          goodsClassId: number
          name: string
          content: any[]
          sort: number
          isOpen: number
          value: any[]
        }[]
      }
    }
  }

  /**
   * 接口名：规格列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308604
   */
  'GET/admin/goods/spec/list': {
    Req: {
      goodsClassId?: number
    }
    Res: {
      code: number
      data: {
        list: {
          id: number
          goodsClassId: number
          name: string
          content: string
          sort: number
          isOpen: boolean
        }[]
      }
    }
  }

  /**
   * 接口名：规格新增
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308605
   */
  'POST/admin/goods/spec/add': {
    Req: {
      goodsClassId: number
      content: string
      sort: number
      isOpen: boolean
      name: string
    }
    Res: {
      code: number
      data: boolean
    }
  }

  /**
   * 接口名：规格更新
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308606
   */
  'POST/admin/goods/spec/update': {
    Req: {
      id: number
      content: string
      isOpen: boolean
      name: string
      sort: number
    }
    Res: {
      code: number
      data: boolean
    }
  }

  /**
   * 接口名：规格删除
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308607
   */
  'POST/admin/goods/spec/delete': {
    Req: {
      id: number
    }
    Res: {
      code: number
      data: boolean
    }
  }

  /**
   * 接口名：属性列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308608
   */
  'GET/admin/goods/attr/list': {
    Req: {
      goodsClassId: number
    }
    Res: {
      code: number
      data: {
        list: {
          id: number
          goodsClassId: number
          name: string
          type: number
          content: string
          sort: number
          isOpen: boolean
          typeName: string
        }[]
      }
    }
  }

  /**
   * 接口名：属性新增
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308610
   */
  'POST/admin/goods/attr/add': {
    Req: {
      goodsClassId: number
      type: number
      content: string
      sort: number
      isOpen: boolean
      name: string
    }
    Res: {
      code: number
      data: boolean
    }
  }

  /**
   * 接口名：属性更新
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308612
   */
  'POST/admin/goods/attr/update': {
    Req: {
      id: number
      content: string
      isOpen: boolean
      name: string
      sort: number
      type: number
    }
    Res: {
      code: number
      data: boolean
    }
  }

  /**
   * 接口名：属性删除
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308615
   */
  'POST/admin/goods/attr/delete': {
    Req: {
      id: number
    }
    Res: {
      code: number
      data: boolean
    }
  }

  /**
   * 接口名：登录
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518383&itf=2308420
   */
  'POST/admin/login': {
    Req: {
      username: string
      password: string
    }
    Res: {
      code: number
      data: {
        token: string
        username: string
      }
    }
  }

  /**
   * 接口名：修改密码
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518383&itf=2308428
   */
  'POST/admin/user/admin/password': {
    Req: {
      password: string
      newPassword: string
    }
    Res: {
      code: number
      data: string
    }
  }

  /**
   * 接口名：用户信息
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518383&itf=2308442
   */
  'GET/admin/user/admin/info': {
    Req: {}
    Res: {
      code: number
      data: {
        id: number
        username: string
        password: string
        secret: string
        token: string
        status: number
        realName: string
      }
    }
  }

  /**
   * 接口名：网站设置
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518383&itf=2308856
   */
  'GET/admin/system/web/config/info': {
    Req: {}
    Res: {
      code: number
      data: {
        webTitle: string
        webKeyworkds: string
        webDescription: string
        linkman: string
        tel: string
        qq: string
        email: string
        address: string
        icp: string
        fax: string
        logo: string
        baiduMapX: string
        baiduMapY: string
        pageNew: string
        pageProduct: string
        company: string
      }
    }
  }

  /**
   * 接口名：网站设置更新
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518383&itf=2308861
   */
  'POST/admin/system/web/config/update': {
    Req: {
      webTitle?: string
      webKeyworkds?: string
      webDescription?: string
      linkman?: string
      tel?: string
      email?: string
      address?: string
      icp?: string
      fax?: string
      logo?: string
      baiduMapX?: string
      baiduMapY?: string
      pageNew?: string
      pageProduct?: string
      company?: string
    }
    Res: {
      code: number
      data: string
    }
  }

  /**
   * 接口名：用户登陆日志
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518383&itf=2308865
   */
  'GET/admin/system/log/login': {
    Req: {
      page: number
      size: number
    }
    Res: {
      code: number
      data: {
        list: {
          id: number
          userId: number
          /**
           * 用户名
           */
          username: string
          method: string
          /**
           * 控制器
           */
          controller: string
          /**
           * 方法
           */
          action: string
          /**
           * 说明
           */
          operation: string
          /**
           * 请求参数
           */
          input: string
          /**
           * 用户ip
           */
          ip: string
          /**
           * 登录时间
           */
          time: string
          /**
           * 使用时间
           */
          useTime: string
          token: string
        }[]
        count: number
      }
    }
  }
}

type ResSelector<T> = T

export interface IResponseTypes {
  'POST/common/sms': ResSelector<IModels['POST/common/sms']['Res']>
  'GET/common/region': ResSelector<IModels['GET/common/region']['Res']>
  'POST/common/image/add': ResSelector<IModels['POST/common/image/add']['Res']>
  'POST/h5/login': ResSelector<IModels['POST/h5/login']['Res']>
  'POST/h5/cart/add': ResSelector<IModels['POST/h5/cart/add']['Res']>
  'POST/h5/cart/delete': ResSelector<IModels['POST/h5/cart/delete']['Res']>
  'GET/h5/cart/list': ResSelector<IModels['GET/h5/cart/list']['Res']>
  'POST/h5/cart/update': ResSelector<IModels['POST/h5/cart/update']['Res']>
  'POST/h5/user/address/add': ResSelector<IModels['POST/h5/user/address/add']['Res']>
  'GET/h5/user/address/info': ResSelector<IModels['GET/h5/user/address/info']['Res']>
  'GET/h5/user/address/list': ResSelector<IModels['GET/h5/user/address/list']['Res']>
  'POST/h5/user/address/update': ResSelector<IModels['POST/h5/user/address/update']['Res']>
  'POST/h5/user/address/delete': ResSelector<IModels['POST/h5/user/address/delete']['Res']>
  'GET/h5/user/address/default': ResSelector<IModels['GET/h5/user/address/default']['Res']>
  'POST/h5/user/address/set-default': ResSelector<IModels['POST/h5/user/address/set-default']['Res']>
  'GET/h5/order/preview': ResSelector<IModels['GET/h5/order/preview']['Res']>
  'GET/h5/order/list': ResSelector<IModels['GET/h5/order/list']['Res']>
  'GET/h5/order/info': ResSelector<IModels['GET/h5/order/info']['Res']>
  'POST/h5/order/add': ResSelector<IModels['POST/h5/order/add']['Res']>
  'POST/h5/order/cancel': ResSelector<IModels['POST/h5/order/cancel']['Res']>
  'POST/h5/order/delete': ResSelector<IModels['POST/h5/order/delete']['Res']>
  'GET/h5/order/goodsPreview': ResSelector<IModels['GET/h5/order/goodsPreview']['Res']>
  'POST/h5/order/pay': ResSelector<IModels['POST/h5/order/pay']['Res']>
  'POST/h5/order/confirm': ResSelector<IModels['POST/h5/order/confirm']['Res']>
  'GET/h5/user/info': ResSelector<IModels['GET/h5/user/info']['Res']>
  'POST/h5/user/info/update': ResSelector<IModels['POST/h5/user/info/update']['Res']>
  'GET/h5/goods/list': ResSelector<IModels['GET/h5/goods/list']['Res']>
  'GET/h5/goods/info': ResSelector<IModels['GET/h5/goods/info']['Res']>
  'POST/h5/goods/collect/add': ResSelector<IModels['POST/h5/goods/collect/add']['Res']>
  'POST/h5/goods/collect/delete': ResSelector<IModels['POST/h5/goods/collect/delete']['Res']>
  'GET/h5/goods/collect/list': ResSelector<IModels['GET/h5/goods/collect/list']['Res']>
  'GET/h5/index': ResSelector<IModels['GET/h5/index']['Res']>
  'GET/admin/ad/list': ResSelector<IModels['GET/admin/ad/list']['Res']>
  'GET/admin/ad/info': ResSelector<IModels['GET/admin/ad/info']['Res']>
  'POST/admin/ad/add': ResSelector<IModels['POST/admin/ad/add']['Res']>
  'POST/admin/ad/update': ResSelector<IModels['POST/admin/ad/update']['Res']>
  'POST/admin/ad/delete': ResSelector<IModels['POST/admin/ad/delete']['Res']>
  'POST/admin/ad/position/add': ResSelector<IModels['POST/admin/ad/position/add']['Res']>
  'GET/admin/ad/position/list': ResSelector<IModels['GET/admin/ad/position/list']['Res']>
  'POST/admin/ad/position/update': ResSelector<IModels['POST/admin/ad/position/update']['Res']>
  'POST/admin/ad/position/delete': ResSelector<IModels['POST/admin/ad/position/delete']['Res']>
  'POST/admin/article/type/add': ResSelector<IModels['POST/admin/article/type/add']['Res']>
  'GET/admin/article/type/list': ResSelector<IModels['GET/admin/article/type/list']['Res']>
  'POST/admin/article/type/update': ResSelector<IModels['POST/admin/article/type/update']['Res']>
  'POST/admin/article/type/delete': ResSelector<IModels['POST/admin/article/type/delete']['Res']>
  'GET/admin/article/list': ResSelector<IModels['GET/admin/article/list']['Res']>
  'GET/admin/article/info': ResSelector<IModels['GET/admin/article/info']['Res']>
  'POST/admin/article/update': ResSelector<IModels['POST/admin/article/update']['Res']>
  'POST/admin/article/add': ResSelector<IModels['POST/admin/article/add']['Res']>
  'POST/admin/article/delete': ResSelector<IModels['POST/admin/article/delete']['Res']>
  'GET/admin/goods/list': ResSelector<IModels['GET/admin/goods/list']['Res']>
  'POST/admin/goods/add': ResSelector<IModels['POST/admin/goods/add']['Res']>
  'POST/admin/goods/update': ResSelector<IModels['POST/admin/goods/update']['Res']>
  'GET/admin/goods/info': ResSelector<IModels['GET/admin/goods/info']['Res']>
  'POST/admin/goods/delete': ResSelector<IModels['POST/admin/goods/delete']['Res']>
  'POST/admin/goods/isOpen/set': ResSelector<IModels['POST/admin/goods/isOpen/set']['Res']>
  'GET/admin/order/list': ResSelector<IModels['GET/admin/order/list']['Res']>
  'GET/admin/order/info': ResSelector<IModels['GET/admin/order/info']['Res']>
  'POST/admin/order/delivery': ResSelector<IModels['POST/admin/order/delivery']['Res']>
  'GET/admin/goods/type/list': ResSelector<IModels['GET/admin/goods/type/list']['Res']>
  'POST/admin/goods/type/add': ResSelector<IModels['POST/admin/goods/type/add']['Res']>
  'POST/admin/goods/type/update': ResSelector<IModels['POST/admin/goods/type/update']['Res']>
  'POST/admin/goods/type/delete': ResSelector<IModels['POST/admin/goods/type/delete']['Res']>
  'GET/admin/goods/type/info': ResSelector<IModels['GET/admin/goods/type/info']['Res']>
  'GET/admin/goods/spec/list': ResSelector<IModels['GET/admin/goods/spec/list']['Res']>
  'POST/admin/goods/spec/add': ResSelector<IModels['POST/admin/goods/spec/add']['Res']>
  'POST/admin/goods/spec/update': ResSelector<IModels['POST/admin/goods/spec/update']['Res']>
  'POST/admin/goods/spec/delete': ResSelector<IModels['POST/admin/goods/spec/delete']['Res']>
  'GET/admin/goods/attr/list': ResSelector<IModels['GET/admin/goods/attr/list']['Res']>
  'POST/admin/goods/attr/add': ResSelector<IModels['POST/admin/goods/attr/add']['Res']>
  'POST/admin/goods/attr/update': ResSelector<IModels['POST/admin/goods/attr/update']['Res']>
  'POST/admin/goods/attr/delete': ResSelector<IModels['POST/admin/goods/attr/delete']['Res']>
  'POST/admin/login': ResSelector<IModels['POST/admin/login']['Res']>
  'POST/admin/user/admin/password': ResSelector<IModels['POST/admin/user/admin/password']['Res']>
  'GET/admin/user/admin/info': ResSelector<IModels['GET/admin/user/admin/info']['Res']>
  'GET/admin/system/web/config/info': ResSelector<IModels['GET/admin/system/web/config/info']['Res']>
  'POST/admin/system/web/config/update': ResSelector<IModels['POST/admin/system/web/config/update']['Res']>
  'GET/admin/system/log/login': ResSelector<IModels['GET/admin/system/log/login']['Res']>
}

export function createFetch(fetchConfig: commonLib.RequesterOption, extraConfig?: {fetchType?: commonLib.FetchType}) {
  // if (!extraConfig || !extraConfig.fetchType) {
  //   console.warn('Rapper Warning: createFetch API will be deprecated, if you want to customize fetch, please use overrideFetch instead, since new API guarantees better type consistency during frontend lifespan. See detail https://www.yuque.com/rap/rapper/overridefetch')
  // }
  const rapperFetch = commonLib.getRapperRequest(fetchConfig)

  return {
    /**
     * 接口名：获取短信
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=493311&itf=2165647
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/common/sms': (req?: IModels['POST/common/sms']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/common/sms',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/common/sms']>
    },

    /**
     * 接口名：获取地区
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=493311&itf=2182498
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/common/region': (req?: IModels['GET/common/region']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/common/region',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/common/region']>
    },

    /**
     * 接口名：图片上传
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=493311&itf=2204944
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/common/image/add': (req?: IModels['POST/common/image/add']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/common/image/add',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/common/image/add']>
    },

    /**
     * 接口名：登录
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=493321&itf=2165753
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/h5/login': (req?: IModels['POST/h5/login']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/login',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/h5/login']>
    },

    /**
     * 接口名：新增
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=492376&itf=2160324
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/h5/cart/add': (req?: IModels['POST/h5/cart/add']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/cart/add',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/h5/cart/add']>
    },

    /**
     * 接口名：删除
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=492376&itf=2164894
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/h5/cart/delete': (req?: IModels['POST/h5/cart/delete']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/cart/delete',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/h5/cart/delete']>
    },

    /**
     * 接口名：列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=492376&itf=2167559
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/h5/cart/list': (req?: IModels['GET/h5/cart/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/cart/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/h5/cart/list']>
    },

    /**
     * 接口名：更新
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=492376&itf=2168529
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/h5/cart/update': (req?: IModels['POST/h5/cart/update']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/cart/update',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/h5/cart/update']>
    },

    /**
     * 接口名：新增
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=494514&itf=2172165
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/h5/user/address/add': (req?: IModels['POST/h5/user/address/add']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/user/address/add',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/h5/user/address/add']>
    },

    /**
     * 接口名：详情
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=494514&itf=2182639
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/h5/user/address/info': (req?: IModels['GET/h5/user/address/info']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/user/address/info',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/h5/user/address/info']>
    },

    /**
     * 接口名：列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=494514&itf=2172169
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/h5/user/address/list': (req?: IModels['GET/h5/user/address/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/user/address/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/h5/user/address/list']>
    },

    /**
     * 接口名：更新
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=494514&itf=2172171
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/h5/user/address/update': (req?: IModels['POST/h5/user/address/update']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/user/address/update',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/h5/user/address/update']>
    },

    /**
     * 接口名：删除
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=494514&itf=2172172
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/h5/user/address/delete': (req?: IModels['POST/h5/user/address/delete']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/user/address/delete',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/h5/user/address/delete']>
    },

    /**
     * 接口名：获取默认
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=494514&itf=2172173
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/h5/user/address/default': (req?: IModels['GET/h5/user/address/default']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/user/address/default',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/h5/user/address/default']>
    },

    /**
     * 接口名：设置默认
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=494514&itf=2172196
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/h5/user/address/set-default': (
      req?: IModels['POST/h5/user/address/set-default']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/h5/user/address/set-default',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/h5/user/address/set-default']>
    },

    /**
     * 接口名：购物车预览
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=497588&itf=2189433
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/h5/order/preview': (req?: IModels['GET/h5/order/preview']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/order/preview',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/h5/order/preview']>
    },

    /**
     * 接口名：订单列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=497588&itf=2190328
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/h5/order/list': (req?: IModels['GET/h5/order/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/order/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/h5/order/list']>
    },

    /**
     * 接口名：订单详情
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=497588&itf=2190329
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/h5/order/info': (req?: IModels['GET/h5/order/info']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/order/info',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/h5/order/info']>
    },

    /**
     * 接口名：创建订单
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=497588&itf=2195053
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/h5/order/add': (req?: IModels['POST/h5/order/add']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/order/add',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/h5/order/add']>
    },

    /**
     * 接口名：订单取消
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=497588&itf=2196218
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/h5/order/cancel': (req?: IModels['POST/h5/order/cancel']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/order/cancel',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/h5/order/cancel']>
    },

    /**
     * 接口名：订单删除
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=497588&itf=2196222
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/h5/order/delete': (req?: IModels['POST/h5/order/delete']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/order/delete',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/h5/order/delete']>
    },

    /**
     * 接口名：商品预览
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=497588&itf=2247758
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/h5/order/goodsPreview': (req?: IModels['GET/h5/order/goodsPreview']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/order/goodsPreview',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/h5/order/goodsPreview']>
    },

    /**
     * 接口名：支付订单
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=497588&itf=2252256
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/h5/order/pay': (req?: IModels['POST/h5/order/pay']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/order/pay',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/h5/order/pay']>
    },

    /**
     * 接口名：订单确认
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=497588&itf=2257707
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/h5/order/confirm': (req?: IModels['POST/h5/order/confirm']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/order/confirm',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/h5/order/confirm']>
    },

    /**
     * 接口名：用户详情
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=499304&itf=2199147
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/h5/user/info': (req?: IModels['GET/h5/user/info']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/user/info',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/h5/user/info']>
    },

    /**
     * 接口名：用户更新
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=499304&itf=2204939
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/h5/user/info/update': (req?: IModels['POST/h5/user/info/update']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/user/info/update',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/h5/user/info/update']>
    },

    /**
     * 接口名：商品列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=503900&itf=2307545
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/h5/goods/list': (req?: IModels['GET/h5/goods/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/goods/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/h5/goods/list']>
    },

    /**
     * 接口名：商品详情
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=503900&itf=2224267
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/h5/goods/info': (req?: IModels['GET/h5/goods/info']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/goods/info',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/h5/goods/info']>
    },

    /**
     * 接口名：新增收藏
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=503900&itf=2224269
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/h5/goods/collect/add': (req?: IModels['POST/h5/goods/collect/add']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/goods/collect/add',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/h5/goods/collect/add']>
    },

    /**
     * 接口名：删除收藏
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=503900&itf=2224271
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/h5/goods/collect/delete': (
      req?: IModels['POST/h5/goods/collect/delete']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/h5/goods/collect/delete',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/h5/goods/collect/delete']>
    },

    /**
     * 接口名：收藏列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=503900&itf=2228675
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/h5/goods/collect/list': (req?: IModels['GET/h5/goods/collect/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/goods/collect/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/h5/goods/collect/list']>
    },

    /**
     * 接口名：首页
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=503900&itf=2307536
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/h5/index': (req?: IModels['GET/h5/index']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/h5/index',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/h5/index']>
    },

    /**
     * 接口名：广告列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308437
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/ad/list': (req?: IModels['GET/admin/ad/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/ad/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/ad/list']>
    },

    /**
     * 接口名：广告详情
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308438
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/ad/info': (req?: IModels['GET/admin/ad/info']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/ad/info',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/ad/info']>
    },

    /**
     * 接口名：广告添加
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308445
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/ad/add': (req?: IModels['POST/admin/ad/add']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/ad/add',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/ad/add']>
    },

    /**
     * 接口名：广告更新
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308476
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/ad/update': (req?: IModels['POST/admin/ad/update']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/ad/update',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/ad/update']>
    },

    /**
     * 接口名：广告删除
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308477
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/ad/delete': (req?: IModels['POST/admin/ad/delete']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/ad/delete',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/ad/delete']>
    },

    /**
     * 接口名：广告位置添加
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308484
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/ad/position/add': (req?: IModels['POST/admin/ad/position/add']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/ad/position/add',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/ad/position/add']>
    },

    /**
     * 接口名：广告位置列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308479
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/ad/position/list': (req?: IModels['GET/admin/ad/position/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/ad/position/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/ad/position/list']>
    },

    /**
     * 接口名：广告位置更新
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308481
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/ad/position/update': (
      req?: IModels['POST/admin/ad/position/update']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/admin/ad/position/update',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/ad/position/update']>
    },

    /**
     * 接口名：广告位置删除
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308483
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/ad/position/delete': (
      req?: IModels['POST/admin/ad/position/delete']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/admin/ad/position/delete',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/ad/position/delete']>
    },

    /**
     * 接口名：文章类型添加
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308487
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/article/type/add': (req?: IModels['POST/admin/article/type/add']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/article/type/add',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/article/type/add']>
    },

    /**
     * 接口名：文章类型列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308488
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/article/type/list': (req?: IModels['GET/admin/article/type/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/article/type/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/article/type/list']>
    },

    /**
     * 接口名：文章类型更新
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308490
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/article/type/update': (
      req?: IModels['POST/admin/article/type/update']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/admin/article/type/update',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/article/type/update']>
    },

    /**
     * 接口名：文章类型删除
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308491
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/article/type/delete': (
      req?: IModels['POST/admin/article/type/delete']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/admin/article/type/delete',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/article/type/delete']>
    },

    /**
     * 接口名：文章列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308492
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/article/list': (req?: IModels['GET/admin/article/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/article/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/article/list']>
    },

    /**
     * 接口名：文章详情
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308493
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/article/info': (req?: IModels['GET/admin/article/info']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/article/info',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/article/info']>
    },

    /**
     * 接口名：文章更新
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308494
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/article/update': (req?: IModels['POST/admin/article/update']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/article/update',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/article/update']>
    },

    /**
     * 接口名：文章增加
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308495
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/article/add': (req?: IModels['POST/admin/article/add']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/article/add',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/article/add']>
    },

    /**
     * 接口名：文章删除
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518382&itf=2308496
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/article/delete': (req?: IModels['POST/admin/article/delete']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/article/delete',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/article/delete']>
    },

    /**
     * 接口名：产品列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518530&itf=2308498
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/goods/list': (req?: IModels['GET/admin/goods/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/goods/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/goods/list']>
    },

    /**
     * 接口名：产品新增
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518530&itf=2308499
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/goods/add': (req?: IModels['POST/admin/goods/add']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/goods/add',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/goods/add']>
    },

    /**
     * 接口名：产品更新
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518530&itf=2308500
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/goods/update': (req?: IModels['POST/admin/goods/update']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/goods/update',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/goods/update']>
    },

    /**
     * 接口名：产品详情
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518530&itf=2308501
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/goods/info': (req?: IModels['GET/admin/goods/info']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/goods/info',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/goods/info']>
    },

    /**
     * 接口名：产品删除
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518530&itf=2308502
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/goods/delete': (req?: IModels['POST/admin/goods/delete']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/goods/delete',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/goods/delete']>
    },

    /**
     * 接口名：产品上架/下架
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518530&itf=2308786
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/goods/isOpen/set': (req?: IModels['POST/admin/goods/isOpen/set']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/goods/isOpen/set',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/goods/isOpen/set']>
    },

    /**
     * 接口名：订单列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518530&itf=2308503
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/order/list': (req?: IModels['GET/admin/order/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/order/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/order/list']>
    },

    /**
     * 接口名：订单详情
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518530&itf=2308504
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/order/info': (req?: IModels['GET/admin/order/info']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/order/info',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/order/info']>
    },

    /**
     * 接口名：订单发货
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518530&itf=2308505
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/order/delivery': (req?: IModels['POST/admin/order/delivery']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/order/delivery',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/order/delivery']>
    },

    /**
     * 接口名：产品分类列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2307747
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/goods/type/list': (req?: IModels['GET/admin/goods/type/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/goods/type/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/goods/type/list']>
    },

    /**
     * 接口名：产品分类增加
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308599
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/goods/type/add': (req?: IModels['POST/admin/goods/type/add']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/goods/type/add',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/goods/type/add']>
    },

    /**
     * 接口名：产品分类更新
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308600
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/goods/type/update': (
      req?: IModels['POST/admin/goods/type/update']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/admin/goods/type/update',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/goods/type/update']>
    },

    /**
     * 接口名：产品分类删除
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308601
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/goods/type/delete': (
      req?: IModels['POST/admin/goods/type/delete']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/admin/goods/type/delete',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/goods/type/delete']>
    },

    /**
     * 接口名：产品分类详情
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308602
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/goods/type/info': (req?: IModels['GET/admin/goods/type/info']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/goods/type/info',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/goods/type/info']>
    },

    /**
     * 接口名：规格列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308604
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/goods/spec/list': (req?: IModels['GET/admin/goods/spec/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/goods/spec/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/goods/spec/list']>
    },

    /**
     * 接口名：规格新增
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308605
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/goods/spec/add': (req?: IModels['POST/admin/goods/spec/add']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/goods/spec/add',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/goods/spec/add']>
    },

    /**
     * 接口名：规格更新
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308606
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/goods/spec/update': (
      req?: IModels['POST/admin/goods/spec/update']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/admin/goods/spec/update',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/goods/spec/update']>
    },

    /**
     * 接口名：规格删除
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308607
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/goods/spec/delete': (
      req?: IModels['POST/admin/goods/spec/delete']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/admin/goods/spec/delete',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/goods/spec/delete']>
    },

    /**
     * 接口名：属性列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308608
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/goods/attr/list': (req?: IModels['GET/admin/goods/attr/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/goods/attr/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/goods/attr/list']>
    },

    /**
     * 接口名：属性新增
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308610
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/goods/attr/add': (req?: IModels['POST/admin/goods/attr/add']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/goods/attr/add',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/goods/attr/add']>
    },

    /**
     * 接口名：属性更新
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308612
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/goods/attr/update': (
      req?: IModels['POST/admin/goods/attr/update']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/admin/goods/attr/update',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/goods/attr/update']>
    },

    /**
     * 接口名：属性删除
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518381&itf=2308615
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/goods/attr/delete': (
      req?: IModels['POST/admin/goods/attr/delete']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/admin/goods/attr/delete',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/goods/attr/delete']>
    },

    /**
     * 接口名：登录
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518383&itf=2308420
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/login': (req?: IModels['POST/admin/login']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/login',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/login']>
    },

    /**
     * 接口名：修改密码
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518383&itf=2308428
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/user/admin/password': (
      req?: IModels['POST/admin/user/admin/password']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/admin/user/admin/password',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/user/admin/password']>
    },

    /**
     * 接口名：用户信息
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518383&itf=2308442
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/user/admin/info': (req?: IModels['GET/admin/user/admin/info']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/user/admin/info',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/user/admin/info']>
    },

    /**
     * 接口名：网站设置
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518383&itf=2308856
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/system/web/config/info': (
      req?: IModels['GET/admin/system/web/config/info']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/admin/system/web/config/info',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/system/web/config/info']>
    },

    /**
     * 接口名：网站设置更新
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518383&itf=2308861
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/system/web/config/update': (
      req?: IModels['POST/admin/system/web/config/update']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/admin/system/web/config/update',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/system/web/config/update']>
    },

    /**
     * 接口名：用户登陆日志
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=295591&mod=518383&itf=2308865
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/system/log/login': (req?: IModels['GET/admin/system/log/login']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/system/log/login',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/system/log/login']>
    },
  }
}

# 商城管理系统

技术栈：vue3 + ts + vite3 + pinia + elementUI

### 项目链接
1. 管理后台（[在线访问地址](http://admin.shop.shaoky.com/)）
2. h5（[项目链接](https://github.com/shaoky/vue3-mall-h5)）

### 项目运行
1. yarn
2. yarn dev

### 功能

1. 文章管理√
2. 广告管理√
3. 产品管理√
4. 订单管理√
5. 权限管理√
6. 用户管理√
7. 系统设置√
8. 登录日志√
9. 产品分类管理√
10. 优惠券管理×
11. 退货管理×
12. 首页数据概况√

### 目录结构

<pre>
├── README.md           
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── api            // api接口
│   ├── assets         // css和图片资源
│   ├── components     // 各种组件
│   ├── config         // 配置
│   ├── router         // 配置路由
│   ├── store          // 状态管理
│   ├── views          // 各种页面
|   ├── utils          // 工具库
│   └── main.js
</pre>

### 提交规则
格式：前缀 + 英文冒号: + 1个空格 + 描述

1. feat: 新功能（feature）
2. hotfix: 修补bug
3. docs: 文档（documentation）
4. style: 格式（不影响代码运行的变动）
5. refactor: 重构（即不是新增功能，也不是修改bug的代码变动）
6. build: 生产环境改动
7. test: 增加测试
8. chore: 构建过程或辅助工具的变动
9. release: 发布
10. delete: 删除文件
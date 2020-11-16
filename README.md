# 微信小程序商城服务端

## 技术栈
```
ES6/ES7 + nodejs + express + MongoDB
```

## 运行环境
```
CentOS 7.3
node 8.11.0
npm 5.6.0
MongoDB 3.2.7
```

## 说明
```
>  如有问题或者遇到坑请直接在 Issues 中提

>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

>  前端地址: https://github.com/FZliweiliang/wechat-app-mall

```

## 项目布局
```
|-- api                     // 接口方法
|   |-- general             // 通用接口
|   |-- home-api            // 首页接口
|   |-- admin-api           // 管理接口
|   |-- order-api           // 订单接口
|   |-- public-api          // 公共接口
|   |-- user-api            // 个人中心
|-- file                    // 公共文件
|   |-- images              // 公共图片
|   |-- icon                // 公共图标
|-- models                  // 公共模型
|-- utils                   // 公共方法
|-- routes                  // 路由
|-- mongoose.js             // 连接数据库
|-- app.js                  // 启动
|-- README.md               // 说明
```

## 接口列表
### 管理
| Name       | Method          | Default  | Description  |
| ----------- |:--------------| ---------|--------------|
| /v1/admin/delUser   | get        | auto | 删除用户 |
| /v1/admin/delItem  | get        | auto   | 删除商品 |
| /v1/admin/addItem  | post        | auto   | 添加商品 |
| /v1/admin/addClass  | post        | auto   | 添加分类 |
| /v1/admin/delClass  | get        | auto   | 删除分类 |
| /v1/admin/addClass  | post        | auto   | 添加分类 |
| /v1/admin/addCoupon  | post        | auto   | 添加优惠券 |
| /v1/admin/couponList  | get        | auto   | 所有优惠券 |
| /v1/admin/uploadBanner  | post        | auto   | 上传banner |

### 首页
| Name       | Method          | Default  | Description  |
| ----------- |:--------------| ---------|--------------|
| /v1/home/bannerList   | get        | auto | 获取banner |
| /v1/home/getHotList  | get        | auto   | 获取推荐列表 |
| /v1/home/getList  | get        | auto   | 获取列表 |
| /v1/home/getItem  | get        | auto   | 获取详情 |

### 订单
| Name       | Method          | Default  | Description  |
| ----------- |:--------------| ---------|--------------|
| /v1/order/set   | post        | auto | 创建订单 |
| /v1/order/get  | post        | auto   | 获取订单详情 |
| /v1/order/list  | get        | auto   | 订单列表 |
| /v1/order/update  | post        | auto   | 更新订单 |

### 微信
| Name       | Method          | Default  | Description  |
| ----------- |:--------------| ---------|--------------|
| /v1/wx/getUser   | get        | auto | 获取微信用户信息 |

### 用户
| Name       | Method          | Default  | Description  |
| ----------- |:--------------| ---------|--------------|
| /v1/user/bindMobile   | post        | auto | 绑定手机号 |
| /v1/user/addCity   | post        | auto | 添加地址 |
| /v1/user/editCity   | post        | auto | 更新地址 |
| /v1/user/defaultCity   | post        | auto | 设置默认地址 |
| /v1/user/cityList   | get        | auto | 地址列表 |
| /v1/user/getCoupon   | post        | auto | 领取优惠券 |
| /v1/user/couponList   | get        | auto | 获取拥有的优惠 |

### 通用
| Name       | Method          | Default  | Description  |
| ----------- |:--------------| ---------|--------------|
| /v1/public/getClassList   | get        | auto | 获取分类列表 |

### 购物车
| Name       | Method          | Default  | Description  |
| ----------- |:--------------| ---------|--------------|
| /v1/order/addCart   | post        | auto | 加入购物车 |
| /v1/order/cartList   | post        | auto | 购物车列表 |
| /v1/order/delIetm   | get        | auto | 删除商品 |
| /v1/order/editCart   | post        | auto | 编辑购物车 |


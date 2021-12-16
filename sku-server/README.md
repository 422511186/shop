# 模拟商城服务端

## 启动服务

首次使用需要先安装依赖

```
npm i
```

编译代码

```
npm run build
```

启动服务

```
node index.js
```

服务会监听 `3380` 端口

## API协议

服务端接口路径以 `/api/` 作为前缀，所有API都采用POST JSON的方式调用，例如用户登录的API：

```js
async function login(username, password) {
  let res = await fetch('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  let result = await res.json()
  if (result.stat === 'OK') {
    console.log('用户登录成功')
  } else {
    console.log(result.message)
  }
}
```

所有的API返回都是JSON格式，包含的基本属性如下

- stat：API的返回状态，如果执行成功，值为 `OK`，否则为对应的错误码
- message：可选的错误信息，如果 `stat` 不为 `OK`，则 `message` 是对应的错误信息

如果API执行成功，可能还会携带其他的一些数据，参考各自API的说明，返回示例结果：

```json
{
  "stat": "OK",
  "rows": []
}
```

```json
{
  "stat": "ERR_BAD_PARAMS",
  "message": "无效的参数"
}
```

## 内置用户

系统有两个内置的用户可供测试

### 普通用户

- username：test
- password：123456

### 管理员用户

- username：admin
- password：123456

## 数据结构

商品对象

```ts
interface ISku {
  /**
   * 商品ID
   */
  id: string
  /**
   * 商品标题
   */
  title: string
  /**
   * 商品库存
   */
  stock: number
  /**
   * 商品价格
   */
  price: number
  /**
   * 封面图
   */
  cover: string
  /**
   * 头图集合
   */
  gallery: string[]
  /**
   * 详情图集合
   */
  detail: string[]
  /**
   * 发布时间，由系统自动生成
   */
  time: number
  /**
   * 商品状态，1-上架，2-下架
   */
  status: number
}
```

用户对象

```ts
interface IUser {
  /**
   * 用户名
   */
  username: string
  /**
   * 昵称
   */
  nickname: string
  /**
   * 头像地址
   */
  avatar: string
  /**
   * 用户角色，1-普通用户，2-管理员
   */
  role: number
}
```

## 个人端API

### 商品列表

> /api/sku/list

返回数据：

- stat：返回状态
- rows：ISku[]，商品对象列表，不包含下架的商品

### 商品详情

> /api/sku/info

请求参数：

- id：商品ID

返回数据：

- stat：返回状态
- data：ISku，商品对象

### 购物车列表

> /api/cart/list

访问该接口需要先登录

返回数据：

- stat：返回状态，如果未登录值为 `ERR_NOT_LOGIN`
- rows：ISku[]，商品对象列表

### 加入购物车

> /api/cart/add

访问该接口需要先登录

请求参数：

- id：商品ID

返回数据：

- stat：返回状态，如果未登录值为 `ERR_NOT_LOGIN`
- data：ISKu，如果添加成功返回的商品对象

### 删除购物车商品

> /api/cart/remove

访问该接口需要先登录

请求参数：

- ids：string[]，商品ID集合，可同时删除多个购物车商品

返回数据：

- stat：返回状态

### 用户登录

> /api/user/login

请求参数：

- username：用户名
- password：密码

返回数据：

- stat：返回状态
- user：IUser，用户对象

### 退出登录

> /api/user/logout

返回数据：

- stat：返回状态

### 获取当前登录用户信息

> /api/user/info

返回数据：

- stat：返回状态
- data：IUser，用户对象

## 管理端API

### 用户登录

> /api/console/user/login

请求参数：

- username：用户名
- password：密码

返回数据：

- stat：返回状态
- user：IUser，用户对象

### 退出登录

同个人端

### 获取当前登录用户信息

同个人端

### 添加商品

访问该API需要登录管理员用户

> /api/admin/sku/add

请求参数：

- title：string，商品标题
- stock：string，商品库存
- price：number，商品价格
- status：number，商品状态，1-上架，2-下架
- cover：string，封面图地址
- gallery：string[]，头图地址数组，至少1张，不超过5张
- detail：string[]，详情图地址数组，至少1张，不超过10张

返回数据：

- stat：返回状态
- data：ISku，添加的商品对象

### 商品列表

访问该API需要登录管理员用户

> /api/admin/sku/list

请求参数：

- keyword：string，可选参数，如果传值则会对商品标题进行过滤

返回数据：

- stat：返回状态
- rows：ISku[]，商品对象列表，包含下架的商品

### 更新商品

访问该API需要登录管理员用户

> /api/admin/sku/update

请求参数：

- id：商品ID
- title：string，商品标题
- stock：string，商品库存
- price：number，商品价格
- status：number，商品状态，1-上架，2-下架
- cover：string，封面图地址
- gallery：string[]，头图地址数组，至少1张，不超过5张
- detail：string[]，详情图地址数组，至少1张，不超过10张

返回数据：

- stat：返回状态

### 删除商品

访问该API需要登录管理员用户

请求参数：

- id：要删除的商品ID

返回数据：

- stat：返回状态
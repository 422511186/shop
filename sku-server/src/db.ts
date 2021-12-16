import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'

import { ISku, IUser, ICart, UserRole, SkuStatus, Pick } from './types'

interface Store {
  skus: ISku[]
  carts: ICart[]
  users: IUser[]
}

let store: Store = {
  skus: [],
  carts: [],
  users: [
    {
      username: 'test',
      nickname: '演示用户',
      password: '7c4a8d09ca3762af61e59520943dc26494f8941b',
      avatar: 'https://assets.kscampus.io:10443/imgs/avatar_1.jpg',
      role: UserRole.Common
    },
    {
      username: 'admin',
      nickname: '管理员',
      password: '7c4a8d09ca3762af61e59520943dc26494f8941b',
      avatar: 'https://assets.kscampus.io:10443/imgs/avatar_2.jpg',
      role: UserRole.Admin
    }
  ]
}

let tokens = new Map<string, string>()

const dir = path.join(__dirname, '../storage')
const file = path.join(dir, 'db.json')
if (fs.existsSync(dir) === false) fs.mkdirSync(dir)
try {
  let json = JSON.parse(fs.readFileSync(file, 'utf-8'))
  if (json.skus) store.skus = json.skus
  if (json.carts) store.carts = json.carts
  if (json.users) store.users = json.users
} catch (error) {}

function dump() {
  return fs.promises.writeFile(file, JSON.stringify(store, null, 2))
}

// 商品列表
export function listSku(keyword = '', status?: SkuStatus) {
  let rows = store.skus.filter(sku => sku.title.includes(keyword))
  if (status) rows = rows.filter(sku => sku.status === status)
  return rows
}

// 添加商品
export async function addSku(sku: ISku) {
  sku.id = crypto.randomBytes(6).toString('hex')
  sku.time = Date.now()
  store.skus.unshift(sku)
  await dump()
  return sku
}

// 更新商品
export async function updateSku(sku: Pick<ISku>) {
  let index = store.skus.findIndex(item => item.id === sku.id)
  if (index > -1) {
    store.skus[index] = {
      ...store.skus[index],
      ...sku
    }
    await dump()
  }
}

// 删除商品
export async function removeSku(id: string) {
  let index = store.skus.findIndex(sku => sku.id === id)
  let sku = store.skus.splice(index, 1)
  await dump()
  return sku
}

// 商品详情
export function findSku(id: string) {
  let sku = store.skus.find(item => item.id === id)
  return sku
}

// 添加购物车
export async function addCart(username: string, skuId: string) {
  let result = store.carts.find(item => item.username === username && item.skuId === skuId)
  if (!result) {
    let item = {
      username,
      skuId
    }
    store.carts.push(item)
    await dump()
    return item
  }
  return result
}

// 购物车列表
export function listCart(username: string) {
  let ids = store.carts.filter(item => item.username === username).map(item => item.skuId)
  let rows = store.skus.filter(item => ids.includes(item.id))
  return rows
}

// 删除购物车
export async function removeCart(username: string, ids: string[]) {
  store.carts = store.carts.filter(item => !(item.username === username && ids.includes(item.skuId) === true))
  await dump()
}

// 登录
export function login(username: string, password: string, role: UserRole) {
  let user = store.users.find(item => item.username === username)
  let hash = crypto.createHash('sha1')
  hash.update(password)
  let pass = hash.digest('hex')
  if (!user || user.password !== pass) {
    throw { stat: 'ERR_LOGIN_FAILED', message: '用户名或密码不正确' }
  }
  if (user.role !== role) {
    throw { stat: 'ERR_FORBIDDEN', message: '无效的用户角色' }
  }
  let token = crypto.randomBytes(12).toString('hex')
  tokens.set(token, username)
  return {
    token,
    user
  }
}

// 获取用户信息
export function userInfo(token: string) {
  let username = tokens.get(token)
  let user = store.users.find(item => item.username === username)
  if (!user) throw { stat: 'ERR_NOT_FOUND', message: '找不到指定的用户' }
  return {
    ...user,
    password: undefined as string
  }
}

// 注销
export function logout(token: string) {
  tokens.delete(token)
}
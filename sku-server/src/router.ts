import Router = require('koa-router')
import * as Joi from 'joi'

import * as service from './service'
import { SkuStatus, UserRole } from './types'

const router = new Router({
  prefix: '/api'
})

router.use(async (ctx, next) => {
  let token = ctx.cookies.get('token')
  let userInfo: any
  try {
    userInfo = service.userInfo(token)
  } catch (error) { }
  let needAuth = ['/api/cart', '/api/admin']
  for (let item of needAuth) {
    if (ctx.url.startsWith(item) && !userInfo) {
      return ctx.body = {
        stat: 'ERR_NOT_LOGIN',
        message: '用户未登录'
      }
    }
  }
  if (ctx.url.startsWith('/api/admin') && userInfo.role !== UserRole.Admin) {
    return ctx.body = {
      stat: 'ERR_FORBIDDEN',
      message: '权限不足'
    }
  }
  ctx.state.userInfo = userInfo
  await next()
})

router.post('/user/login', ctx => {
  let schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) {
    return ctx.body = {
      stat: 'ERR_BAD_PARAMS',
      message: error.message
    }
  }
  try {
    let { token, user } = service.login(value.username, value.password, UserRole.Common)
    ctx.set('Set-Cookie', `token=${token}; path=/; httpOnly`)
    ctx.body = {
      stat: 'OK',
      user
    }
  } catch (error) {
    ctx.body = error
  }
})

router.post('/user/info', ctx => {
  if (ctx.state.userInfo) {
    ctx.body = {
      stat: 'OK',
      data: ctx.state.userInfo
    }
  } else {
    ctx.body = {
      stat: 'ERR_NOT_LOGIN',
      message: '用户未登录'
    }
  }
})

router.post('/user/logout', ctx => {
  let token = ctx.cookies.get('token')
  service.logout(token)
  ctx.set('Set-Cookie', `token=; path=/; expires=${new Date().toUTCString()}; httpOnly`)
  ctx.body = {
    stat: 'OK'
  }
})

router.post('/sku/list', ctx => {
  let rows = service.listSku(ctx.request.body?.keyword || '', SkuStatus.Normal)
  ctx.body = {
    stat: 'OK',
    rows
  }
})

router.post('/sku/info', ctx => {
  let schema = Joi.object({
    id: Joi.string().required()
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) {
    return ctx.body = {
      stat: 'ERR_BAD_PARAMS',
      message: error.message
    }
  }
  let data = service.findSku(value.id)
  if (data) {
    ctx.body = {
      stat: 'OK',
      data
    }
  } else {
    return {
      stat: 'ERR_NOT_FOUND',
      message: '找不到指定的数据'
    }
  }
})

router.post('/cart/add', async ctx => {
  let schema = Joi.object({
    skuId: Joi.string().required()
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) {
    return ctx.body = {
      stat: 'ERR_BAD_PARAMS',
      message: error.message
    }
  }
  let result = await service.addCart(ctx.state.userInfo.username, value.skuId)
  ctx.body = {
    stat: 'OK',
    data: result
  }
})

router.post('/cart/list', ctx => {
  let rows = service.listCart(ctx.state.userInfo.username)
  ctx.body = {
    stat: 'OK',
    rows
  }
})

router.post('/cart/remove', async ctx => {
  let schema = Joi.object({
    ids: Joi.array().items(Joi.string().required()).min(1).required()
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) {
    return ctx.body = {
      stat: 'ERR_BAD_PARAMS',
      message: error.message
    }
  }
  await service.removeCart(ctx.state.userInfo.username, value.ids)
  ctx.body = {
    stat: 'OK'
  }
})

router.post('/console/user/login', ctx => {
  let schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) {
    return ctx.body = {
      stat: 'ERR_BAD_PARAMS',
      message: error.message
    }
  }
  try {
    let { token, user } = service.login(value.username, value.password, UserRole.Admin)
    ctx.set('Set-Cookie', `token=${token}; path=/; httpOnly`)
    ctx.body = {
      stat: 'OK',
      token,
      user
    }
  } catch (error) {
    ctx.body = error
  }
})

router.post('/admin/sku/add', async ctx => {
  let schema = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    stock: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
    status: Joi.number().required(),
    cover: Joi.string().required(),
    gallery: Joi.array().items(Joi.string().required()).min(1).max(5).required(),
    detail: Joi.array().items(Joi.string().required()).min(1).max(10).required()
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) {
    return ctx.body = {
      stat: 'ERR_BAD_PARAMS',
      message: error.message
    }
  }
  try {
    let sku = await service.addSku(value)
    ctx.body = {
      stat: 'OK',
      data: sku
    }
  } catch (error) {
    ctx.body = error
  }
})

router.post('/admin/sku/update', async ctx => {
  let schema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().min(2).max(50),
    stock: Joi.number().min(0),
    price: Joi.number().min(0),
    status: Joi.number(),
    cover: Joi.string(),
    gallery: Joi.array().items(Joi.string().required()).min(1).max(5),
    detail: Joi.array().items(Joi.string().required()).min(1).max(10)
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) {
    return ctx.body = {
      stat: 'ERR_BAD_PARAMS',
      message: error.message
    }
  }
  await service.updateSku(value)
  ctx.body = {
    stat: 'OK'
  }
})

router.post('/admin/sku/remove', async ctx => {
  let schema = Joi.object({
    id: Joi.string().required()
  })
  let { value, error } = schema.validate(ctx.request.body)
  if (error) {
    return ctx.body = {
      stat: 'ERR_BAD_PARAMS',
      message: error.message
    }
  }
  await service.removeSku(value.id)
  ctx.body = {
    stat: 'OK'
  }
})

router.post('/admin/sku/list', ctx => {
  let rows = service.listSku(ctx.request.body?.keyword || '')
  ctx.body = {
    stat: 'OK',
    rows
  }
})

export default router
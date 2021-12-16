import Koa = require('koa')
import koaBody = require('koa-body')
import logger = require('koa-logger')

import router from './router'

const port = 3380
const app = new Koa()
app.use(koaBody())
app.use(logger())
app.use(router.routes())
app.listen(port, () => {
  console.log(`listening on http://0.0.0.0:${port}`)
})
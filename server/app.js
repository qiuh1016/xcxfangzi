const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
const views = require('koa-views');
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const config = require('./config')

// 使用响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyParser())

app.use(views(__dirname + '/views', {
  extension: 'pug'
}));

// 引入路由分发
const router = require('./routes/index.js')
const apiRouter = require('./routes/api.js')
app.use(router.routes())
app.use(apiRouter.routes())

// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))

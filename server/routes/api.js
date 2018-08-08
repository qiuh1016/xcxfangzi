const router = require('koa-router')({
  prefix: '/api'
})
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

const controllers = require('../controllers')

router.get('/user/checkopenid', validationMiddleware, controllers.myuser.checkopenid);
router.post('/user/add', validationMiddleware, controllers.myuser.adduser);
router.get('/user/:openid/active', validationMiddleware, controllers.myuser.activeuser);
router.get('/user/:openid/permission', validationMiddleware, controllers.myuser.updatepermission);

router.get('/message', validationMiddleware, controllers.myuser.sendmessage);

module.exports = router
const router = require('koa-router')({
  prefix: '/api'
})
const controllers = require('../controllers')

router.get('/user/checkopenid', controllers.myuser.checkopenid);
router.post('/user/add', controllers.myuser.adduser);
router.get('/user/:openid/active', controllers.myuser.activeuser);
router.get('/user/:openid/permission', controllers.myuser.updatepermission);

module.exports = router
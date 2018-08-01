const db = require('../middlewares/db.js');

let checkopenid = async (ctx, next) => {
  let openid = ctx.state.$wxInfo.userinfo.openId || '';

  let user = await db.getUserByOpenId(openid);
  if (user.length != 0) {
    ctx.body = {
      code: 1,
      msg: "用户已存在，登录成功",
      active: user[0].active,
    }
  } else {
    ctx.body = {
      code: 0,
      msg: "openid未发现，添加用户",
    }
  }
}

let adduser = async (ctx, next) => {
  let name = ctx.request.body.name;
  let gender = ctx.request.body.gender;
  let phone = ctx.request.body.phone;
  let depart = ctx.request.body.depart;
  let openid = ctx.state.$wxInfo.userinfo.openId || '';

  if (openid == '') {
    return ctx.body = {
      code: 0,
      msg: "openid为空"
    }
  }
  try {
    let user = await db.getUserByPhone(phone);
    if (user.length != 0) {
      // phone 已存在
      let user_1 = await db.getUserByOpenId(openid);
      if (user_1.length == 0) {
        // openid 不存在
        // 检测name和depart是否一致
        if (user[0].name == name && user[0].depart == depart) {
          await db.updateOpenid(phone, openid);
          ctx.body = {
            code: 1,
            msg: "用户绑定成功"
          }
        } else {
          ctx.body = {
            code: 0,
            msg: "用户信息不符"
          }
        }
      } else {
        // openid 已存在
        ctx.body = {
          code: 0,
          msg: "用户已存在"
        }
      }
    } else {
      // phone 不存在， 保存所有信息
      await db.insertUser(name, phone, openid, 4, depart, false);
      ctx.body = {
        code: 1,
        msg: "用户添加成功，等待激活"
      }
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      msg: "服务器内部错误"
    }
  }
}

let activeuser = async (ctx, next) => {
  ctx.body = {
    code: 1,
    msg: "activeuser"
  }
}

let updatepermission = async (ctx, next) => {
  ctx.body = {
    code: 1,
    msg: "updatepermission"
  }
}

module.exports = {
  checkopenid,
  adduser,
  activeuser,
  updatepermission
}
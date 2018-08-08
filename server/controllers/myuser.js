const db = require('../middlewares/db.js');
const axios = require('axios');

let checkopenid = async(ctx, next) => {
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

let adduser = async(ctx, next) => {
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
            msg: "您的手机号已被管理员提前导入到系统中，但是姓名或部门与系统中不一致，请与管理员联系"
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

let activeuser = async(ctx, next) => {
  ctx.body = {
    code: 1,
    msg: "activeuser"
  }
}

let updatepermission = async(ctx, next) => {
  ctx.body = {
    code: 1,
    msg: "updatepermission"
  }
}

let sendmessage = async(ctx, next) => {
  let formId = ctx.query.formId || '';
  let openid = ctx.state.$wxInfo.userinfo.openId || '';

  if (!openid) {
    ctx.body = {
      code: 0,
      msg: 'openId为空'
    }
  }

  if (!formId) {
    ctx.body = {
      code: 0,
      msg: 'formId为空'
    }
  }

  let tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token';
  let { data } = await axios.get(tokenUrl, {
    params: {
      grant_type: 'client_credential',
      appid: 'wxb2c22856549f3ab2',
      secret: 'ad0544044775b8529b4441fa56315e4a'
    }
  });
  let token = data.access_token;

  let messageUrl = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + token;
  let result = await axios.post(messageUrl, {
    touser: openid,
    template_id: 'Vi-x7fUN18hdOVgG_4BDHEkqcHEN0p8F0ps4B9t-r6A',
    form_id: formId,
    data: {
      keyword1: {
        value: '2017-12-11 12:00:00'
      },
      keyword2: {
        value: '采购订单'
      },
    }
  })

  ctx.body = {
    code: 1,
    msg: '发送成功',
    result: result.data
  }
}

module.exports = {
  checkopenid,
  adduser,
  activeuser,
  updatepermission,
  sendmessage
}
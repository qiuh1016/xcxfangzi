const db = require('../middlewares/db.js');

let test = async (ctx, next) => {
  let lat = ctx.query.lat;
  let lon = ctx.query.lon;
  ctx.body = {
    code: 1,
    msg: 'test ok',
    lat: lat,
    lon: lon
  }
}

let addUser = async (ctx, next) => {
  let name = ctx.query.name;
  let phone = ctx.query.phone;
  try {
    let row = await db.insertUser(name, phone);
    ctx.body = {
      code: 1,
      msg: 'insert ok',
      data: row
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      msg: 'insert fail',
      data: err
    }
  }
}

let showUser = async (ctx, next) => {
  try {
    let row = await db.getAllUser();
    ctx.body = {
      code: 1,
      msg: 'show ok',
      data: row
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      msg: 'show fail',
      data: err.toString()
    }
  }
}

let deleteUser = async (ctx, next) => {
  let id = ctx.query.id;
  if (id == 'undefined') {
    return ctx.body = {
      code: 0,
      msg: 'no id'
    }
  }

  try {
    let row = await db.deleteUser(id);
    ctx.body = {
      code: 1,
      msg: 'delete ok',
      data: row
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      msg: 'show fail',
      data: err.toString()
    }
  }
}

module.exports = {
  test, addUser, showUser, deleteUser
}
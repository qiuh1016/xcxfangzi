const mysql = require('mysql');
const config = require('../config')

const pool = mysql.createPool({
  host: config.mysql.host,
  port: config.mysql.port,  
  user: config.mysql.user,
  password: config.mysql.pass,
  database: config.mysql.db
});

pool.getConnection(function (err, connection) {
  if (err) {
    logger.error('connect to mysql error, check your mysql config');    
    logger.error(err);
    process.exit(99);
  } else {
    connection.release();
  }
})

let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        resolve(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

const userTableSql =
  `create table if not exists user (
  id INT NOT NULL AUTO_INCREMENT,

  name VARCHAR(20) NOT NULL,
  phone VARCHAR(20) NOT NULL unique,
  openid VARCHAR(50) unique,  
  permission INT NOT NULL,
  depart VARCHAR(10),
  active BOOLEAN,

  createAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ( id )
  );
  `

const changeNameCharSet = `ALTER TABLE user MODIFY name VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci;`
const changeDepartCharSet = `ALTER TABLE user MODIFY depart VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci;`

const addUnique = 'ALTER TABLE `user` ADD UNIQUE(`phone`);';

let createTable = function (sql) {
  return query(sql, [])
}

// 建表
createTable(userTableSql);
// 切换编码
createTable(changeNameCharSet);
createTable(changeDepartCharSet);
// 手机号唯一
// createTable(addUnique);

let insertUser = function (name, phone, openid, permission, depart, active) {
  let _sql = "insert into user(name, phone, openid, permission, depart, active) values(?,?,?,?,?,?)";
  return query(_sql, [name, phone, openid, permission, depart, active]);
}

let getUserByOpenId = function (openid) {
  let _sql = "select * from user where openid = ?;";
  return query(_sql, [openid]);
}

let getUserByPhone = function (phone) {
  let _sql = "select * from user where phone = ?;";
  return query(_sql, [phone]);
}

let activeUser = function(openid) {
  let _sql = "update user set active = true where openid = ?;";
  return query(_sql, [openid]);
}

let updateOpenid = function (phone, openid) {
  let _sql = "update user set openid = ? where phone = ?;";
  return query(_sql, [openid, phone]);
}

let updatePermission = function(openid, permission) {
  let _sql = "update user set permission = ? where openid = ?;";
  return query(_sql, [permission, openid]);
}

let getAllUser = function () {
  let _sql = "select * from user";
  return query(_sql);
}

let deleteUser = function(id) {
  let _sql = 'delete from user where id = ?';
  return query(_sql, [id]);
}

module.exports = {
  query,
  insertUser,
  getUserByOpenId,
  getUserByPhone,
  activeUser,
  updateOpenid,
  updatePermission,
  getAllUser,
  deleteUser
}
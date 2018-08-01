// pages/user/login/login.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    logged: false
  },

  login: function () {
    if (this.data.logged) return

    util.showBusy('正在登录')

    const session = qcloud.Session.get()

    if (session) {
      // 第二次登录
      // 或者本地已经有登录态
      // 可使用本函数更新登录态
      qcloud.loginWithCode({
        success: res => {
          console.log(res.openId);
          this.setData({
            userInfo: res,
          })
          // check openid
          qcloud.request({
            login: true,
            url: config.service.checkOpenIdUrl,
            success: (res) => {
              console.log(res.data)
              if (res.data.code === 1) {
                if (res.data.active) {
                  // 登陆成功
                  util.showSuccess('登录成功')
                  this.setData({
                    logged: true
                  })
                  // TODO: 登陆成功之后的操作
                  // 需要激活的处理
                } else {
                  // 需要激活
                  util.showModel('提示', '您的账户需要激活')
                }
              } else {
                // 新用户信息输入
                wx.navigateTo({
                  url: '../input/input',
                })
              }
            },
            fail: function (err) {
              util.showModel('服务器连接错误', err.message)
              console.error(err)
            }
          })
        },
        fail: err => {
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
    } else {
      // 首次登录
      qcloud.login({
        success: res => {
          this.setData({
            userInfo: res,
            logged: true
          })
          util.showSuccess('登录成功')
        },
        fail: err => {
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow');
    let that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，直接登陆
          console.log('已经授权，直接登陆');
          that.login();
        } else {
          console.log('未授权,不进行登陆操作')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
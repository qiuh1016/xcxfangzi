// pages/user/mine/mine.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: {
      name: '裘裘裘裘',
      id: 'jd_51d459a2ca9b7'
    },
    order: {
      toPay: 0,
      toReceive: 9,
      afterSell:0
    },
    assets: {
      ticket: 10,
      limit: '9000.00',
      bean: 819,
      card: 0
    },
    link: {
      goods: 1,
      store: 3,
      footprint: 0
    }
  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail)
    qcloud.request({
      login: true,
      data: {
        formId: e.detail.formId
      },
      url: config.service.sendMessageUrl,
      success: (res) => {
        console.log(res.data)
        util.showModel('提示', res.data.msg)
      },
      fail: function (err) {
        util.showModel('提示', '服务器连接错误')
        console.error(err)
      }
    })
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
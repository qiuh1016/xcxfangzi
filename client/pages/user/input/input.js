// pages/user/input/input.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  submit: function() {
    wx.showModal({
      title: '提示',
      content: JSON.stringify(this.data),
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let data = e.detail.value;

    if (!data.name) {
      wx.showModal({
        title: '提示',
        content: '请填写您的姓名',
        showCancel: false,
      })
      return
    }

    if (!data.gender) {
      wx.showModal({
        title: '提示',
        content: '请选择您的性别',
        showCancel: false,
      })
      return
    }

    if (!data.phone) {
      wx.showModal({
        title: '提示',
        content: '请填写您的手机号码',
        showCancel: false,
      })
      return
    }

    if (data.phone.length != 11) {
      wx.showModal({
        title: '提示',
        content: '请正确填写您的手机号码',
        showCancel: false,
      })
      return
    }

    if (!data.depart) {
      wx.showModal({
        title: '提示',
        content: '请选择您的部门',
        showCancel: false,
      })
      return
    }

    util.showBusy('提交中');
    // wx.request({
    qcloud.request({
      login: true,
      method: 'POST',
      url: config.service.addUserUrl,
      data: data,
      success: function (res) {
        console.log(res.data);
        wx.hideToast();

        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,
          success: function() {
            if (res.data.code === 1) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      },
      fail: function (err) {
        console.log(err);
        util.showModel('提示', '服务器错误')
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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
// pages/sign/add.js
var util = require('../../../utils/util.js')
var config = require('../../../config.js')
var moment = require('../../../vendor/moment/moment.min.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTime: ''
  },

  doUploadLocation: function () {
    util.showBusy('获取位置')
    wx.getLocation({
      type: 'gcj02',
      success: function (location) {
        wx.request({
          url: config.service.uploadLocationUrl,
          data: {
            lat: location.latitude,
            lon: location.longitude
          },
          success: function (res) {
            util.showSuccess('打卡成功')
            console.log(res.data);
            wx.openLocation({
              name: '员工1',
              latitude: Number(location.latitude),
              longitude: Number(location.longitude),
              scale: 8,
              fail: function (e) {
                console.log(e)
              },
              success: function () {
                console.log('ok')
              }
            })
          },
          fail: function (e) {
            util.showModel('打卡失败', e.message)
            console.error(e)
          }
        })
      },
      fail: function (e) {
        util.showModel('位置获取失败', e.errMsg)
        console.error(e)
      }
    })
  },

  getTime: function() {
    /*
    let now = new Date();
    let hour = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();
    return `${hour}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
    */
    return moment(new Date()).format('HH:MM:ss')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentTime: this.getTime()
    })
    setInterval(() => {
      this.setData({
        currentTime: this.getTime()
      }) 
    }, 1000);
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
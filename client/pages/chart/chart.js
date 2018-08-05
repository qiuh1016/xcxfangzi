// pages/chart/chart.js
var wxCharts = require('../../vendor/wxcharts/wxcharts-min.js');
var moment = require('../../vendor/moment/moment.min.js');

var idinfolist = [
  { "depart": "部门1", "number": 15 },
  { "depart": "部门2", "number": 20 },
  { "depart": "部门3", "number": 12 },
  { "depart": "部门4", "number": 13 },
  { "depart": "部门5", "number": 8 },
]


Page({

  /**
   * 页面的初始数据
   */
  data: {
    today: '2018-08-01',
    dateStart: '2018-07-01',
    dateEnd: '2018-08-01',
    listData: idinfolist,
  },

  pageBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  // 点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      today: e.detail.value
    })
  },

  initChart() {
    let windowWidth = 320;
    try {
      let res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      // do something when get system info failed
    }

    new wxCharts({
      canvasId: 'columnCanvas',
      width: windowWidth,
      height: windowWidth / 2,
      animation: false,
      type: 'column',
      categories: ['部门1', '部门2', '部门3', '部门4', '部门5'],
      series: [{
        name: '成交量',
        data: [15, 20, 12, 13, 8]
      }],
      yAxis: {
        format: function (val) {
          return val + '套';
        }
      },
      dataLabel: false
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let todayStr = moment(new Date()).format('YYYY-MM-DD');
    this.setData({
      today: todayStr,
      dateEnd: todayStr
    })
    this.initChart();
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
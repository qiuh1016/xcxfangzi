// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    departList: [
      {
        name: '部门1',
        manager:'主管经理1',
        members: ['部门1人员1', '部门1人员2', '部门1人员3', '部门1人员4', '部门1人员5']
      },
      {
        name: '部门2',
        manager: '主管经理2',
        members: ['部门2人员1', '部门2人员2', '部门2人员3', '部门2人员4', '部门2人员5']
      },
      {
        name: '部门3',
        manager: '主管经理3',
        members: ['部门3人员1', '部门3人员2', '部门3人员3', '部门3人员4', '部门3人员5']
      },
      {
        name: '部门4',
        manager: '主管经理4',
        members: ['部门4人员1', '部门4人员2', '部门4人员3', '部门4人员4', '部门4人员5']
      },
      {
        name: '部门5',
        manager: '主管经理5',
        members: ['部门5人员1', '部门5人员2', '部门5人员3', '部门5人员4', '部门5人员5']
      },
    ],
    members: []
  },

  openUserPage: (event) => {
    wx.navigateTo({
      url: './user?depart=' + event.currentTarget.dataset.name,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad参数:");
    console.log(options);
    console.log(options.depart);
    if (options.depart) {
      wx.setNavigationBarTitle({
        title: options.depart
      });
      let departList = this.data.departList;
      for (let i = 0; i < departList.length; i++) {
        console.log(departList[i]);
        if (departList[i].name == options.depart) {
          this.setData({
            members: departList[i].members
          })
          break;
        }
      }
    } else {
      wx.setNavigationBarTitle({
        title: '部门'
      });
    }
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
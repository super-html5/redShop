// pages/user/index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {}
  },
  //事件处理函数
  linkOrder: function () {
    wx.navigateTo({
      url: '../user/order/order'
    })
  },
  linkAddress: function () {
    wx.navigateTo({
      url: '../user/address/address'
    })
  },
  linkCoupon: function () {
    wx.navigateTo({
      url: '../user/coupon/coupon'
    })
  },
  linkShare: function () {
    wx.showToast({
      title: '右上角分享哦',
      icon: 'loading',
      duration: 2000
    })
  },
  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true
    });
    app.isAuth();
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '丹道小二',
      path: '/pages/login/index?openid=' + app.globalData.openid,
      imageUrl: '../../img/login.jpeg',
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})

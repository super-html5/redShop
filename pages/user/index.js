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
    wx.navigateTo({
      url: '../user/share/share'
    })
  },
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  }
})

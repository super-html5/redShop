// pages/index/payment/payment.js
const paymentUrl = require('../../../config').paymentUrl
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading();
    wx.request({
      url: paymentUrl,
      method: 'POST',
      data: {
        'id': options.id
      },
      header: {
        'content-type': 'application/json',
        "token_id": app.globalData.token_id
      },
      success: function (res) {
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': function (res) {
            setTimeout(function () {
              wx.redirectTo({
                url: '/pages/user/order/order',
              })
            }, 1000)
          },
          'fail': function (res) {
            setTimeout(function () {
              wx.redirectTo({
                url: '/pages/user/order/order',
              })
            }, 1000)
          }
        })
      },
      fail: function (error) {
        console.log(error)
      },
      complete: function () {
        wx.hideLoading();
      }
    })
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
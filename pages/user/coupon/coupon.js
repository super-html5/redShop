// pages/user/coupon/coupon.js
const getUserCouponUrl = require('../../../config').getUserCoupon
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userCoupon: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserCoupon();
  },

  /**
   * 获取优惠券列表
   */
  getUserCoupon: function () {
    var that = this;
    wx.request({
      url: getUserCouponUrl,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        "token_id": app.globalData.token_id
      },
      success: function (res) {
        console.log(res.data);
        if (res.statusCode == 200) {
          that.setData({
            userCoupon: res.data
          });
        } else if (res.statusCode == 404) {
          wx.showModal({
            content: '暂无优惠券',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          });
        } else {
          wx.showModal({
            content: '当前服务器繁忙,请稍后再试',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          });
        }
      },
      fail: function (error) {
        console.log(error)
      },
      complete: function () {
        wx.hideLoading()
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
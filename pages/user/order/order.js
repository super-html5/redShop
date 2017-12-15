// pages/user/order/order.js
const ordersListUrl = require('../../../config').ordersListUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ordersLists: []
  },
  ordersList: function () {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: ordersListUrl,
      header: {
        "content-type": "application/json",
        "token_id": wx.getStorageSync('token_id')
      },
      method: "Get",
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          that.setData({
            ordersLists: res.data
          })
        }

        if (res.statusCode == 404) {
          wx.showModal({
            content: '你还没有订单，请先购买添加',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/index/index',
                })
              }
            }
          });
        }
      },
      fail: function (res) {
        console.log(res);

      },
      complete: function () {
        wx.hideLoading()
      }

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ordersList();
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
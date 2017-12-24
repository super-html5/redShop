const findOrderByIdUrl = require('../../../config').findOrderById


const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isSendUrl: '../../../img/unsuccess.png',
    shoppingInfo: {},
    orderStatus: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.isAuth();
    this.init(options.id);
    if (options.status) {
      this.setData({
        orderStatus: 2
      });
    }
  },
  /**
   * 初始化
   */
  init: function (id) {
    wx.showLoading();
    var that = this;
    wx.request({
      url: findOrderByIdUrl + '?id=' + id,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        "token_id": app.globalData.token_id
      },
      success: function (res) {
        console.log(res);
        that.setData({
          shoppingInfo: res.data
        });
      },
      fail: function (error) {

      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  /**
   * 下订单
   */
  payment: function () {
    wx.reLaunch({
      url: '/pages/index/payment/payment?id=' + this.data.shoppingInfo.id,
    })
  },
  /**
   * 跳转首页
   */
  linkIndex: function () {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
})
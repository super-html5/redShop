const getDefAddressUrl = require('../../../config').getDefAddress
const addOrderUrl = require('../../../config').addOrder
const findOrderByIdUrl = require('../../../config').findOrderById
const app = getApp()


const utils = require('../../utils/utils');
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    shoppingNumber: 1,
    isSendUrl: '../../../img/unsuccess.png',
    isSendClick: 1,
    defAddressInfo: {},
    shoppingInfo: {},
    allPrice: 0,
    allNumber: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.init(options.id);
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
  }
})
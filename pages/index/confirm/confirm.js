const getDefAddressUrl = require('../../../config').getDefAddress
const utils = require('../../utils/utils');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shoppingNumber: 1,
    isSendUrl: '../../../img/unsuccess.png',
    isSendClick: false,
    defAddressInfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDefAddress();
  },
  /**
   * 加减方法
   */
  jzNum: function (e) {
    console.log(e.currentTarget.dataset.status);
    if (e.currentTarget.dataset.status == 'subtraction') {
      if (this.data.shoppingNumber == 1) {
        return;
      }
      this.setData({
        shoppingNumber: this.data.shoppingNumber - 1
      });
    } else if (e.currentTarget.dataset.status == 'addition') {
      this.setData({
        shoppingNumber: this.data.shoppingNumber + 1
      });
    }
  },

  /**
   * 是否自提
   */
  isSend: function () {
    if (this.data.isSendClick == false) {
      this.setData({
        isSendClick: true
      });
    } else {
      this.setData({
        isSendClick: false
      });
    }
  },
  /**
   * 获取用户默认地址
   */
  getDefAddress: function () {
    wx.showLoading();
    var that = this;
    wx.request({
      url: getDefAddressUrl,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        "token_id": wx.getStorageSync('token_id')
      },
      success: function (res) {
        utils.callBackHandler(res, that.getDefAddressSuccess);
      },
      fail: function (error) {
        console.log(error)
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  getDefAddressSuccess: function (res) {
    this.setData({
      defAddressInfo: res.data
    })
  }
})
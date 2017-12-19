const getDefAddressUrl = require('../../../config').getDefAddress
const addOrderUrl = require('../../../config').addOrder
const utils = require('../../utils/utils');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shoppingNumber: 1,
    isSendUrl: '../../../img/unsuccess.png',
    isSendClick: 1,
    defAddressInfo: {},
    shoppingInfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDefAddress();
    this.getShoppingInfo();
  },

  getShoppingInfo: function () {
    var that = this;
    wx.getStorage({
      key: 'shoppingInfo',
      success: function (res) {
        that.setData({
          shoppingInfo: res.data,
          shoppingNumber: res.data.number
        });
      }
    })
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
    if (this.data.isSendClick == 1) {
      this.setData({
        isSendClick: 2
      });
    } else {
      this.setData({
        isSendClick: 1
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
  },
  /**
   * 下订单
   */
  payment: function () {
    wx.showLoading();
    let _vo = {
      "orders": {
        "addressStr": this.data.defAddressInfo.location + this.data.defAddressInfo.street + this.data.defAddressInfo.detailedAddress,
        "mobile": this.data.defAddressInfo.phone,
        "isSelfRaised": this.data.isSendClick,
        "useCoupon": 1,
        "couponId": "couponId"
      },
      "ordersGoodsSet": [
        {
          "goodsId": this.data.shoppingInfo.dataInfo.id,
          "goodsNum": this.data.shoppingNumber
        }
      ]
    }
    wx.request({
      url: addOrderUrl,
      header: {
        "content-type": "application/json",
        "token_id": wx.getStorageSync('token_id')
      },
      method: "POST",
      data: _vo,
      success: function (res) {
        console.log(res);
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
   * 更换默认地址
   */
  linkAddress:function(){
    wx.navigateTo({
      url: '/pages/user/address/address?isBack=true',
    })
  }
})
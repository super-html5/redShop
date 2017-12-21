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
    shoppingInfo: {},
    allPrice: 0,
    allNumber: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShoppingInfo();
  },
  onShow: function () {
    this.getDefAddress();
  },
  getShoppingInfo: function () {
    this.init();
  },
  /**
   * 初始化
   */
  init: function () {
    var that = this;
    wx.getStorage({
      key: 'carShoppingInfo',
      success: function (res) {
        let _vo = JSON.parse(res.data);
        let _nums = 0;
        let _price = 0;
        for (let i = 0; i < _vo.length; i++) {
          _nums += _vo[i].number;
          _price += _vo[i].priceTotal;
        }
        that.setData({
          shoppingInfo: _vo,
          allPrice: _price,
          allNumber: _nums
        });
      }
    })
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
      "ordersGoodsSet": []
    }
    let _voo = [];
    for (let i = 0; i < this.data.shoppingInfo.length; i++) {
      let obj = {
        'goodsId': this.data.shoppingInfo[i].goodsId,
        'goodsNum': this.data.shoppingInfo[i].number
      }
      _voo.push(obj)
    }
    _vo.ordersGoodsSet = _voo;
    wx.request({
      url: addOrderUrl,
      header: {
        "content-type": "application/json",
        "token_id": wx.getStorageSync('token_id')
      },
      method: "POST",
      data: _vo,
      success: function (res) {
        wx.removeStorage({
          key: 'carShoppingInfo',
          success: function (res) {

          }
        })
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
  linkAddress: function () {
    wx.navigateTo({
      url: '/pages/user/address/address?isBack=true',
    })
  }
})
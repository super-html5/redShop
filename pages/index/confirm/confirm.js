const getDefAddressUrl = require('../../../config').getDefAddress
const addOrderUrl = require('../../../config').addOrder
const getUserCanUseCouponUrl = require('../../../config').getUserCanUseCoupon
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
    couponList: [],
    couponText: '未使用优惠券',
    couponNum: 0,
    couponId: '',
    useCoupon: 1
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
        "token_id": app.globalData.token_id
      },
      success: function (res) {
        if (res.statusCode == 404) {
          that.setData({
            defAddressInfo: {}
          })
        } else if (res.statusCode == 200) {
          utils.callBackHandler(res, that.getDefAddressSuccess);
        }
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
    if (!this.data.defAddressInfo.consignee) {
      wx.showModal({
        title: '您还没有收货地址',
        content: '去添加一个地址?',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/user/addAddress/addAddress?isBack=true',
            })
          } else if (res.cancel) {

          }
        }
      })
      return;
    }

    wx.showLoading();
    let _vo = {
      "orders": {
        "receiver": this.data.defAddressInfo.consignee,
        "addressStr": this.data.defAddressInfo.location + this.data.defAddressInfo.street + this.data.defAddressInfo.detailedAddress,
        "mobile": this.data.defAddressInfo.phone,
        "isSelfRaised": this.data.isSendClick,
        "useCoupon": this.data.useCoupon,
        "couponId": this.data.couponId,
        "fromUser": ""
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
        "token_id": app.globalData.token_id
      },
      method: "POST",
      data: _vo,
      success: function (_data) {
        wx.removeStorage({
          key: 'shoppingInfo',
          success: function () {
            wx.reLaunch({
              url: '/pages/index/payment/payment?id=' + _data.data.id,
            })
          }
        })
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
   * 获取用户可用优惠券
   */
  getUserCanUseCoupon: function (e) {
    var that = this;
    wx.showLoading();
    wx.request({
      url: getUserCanUseCouponUrl + '?price=' + e.currentTarget.dataset.price,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        "token_id": app.globalData.token_id
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 404) {
          that.setData({
            couponList: []
          })
          wx.showToast({
            title: '无可用优惠券',
            icon: 'loading',
            duration: 2000
          })
        } else if (res.statusCode == 200) {
          wx.hideLoading();
          that.setData({
            couponList: res.data
          })
          let _couponList = [];
          if (res.data.length > 6) {
            res.data.length = 6
          }
          for (let i = 0; i < res.data.length; i++) {
            _couponList.push(res.data[i].fee + '元');
          }

          wx.showActionSheet({
            itemList: _couponList,
            success: function (res) {
              if (res.cancel) {
                that.setData({
                  couponText: '未使用优惠券',
                  couponId: '',
                  useCoupon: 1,
                  couponNum: 0
                })
                return;
              }
              that.setData({
                couponText: '-' + that.data.couponList[res.tapIndex].fee + '元',
                couponId: that.data.couponList[res.tapIndex].id,
                useCoupon: 2,
                couponNum: (that.data.couponList[res.tapIndex].fee).toFixed(2)
              })
            },
            fail: function (res) {

            }
          })
        }
      },
      fail: function (error) {
        wx.hideLoading();
      },
      complete: function () {

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
// pages/user/order/order.js
const ordersListUrl = require('../../../config').ordersListUrl;
const cancelOrderUrl = require('../../../config').cancelOrderUrl;
const finishOrderUrl = require('../../../config').finishOrderUrl
const deleteOrderUrl = require('../../../config').deleteOrderUrl
const selfRaiseStationUrl = require('../../../config').selfRaiseStationUrl

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ordersLists: []
  },
  /**
   * 订单列表
   */
  ordersList: function () {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: ordersListUrl,
      header: {
        "content-type": "application/json",
        "token_id": app.globalData.token_id
      },
      method: "Get",
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          that.setData({
            ordersLists: res.data
          })
        } else if (res.statusCode == 404) {
          that.setData({
            ordersLists: []
          })
          wx.showModal({
            content: '你还没有订单，请先购买添加',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.reLaunch({
                  url: '/pages/index/index',
                })
              }
            }
          });
        } else {
          wx.showModal({
            content: '当前服务器繁忙，请稍后再试',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
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
   *   取消  删除订单
   */
  cancelOrder: function (e) {
    let that = this;
    const index = e.currentTarget.dataset.index;
    let ordersLists = this.data.ordersLists;
    let id = ordersLists[index].id;
    console.log(index);
    wx.showLoading();


    wx.request({
      url: cancelOrderUrl + "?ordersId=" + id,
      header: {
        "content-type": "application/json",
        "token_id": app.globalData.token_id
      },
      method: "POST",
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          that.ordersList();
        } else if (res.statusCode == 404) {
          that.ordersList();
        } else {
          wx.showModal({
            content: '当前服务器繁忙，请稍后再试',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          });
        }
      },
      fail: function (res) {
        wx.hideLoading()
      },
      complete: function () {
      }
    })
  },
  /**
   * 付款
   */
  payOrder: function (e) {
    const index = e.currentTarget.dataset.index;
    let ordersLists = this.data.ordersLists;
    let id = ordersLists[index].id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/index/orderConfirm/orderConfirm?id=' + id,
    })
  },
  /**
   * 确认收货
   */
  confirmOrder: function (e) {
    wx.showLoading();
    let that = this;
    const index = e.currentTarget.dataset.index;
    let ordersLists = this.data.ordersLists;
    let id = ordersLists[index].id;
    wx.request({
      url: finishOrderUrl + "?ordersId=" + id,
      header: {
        "content-type": "application/json",
        "token_id": app.globalData.token_id
      },
      method: "POST",
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          that.ordersList();
        } else if (res.statusCode == 404) {
          that.ordersList();
        } else {
          wx.showModal({
            content: '当前服务器繁忙，请稍后再试',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          });
        }
      },
      fail: function (res) {
        wx.hideLoading()
      },
      complete: function () {
      }
    })
  },
  /**
   * 删除订单
   */
  deleteOrder: function (e) {
    wx.showLoading();
    let that = this;
    const index = e.currentTarget.dataset.index;
    let ordersLists = this.data.ordersLists;
    let id = ordersLists[index].id;
    wx.request({
      url: deleteOrderUrl + "?ordersId=" + id,
      header: {
        "content-type": "application/json",
        "token_id": app.globalData.token_id
      },
      method: "POST",
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          that.ordersList();
        } else if (res.statusCode == 404) {
          that.ordersList();
        } else {
          wx.showModal({
            content: '当前服务器繁忙，请稍后再试',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          });
        }
      },
      fail: function (res) {

      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  /**
   * 提醒卖家发货
   */
  remindUserSend: function () {
    wx.showToast({
      title: '提醒成功',
      icon: 'success',
      duration: 2000
    })
  },

  /**
   * 查看自提点
   */
  getIsSelfRaisedList: function () {
    wx.showLoading()
    wx.request({
      url: selfRaiseStationUrl,
      header: {
        "content-type": "application/json",
        "token_id": app.globalData.token_id
      },
      method: "GET",
      success: function (res) {
        wx.hideLoading()
        if (res.statusCode == 200) {
          let _list = [];
          if (res.data.length > 6) {
            res.data.length = 6
          }
          for (let i = 0; i < res.data.length; i++) {
            _list.push(res.data[i].location);
          }
          wx.showActionSheet({
            itemList: _list,
            success: function (_res) { 
              wx.setStorageSync('sinceAddressInfo', res.data[_res.tapIndex]);
              wx.navigateTo({
                url: '/pages/user/sinceAddress/sinceAddress',
              })
            },
            fail: function (res) { }
          })
        } else if (res.statusCode == 404) {
          wx.showToast({
            title: '暂无自提点',
            icon: 'loading',
            duration: 2000
          })
        }
      },
      fail: function (res) {
        wx.hideLoading()
      },
      complete: function () {

      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ordersList();
  }
})
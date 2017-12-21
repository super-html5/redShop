// pages/user/order/order.js
const ordersListUrl = require('../../../config').ordersListUrl;
const cancelOrderUrl = require('../../../config').cancelOrderUrl;

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
        "token_id": wx.getStorageSync('token_id')
      },
      method: "Get",
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          that.setData({
            ordersLists: res.data
          })
        } else if (res.statusCode == 404) {
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
        "token_id": wx.getStorageSync('token_id')
      },
      method: "POST",
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          setTimeout(function () {
            wx.showToast({
              title: '取消订单成功',
              icon: 'success',
              duration: 2000
            })
          },1000)
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
        console.log(res);
        wx.hideLoading()
      },
      complete: function () {
      }
    })
  },
  /**
   * 付款
   */
  payOrder:function(e){
    const index = e.currentTarget.dataset.index;
    let ordersLists = this.data.ordersLists;
    let id = ordersLists[index].id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/index/orderConfirm/orderConfirm?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ordersList();
  }
})
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
          // res.data.forEach(function (value, index){
          //   value.status==
          // });
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
   *   取消  删除订单
   */
  cancelOrder: function (e) {
    let that = this;
    const index = e.currentTarget.dataset.index;
    let ordersLists = this.data.ordersLists;
    let id = ordersLists[index].id;
    console.log(index);
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: cancelOrderUrl +"?ordersId="+id,
      header: {
        "content-type": "application/json",
        "token_id": wx.getStorageSync('token_id')
      },
      method: "POST",
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          that.ordersList();
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
  }
})
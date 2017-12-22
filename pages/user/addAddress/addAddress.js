// pages/user/addAddress/addAddress.js
const addressUpdateUrl = require('../../../config').addressUpdateUrl
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    editAddress: {}
  },
  /**
   * 保存收货地址
   */
  formSubmit: function (e) {
    let that = this;
    let address = e.detail.value;
    let editAddress = this.data.editAddress;

    // 判断是新添加 还是 修改编辑的
    if (!editAddress.status) {
      address.status = 1;
    } else {
      address.status = editAddress.status;
      address.id = editAddress.id;
    }

    wx.showLoading({
      title: '加载中',
    })

    /**
     * 添加修改删除收货地址
     */
    wx.request({
      url: addressUpdateUrl,
      header: {
        "content-type": "application/json",
        "token_id": app.globalData.token_id
      },
      method: "POST",
      data: address,
      success: function (res) {
        if (res.statusCode == 200) {
          wx.navigateBack({
            delta: 1
          })
        
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //根据有没有跳转参数  判断是修改还是新增
    if (!options.editAddress) {
      wx.setNavigationBarTitle({
        title: "新增收货地址"
      })
      return;
    } else {
      let editAddress = JSON.parse(options.editAddress);
      wx.setNavigationBarTitle({
        title: "修改收货地址"
      })
      that.setData({
        editAddress: editAddress
      });
      return;
    }


  }
})
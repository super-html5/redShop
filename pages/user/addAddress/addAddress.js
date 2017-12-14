// pages/user/addAddress/addAddress.js
const addressUpdateUrl = require('../../../config').addressUpdateUrl
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
        "token_id": wx.getStorageSync('token_id')
      },
      method: "POST",
      data: address,
      success: function (res) {
        wx.redirectTo({
          url: '/pages/user/address/address',
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
      console.log(editAddress)
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
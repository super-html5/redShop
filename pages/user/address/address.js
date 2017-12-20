// pages/user/address/address.js
const addressListUrl = require('../../../config').addressListUrl;
const addressUpdateUrl = require('../../../config').addressUpdateUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },
  /**
   * 新增收货地址
   */
  toLinkAddAddr: function () {
    wx.redirectTo({
      url: '../../user/addAddress/addAddress',
    })
  },
  /**
   * 修改为默认地址
   */
  defaultAdr: function (e) {
    const index = e.currentTarget.dataset.index;
    let addressList = this.data.addressList;
    addressList.forEach(function (val) {
      val.status = 1;
    })
    let address = addressList[index];
    address.status = 2;
    this.setData({
      addressList: addressList
    });


    this.updataAdr(address);  //调取 添加修改删除收货地址方法
  },
  // cancelDefaultAdr: function (e) {
  //   const index = e.currentTarget.dataset.index;
  //   let addressList = this.data.addressList;
  //   addressList[index].status = 1;
  //   this.setData({
  //     addressList: addressList
  //   });
  // },
  /**
   * 删除收货地址
   */
  deleteAdr: function (e) {
    let that = this;
    const index = e.currentTarget.dataset.index;
    let address = this.data.addressList[index];
    address.status = 3;

    this.updataAdr(address);  //调取 添加修改删除收货地址方法

  },
  /**
   * 编辑修改收货地址
   */
  editAdr: function (e) {
    let that = this;
    const index = e.currentTarget.dataset.index;
    let address = this.data.addressList[index];
    delete address.accountId;
    delete address.created;
    delete address.updated;
    wx.navigateTo({
      url: '/pages/user/addAddress/addAddress?editAddress=' + JSON.stringify(address),
    })
  },
  /**
   * 添加修改删除收货地址
   */
  updataAdr: function (address) {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    delete address.accountId;
    delete address.created;
    delete address.updated;
    wx.request({
      url: addressUpdateUrl,
      header: {
        "content-type": "application/json",
        "token_id": wx.getStorageSync('token_id')
      },
      method: "POST",
      data: address,
      success: function (res) {
        if (res.data.status != 2) {
          that.loaddingAdr();
        }


        if (res.statusCode == 404) {
          wx.showModal({
            content: '没有地址了，请重新添加',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/user/addAddress/addAddress',
                })
              }
            }
          });
        }else{
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
   * 获取用户地址列表
   */
  loaddingAdr: function () {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: addressListUrl,
      header: {
        "content-type": "application/json",
        "token_id": wx.getStorageSync('token_id')
      },
      method: "POST",
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            addressList: res.data
          })
        }else if (res.statusCode == 404) {
          wx.showModal({
            content: '没有地址了，请重新添加',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          });
        }else{
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
    // 从订单页面过来
    if (options.isBack){

    }
  },
  onShow: function () {
    this.loaddingAdr();
  },

})
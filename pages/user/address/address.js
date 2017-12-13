// pages/user/address/address.js
const addressListUrl = require('../../../config').addressListUrl
const addressUpdateUrl = require('../../../config').addressUpdateUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },
  toLinkAddAddr: function () {
    wx.navigateTo({
      url: '../../user/addAddress/addAddress',
    })
  },
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


    this.updataAdr(address);
  },
  // cancelDefaultAdr: function (e) {
  //   const index = e.currentTarget.dataset.index;
  //   let addressList = this.data.addressList;
  //   addressList[index].status = 1;
  //   this.setData({
  //     addressList: addressList
  //   });
  // },
  deleteAdr: function (e) {
    let that = this;
    const index = e.currentTarget.dataset.index;
    let address = this.data.addressList[index];
    address.status = 3;

    this.updataAdr(address);

  },
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
        console.log(res);
        wx.hideLoading();
        if (res.data.status!=2){
          that.loaddingAdr();
          return;
        }
      
       
      },
      fail: function (res) {
        console.log(res);
        wx.hideLoading()
      }

    })
  },

  loaddingAdr:function(){
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
        wx.hideLoading();
        that.setData({
          addressList: res.data
        })
        console.log(that.data.addressList);
      },
      fail: function (res) {
        console.log(res);
        wx.hideLoading()
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loaddingAdr();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
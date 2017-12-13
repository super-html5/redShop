// pages/login/authentication/authentication.js
const saveUserInfo = require('../../../config').saveUserInfo;
const utils = require('../../utils/utils');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 认证
   */
  formSubmit: function (e) {
    let that = this;
    let data = e.detail.value;
    data.mobile = '';
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    // 正则验证姓名 和 身份证号
    if (!data.realName) {
      wx.showModal({
        content: '请输入姓名',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });

    } else if (!reg.test(data.idCard)) {

      wx.showModal({
        content: '身份证输入有误，请重新输入',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });

    } else {

      wx.showLoading({
        title: '加载中',
      })
      /**
       * 更新&&认证 保存用户信息
       */
      wx.request({
        url: saveUserInfo,
        header: {
          "content-type": "application/json",
          "token_id": wx.getStorageSync('token_id')
        },
        method: "POST",
        data: data,
        success: function (res) {
          utils.callBackHandler(res, that.saveUserInfoHandler);
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function () {
          wx.hideLoading()
        }

      })


    }


  },
  /**
   * 更新&&认证 保存用户信息 成功回调
   */
  saveUserInfoHandler: function () {
    wx.navigateTo({
      url: '../../login/AuthenticationOk/AuthenticationOk',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
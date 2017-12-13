// pages/login/register/register.js
const saveUserInfo = require('../../../config').saveUserInfo;
const utils = require('../../utils/utils');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: '',
    inputPhone: '',
    inputVcode: ''
  },
  /**
   * 下一步
   */
  toLinkAut: function () {
    var that = this;
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
      data: {
        "mobile": that.data.inputPhone,
        "idCard": "",
        "realName": ""
      },
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

  },
  /**
   * 倒计时
   */
  startCountdown: function () {

    //验证手机号
    if (!(/^1[34578]\d{9}$/.test(this.data.inputPhone))) {
      wx.showModal({
        content: ' 手机号有误，请重新输入',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    } else {
      //显示倒计时
      this.setData({
        second: 60
      })
      let second = this.second = 60;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (second > 0) {
          second--;
          this.setData({
            second: second
          })
        } else {
          clearInterval(this.timer);
        }
      }, 1000)
      return;
    }

  },
  /**
   * 更新&&认证 保存用户信息 成功回调
   */
  saveUserInfoHandler: function () {
    wx.navigateTo({
      url: '../../login/authentication/authentication',
    })
  },
  /**
   * 获取手机号
   */
  bindKeyPhone: function (e) {
    this.setData({
      inputPhone: e.detail.value
    })
  },
   /**
   * 获取验证码
   */
  bindKeyVcode: function (e) {
    this.setData({
      inputVcode: e.detail.value
    })
  }
})
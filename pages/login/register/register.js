// pages/login/register/register.js
const sendMsgUrl = require('../../../config').sendMsgUrl;
const authMsgUrl = require('../../../config').authMsgUrl;
const utils = require('../../utils/utils');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: '',
    inputPhone: '',
    inputVcode: '',
    serial: ''
  },
  onLoad: function () {

  },
  /**
   * 下一步
   */
  toLinkAut: function () {
    if (!this.data.inputPhone || !this.data.inputVcode) {
      wx.showModal({
        content: '请补全信息',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    } else {
      this.authMsg();
    }
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
      this.sendMsg();
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
   * 发送验证码
   */
  sendMsg: function () {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: sendMsgUrl,
      header: {
        "content-type": "application/json",
        "token_id": app.globalData.token_id
      },
      method: "POST",
      data: {
        "mobile": that.data.inputPhone
      },
      success: function (res) {
        console.log(res.data.result);
        if (res.statusCode == 200) {
          that.setData({
            serial: res.data.result
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
   * 验证验证码
   */
  authMsg: function () {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: authMsgUrl,
      header: {
        "content-type": "application/json",
        "token_id": app.globalData.token_id
      },
      method: "POST",
      data: {
        "mobile": that.data.inputPhone,
        "serial": that.data.serial,
        "verify": that.data.inputVcode
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          if (!app.globalData.authUserInfo) {
            wx.navigateTo({
              url: '/pages/login/authentication/authentication?mobile=' + that.data.inputPhone,
            })
          } else {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }

        } else if (res.statusCode == 400) {
          wx.showModal({
            content: '效验失败',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                that.setData({
                  verify: ' '
                });
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
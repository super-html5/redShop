// pages/login/authentication/authentication.js
const saveUserInfoUrl = require('../../../config').saveUserInfoUrl;
const utils = require('../../utils/utils');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: ''
  },
  /**
   * 认证
   */
  formSubmit: function (e) {
    let that = this;
    let dataPara = e.detail.value;
    dataPara.mobile = that.data.mobile;
    console.log(dataPara)
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    // 正则验证姓名 和 身份证号
    if (!dataPara.realName) {
      wx.showModal({
        content: '请输入姓名',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });

    } else if (!reg.test(dataPara.idCard)) {

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
      that.saveUserInfo(dataPara);
    }


  },
  /**
     * 更新&&认证 保存用户信息
     */
  saveUserInfo: function (data) {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: saveUserInfoUrl,
      header: {
        "content-type": "application/json",
        "token_id": app.globalData.token_id
      },
      method: "POST",
      data: data,
      success: function (res) {
        if (res.statusCode == 200) {
          app.globalData.authUserInfo = true
          wx.navigateTo({
            url: '../../login/AuthenticationOk/AuthenticationOk',
          })
        } else if (res.data.code == "notTrueInfo.auth.userInfo.NotRule") {
          wx.showModal({
            content: '信息错误',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {

              }
            }
          });
        } else if (res.data.code == "repeatedAuth.auth.userInfo.NotRule") {
          wx.showModal({
            content: '重复认证',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                  app.globalData.authUserInfo = true
                  wx.navigateTo({
                      url: '../../login/AuthenticationOk/AuthenticationOk',
                  })
              }
            }
          });
        }else {
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
    this.setData({
      mobile: options.mobile
    });
  }
})
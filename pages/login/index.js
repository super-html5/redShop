// pages/login/index.js
const protocolContentUrl = require('../../config').protocolContentUrl;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    configContent: []
  },
  toLinkRegister: function () {
    console.log(app.globalData.authUserInfo)
    if (!app.globalData.authUserInfo) {
      wx.navigateTo({
        url: '/pages/login/register/register',
      })
    } else {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.protocolContent();
  },

  protocolContent: function () {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: protocolContentUrl,
      header: {
        "content-type": "application/json",
      },
      method: "get",
      success: function (res) {
        console.log(res.data);
        if (res.statusCode == 200) {
          let configContent = that.data.configContent;
          let configContentText = res.data.configValue;
          let splitStr = configContentText.split('\n');
          let contentValue;
          splitStr.forEach(function (value) {
            value = value.replace(/n/g, " ");
            if (value.indexOf('T') == -1) {
              configContent.push(contentValue);
              contentValue.content = value;
            } else {
              contentValue = {};
              contentValue.title = value.replace(/T/, ' ');
            }
          });
          that.setData({
            configContent: configContent
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
    return {
      title: '丹道小二',
      path: '/pages/login/startUp/startUp?openid=' + app.globalData.openid,
      imageUrl: '../../img/1501515639556_.pic_hd.jpg',
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
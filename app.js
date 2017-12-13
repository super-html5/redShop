//app.js
const getTokenIdUrl = require('config').getTokenIdUrl
const getUserInfoUrl = require('config').getUserInfoUrl

App({
  /**
   * 获取用户信息
   */
  getUserInfo: function () {
    let that = this;
    wx.request({
      url: getUserInfoUrl,
      header: {
        "content-type": "application/json",
        "token_id": wx.getStorageSync('token_id')
      },
      method: "GET",
      success: function (res) {
        console.log(res );
        if (!res.data.id || !res.data.idCard || !res.data.mobile) {
          wx.redirectTo({
            url: '/pages/login/index',
          })
        }else{
          that.globalData.authUserInfo = true;
        }


      },
      fail: function (res) {
        console.log(res);
      }

    })
  },
  /**
   * 获取接口权限凭证 token_id
   */
  getTokenId: function () {
    let that = this;
    wx.login({
      success: function (res) {
        wx.request({
          url: getTokenIdUrl + '?code=' + res.code,
          header: {
            "content-type": "application/json",
            "token_id": "9f1fc10966b046dc9906520f9020ebc2"
          },
          method: "POST",
          success: function (res) {
            console.log(res.data);
            wx.setStorageSync('token_id', res.data.token);

            that.getUserInfo();

          },
          fail: function (res) {
            console.log(res);
          }
        })
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  onLaunch: function () {
    let that = this;

    if (!wx.getStorageSync('token_id')) {
      that.getTokenId();

    }
    wx.getUserInfo({
      success: res => {
        that.globalData.userInfo = res.userInfo
      }
    })



  },
  globalData: {
    userInfo: null,
    authUserInfo: false
  }
})
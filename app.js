//app.js
const getTokenIdUrl = require('config').getTokenIdUrl
const getUserInfoUrl = require('config').getUserInfoUrl

App({
  /**
   * 获取用户信息
   */
  getUserInfo: function () {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    wx.request({
      url: getUserInfoUrl,
      header: {
        "content-type": "application/json",
        "token_id": that.globalData.token_id
      },
      method: "GET",
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          if (!res.data.mobile) {

          } else {
            that.globalData.authUserInfo = true;
          }
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
      }, complete: function () {
        wx.hideLoading()
      }

    })
  },
  /**
   * 获取接口权限凭证 token_id
   */
  getTokenId: function () {
    wx.showLoading({
      title: '加载中',
    })
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
            if (res.statusCode == 200) {
              that.globalData.openid = res.data.openid;
              that.globalData.token_id = res.data.token;
              that.getUserInfo();
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
          }, complete: function () {
            wx.hideLoading()
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
    if (!that.globalData.token_id) {
      that.getTokenId();
    }
    if (!that.globalData.userInfo) {
      wx.getUserInfo({
        success: res => {
          that.globalData.userInfo = res.userInfo
        }
      })
    }
  },
  globalData: {
    openid: null,
    token_id: null,
    userInfo: null,
    authUserInfo: false
  },

  /**
   * 验证是否认证
   */
  isAuth: function () {
    if (!this.globalData.authUserInfo) {
      wx.reLaunch({
        url: '/pages/login/index',
      })
    }
  }
})
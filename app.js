//app.js
App({
  onLaunch: function () {
    var that = this;
    if (!wx.getStorageSync('token_id')) {
      wx.login({
        success: function (res) {
          wx.request({
            url: 'https://xiao2.dandaojiuye.com/mall-wine/api/v1/wine/userInfo/login?code=' + res.code,
            header: {
              "content-type": "application/json",
              "token_id": "9f1fc10966b046dc9906520f9020ebc2"
            },
            method: "POST",
            success: function (res) {
              console.log(res.data);
              wx.setStorageSync('token_id', res.data.token);
              // wx.redirectTo({
              //   url: '/pages/login/index',
              // })

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
      wx.getUserInfo({
        success: res => {
          that.globalData.userInfo = res.userInfo
        }
      })
    }

  },
  globalData: {
    userInfo: null
  }
})
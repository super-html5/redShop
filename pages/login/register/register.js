// pages/login/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: '',
    inputPhone: '',
    inputVcode: ''
  },
  toLinkAut: function () {
    var that=this;
    wx.showLoading({
      title: '加载中',
    })
  
    wx.request({
      url: 'https://xiao2.dandaojiuye.com/mall-wine/api/v1/wine/userInfo/auth',
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
        console.log(res.data);
        wx.hideLoading()
        wx.navigateTo({
          url: '../../login/authentication/authentication',
        })

      },
      fail: function (res) {
        console.log(res);
        wx.hideLoading()
      }

    })

  },
  startCountdown: function () {

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
  bindKeyPhone: function (e) {
    this.setData({
      inputPhone: e.detail.value
    })
  },
  bindKeyVcode: function (e) {
    this.setData({
      inputVcode: e.detail.value
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
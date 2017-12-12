// pages/login/authentication/authentication.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit: function (e) {
    let that = this;
    let data = e.detail.value;
    data.mobile = '';
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
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

    }else{

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
        data: data,
        success: function (res) {
          console.log(res.data);
          wx.hideLoading()
          wx.navigateTo({
            url: '../../login/AuthenticationOk/AuthenticationOk',
          })

        },
        fail: function (res) {
          console.log(res);
          wx.hideLoading()
        }

      })


    }
   

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
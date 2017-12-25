// pages/login/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  onLoad: function (options) {
    if (options.openid) {
      wx.setStorageSync('shareOpenid', options.openid);
    } else {
      wx.setStorageSync('shareOpenid', '');
    }
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
      path: '/pages/login/index?openid=' + app.globalData.openid,
      imageUrl:'../../img/login.jpeg',
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
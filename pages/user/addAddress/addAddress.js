// pages/user/addAddress/addAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editAddress: {}
  },
  formSubmit: function (e) {
    let address = e.detail.value;
    let editAddress = this.data.editAddress;
    if (!editAddress.status){
      address.status = 1;
    }else{
      address.status = editAddress.status;
      address.id = editAddress.id;
    }
  
   
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: 'https://xiao2.dandaojiuye.com/mall-wine/api/v1/wine/address/update',
      header: {
        "content-type": "application/json",
        "token_id": wx.getStorageSync('token_id')
      },
      method: "POST",
      data: address,
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        wx.navigateTo({
          url: '/pages/user/address/address',
        })
      },
      fail: function (res) {
        console.log(res);
        wx.hideLoading()
      }

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (!options.editAddress) {
      wx.setNavigationBarTitle({
        title: "新增收货地址"
      })
      return;
    } else {
     
      let editAddress = JSON.parse(options.editAddress);
      console.log(editAddress)
      wx.setNavigationBarTitle({
        title: "修改收货地址"
      })
      that.setData({
        editAddress: editAddress
      });
      return;
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

  }
})
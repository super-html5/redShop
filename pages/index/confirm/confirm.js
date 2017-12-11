// pages/index/confirm/confirm.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shoppingNumber: 1,
    isSendUrl: '../../../img/unsuccess.png',
    isSendClick: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 加减方法
   */
  jzNum: function (e) {
    console.log(e.currentTarget.dataset.status);
    if (e.currentTarget.dataset.status == 'subtraction') {
      if (this.data.shoppingNumber == 1) {
        return;
      }
      this.setData({
        shoppingNumber: this.data.shoppingNumber - 1
      });
    } else if (e.currentTarget.dataset.status == 'addition') {
      this.setData({
        shoppingNumber: this.data.shoppingNumber + 1
      });
    }
  },

  /**
   * 是否自提
   */
  isSend: function () {
    if (this.data.isSendClick == false) {
      this.setData({
        isSendUrl: '../../../img/success.png',
        isSendClick: true
      });
    }else{
      this.setData({
        isSendUrl: '../../../img/unsuccess.png',
        isSendClick: false
      });
    }

  }
})
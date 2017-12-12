const getShoppingDetailsUrl = require('../../../config').getShoppingDetails
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["图文详情", "产品参数"],
    activeIndex: 1,
    isBuyCard: false,
    shoppingNumber: 1,
    shopDetails: {},
    imgUrls:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShoppingDetails(options.id);
    this.setSwiperData();
  },
  onReady:function(){
    
  },
  /**
   * 轮播图配置参数
   */
  setSwiperData: function () {
    let indicatorDots = true;
    let autoplay = true;
    let interval = 5000;
    let duration = 1000;
    let _swiperData = {
      'indicatorDots': indicatorDots,
      'autoplay': autoplay,
      'interval': interval,
      'duration': duration
    };
    this.setData({
      swiperData: _swiperData
    });
  },
  /**
   * 获取商品详情
   */
  getShoppingDetails: function (id) {
    wx.showLoading();
    var that = this;
    wx.request({
      url: getShoppingDetailsUrl + '?id=' + id,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'token_id': 'e875b7487251426dbb665d4cbdd7a375'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          shopDetails : res.data,
          imgUrls: res.data.galleryImg
        });
      },
      fail: function (error) {
        console.log(error)
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  /**
   * 切换navbar
   */
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    });
  },
  /**
   * 立即购买
   */
  justBuy: function () {
    this.setData({
      isBuyCard: true
    })
  },
  /**
   * 遮照层消失
   */
  isHidden: function () {
    this.setData({
      isBuyCard: false
    })
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
   * 订单确认页面
   */
  linkConfirmPage: function () {
    wx.navigateTo({
      url: '/pages/index/confirm/confirm',
    })
  }
})
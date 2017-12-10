// pages/index/details/details.js
var sliderWidth = 160;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["图文详情", "产品参数"],
    activeIndex: 1,
    isBuyCard: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setImageData();
    this.setSwiperData();
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
   * 轮播图,图片配置
   */
  setImageData: function () {
    let _imgUrls = [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ];
    this.setData({
      imgUrls: _imgUrls
    });
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
  }
})
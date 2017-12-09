//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [],
    swiperData: {},
    defUrl: '../../img/def.png',
    defUrl_small: '../../img/def-small.png',
    defUrl_big: '../../img/def-big.png',
    activeIndex: 1,
    isSecondClick: false,
    isThirdClick: false
  },
  onLoad: function () {
    this.setImageData();
    this.setSwiperData();
  },

  linkDetails: function () {
    wx.navigateTo({
      url: '/pages/index/details/details',
    });
  },

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

  tabClick: function (e) {
    if (e.currentTarget.id == 2) {
      this.setData({
        activeIndex: e.currentTarget.id,
        isSecondClick: !this.data.isSecondClick,
        isThirdClick: false
      });
    } else if (e.currentTarget.id == 3) {
      this.setData({
        activeIndex: e.currentTarget.id,
        isThirdClick: !this.data.isThirdClick,
        isSecondClick: false
      });
    } else {
      this.setData({
        activeIndex: e.currentTarget.id,
        isSecondClick: false,
        isThirdClick: false
      });
    }
  }
})

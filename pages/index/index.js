const getShoppingListUrl = require('../../config').getShoppingList
const getIndexTopimagesUrl = require('../../config').getIndexTopimages
const utils = require('../utils/utils');
//获取应用实例
const app = getApp();

Page({
  data: {
    imgDataList: [],
    swiperData: {},
    defUrl: '../../img/def.png',
    defUrl_small: '../../img/def-small.png',
    defUrl_big: '../../img/def-big.png',
    activeIndex: 1,
    isSecondClick: false,
    isThirdClick: false,
    shopListInfo: [],
  },
  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
    app.isAuth();
    this.setImageData();
    this.setSwiperData();
    this.getShoppingList('createTime', 'asc');
  },

  /**
   * 获取商品列表
   */
  getShoppingList: function (orderBy, sortOrder) {
    wx.showLoading();
    var that = this;
    wx.request({
      url: getShoppingListUrl + '?pageNumber=1&pageSize=50&orderBy=' + orderBy + '&sortOrder=' + sortOrder,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        "token_id": app.globalData.token_id
      },
      success: function (res) {
        utils.callBackHandler(res, that.shopListHandler);
      },
      fail: function (error) {
        console.log(error)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  linkDetails: function (e) {
    let _id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/details/details?id=' + _id,
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
  /**
   * 轮播图
   */
  setImageData: function () {
    wx.showLoading();
    var that = this;
    wx.request({
      url: getIndexTopimagesUrl,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        "token_id": app.globalData.token_id
      },
      success: function (res) {
        utils.callBackHandler(res, that.lbHandler)
      },
      fail: function (error) {
        console.log(error)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
    
  },

  tabClick: function (e) {
    if (e.currentTarget.id == 2) {
      if (this.data.isSecondClick) {
        this.getShoppingList('saleCount', 'asc');
      } else {
        this.getShoppingList('saleCount', 'desc');
      }
      this.setData({
        activeIndex: e.currentTarget.id,
        isSecondClick: !this.data.isSecondClick,
        isThirdClick: false
      });
    } else if (e.currentTarget.id == 3) {
      if (this.data.isThirdClick) {
        this.getShoppingList('price', 'asc');
      } else {
        this.getShoppingList('price', 'desc');
      }
      this.setData({
        activeIndex: e.currentTarget.id,
        isThirdClick: !this.data.isThirdClick,
        isSecondClick: false
      });
    } else {
      this.getShoppingList('createTime', 'asc');
      this.setData({
        activeIndex: e.currentTarget.id,
        isSecondClick: false,
        isThirdClick: false
      });
    }
  },
  /**
   * 商品列表成功回调
   */
  shopListHandler:function(res){
    this.setData({
      shopListInfo: res.data.content,
    });
  },
  /**
   * 轮播图成功回调
   */
  lbHandler:function(res){
    this.setData({
      imgDataList: res.data
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '丹道小二',
      path: '/pages/login/startUp/startUp?openid=' + app.globalData.openid,
      imageUrl: '../../img/1501515639556_.pic_hd.jpg',
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
  },
})

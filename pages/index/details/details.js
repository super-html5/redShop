const getShoppingDetailsUrl = require('../../../config').getShoppingDetails
const getShoppingCarListUrl = require('../../../config').getShoppingCarList
const addShoppingCarUrl = require('../../../config').addShoppingCar
const utils = require('../../utils/utils');
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
    imgUrls: [],
    shoppingCarList: {},
    shoppingCarListNum: 0,
    vo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShoppingDetails(options.id);
    this.setSwiperData();
    this.getShoppingCarList();
  },
  onReady: function () {

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
        "token_id": wx.getStorageSync('token_id')
      },
      success: function (res) {
        utils.callBackHandler(res, that.detailsSuccess);
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
   * 获取详情成功回调
   */
  detailsSuccess: function (res) {
    this.setData({
      shopDetails: res.data,
      imgUrls: res.data.galleryImg
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
  linkConfirmPage: function (e) {
    let _vo = {
      "number": e.currentTarget.dataset.number,
      "price": e.currentTarget.dataset.price,
      "dataInfo": this.data.shopDetails
    }
    wx.setStorageSync("shoppingInfo", _vo);
    wx.navigateTo({
      url: '/pages/index/confirm/confirm',
    })
  },
  /**
   * 添加购物车
   */
  addShoppingCar: function () {

  },
  /**
   * 获取购物车列表
   */
  getShoppingCarList: function () {
    var that = this;
    wx.request({
      url: getShoppingCarListUrl,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        "token_id": wx.getStorageSync('token_id')
      },
      success: function (res) {
        console.log(res);
        let _num = 0;
        let _data = res.data;
        let _vo = [];
        let _voo = {};
        if (res.statusCode == 200) {
          for (let i = 0; i < _data.length; i++) {
            _num += _data[i].number;
            _voo = { 'number': _data[i].number, 'goodsId': _data[i].goodsId }
            _vo.push(_voo);
          }
          that.setData({
            shoppingCarListNum: _num,
            shoppingCarList: _data,
            vo: _vo
          })
        }
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
   * 添加购物车
   */
  addShoppingCar: function () {
    wx.showLoading();
    let _vo = this.data.vo;
    let isPush = true;
    let _voo = { 'number': 1, 'goodsId': this.data.shopDetails.id }
    for (let i = 0; i < _vo.length; i++) {
      if (_vo[i].goodsId == _voo.goodsId) {
        _vo[i].number += 1;
        isPush = false
      }
    }
    if (isPush) {
      _vo.push(_voo);
    }
    this.setData({
      shoppingCarListNum: this.data.shoppingCarListNum + 1
    })

    wx.request({
      url: addShoppingCarUrl,
      header: {
        "content-type": "application/json",
        "token_id": wx.getStorageSync('token_id')
      },
      method: "POST",
      data: _vo,
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          wx.showToast({
            title: '添加购物车成功',
            icon: 'success',
            duration: 1000
          })
        }
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function () {
        wx.hideLoading()
      }

    })
  }
})
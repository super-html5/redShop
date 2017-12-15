// pages/shoppingcar/index.js
const cartListUrl = require('../../config').cartListUrl;
const cartDeleteUrl = require('../../config').cartDeleteUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carLists: [],
    hasList: true,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: false,   // 全选状态，默认全选
    shoppingNumber: 1,
    editOrComplete: "编辑"
  },
  changeEditOrComplete: function () {
    let editOrComplete = this.data.editOrComplete;
    if (editOrComplete == "编辑") {
      this.setData({
        editOrComplete: "完成"
      });
    } else {
      this.setData({
        editOrComplete: "编辑"
      });
    }

  },

  selectAll: function (e) {
    let selectAllStatus = this.data.selectAllStatus;    // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carLists = this.data.carLists;

    for (let i = 0; i < carLists.length; i++) {
      carLists[i].selected = selectAllStatus;            // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carLists: carLists
    });
    this.getTotalPrice();                               // 重新获取总价
  },
  selectList: function (e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let carLists = this.data.carLists;                    // 获取购物车列表
    let selectAllStatus = this.data.selectAllStatus;// 获取全选状态
    const selected = carLists[index].selected;         // 获取当前商品的选中状态
    carLists[index].selected = !selected;              // 改变状态
    let selectNum = 0;
    for (let i = 0; i < carLists.length; i++) {
      if (carLists[i].selected == true) {
        selectNum++;
      }
    }
    if (selectNum < carLists.length) {
      selectAllStatus = false;
    } else {
      selectAllStatus = true;
    }
    this.setData({
      carLists: carLists,
      selectAllStatus: selectAllStatus
    });
    this.getTotalPrice();                           // 重新获取总价
  },
  // 增加数量
  addCount: function (e) {
    const index = e.currentTarget.dataset.index;
    let carLists = this.data.carLists;
    let num = carLists[index].number;
    num = num + 1;
    carLists[index].number = num;
    this.setData({
      carLists: carLists
    });
    this.getTotalPrice();
  },

  // 减少数量
  minusCount: function (e) {
    const index = e.currentTarget.dataset.index;
    let carLists = this.data.carLists;
    let num = carLists[index].number;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carLists[index].number = num;
    this.setData({
      carLists: carLists
    });
    console.log(carLists);
    this.getTotalPrice();
  },
  getTotalPrice: function () {
    let carLists = this.data.carLists;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carLists.length; i++) {         // 循环列表得到每个数据
      if (carLists[i].selected) {                   // 判断选中才会计算价格
        total += carLists[i].number * carLists[i].goods.price;     // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carLists: carLists,
      totalPrice: total.toFixed(2)
    });
  },
  toDelCount: function () {
    let that = this;
    let carLists = this.data.carLists;                      // 获取购物车列表
    let idArray = [];
    for (let i = 0; i < carLists.length; i++) {          // 循环列表得到每个数据
      if (carLists[i].selected === true) {                 // 将选中的下标放到指定的数组
        console.log(carLists[i].id);
        idArray.push(carLists[i].id);

      }
    }
    that.delCars(idArray);
  },
  toLinkDetails: function () {
    let carLists = this.data.carLists;                    // 获取购物车列表
    wx.setStorage({
      key: "shoppingInfo",
      data: JSON.stringify(carLists)
    })
    wx: wx.navigateTo({
      url: '/pages/index/confirm/confirm'
    })

  },

  cartList: function () {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: cartListUrl,
      header: {
        "content-type": "application/json",
        "token_id": "64c9cec70b4d4b5ba32fa8ec685c88f1"
      },
      method: "Get",
      success: function (res) {
        if (res.statusCode == 200) {
          res.data.forEach(function (value) {
            value.selected = false;
          });
          that.setData({
            carLists: res.data
          })
        }
        console.log(that.data);
        if (res.statusCode == 404) {
          that.setData({
            hasList: false    
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
  },
  delCars: function (id) {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: cartDeleteUrl,
      header: {
        "content-type": "application/json",
        "token_id": "64c9cec70b4d4b5ba32fa8ec685c88f1"
      },
      method: "POST",
      data: id,
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            carLists: res.data
          })
        }
        if (!this.data.carLists.length) {      // 如果购物车为空
          this.setData({
            hasList: false                     // 修改标识为false，显示购物车为空页面
          });
        } else {                               // 如果不为空
          this.getTotalPrice();                // 重新计算总价格
        }
      },
      fail: function (res) {
        console.log(res);

      },
      complete: function () {
        wx.hideLoading()
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTotalPrice();
    this.cartList();
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
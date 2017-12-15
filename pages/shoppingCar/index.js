// pages/shoppingcar/index.js
const cartListUrl = require('../../config').cartListUrl;
const cartClearUrl = require('../../config').cartClearUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [
      { id: 1, title: '新鲜芹菜 半斤', image: '/image/s5.png', num: 4, price: 8881.00, selected: true },
      { id: 2, title: '素米 500g', image: '/image/s6.png', num: 2, price: 3.00, selected: true },
      { id: 3, title: '猪肉 1500g', image: '/image/s6.png', num: 5, price: 13.00, selected: true }
    ],
    hasList: true,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: true,   // 全选状态，默认全选
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
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;            // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();                               // 重新获取总价
  },
  selectList: function (e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let carts = this.data.carts;                    // 获取购物车列表
    let selectAllStatus = this.data.selectAllStatus;// 获取全选状态
    const selected = carts[index].selected;         // 获取当前商品的选中状态
    carts[index].selected = !selected;              // 改变状态
    let selectNum = 0;
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].selected == true) {
        selectNum++;
      }
    }
    if (selectNum < carts.length) {
      selectAllStatus = false;
    } else {
      selectAllStatus = true;
    }
    this.setData({
      carts: carts,
      selectAllStatus: selectAllStatus
    });
    this.getTotalPrice();                           // 重新获取总价
  },
  // 增加数量
  addCount: function (e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  // 减少数量
  minusCount: function (e) {
    const index = e.currentTarget.dataset.index;

    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  getTotalPrice: function () {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                   // 判断选中才会计算价格
        total += carts[i].num * carts[i].price;     // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  toDelCount: function () {
    let carts = this.data.carts;                      // 获取购物车列表
    for (let i = 0; i < carts.length; i++) {          // 循环列表得到每个数据
      if (carts[i].selected === true) {                 // 将选中的下标放到指定的数组
        carts.splice(i, 1);
        i--;
      }
    }
    this.setData({
      carts: carts
    });
    if (!this.data.carts.length) {                  // 如果购物车为空
      this.setData({
        hasList: false              // 修改标识为false，显示购物车为空页面
      });
    } else {                              // 如果不为空
      this.getTotalPrice();           // 重新计算总价格
    }
  },
  toLinkDetails: function () {
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
          that.setData({
            ordersLists: res.data
          })
        }
        console.log(res);
        if (res.statusCode == 404) {
          wx.showModal({
            content: '购物车暂时没有东西，请先添加',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          });
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
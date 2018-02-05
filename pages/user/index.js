// pages/user/index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        myIncome: ''
    },
    //事件处理函数
    linkOrder: function () {
        wx.navigateTo({
            url: '../user/order/order'
        })
    },
    linkAddress: function () {
        wx.navigateTo({
            url: '../user/address/address'
        })
    },
    linkCoupon: function () {
        wx.navigateTo({
            url: '../user/coupon/coupon'
        })
    },
    // linkShare: function () {
    //   wx.showToast({
    //     title: '右上角分享哦',
    //     icon: 'loading',
    //     duration: 2000
    //   })
    // },
    onLoad: function () {
        wx.getUserInfo({
            success: res => {
                this.setData({
                    userInfo: res.userInfo
                })
            }
        })
        wx.showShareMenu({
            withShareTicket: true
        });
        app.isAuth();
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        app.getUserInfo(this.responseFun)
    },
    /**
     * 回调
     */
    responseFun: function (res) {
        console.log(res);
        this.setData({
            myIncome: res.data.myIncome
        })
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
    }
})

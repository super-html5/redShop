// pages/login/startUp/startUp.js
const coverImgUrl = require('../../../config').coverImgUrl;

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        res: '',
        isClick: true,
        imgUrl:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.openid) {
            wx.setStorageSync('shareOpenid', options.openid);
        } else {
            wx.setStorageSync('shareOpenid', '');
        }
        app.getTokenId(this.responseFun);
        this.coverImg();

    },

    /**
     * 回调
     */
    responseFun: function (res) {
        this.setData({
            res: res,
            isClick: false
        })
    },

    toEntert: function () {
        let that = this;
        let res = that.data.res;
        if (res.statusCode == 200) {
            if (!res.data.mobile) {
                wx.reLaunch({
                    url: '/pages/login/index',
                })
            } else {
                app.globalData.authUserInfo = true;
                wx.reLaunch({
                    url: '/pages/index/index',
                })
            }
        } else if (res.statusCode == 404) {
            wx.reLaunch({
                url: '/pages/login/index',
            })
        } else {
            wx.showModal({
                content: '当前服务器繁忙，请稍后再试',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            });
        }
    },
    coverImg: function () {
        let that = this;
        wx.showLoading({
            title: '加载中',
        })

        wx.request({
            url: coverImgUrl,
            header: {
                "content-type": "application/json",
            },
            method: "get",
            success: function (res) {
                if (res.statusCode == 200) {
                    that.setData({
                        imgUrl:res.data.configUrlValue
                    })
                } else {
                    that.setData({
                        imgUrl:'../../../img/startUp.png'
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
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    }
    ,

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    }
    ,

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    }
    ,

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
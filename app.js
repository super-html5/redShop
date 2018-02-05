//app.js
const getTokenIdUrl = require('config').getTokenIdUrl
const getUserInfoUrl = require('config').getUserInfoUrl

App({
    /**
     * 获取用户信息
     */
    getUserInfo: function (responseFun) {
        let that = this;
        wx.request({
            url: getUserInfoUrl,
            header: {
                "content-type": "application/json",
                "token_id": that.globalData.token_id
            },
            method: "GET",
            success: function (res) {
                if (typeof responseFun == 'function') {
                    responseFun(res);
                }

            },
            fail: function (res) {
                console.log(res);
            },
            complete: function () {

            }

        })
    },
    /**
     * 获取接口权限凭证 token_id
     */
    getTokenId: function (responseFun) {
        let that = this;
        wx.login({
            success: function (res) {
                wx.request({
                    url: getTokenIdUrl + '?code=' + res.code,
                    header: {
                        "content-type": "application/json",
                        "token_id": "9f1fc10966b046dc9906520f9020ebc2"
                    },
                    method: "POST",
                    success: function (res) {
                        if (res.statusCode == 200) {
                            that.globalData.openid = res.data.openid;
                            that.globalData.token_id = res.data.token;
                            that.getUserInfo(responseFun);
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
                    fail: function (res) {
                        console.log(res);
                    },
                    complete: function () {

                    }
                })
            },
            fail: function (res) {
                console.log(res);
            }
        })
    },
    onLaunch: function () {

    },
    globalData: {
        openid: null,
        token_id: null,
        authUserInfo: false
    },

    /**
     * 验证是否认证
     */
    isAuth: function () {
        if (!this.globalData.authUserInfo) {
            wx.reLaunch({
                url: '/pages/login/index',
            })
        }
    }
})
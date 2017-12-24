const app = getApp()
function callBackHandler(res, successFun) {
  if (res.statusCode == 200) {
    if (typeof successFun == 'function') {
      successFun(res);
    }
  } else if (res.statusCode == 401) {
    app.getTokenId();
    wx.redirectTo({
      url: '/pages/login/index',
    });
  } else {
    wx.showModal({
      content: '当前人数访问过多,请稍后再试',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  }
}

module.exports.callBackHandler = callBackHandler
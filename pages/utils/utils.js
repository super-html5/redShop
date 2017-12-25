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
function add0(m) { return m < 10 ? '0' + m : m }
function toDate(number) {
  var time = new Date(number);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + add0(m) + '-' + add0(d);
}
module.exports = { 
  callBackHandler: callBackHandler,
  toDate: toDate
 }
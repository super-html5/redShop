//var host = 'http://192.168.1.103:3000'
var host = 'https://xiao2.dandaojiuye.com/mall-wine'
var config = {
  host,
  getTokenIdUrl: `${host}/api/v1/wine/userInfo/login`,//获取接口权限凭证
  saveUserInfoUrl: `${host}/api/v1/wine/userInfo/auth`, //保存用户信息
  getShoppingList: `${host}/api/v1/wine/goods/list`,//获取商品列表
  getShoppingDetails: `${host}/api/v1/wine/goods/findById`,//根据id查询商品详情
  getIndexTopimages: `${host}/api/v1/wine/slide/list`,//获取首页轮播图
  getDefAddress: `${host}/api/v1/wine/address/get`,//获取用户默认地址
  addOrder: `${host}/api/v1/wine/orders/save`,//添加订单
  getShoppingCarList: `${host}/api/v1/wine/cart/list`,//获取购物车列表
  addShoppingCar: `${host}/api/v1/wine/cart/save`,//添加购物车

  getUserInfoUrl: `${host}/api/v1/wine/userInfo/getUserInfo`,//获取用户信息
  addressListUrl: `${host}/api/v1/wine/address/list`,//获取用户地址列表
  addressUpdateUrl: `${host}/api/v1/wine/address/update`,//添加修改删除收货地址
  ordersListUrl: `${host}/api/v1/wine/orders/list`,//订单查询
  cancelOrderUrl: `${host}/api/v1/wine/orders/cancel`,//订单删除
  cartListUrl: `${host}/api/v1/wine/cart/list`,//购物车查询
  cartClearUrl:`${host}/api/v1/wine/cart/clear`,//购物车清空
  cartDeleteUrl: `${host}/api/v1/wine/cart/delete`,//购物车删除
  sendMsgUrl:`${host}/api/v1/wine/common/sendMsg`,//发送验证码
  authMsgUrl: `${host}/api/v1/wine/common/authMsg`,//验证验证码
  paymentUrl: `${host}/api/v1/wine/wxPay/pay`, //支付
};
module.exports = config 
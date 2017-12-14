//var host = 'http://192.168.1.103:3000'
var host = 'https://xiao2.dandaojiuye.com/mall-wine'
var config = {
  host,
  getTokenIdUrl: `${host}/api/v1/wine/userInfo/login`,//获取接口权限凭证
  saveUserInfo: `${host}/api/v1/wine/userInfo/auth`, //保存用户信息
  getShoppingList: `${host}/api/v1/wine/goods/list`,//获取商品列表
  getShoppingDetails: `${host}/api/v1/wine/goods/findById`,//根据id查询商品详情
  getIndexTopimages: `${host}/api/v1/wine/slide/list`,//获取首页轮播图
  getDefAddress: `${host}/api/v1/wine/address/get`,//获取用户默认地址

  getUserInfoUrl: `${host}/api/v1/wine/userInfo/getUserInfo`,//获取用户信息
  addressListUrl: `${host}/api/v1/wine/address/list`,//获取用户地址列表
  addressUpdateUrl: `${host}/api/v1/wine/address/update`,//添加修改删除收货地址
};
module.exports = config 
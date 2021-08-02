/**
 * WeChat API 模块
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
const wechat = require('./utils/wechat.js')

/**
 * jszp API 模块
 * @type {Object}
 */
const jszp = require('./utils/jszp.js')

/**
 * util API 模块
 * @type {Object}
 */
const util = require('./utils/util.js')

/**
 * Baidu API 模块
 * @type {Object}
 */
const baidu = require('./utils/baidu.js')

//app.js
App({
  data: {
    openid: 0,
    now_year:""
  },
  /**
   * WeChat API
   */
  wechat: wechat,

  /**
   * jszp API
   */
  jszp: jszp,

  /**
   * util API
   */
  util: util,

  /**
   * Baidu API
   */
  baidu: baidu,

  onLaunch: function (e) {
    var myDate = new Date();
    this.data.now_year=myDate.getFullYear();
    wechat.getUserOpenid();
    this.data.openid = wx.getStorageSync('user_openid');
    jszp.getUserinfo(this.data.openid)
      .then(info => {
        if (info != "") {
          wx.setStorage({
            key: "user_info",
            data: info //需要存储的数据
          })
        }
      })
  }

})
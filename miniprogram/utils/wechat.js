const OPENID = ''

function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: resolve,
      fail: reject
    })
  })
}

function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: resolve,
      fail: reject
    })
  })
}

function getUserOpenid() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function(res) {
        if (res.code) {
          wx.request({
            url: 'https://api.91jiaoshi.com/user/get_openid/' + res.code,
            success(res) {
              //成功返回数据后，将token值存储到localStorage中
              wx.setStorage({
                key: 'res',
                data: res.errMsg
              });
              wx.setStorage({
                key: 'session_key',
                data: res.data.session_key
              });
              wx.setStorage({
                key: 'user_openid',
                data: res.data.openid,
              })
              var resArg = res.data.token;
              resolve(resArg)
            },
            fail() {
              reject();
            }
          })
        }
      }
    })
  })
}

function setStorage(key, value) {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key: key,
      data: value,
      success: resolve,
      fail: reject
    })
  })
}

function getStorage(key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: key,
      success: resolve,
      fail: reject
    })
  })
}

function getLocation(type) {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: type,
      success: resolve,
      fail: reject
    })
  })
}

module.exports = {
  getUserOpenid,
  login,
  getUserInfo,
  setStorage,
  getStorage,
  getLocation,
  original: wx
}
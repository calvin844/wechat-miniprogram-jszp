// miniprogram/pages/user/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getPhoneNumber: function(e) {
    this.session_key = wx.getStorageSync('session_key')
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.request({
        url: 'https://api.91jiaoshi.com/user/decryptData/',
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          sessionKey: this.session_key
        },
        method: "post",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          wx.setStorage({
            key: 'phone_number',
            data: res.data.phoneNumber
          });
          wx.request({
            url: 'https://api.91jiaoshi.com/user/get_user_by_phone/' + res.data.phoneNumber,
            success(user_info) {
              wx.setStorage({
                key: 'user_info',
                data: user_info.data
              });
              const user_openid = wx.getStorageSync('user_openid');
              if (user_info.data.wxapp_openid == "") {
                app.jszp.setUserinfo(user_info.data.uid, user_openid)
              }
              var back_url = wx.getStorageSync('back_url');
              wx.navigateTo({
                url: back_url
              });
            }
          })
        }
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
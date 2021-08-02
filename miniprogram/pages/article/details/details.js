// miniprogram/pages/article/details/details.js

var WxParse = require('../../../wxParse/wxParse.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    articleDetails: {},
    user_info: {},
    time: 0,
    now_year: app.data.now_year
  },

  getArticle(article_id) {
    if (!article_id) {
      article_id = 302104
    }
    app.jszp.getArticle(article_id)
      .then(res => {
        var time = Date.parse(new Date());
        time = time / 1000;
        this.setData({
            time: time,
            articleDetails: res.article
          }),
          wx.setNavigationBarTitle({
            title: res.article.title
          }),
          WxParse.wxParse('articleDetails.content', 'html', this.data.articleDetails.content, this);
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(query) {
    var user_info = wx.getStorageSync('user_info');
    this.setData({
      user_info: user_info
    })
    const options = app.util.getScene(query);
    this.getArticle(options.articleid);
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

  },

  toShow: function() {
    let that = this;
    that.setData({
      isShow: !that.data.isShow
    })
  },

  toLogin: function() {
    wx.setStorage({
      key: "back_url",
      data: "/pages/article/details/details?scene=articleid%3D" + this.data.articleDetails.id //需要存储的数据
    })
    wx.redirectTo({
      url: '/pages/user/login/login',
    });
  }
})
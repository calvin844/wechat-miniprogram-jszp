//index.js
const app = getApp()
Page({
  data: {
    adList: {},
    EmergencyJobList: {},
    JobList: {},
    articleList: {},
    now_year: app.data.now_year
  },
  pageLifetimes: {
    show() {

    }
  },
  getAd() {
    app.jszp.getAd()
      .then(res => {
        this.setData({
          adList: res.ad
        })
      })
  },
  getJobsList() {
    app.jszp.getJobsList()
      .then(res => {
        this.setData({
          JobList: res.jobs_list
        })
      })
  },

  getArticleList() {
    app.jszp.getArticleList()
      .then(res => {
        this.setData({
          articleList: res.article_list
        })
      })
  },
  getEmergencyJobList() {
    app.jszp.getEmergencyJobList()
      .then(res => {
        this.setData({
          EmergencyJobList: res.emergency_job_list
        })
      })
  },
  imgHeight: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height; //图片高度
    var imgw = e.detail.width; //图片宽度
    var swiperH = winWid * imgh / imgw + "px"
    this.setData({
      swiperH: swiperH //设置高度
    })
  },

  onLoad: function () {
    this.getAd();
    this.getEmergencyJobList();
    this.getJobsList();
    this.getArticleList()
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  }
})
// miniprogram/pages/company/details/details.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    companyDetails: {},
    companyJobs: {},
    companyPhotos: {},
    now_year: app.data.now_year
  },
  getCompany(company_id) {
    if (!company_id) {
      company_id = 140503
    }
    app.jszp.getCompany(company_id)
      .then(res => {
        this.setData({
            companyDetails: res.company,
            companyJobs: res.company_jobs,
            companyPhotos: res.company_imgs
          }),
          wx.setNavigationBarTitle({
            title: res.company.companyname
          })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(query) {
    const options = app.util.getScene(query);
    this.getCompany(options.companyid);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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
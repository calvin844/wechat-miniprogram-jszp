// miniprogram/pages/jobs/details/details.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobsDetails: {},
    companyDetails: {},
    oid: "",
    session_key: "",
    now_year: app.data.now_year
  },
  getJob(job_id) {
    if (!job_id) {
      job_id = 187726
    }
    app.jszp.getJob(job_id)
      .then(res => {
        console.log(res)
        this.setData({
            jobsDetails: res.job,
            companyDetails: res.company,
            oid: wx.getStorageSync('res')
          }),
          wx.setNavigationBarTitle({
            title: res.job.jobs_name
          })
      })
  },
  apply_job() {
    var user_info = wx.getStorageSync('user_info')
    if (user_info == "") {
      wx.setStorage({
        key: "back_url",
        data: "/pages/jobs/details/details?scene=jobid%3D" + this.data.jobsDetails.id //需要存储的数据
      })
      wx.redirectTo({
        url: '/pages/user/login/login',
      });
    } else {
      wx.request({
        url: 'https://api.91jiaoshi.com/job/apply_job/',
        data: {
          job_id: this.data.jobsDetails.id,
          uid: user_info.uid
        },
        method: "post",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          wx.showToast({
            title: res.data.err_msg,
            icon: 'none', //如果要纯文本，不要icon，将值设为'none'
            duration: 2000
          })
        }
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(query) {
    const options = app.util.getScene(query);
    this.getJob(options.jobid);
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
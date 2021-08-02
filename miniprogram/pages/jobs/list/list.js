// miniprogram/pages/jobs/list/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adList: {},
    jobsList: {},
    districtList: {},
    categoryList: {},
    educationList: {},
    experienceList: {},
    pageData: {},
    curOption: ["", "", "", "", "", 1],
    districtIndex: [0, 0],
    categoryIndex: [0, 0],
    educationIndex: 0,
    experienceIndex: 0,
    pageIndex: 0,
    swiperH: 0,
    now_year: app.data.now_year
  },
  getAd() {
    app.jszp.getAd()
      .then(res => {
        this.setData({
          adList: res.ad
        })
      })
  },
  getDistrict() {
    app.jszp.getDistrict()
      .then(res => {
        this.setData({
          districtList: res.district
        })
      })
  },
  getSDistrict(p_value) {
    return new Promise(resolve => {
      app.jszp.getSDistrict(p_value)
        .then(res => {
          return resolve(res.sdistrict)
        })
        .catch(e => resolve(null))
    })
  },

  getCategory() {
    app.jszp.getJobsCategory()
      .then(res => {
        this.setData({
          categoryList: res.job_category
        })
      })
  },

  getSubclass(p_value) {
    return new Promise(resolve => {
      app.jszp.getSubclass(p_value)
        .then(res => {
          return resolve(res.job_subclass)
        })
        .catch(e => resolve(null))
    })
  },

  getEducation() {
    app.jszp.getEducation()
      .then(res => {
        this.setData({
          educationList: res.education
        })
      })
  },

  getExperience() {
    app.jszp.getExperience()
      .then(res => {
        this.setData({
          experienceList: res.experience
        })
      })
  },

  getJobsList() {
    var curOption = this.data.curOption;
    var search_str = curOption[0] + "||" + curOption[1] + "||" + curOption[2] + "||" + curOption[3] + "||" + curOption[4] + "||" + curOption[5]
    app.jszp.getJobsList(search_str)
      .then(res => {
        this.setData({
          jobsList: res.jobs_list,
          pageData: res.page_arr
        })
      })
  },
  bindCategoryMultiPickerColumnChange: function (e) {
    var data = {
      categoryList: this.data.categoryList,
      categoryIndex: this.data.categoryIndex
    };
    data.categoryIndex[e.detail.column] = e.detail.value;
    if (e.detail.column == 0) {
      this.getSubclass(e.detail.value).then(res => {
        data.categoryList[1] = res;
        data.categoryIndex[1] = 0;
        this.setData(data);
      })
    }
  },
  bindCategoryPickerChange: function (e) {
    var data = {
      categoryList: this.data.categoryList,
      categoryIndex: this.data.categoryIndex,
      curOption: this.data.curOption
    };
    data.categoryIndex = e.detail.value;
    data.curOption[1] = data.categoryList[1][e.detail.value[1]];
    data.curOption[5] = 1;
    this.setData(data);
    this.getJobsList();
  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      districtList: this.data.districtList,
      districtIndex: this.data.districtIndex
    };
    data.districtIndex[e.detail.column] = e.detail.value;
    if (e.detail.column == 0) {
      this.getSDistrict(e.detail.value).then(res => {
        data.districtList[1] = res;
        data.districtIndex[1] = 0;
        this.setData(data);
      })
    }
  },
  bindMultiPickerChange: function (e) {
    var data = {
      districtList: this.data.districtList,
      districtIndex: this.data.districtIndex,
      curOption: this.data.curOption
    };
    data.districtIndex = e.detail.value;
    data.curOption[0] = data.districtList[1][e.detail.value[1]];
    data.curOption[5] = 1;
    this.setData(data);
    this.getJobsList();
  },
  bindEducationPickerChange: function (e) {
    var data = {
      educationList: this.data.educationList,
      educationIndex: this.data.educationIndex,
      curOption: this.data.curOption
    };
    data.educationIndex = e.detail.value;
    data.curOption[2] = data.educationList[e.detail.value];
    data.curOption[5] = 1;
    this.setData(data);
    this.getJobsList();
  },
  bindExperiencePickerChange: function (e) {
    var data = {
      experienceList: this.data.experienceList,
      experienceIndex: this.data.experienceIndex,
      curOption: this.data.curOption
    };
    data.experienceIndex = e.detail.value;
    data.curOption[3] = data.experienceList[e.detail.value];
    data.curOption[5] = 1;
    this.setData(data);
    this.getJobsList();
  },
  bindPagePickerChange: function (e) {
    var data = {
      pageData: this.data.pageData,
      pageIndex: this.data.pageIndex,
      curOption: this.data.curOption
    };
    data.pageIndex = e.detail.value;
    data.curOption[5] = data.pageData.page_list[e.detail.value];
    this.setData(data);
    this.getJobsList();
  },
  changePage: function (e) {
    let page = e.currentTarget.dataset.value
    var data = {
      curOption: this.data.curOption
    };
    data.curOption[5] = page;
    this.setData(data);
    this.getJobsList();
  },
  changeKeyword: function (e) {
    let keyword = e.detail.value
    var data = {
      curOption: this.data.curOption
    };
    data.curOption[2] = keyword;
    data.curOption[3] = 1;
    this.setData(data);
    this.getJobsList();
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
  bindPickerCancel: function (e) {
    var data = {
      curOption: this.data.curOption
    };
    data.curOption[e.currentTarget.id] = "";
    this.setData(data);
    this.getJobsList();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAd();
    this.getDistrict();
    this.getCategory();
    this.getEducation();
    this.getExperience();
    this.getJobsList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// miniprogram/pages/company/list/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adList: {},
    companyList: {},
    districtList: {},
    typeList: {},
    pageData: {},
    curOption: ["", "", "", 1],
    districtIndex: [0, 0],
    typeIndex: 0,
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

  getType() {
    app.jszp.getCompanyType()
      .then(res => {
        this.setData({
          typeList: res.company_type
        })
      })
  },

  getCompanyList() {
    var curOption = this.data.curOption;
    var search_str = curOption[0] + "||" + curOption[1] + "||" + curOption[2] + "||" + curOption[3]
    app.jszp.getCompanyList(search_str)
      .then(res => {
        this.setData({
          companyList: res.company_list,
          pageData: res.page_arr
        })
      })
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
    data.curOption[3] = 1;
    this.setData(data);
    this.getCompanyList();
  },
  bindPickerChange: function (e) {
    var data = {
      typeList: this.data.typeList,
      typeIndex: this.data.typeIndex,
      curOption: this.data.curOption
    };
    data.typeIndex = e.detail.value;
    data.curOption[1] = data.typeList[e.detail.value];
    data.curOption[3] = 1;
    this.setData(data);
    this.getCompanyList();
  },
  bindPagePickerChange: function (e) {
    var data = {
      pageData: this.data.pageData,
      pageIndex: this.data.pageIndex,
      curOption: this.data.curOption
    };
    data.pageIndex = e.detail.value;
    data.curOption[3] = data.pageData.page_list[e.detail.value];
    this.setData(data);
    this.getCompanyList();
  },
  changePage: function (e) {
    let page = e.currentTarget.dataset.value
    var data = {
      curOption: this.data.curOption
    };
    data.curOption[3] = page;
    this.setData(data);
    this.getCompanyList();
  },
  changeKeyword: function (e) {
    let keyword = e.detail.value
    var data = {
      curOption: this.data.curOption
    };
    data.curOption[2] = keyword;
    data.curOption[3] = 1;
    this.setData(data);
    this.getCompanyList();
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
    this.getCompanyList();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAd();
    this.getDistrict();
    this.getType();
    this.getCompanyList();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
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
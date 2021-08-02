Component({
  data: {
    selected: 0,
    color: "#999999",
    selectedColor: "#188eee",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/images/tab_index.png",
      selectedIconPath: "/images/tab_index_hl.png",
      text: "首页"
    }, {
      pagePath: "/pages/jobs/list/list",
      iconPath: "/images/tab_jobs.png",
      selectedIconPath: "/images/tab_jobs_hl.png",
      text: "职位"
    }, {
      pagePath: "/pages/article/list/list",
      iconPath: "/images/tab_article.png",
      selectedIconPath: "/images/tab_article_hl.png",
      text: "简章"
    }, {
      pagePath: "/pages/company/list/list",
      iconPath: "/images/tab_company.png",
      selectedIconPath: "/images/tab_company_hl.png",
      text: "企业"
    }]
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url
      })
      this.setData({
        selected: data.index
      })
    }
  }
})
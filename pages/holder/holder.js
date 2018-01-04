// pages/holder/holder.js
var app = getApp()
var page_index = 1;
function initSubMenuDisplay() {
  return ['hidden', 'hidden', 'hidden'];
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open: false,
    show: true,
    _num: 0,
    subMenuDisplay: initSubMenuDisplay(),
    areaTxt: '地区',
    search: [],
    card: '',
    yeshu: 1,
    gssearch: [],
  },
  //切换显示隐藏 添加移除class
  tapMainMenu: function (e) { // 获取当前显示的一级菜单标识
    var index = parseInt(e.currentTarget.dataset.index);        // 生成数组，全为hidden的，只对当前的进行显示
    console.log(index)
    var newSubMenuDisplay = initSubMenuDisplay();//        如果目前是显示则隐藏，反之亦反之。同时要隐藏其他的菜单
    if (this.data.subMenuDisplay[index] == 'hidden') {
      newSubMenuDisplay[index] = 'show';
    } else {
      newSubMenuDisplay[index] = 'hidden';
    }        // 设置为新的数组
    this.setData({
      subMenuDisplay: newSubMenuDisplay,
      _num: e.target.dataset.index
    });
  },
  // 地区
  tapSubMenu: function (e) {
    var index = e.currentTarget.dataset.index;
    var that = this
    that.setData({
      subMenuDisplay: initSubMenuDisplay(),
      areaTxt: index
    })
    console.log(index);  // 隐藏所有一级菜单
  },
  // 行业
  tapSubMenumian: function (e) {
    var index = e.currentTarget.dataset.index;
    var that = this
    that.setData({
      subMenuDisplay: initSubMenuDisplay(),
    })
    console.log(index);  // 隐藏所有一级菜单
  },
  // 排序
  tapSubMens: function (e) {
    var index = e.currentTarget.dataset.index;
    var that = this
    that.setData({
      subMenuDisplay: initSubMenuDisplay(),
    })
    console.log(index);  // 隐藏所有一级菜单
  },
  // 点击收藏；取消
  showitem: function () {
    this.setData({
      open: !this.data.open
    })
  },
  showitemm: function () {
    this.setData({
      open: !this.data.open
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 个人
    wx.request({
      url: 'https://card.xiaoniren.cn/restapi/delivery-info-search/index',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var a = res.data.data._meta.totalCount, b = res.data.data._meta.perPage
        console.log(a)
        console.log(b)
        var aa = parseInt(a / b) + (a % b == 0 ? 0 : 1)
        console.log(aa)
        var search = []
        that.setData({
          search: res.data.data.items,
          yeshu: aa
        })
        console.log(res)
      }
    })
    // 企业
    wx.request({
      url: 'https://card.xiaoniren.cn/restapi/enterprise-info-search/index',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var a = res.data.data._meta.totalCount, b = res.data.data._meta.perPage
        console.log(a)
        console.log(b)
        var aa = parseInt(a / b) + (a % b == 0 ? 0 : 1)
        console.log(aa)
        var gssearch = []
        that.setData({
          gssearch: res.data.data.items,
          yeshu: aa
        })
        console.log(res)
      }
    })
  },
  onHide: function () {
    page_index = 1
  },
  //搜搜
  searchmp: function (e) {
    console.log(e)
    var that = this;
    var card = e.detail.value;
    console.log(card)
    wx.request({
      url: 'https://card.xiaoniren.cn/restapi/search/index',
      data: {
        name: card,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          search: res.data.data.items
        })
        console.log(res)
      }
    })
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
    var that = this;
    page_index++;
    if (page_index <= this.data.yeshu) {
      wx.request({
        url: 'https://card.xiaoniren.cn/restapi/search/index?page=' + page_index,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res)
          var search = that.data.data.search;
          console.log(search)
          for (var i = 0; i < res.data.data.data.length; i++) {
            search.push(res.data.data.data[i]);
          }
          that.setData({
            search: search
          });
          console.log(search)
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})
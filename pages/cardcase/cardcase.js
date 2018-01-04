// pages/cardcase/cardcase.js
var app = getApp()
var page_index = 1;
var index;
function initSubMenuDisplay() {
  return ['hidden', 'hidden', 'hidden'];
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open: true,
    show: false,
    _num: 0,
    subMenuDisplay: initSubMenuDisplay(),
    areaTxt:'地区',
    search:[],
    card:'',
    yeshu: 1,
    gssearch:[],
    link_origin: app.globalData.link_origin,
    id:'',
    idd:'',
    user_id:'',
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
          areaTxt:index
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
  // 点击收藏
  showitem: function (e) {
    var that = this
    var idd = e.currentTarget.dataset.index, Type = e.currentTarget.dataset.type
    console.log(Type)
    wx.request({
      url: that.data.link_origin + '/restapi/default/addcollect',
      data: {
        id: idd,
        type: Type,
        openid:wx.getStorageSync('user').openid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        if (res.data.success == true) {
          wx.showToast({
            title: '收藏成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          
        } else {
          wx.showToast({
            title: res.data.data.message,
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }
        that.onLoad()
      }
    })
  },
  showitemm: function (e) {
    
    var that = this
    var idd = e.currentTarget.dataset.index
    wx.request({
      url: that.data.link_origin + '/restapi/default/deletecollect',
      data: {
        id: idd
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        if (res.data.success == true) {
          wx.showToast({
            title: '取消成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          
        } else {
          wx.showToast({
            title: res.data.data.message,
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }
        that.onLoad()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
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
          yeshu: aa,
        })

      }
    }),
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
        }
      })
  },
  onHide: function () {
    page_index = 1
  },
  //搜搜
  searchmp:function(e){
    console.log(e)
    var that = this;
    var card = e.detail.value;
    wx.request({
      url: 'https://card.xiaoniren.cn/restapi/delivery-info-search/index',
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
        url: 'https://card.xiaoniren.cn/restapi/delivery-info-search/index?page=' + page_index,
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
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 收藏

})
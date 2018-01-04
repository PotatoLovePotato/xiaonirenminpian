// pages/personal/personal.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    list:{},
    Llist:[],
    qrcode: '',
    id:'',
    www:'https://card.xiaoniren.cn',
    amount:0,
    openid:'',
    grand_total:'',

    lopen: false,
    lshow: true,
    withdraw_deposit:'',
    arrtet:'',
    particulars:[],
    time_remaining:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 获取信息
  onLoad: function (option) {
    var that = this    
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      wx.request({
        url: 'https://card.xiaoniren.cn/restapi/default/create',
        data: {
          openid: wx.getStorageSync('user').openid,
          nickname: that.data.userInfo.nickName,
          head_image: that.data.userInfo.avatarUrl,
          gender: that.data.userInfo.gender,
          country: that.data.userInfo.country,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          var id = res.data.data.id
          var qrcode = res.data.data.qrcode
          var openid = res.data.data.openid
          var grand_total = res.data.data.grand_total
          var withdraw_deposit = res.data.data.withdraw_deposit
          that.setData({
            list: res.data.data,
            id: id,
            openid: openid,
            qrcode: qrcode,
            grand_total: grand_total,
            withdraw_deposit: withdraw_deposit,
            time_remaining: res.data.data.time_remaining
          })
          console.log(that.data.id)
          console.log(that.data.qrcode)
          console.log(that.data.grand_total)
        }

      })
    })
  },
  deposit:function(e){
    this.setData({
      lopen: !this.data.lopen
    })
  },
  guanbi:function(){
    this.setData({
      lopen: !this.data.lopen
    })
  },
  //提现
  grand_total: function (e) {
    this.setData({
      arrtet: e.detail.value
    })
    console.log(this.data.arrtet)
  },
  depositsub: function (e) {
    var formData = e.detail.value
    var that = this
    console.log(that.data.id)
    console.log(that.data.openid)
    console.log(this.data.arrtet)
    if (this.data.arrtet > that.data.withdraw_deposit){
      wx.showToast({
        title: '当前余额不足',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    }else{
      wx.request({
        url: 'https://card.xiaoniren.cn/restapi/balance-withdrawal/create',
        data: {
          openid: that.data.openid,
          id: that.data.id,
          amount: that.data.arrtet,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          wx.showToast({
            title: '提现成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          }),
          that.setData({
            lopen: false,
            lshow: true,
            openid: that.data.openid,
            id: that.data.id,
            amount: that.data.arrtet,
          })
          console.log(that.data.id)
          console.log(that.data.openid)
          console.log(that.data.arrtet)
          console.log(res)
          if (res.data.success == true ){
            wx.showToast({
              title: '提现成功',
              icon: 'succes',
              duration: 1000,
              mask: true
            }),
              that.setData({
                lopen: false,
                lshow: true,
                openid: that.data.openid,
                id: that.data.id,
                amount: that.data.arrtet,
              })
          }else{
            wx.showToast({
              title: res.data.data.message,
              icon: 'success',
              duration: 2000,
              mask: true,
            })
          }
        },
        fail: function () {
          wx.showToast({
            title: '提现失败',
            icon: 'success',
            duration: 2000,
            mask: true,
          })
        }
      })
    }
    
  },
  // 明细
  perlistm:function(e){
    var that=this
    wx.request({
      url: 'https://card.xiaoniren.cn/restapi/bill/index?wechat_user_id=4',
      data:{

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          particulars: res.data.data,
        })
      },
      fail:function(){

      }
    })
    console.log(1)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '',
      path: '/pages/index/index?referrer='+that.data.id,
      //path: 'pages/index/index?id=' + wx.getStorageSync('id'),
      imageUrl: that.data.www+that.data.qrcode,
      success: function (res) {
        console.log(that.data.www+'/pages/index/index?referrer=' + that.data.id)
        console.log(that.data.www + that.data.qrcode)
        // 转发成功
      },
      
      fail: function (res) {
        // 转发失败
      }
    }
  },  
  // aaaa:function(e){
  //   var that=this
  //   console.log('pages/personal/personal?id='+that.data.id)
  // },
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
    var that=this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      wx.request({
        url: 'https://card.xiaoniren.cn/restapi/default/create',
        data: {
          openid: wx.getStorageSync('user').openid,
          nickname: that.data.userInfo.nickName,
          head_image: that.data.userInfo.avatarUrl,
          gender: that.data.userInfo.gender,
          country: that.data.userInfo.country,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          var id = res.data.data.id
          var qrcode = res.data.data.qrcode
          var openid = res.data.data.openid
          var grand_total = res.data.data.grand_total
          var withdraw_deposit = res.data.data.withdraw_deposit
          that.setData({
            list: res.data.data,
            id: id,
            openid: openid,
            qrcode: qrcode,
            grand_total: grand_total,
            withdraw_deposit: withdraw_deposit
          })
          console.log(that.data.id)
          console.log(that.data.qrcode)
          console.log(that.data.grand_total)
        }

      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  // 复制
  fuzhi:function(){
    var that=this
    wx.getClipboardData({
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})
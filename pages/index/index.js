var app = getApp()
var id;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    time_remaining:0,
    open: false,
    show: true,
    time_remaining: app.globalData.time_remaining,
    listlength: '',
    Dlistlength: '',
    length: '',
    referrer:'',
    id:'',
    referrer_id:0,
  },
  // 获取信息
  onLoad: function (option) {
    var that = this
    console.log('分享：')
    console.log(option)
    var referrer = option.referrer
    if (referrer > 0){
      this.setData({
        referrer_id: referrer
      })
    }

    // console.log(this.data.referrer);
    // console.log(this.data.referrer_id);
    // if (this.data.referrer_id>0){
    //   //分享进来
    //   console.log('分享进来')
    // } else {
    //   //非分享进来
    //   console.log('非分享进来')
    // }
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function (userInfo) {
        //更新数据
        that.setData({
          userInfo: userInfo
        })
      //  console.log(userInfo)
        wx.request({
          url: 'https://card.xiaoniren.cn/restapi/default/create',
          data: {
            openid: wx.getStorageSync('user').openid,
            nickname: that.data.userInfo.nickName,
            head_image: that.data.userInfo.avatarUrl,
            gender: that.data.userInfo.gender,
            country: that.data.userInfo.country,
            referrer: that.data.referrer_id
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          success: function (res) {
            var time_remaining = res.data.data.time_remaining
            var referrer = res.data.data.referrer
            var id = res.data.data.id
            that.setData({
              list: res.data.data,
              time_remaining: time_remaining,
              referrer: referrer,
              id:id

            })
           console.log(that.data.time_remaining)
          // console.log(that.data.referrer)
          // console.log(that.data.id)
           if (time_remaining>0){
             wx.switchTab({
               url: '../minemp/minemp',
             })
          }
          }

        })
      })
     
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 支付
  zhifu:function(e){    
    var that = this;
    wx.request({
      url: 'https://card.xiaoniren.cn/restapi/order/create',
      data:{
        openid: wx.getStorageSync('user').openid,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        var nonceStr = res.data.data.nonceStr
        var timeStamp = res.data.data.timeStamp
        var pkg = res.data.data.package
        var paySign = res.data.data.paySign
        wx.requestPayment({
          timeStamp: timeStamp,
          nonceStr: nonceStr,
          package: pkg,
          signType: 'MD5',
          paySign: paySign,
          success: function () {
            wx.showToast({
              title: '购买成功',
              icon: 'success',
              duration: 2000,
              mask: true,
            })
            wx.navigateTo({
              url: '../index/index',
            })
            
          },
          fail: function () {
            wx.showToast({
              title: '购买失败',
              icon: 'success',
              duration: 2000,
              mask: true,
            })
          }
        })
      }
    })
  },
  // 去制作
  make: function () {
    var that = this
    console.log(that.data.length)
    wx.request({
      url: 'https://card.xiaoniren.cn/restapi/default/index',
      data: {
        openid: wx.getStorageSync('user').openid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var listlength = res.data.data.DeliveryInfo.length
        var Dlistlength = res.data.data.EnterpriseInfo.length
        var length = listlength + Dlistlength
        that.setData({
          list: res.data.data.DeliveryInfo,
          listlength: listlength,
          EnterpriseInfo: res.data.data.EnterpriseInfo,
          Dlistlength: Dlistlength,
          length: length
        })
        console.log(that.data.listlength)
        console.log(that.data.Dlistlength)
        console.log(that.data.length)
        if (that.data.length == 3) {
          console.log(that.data.length)
          wx.showToast({
            title: '限制作三张',
            icon: 'success',
            duration: 2000,
            mask: true,
          })
          wx.switchTab({
            url: '../minemp/minemp',
          })
        } else {
          wx.navigateTo({
            url: '../make/make'
          })
        }
      }
    })
    
  },
  close:function(){
    this.setData({
      open: !this.data.open
    }),
      wx.switchTab({
      url: '../minemp/minemp',
      })
  }
}) 

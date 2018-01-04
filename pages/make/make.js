// pages/make/make.js
var app=getApp(); 
var url=url;
var title;
var content;
var license_path;
var glicense_path;
var logo_path;
var license;
var positive;
var contrary;
var id='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link_origin: app.globalData.link_origin,
    motto: 'Hello World',
    userInfo: {},
    selected: true,
    selected1: false,
    open: false,
    show: true,

    lopen: false,
    lshow: true,

    conopen: false,
    conopen: true,

    ryopen: false,
    ryopen: true,

    opene: false,
    openeg: false,
    array: ['请选择！','20人以下', '20~59人', '50~100人', '100人以上'],
    renminbi: ['请选择！','不需要融资', '天使轮', 'A轮', 'B轮', 'C轮', 'D轮', 'E轮', 'F轮', '已上市'],
    financing_situation: 0,
    date: '2017-12-13',
    name:'',
    mobile: '',
    desc: '',
    position:'',
    wechat:'',
    email:'',
    website:'',
    qq:'',
    company_city_id:'',
    company_name:'',
    title:'',
    content:'',
    company_business:'',
    company_address:'',
    tempFilePaths: '',
    time_remaining: '', 
    license_path:'',
    glicense_path: '',
    tempFilePaths:'',
    userInfo:'',
    brands: [],
    object: [],
    brandindex: 0,
    index:0,
    index1: 0,
    company_scale:'',
    province_id:'',
    tempFilePaths:'',
    imgs: [],
    url:url,

    logo:'',
    business:'',
    registered_capital:'',
    phone:'',
    username:'',
    logo_path: '',
    financing_situation:'',
    license:'',
    positive:'',
    contrary:'',
    amend:{},
    picArr0:[],
    picArr: [],
    gname:'',
    id:'',
    image:[],
    
  },
  //个人
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  //公司
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
  //切换
  showitem: function () {
    this.setData({
      open: !this.data.open
    })
  },
   //切换
  showitemm: function () {
    this.setData({
      opene: !this.data.opene
    })
  },
   //切换
  showitemg: function () {
    this.setData({
      openeg: !this.data.openeg
    })
  },
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: e.detail.value,
      company_scale:this.data.array[e.detail.value]
    });
    console.log(this.data.company_scale)
  },
  listenerPickerSelectedd: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index1: e.detail.value,
      financing_situation: this.data.renminbi[e.detail.value]
    });
    console.log(this.data.financing_situation)
  },
  // 点击日期组件确定事件 
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo:res.userInfo.avatarUrl
        })
        console.log(that.data.userInfo)
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      }
    })
    wx.request({
      url:that.data.link_origin+'/restapi/city/province',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        that.setData({
          brands: res.data.data,
        })
        console.log(res)
      }
    })
    // 修改个人信息 
    if(options.id){
      id = options.id
    wx.request({
      url: that.data.link_origin + '/restapi/delivery-info/update?id=' + options.id,
      data: {
        // id: id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        that.setData({
          userInfo: res.data.data.head_portrait,
          name:res.data.data.name,
          mobile: res.data.data.mobile,
          desc: res.data.data.desc,
          position: res.data.data.position,
          wechat: res.data.data.wechat,
          email: res.data.data.email,
          website: res.data.data.website,
          qq: res.data.data.qq,
          company_name: res.data.data.company_name,
          company_business: res.data.data.company_business,
          company_address: res.data.data.company_address,
          title: res.data.data.title,
          content: res.data.data.content,
        })
        console.log(res)
        
      }
    })
    }
    // 获取个人图片
    wx.request({
      url: that.data.link_origin + '/restapi/delivery-info/get-img?id=' + options.id,
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          image: res.data.data
        })
        console.log(res)
      }, fail: function () {

      }
    })
    // 修改个人图片
    // wx.request({
    //   url: that.data.link_origin + '/restapi/delivery-info/delete-img?id=80',
    //   data:{

    //   },
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   method: "POST",
    //   success:function(){

    //   },fail:function(){

    //   }
    // })
    //企业
    // if (options.id) {
    //   wx.request({
    //     url: that.data.link_origin + '/restapi/enterprise-info/update?id=' + options.id,
    //     data: {
    //       // id: id
    //     },
    //     header: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     },
    //     method: "POST",
    //     success: function (res) {
    //       that.setData({
    //         logo: res.data.data.logo,
    //         username: res.data.data.username,
    //         phone: res.data.data.phone,
    //         business: res.data.data.business,
    //         emacompany_businessil: res.data.data.company_business,
    //         company_address: res.data.data.company_address,
    //         company_created_at: res.data.data.company_created_at,
    //         company_name: res.data.data.company_name,
    //         company_business: res.data.data.company_business,
    //         company_address: res.data.data.company_address,
    //         title: res.data.data.title,
    //         content: res.data.data.content,
    //       })
    //     }
    //   })
    // }
  },
  // 删除图片
  imgdel:function(e){
    var that = this
    var id = e.currentTarget.dataset.index
    var imgid = e.currentTarget.dataset.id
    console.log(e)
    wx.showModal({
      title: '温馨提示',
      content: '确认删除',
      success: function (res) {
        if (res.confirm) {
          that.data.image.splice(id, 1)
          that.setData({
            image: that.data.image
          })
          wx.request({
            url: that.data.link_origin + '/restapi/delivery-info/delete-img?id=' + imgid,
            data: {
              // id: id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  bindPickerChange0: function (e) {
    var that = this;
    var aa = e.currentTarget.dataset.id
    console.log(aa)
    this.setData({
       brandindex: e.detail.value, index1: 0 
    })
    wx.request({
      url: that.data.link_origin+'/restapi/city/city',
      data: {
        province_id: 6
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        that.setData({
          object: res.data.data,
        })
        console.log(res)
      }
    })
  }, 
  bindPickerChange1: function (e) {
    this.setData({
      index1: e.detail.value
    })
    console.log(index1)
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 上传图片
  updateLicence: function () {
    this.setData({
      url: url
    })
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        wx.uploadFile({
          url: that.data.link_origin+'/restapi/delivery-info/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          success: function (res) {
            console.log(JSON.parse(res.data))
            var url = JSON.parse(res.data).data.file.url
            var picArr0 = that.data.picArr0
            picArr0.push(url)
            that.setData({
              licence: true,
              picArr0: picArr0
            })
           console.log(url)
           
          }
        })
      }
    })  
  },
  // 创建个人名片
  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  mobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  desc: function (e) {
    this.setData({
      desc: e.detail.value
    })
  },
  position: function (e) {
    this.setData({
      position: e.detail.value
    })
  },
  wechat: function (e) {
    this.setData({
      wechat: e.detail.value
    })
  },
  email: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  website: function (e) {
    this.setData({
      website: e.detail.value
    })
  },
  qq: function (e) {
    this.setData({
      qq: e.detail.value
    })
  },
  company_city_id: function (e) {
    this.setData({
      company_city_id: e.detail.value
    })
  },
  company_business: function (e) {
    this.setData({
      company_business: e.detail.value
    })
  },
  company_address: function (e) {
    this.setData({
      company_address: e.detail.value
    })
  },
  company_name: function (e) {
    this.setData({
      company_name: e.detail.value
    })
  },
  title: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  content: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this
    if(id){
      wx.request({
        url: that.data.link_origin + '/restapi/delivery-info/update?id=' +id,
        data: {
          head_portrait: that.data.userInfo,
          name: e.detail.value.name,
          mobile: e.detail.value.mobile,
          desc: e.detail.value.desc,
          position: e.detail.value.position,
          wechat: e.detail.value.wechat,
          email: e.detail.value.email,
          website: e.detail.value.website,
          qq: e.detail.value.qq,
          // company_city_id: e.detail.value.company_city_id,
          company_business: e.detail.value.company_business,
          company_address: e.detail.value.company_address,
          company_name: e.detail.value.company_name,
          title: e.detail.value.title,
          content: e.detail.value.content,
          imgs: JSON.stringify(imgs)
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          wx.showToast({
            title: '修改成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          }),
            wx.switchTab({
              url: '../minemp/minemp',
            })
        },
      })
    }else{
    if (this.data.name.length == 0) {
      wx.showToast({
        title: '请输入姓名！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (this.data.mobile.length == 0) {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (this.data.mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(this.data.mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (this.data.desc.length == 0) {
      wx.showToast({
        title: '请输入简介！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (this.data.position.length == 0) {
      wx.showToast({
        title: '请输入职位！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (this.data.company_business.length == 0) {
      wx.showToast({
        title: '请输入行业！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (this.data.company_address.length == 0) {
      wx.showToast({
        title: '请输入地址！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (this.data.company_name.length == 0) {
      wx.showToast({
        title: '请输入公司名称！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    var that = this;
    var formData = e.detail.value
    var imgs = []
    imgs.push({
      title: e.detail.value.title,
      content: e.detail.value.content,
      img: this.data.picArr0
    });
    // console.log(arr)
    console.log(imgs)
    wx.request({
      url: that.data.link_origin+'/restapi/delivery-info/create',
      data: {
        openid: wx.getStorageSync('user').openid,
        head_portrait:that.data.userInfo,
        name: e.detail.value.name,
        mobile: e.detail.value.mobile,
        desc: e.detail.value.desc,
        position: e.detail.value.position,
        wechat: e.detail.value.wechat,
        email: e.detail.value.email,
        website: e.detail.value.website,
        qq: e.detail.value.qq,
       // company_city_id: e.detail.value.company_city_id,
        company_business: e.detail.value.company_business,
        company_address: e.detail.value.company_address,
        company_name: e.detail.value.company_name,
        title: e.detail.value.title,
        content: e.detail.value.content,
        imgs: JSON.stringify(imgs)
      },
      
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '提交成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        }),
        wx.switchTab({
          url: '../minemp/minemp',
        })
      },
        fail: function () {
        wx.showToast({
          title: '提交失败',
          icon: 'success',
          duration: 2000,
          mask: true,
        })
      }
    })
  }
},
  
  // 企业
  gname: function (e) {
    this.setData({
      gname: e.detail.value
    })
  },
  username: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  business: function (e) {
    this.setData({
      business: e.detail.value
    })
  },
  registered_capital: function (e) {
    this.setData({
      registered_capital: e.detail.value
    })
  },
  company_created_at: function (e) {
    this.setData({
      company_created_at: e.detail.value
    })
  },
  company_scale: function (e) {
    // this.setData({
    //   company_scale: e.detail.name
    // })
  },
  financing_situation: function (e) {
    // this.setData({
    //   financing_situation: e.detail.name
    // })
  },
  // logo
  updateLogo: function () {
    this.setData({
      url: url,
      lopen: !this.data.lopen
    })
    var that = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        wx.uploadFile({
          url: that.data.link_origin+'/restapi/enterprise-info/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          success: function (res) {
            console.log(JSON.parse(res.data))
            var url = JSON.parse(res.data).data.file.url
            that.setData({
              licence: true,
              logo: url
            })

            console.log(url)

          }
        })
      }
    })
  },
  // 营业执照
  license: function () {
    this.setData({
      url: url,
      liopen: !this.data.liopen
    })
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        wx.uploadFile({
          url: that.data.link_origin+'/restapi/enterprise-info/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          success: function (res) {
            console.log(JSON.parse(res.data))
            var url = JSON.parse(res.data).data.file.url
            that.setData({
              licence: true,
              license: url
            })

            console.log(url)

          }
        })
      }
    })
  },
  // 身份证正面
  positive: function () {
    this.setData({
      url: url,
      conopen: !this.data.conopen
    })
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        wx.uploadFile({
          url: that.data.link_origin+'/restapi/enterprise-info/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          success: function (res) {
            console.log(JSON.parse(res.data))
            var url = JSON.parse(res.data).data.file.url
            that.setData({
              licence: true,
              positive: url
            })

            console.log(url)

          }
        })
      }
    })
  },
  // 身份证反面
  contrary: function () {
    this.setData({
      url: url,
      ryopen: !this.data.ryopen
    })
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        wx.uploadFile({
          url: that.data.link_origin+'/restapi/enterprise-info/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          success: function (res) {
            console.log(JSON.parse(res.data))
            var url = JSON.parse(res.data).data.file.url
            that.setData({
              licence: true,
              contrary: url
            })

            console.log(url)

          }
        })
      }
    })
  },
  // 公司上传图片
  gsupdateLicence: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        wx.uploadFile({
          url: that.data.link_origin+'/restapi/enterprise-info/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          success: function (res) {
            console.log(JSON.parse(res.data))
            var url = JSON.parse(res.data).data.file.url
            var picArr = that.data.picArr
            picArr.push(url)
            that.setData({
              licence: true,
              picArr: picArr
            })

            console.log(url)

          }
        })
      }
    })
  },
  firmformSubmit:function(e){
    var that=this
    // if (that.data.logo == '') {
    //   wx.showToast({
    //     title: '公司logo未上传',
    //     icon: 'success',
    //     duration: 2000
    //   })
    // }
    if (this.data.name.length == 0) {
      wx.showToast({
        title: '请输入公司名称！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (this.data.username.length == 0) {
      wx.showToast({
        title: '请输入法人姓名！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (this.data.phone.length == 0) {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (this.data.phone.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (this.data.business.length == 0) {
      wx.showToast({
        title: '请输入主营业务！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (this.data.company_business.length == 0) {
      wx.showToast({
        title: '请输入行业！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (this.data.company_address.length == 0) {
      wx.showToast({
        title: '请输入详细地址！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    if (this.data.registered_capital.length == 0) {
      wx.showToast({
        title: '请输入注册资本！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    var that = this;
    var formData = e.detail.value
    // var arrAll = [];
    // console.log(that.data.glicense_path)
    // arrAll.push(that.data.glicense_path);
    var imgs = []
    imgs.push({
      title: e.detail.value.title,
      content: e.detail.value.content,
      img: this.data.picArr
    });
    console.log(imgs)
    wx.request({
      url: that.data.link_origin+'/restapi/enterprise-info/create',
      data: {
        openid: wx.getStorageSync('user').openid,
        logo: that.data.logo,
        name: e.detail.value.name,
        username: e.detail.value.username,
        phone: e.detail.value.phone,
        company_created_at: e.detail.value.company_created_at,
        company_scale: that.data.company_scale,
        registered_capital: e.detail.value.registered_capital,
        financing_situation: that.data.financing_situation,
        company_business: e.detail.value.company_business,
        company_city_id: e.detail.value.company_business,
        company_address: e.detail.value.company_address,
        business: e.detail.value.business,
        title: e.detail.value.title,
        content: e.detail.value.content,
        business_license: that.data.positive,
        identity_card_front: that.data.license,
        identity_card_later: that.data.contrary,
        imgs: JSON.stringify(imgs)
      },

      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '提交成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
        wx.switchTab({
          url: '../minemp/minemp',
        })
      },
        fail: function () {
        wx.showToast({
          title: '提交失败',
          icon: 'success',
          duration: 2000,
          mask: true,
        })
      }
    })
  }
})

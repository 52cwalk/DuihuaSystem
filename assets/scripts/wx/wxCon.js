var global = require("globalSetting");
var webApi = require("../network/webApi");
var storage_con = require("storage_con");

cc.Class({
    extends: cc.Component,

    properties: {
    },

    

     onLoad () {
         this.recoverActiveCodeEvent = null;
     },

    start () {
      var openid = storage_con._instance.getOpenid();
      var exchangecode = storage_con._instance.getExchangeCode();
      if(!!exchangecode)
      {
        global.exchangecode = exchangecode;
      }
        if(!!openid)
        {
             global.openid = openid;
             console.log("global.openid is " + global.openid);
        }
        else
        {
            if (typeof wx != 'undefined') {
                var that  = this;
                wx.login({
                    success: res => {
                        console.log("wx is login success !");
                        console.log(res);
                        console.log("code is " + res.code);
                        webApi.login(res.code,function(re){
                            that.fetchOpenidCallBack(re);
                        })
                    }
                });
            }
        }

        if (typeof wx != 'undefined') {
          
          

        }
    },
    initEvent(cb)
    {
        this.recoverActiveCodeEvent = cb;
    },
    loadHeadImage()
    {
        
        

        
        
        
        
        
    },
    fetchOpenidCallBack(res)
    {
        console.log("登录信息回来了！");
        console.log(response);
        var response = JSON.parse(res);
        if(response.code>0)
        {
            var openid = response.data.openid;
            global.openid = openid;
            storage_con._instance.saveOpenid(openid);
            
            if(!!this.recoverActiveCodeEvent)
            {
                this.recoverActiveCodeEvent(1,response.data);
            }
        }
    },
    getUserBaseInfo()
    {
        
        let width = cc.visibleRect.width;
        let height = cc.visibleRect.height;
        var that = this;
        window.wx.getSetting({
            success (res) {
                console.log(res.authSetting);
                if (res.authSetting["scope.userInfo"]) {
                    console.log("用户已授�?);
                    window.wx.getUserInfo({
                        success(res){
                            console.log(res);
                            var uname =  res.userInfo.nickName;
                            var avatarUrl =  res.userInfo.avatarUrl;
                            
                            
                            
                            
                            
                        }
                    });
                }else {
                    console.log("用户未授�?);
                    let button = window.wx.createUserInfoButton({
                        type: 'text',
                        text: '',
                        style: {
                            left: 0,
                            top: 0,
                            width: width,
                            height: height,
                            backgroundColor: '#00000000',
                            color: '#ffffff',
                            fontSize: 20,
                            textAlign: "center",
                            lineHeight: height,
                        }
                    });
                    button.onTap((res) => {
                        if (res.userInfo) {
                            var uname =  res.userInfo.nickName;
                            var avatarUrl =  res.userInfo.avatarUrl;

                            
                            
                            
                            

                            

                            that.loadHeadImage();

                            console.log("用户授权:", res);
                            
                            
                            button.destroy();
                        }else {
                            console.log("用户拒绝授权:", res);
                        }
                    });
                }
            }
        })
    }
    
});


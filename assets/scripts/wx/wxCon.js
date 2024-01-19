var global = require("globalSetting");
var webApi = require("../network/webApi");
var storage_con = require("storage_con");

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         this.recoverActiveCodeEvent = null;
     },

    start () {
      var openid = storage_con._instance.getOpenid();
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
          //  this.getUserBaseInfo();
          //  this.loadHeadImage();
/*
            cc.loader.load({url: info.avatar+'?file=a.jpg'}, function (err, tex) {        
                console.log("用户信息回来了。！");
                that.avatarSpirte.spriteFrame=new cc.SpriteFrame(tex)
            });
             var hosturl = "http://localhost:3000/uploads\spinball\oamtX44YbvBHgPeqhJOeosjZ_U68\1584014008529.jpg";
*/
        }
    },
    initEvent(cb)
    {
        this.recoverActiveCodeEvent = cb;
    },
    loadHeadImage()
    {
        // var info= global.getLocalUserInfo();
        // var that = this;

        // imageloader.loadImage(info.avatar,function(tex){
        //     console.log("用户信息回来了。！");
        //     var spriteFrame1  = new cc.SpriteFrame(tex);
        //     that.avatarSpirte.spriteFrame = spriteFrame1;
        // });
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
        //获取微信界面大小
        let width = cc.visibleRect.width;
        let height = cc.visibleRect.height;
        var that = this;
        window.wx.getSetting({
            success (res) {
                console.log(res.authSetting);
                if (res.authSetting["scope.userInfo"]) {
                    console.log("用户已授权");
                    window.wx.getUserInfo({
                        success(res){
                            console.log(res);
                            var uname =  res.userInfo.nickName;
                            var avatarUrl =  res.userInfo.avatarUrl;
                            // webApi.updateUserInfo(uname,avatarUrl,null);//更新服务器用户信息
                            // global.setUsename(uname);
                            // global.setUseravatar(avatarUrl);
                            // console.log(global.getLocalUserInfo());
                            //此时可进行登录操作
                        }
                    });
                }else {
                    console.log("用户未授权");
                    let button = window.wx.createUserInfoButton({
                        type: 'text',
                        text: '',
                        style: {
                            left: 0,
                            top: 0,
                            width: width,
                            height: height,
                            backgroundColor: '#00000000',//最后两位为透明度
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

                            // global.setUsename(uname);
                            // global.setUseravatar(avatarUrl);
                            
                            // webApi.updateUserInfo(uname,avatarUrl,null);//更新服务器用户信息

                            //console.log( global.getLocalUserInfo());

                            that.loadHeadImage();

                            console.log("用户授权:", res);
                            //global.setUserInfo(res.userInfo);
                            //此时可进行登录操作
                            button.destroy();
                        }else {
                            console.log("用户拒绝授权:", res);
                        }
                    });
                }
            }
        })
    }
    // update (dt) {},
});

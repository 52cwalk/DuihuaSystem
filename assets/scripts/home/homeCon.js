var global = require("globalSetting");
var storage_con  = require("storage_con");
var webApi  = require("webApi");
var TipCon =require("TipCon") ;
var musicCon = require("musicCon");
var dialogueLoadingCon = require("dialogueLoadingCon");

cc.Class({
    extends: cc.Component,

    properties: {
     
       activePanelObj:cc.Node,
       initUserInfoPanelObj:cc.Node,
       activeCodeEditBox:cc.EditBox,
       wxConObj:cc.Node,
       nicknameEditBox:cc.EditBox,
       yearEditBox:cc.EditBox,
       mouthEditBox:cc.EditBox,
       dayEditBox:cc.EditBox,
       userInfoConObj:cc.Node,
       progressConObj:cc.Node,
       newArchieventSpriteTipObj:cc.Node,
       newBagSpriteTipObj:cc.Node
    },
    onLoad()
    {
       
    },
    start () {
        this.initApp();
        
        
     
        
        
        
        
    },
    
    gotoClock()
    {
        gotoScene("clock");
    },
    gotoMaze()
    {
        gotoScene("maze");
    },
    gotoSticker()
    {
        gotoScene("sticker");
    },
    gotoLie()
    {
        gotoScene("lietest");
    },
    gotoFirstChapter()
    {
        if (typeof wx != 'undefined') {
            if(!global.activecode)
            {
                this.showActiveCodePanel();
                return;
            }
            else
            {
                global.selectActorId = 1000 
                global.selectChapterId == 2001;
                gotoScene("dialogue");
            }
        }
        else
        {
            global.selectActorId = 1000 
            global.selectChapterId == 2001;
            gotoScene("dialogue");
        }
    },
    gotoDialogue()
    {
        if (typeof wx != 'undefined') {
            if(!global.activecode)
            {
                this.showActiveCodePanel();
                return;
            }
            if(!!global.userBaseInfo.userNickName)
            {
                
                
                if(global.selectActorId == 1000 && global.selectChapterId == 2002)
                {
                    console.log( " global.selectActorId is  001 ");
                    gotoScene("dialogue");
                }
                else
                {
                    console.log( " global.selectActorId is  002 ");
                    global.isRecoverLastNode= true;
                    gotoScene("dialogue");
                }
            }
            else
            {
                
                this.initUserInfoPanelObj.active = true;
            }
        }
        else
        {
            if(!!global.userBaseInfo.userNickName)
            {
                
                
                console.log( " global.selectActorId is  " + global.selectActorId + " global.selectChapterId " + global.selectChapterId );
                if(global.selectActorId == 1000 && global.selectChapterId == 2002)
                {
                    console.log( " global.selectActorId is  001 ");
                    gotoScene("dialogue");
                }
                else
                {
                    console.log( " global.selectActorId is  002 ");
                    global.isRecoverLastNode= true;
                    gotoScene("dialogue");
                }
            }
            else
            {
                
                this.initUserInfoPanelObj.active = true;
            }

        }
    },

    gotoMemoryBag()
    {
        dialogueLoadingCon._instance.show();
        if(!! this.progressConObj)
        {
            this.progressConObj.getComponent("progressCon").saveChapterPos();
        }
       
        if (typeof wx != 'undefined') {
            if(!global.activecode)
            {
                this.showActiveCodePanel();
                return;
            }
            gotoScene("memory_bag");
        }
        else
        {
            gotoScene("memory_bag");
        }
    },
    gotoMemoryArchievement()
    {
        dialogueLoadingCon._instance.show();
        if(!! this.progressConObj)
        {
            this.progressConObj.getComponent("progressCon").saveChapterPos();
        }
        
        if (typeof wx != 'undefined') {
            if(!global.activecode)
            {
                this.showActiveCodePanel();
                return;
            }
            gotoScene("memory_achievement");   
        }
        else
        {
            gotoScene("memory_achievement");
        }
    },
    initApp()
    {
        var activecode = storage_con._instance.getActiveCode();
        
        if(!!!activecode)
        {
            if (typeof wx != 'undefined') {
                this.showActiveCodePanel();
                this.initLocalInfoFromServer();
            }
            else
            {
                this.checkInitialUserInfo(); 
            }
        }
        else{
            console.log("initApp is called 02 !");
            global.activecode = activecode;
            this.checkInitialUserInfo();
        }

        var localnickname = storage_con._instance.getUserNickName();
        var localbirthday =  storage_con._instance.getBirthdayDay();

        console.log("昵称 为：" + localnickname);
        console.log("生日 为：" + localbirthday);

        global.dialogueRewardDic ={};
        
        if(!!localnickname && !!localbirthday)
        {
            global.userBaseInfo.userNickName = localnickname;
            global.userBaseInfo.birthday = localbirthday;
            
            this.userInfoConObj.getComponent("userInfoPanelCon").updateUserBaseInfo(localnickname,localbirthday);
        }

        var ishavenewArchevement = storage_con._instance.getNewAchievementReward();
        if(!!ishavenewArchevement)
        {
            this.newArchieventSpriteTipObj.active = true;
        }

        var ishavenewbag = storage_con._instance.getNewBagReward();
        console.log("ishavenewbag is ");
        console.log(ishavenewbag);
        if(!!ishavenewbag)
        {
            this.newBagSpriteTipObj.active = true;
        }
        else
        {
            var isShowNewZhongchou = storage_con._instance.getNewZhongchouMark();
            if(!isShowNewZhongchou)
            {
                this.newBagSpriteTipObj.active = true;
            }
        }
    },
    initLocalInfoFromServer()
    {
        this.wxConObj.getComponent("wxCon").initEvent((rc,data)=>{
            if(rc>0)
            {
                console.log("initLocalInfoFromServer is called 02 ");
                if(!!data.activecode)
                {
                    global.activecode = data.activecode;
                    storage_con._instance.saveActiveCode(data.activecode);
                    this.activePanelObj.active = false;
                  
                    if (typeof wx != 'undefined') {
                        wx.showToast({
                            title: "激活码验证成功�?
                        });
                    }
                }

                if(!!data.nickname && data.birthday)
                {
                    global.userBaseInfo.userNickName = data.nickname;
                    global.userBaseInfo.birthday = data.birthday;
                    storage_con._instance.saveBirthdayDay(data.birthday);
                    storage_con._instance.saveUserNickName(data.nickname);
                    this.userInfoConObj.getComponent("userInfoPanelCon").updateUserBaseInfo( data.nickname, data.birthday);
                    this.progressConObj.getComponent("progressCon").setGuideActive(true);
                }

                if(!!data.exchangecode)
                {
                    global.exchangecode = data.exchangecode;
                    storage_con._instance.saveExchangeCode(global.exchangecode);
                }

                this.checkInitialUserInfo();
            }
            else
            {
                this.showActiveCodePanel();
            }
        });

    },
    checkInitialUserInfo()
    {
        var localbirthday =  storage_con._instance.getBirthdayDay();
        var localnickname =  storage_con._instance.getUserNickName();
        if(!!!localbirthday|| !!!localnickname)
        {
            this.initUserInfoPanelObj.active = true;
        }
    },
    submitUserNickName()
    {
        var nicknameStr =this.nicknameEditBox.string;
        if(!!nicknameStr&&nicknameStr.trim()!="")
        {
            storage_con._instance.saveUserNickName(nicknameStr);
            global.userBaseInfo.userNickName = nicknameStr;
            this.gotoDialogue();
        }
        else
        {
            console.log("the nick name is null ");
        }
        console.log(global.userBaseInfo);
    },
    showActiveCodePanel()
    {
        this.activePanelObj.active = true;
    },
    closeActiveCodePanel()
    {
        this.activePanelObj.active = false;
    },
    recoverActiveStatus(rc)
    {

    },
    activeCode()
    {
        var activeCodeStr =this.activeCodeEditBox.string.trim();
        console.log("sd " + activeCodeStr + "  "+ activeCodeStr.length);
        if(activeCodeStr.length!=6)
        {
            if (typeof wx != 'undefined') {
                wx.showToast({
                    title: "验证码错误！！！",
                    icon:'fail'
                });
            }
            return;
        }
        else
        {
            wx.showLoading({
                title: '验证�?..',
            });
            var that =this;
            webApi.activeApp(activeCodeStr,function(rb,exchangecode){
                wx.hideLoading();
                if(rb>0)
                {
                    global.activecode = activeCodeStr;
                    global.exchangecode = exchangecode;
                    storage_con._instance.saveActiveCode(activeCodeStr);
                    storage_con._instance.saveExchangeCode(exchangecode);

                    that.activePanelObj.active = false;
                    wx.showToast({
                        title: "验证成功！！�?
                    });
                    that.checkInitialUserInfo();
                }
                else
                {
                    wx.showToast({
                        title: "验证失败！！�?,
                        icon:'fail'
                    });
                }
            });
        }
    },
    userinfoOkBtnClick()
    {
        if(!!!this.nicknameEditBox.string)
        {
            this.showTip("昵称信息错误，请检查！",-1); 
            return;
        }

        var year = this.yearEditBox.string;
        var mouth = this.mouthEditBox.string;
        var day = this.dayEditBox.string;
        
        if(!!!year)
        {
            this.showTip("请填写正确年�?,-1);
            return;
        }
        else
        {
   
            if(this.isLetter(year)||year.length!=4)
            {
                this.showTip("请填写正确年�?,-1);
                return;
            }
        }

        if(!!!mouth)
        {
            this.showTip("请填写正确月�?,-1);
            return;
        }
        else
        {
         
            if(this.isLetter(mouth)||(mouth.length>2)||(mouth.length==0) ||(parseInt(mouth)>12)||(parseInt(mouth)<=0))
            {
                this.showTip("请填写正确月�?,-1);
                return;
            }
            mouth = mouth.length==1?"0"+mouth:mouth;
        }

        if(!!!day)
        {
            this.showTip("请填写正确日�?,-1);
            return;
        }
        else
        {
            var day = this.dayEditBox.string;
            if(this.isLetter(day)||(day.length>2)||(day.length==0)||(parseInt(day)>31)||(parseInt(day)<=0))
            {
                this.showTip("请填写正确日�?,-1);
                return;
            }
            day = day.length==1?"0"+day:day;
        }

        var nickname =this.nicknameEditBox.string;
        var birthday = year +mouth+ day;
        var that = this;
        if (typeof wx != 'undefined') {
            webApi.checkContentLawful(nickname,(rb)=>{
                if( rb=="0")
                {
                   
    
                    storage_con._instance.saveBirthdayDay(birthday);
                    storage_con._instance.saveUserNickName(nickname);
                    global.userBaseInfo.userNickName = nickname;
                    global.userBaseInfo.birthday = birthday;
                    this.userInfoConObj.getComponent("userInfoPanelCon").updateUserBaseInfo(nickname,birthday);

                    webApi.udpateNickame(nickname,function(rb){
                        console.log(rb);
                    });
            
                    webApi.udpateBirthday(birthday,function(rb){
                        console.log(rb);
                        if(!! that.progressConObj)
                        {
                            that.progressConObj.getComponent("progressCon").setGuideActive(true);
                        }
                    });

                 
                    this.initUserInfoPanelObj.active = false;
                }
                else if(rb=="-1")
                {
                    this.showTip("无操作权�?,-1);
                }
                else
                {
                    this.showTip("昵称不规范！",-1);
                }
            });
        }
        else
        {
            storage_con._instance.saveBirthdayDay(birthday);
            storage_con._instance.saveUserNickName(nickname);
            global.userBaseInfo.userNickName = nickname;
            global.userBaseInfo.birthday = birthday;
            this.userInfoConObj.getComponent("userInfoPanelCon").updateUserBaseInfo(nickname,birthday);
            this.initUserInfoPanelObj.active = false;

            if(!! this.progressConObj)
            {
                this.progressConObj.getComponent("progressCon").setGuideActive(true);
            }
        }
        
    },

    isLetter(str) {
       return  !(/^\d+$/.test(str));
    },
    showTip(title,status=1)
    {
        if (typeof wx != 'undefined') {
            wx.showToast({
                title: title,
                icon:status>0?'success':'none',
                duration:2000
            });
        }
        else
        {
            console.log("show tip is called title is " + title);
            TipCon._instance.showTip(title);
        }
    }
});


var global = require("globalSetting");
var storage_con  = require("storage_con");
var webApi  = require("webApi");

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

       topNicknameLabel:cc.Label,
       userInfoConObj:cc.Node
    },
    start () {
        this.initApp();
        this.initChapterProgress();
    },
    gotoClock()
    {
        cc.director.loadScene("clock");
    },
    gotoMaze()
    {
        cc.director.loadScene("maze");
    },
    gotoSticker()
    {
        cc.director.loadScene("sticker");
    },
    gotoLie()
    {
        cc.director.loadScene("lietest");
    },
    gotoDialogue()
    {
        if (typeof wx != 'undefined') {
            if(!global.activecode)
            {
                this.showActiveCodePanel();
                return;
            }
            if(!!global.userBaseInfo.userNickName)//如果用户名不为空
            {
                // global.selectActorId = 1000;
                // global.selectChapterId = 2001;
                if(global.selectActorId == 1000 && global.selectChapterId == 2002)
                {
                    console.log( " global.selectActorId is  001 ");
                    cc.director.loadScene("dialogue");
                }
                else
                {
                    console.log( " global.selectActorId is  002 ");
                    global.isRecoverLastNode= true;
                    cc.director.loadScene("dialogue");
                }
            }
            else
            {
                //弹出用户名设置页面
                this.initUserInfoPanelObj.active = true;
            }
        }
        else
        {
            if(!!global.userBaseInfo.userNickName)//如果用户名不为空
            {
                // global.selectActorId = 1000;
                // global.selectChapterId = 2001;
                console.log( " global.selectActorId is  " + global.selectActorId + " global.selectChapterId " + global.selectChapterId );
                if(global.selectActorId == 1000 && global.selectChapterId == 2002)
                {
                    console.log( " global.selectActorId is  001 ");
                    cc.director.loadScene("dialogue");
                }
                else
                {
                    console.log( " global.selectActorId is  002 ");
                    global.isRecoverLastNode= true;
                    cc.director.loadScene("dialogue");
                }
            }
            else
            {
                //弹出用户名设置页面
                this.initUserInfoPanelObj.active = true;
            }

        }
    },
    gotoArchive()
    {
        if (typeof wx != 'undefined') {
            if(!global.activecode)
            {
                this.showActiveCodePanel();
                return;
            }
            cc.director.loadScene("archive");   
        }
        else
        {
            cc.director.loadScene("archive");
        }
    },
    gotoMemoryBag()
    {
        if (typeof wx != 'undefined') {
            if(!global.activecode)
            {
                this.showActiveCodePanel();
                return;
            }
            cc.director.loadScene("memory_bag");   
        }
        else
        {
            cc.director.loadScene("memory_bag");
        }
    },
    gotoMemoryArchievement()
    {
        if (typeof wx != 'undefined') {
            if(!global.activecode)
            {
                this.showActiveCodePanel();
                return;
            }
            cc.director.loadScene("memory_achievement");   
        }
        else
        {
            cc.director.loadScene("memory_achievement");
        }
    },
    initChapterProgress()
    {
        var finishobj= storage_con._instance.getFinishedConfig();
        console.log("首页 finishobj is ");
        console.log(finishobj);
        global.finishActorList = finishobj;

        var lastestConfig = storage_con._instance.getLastestNodeConfig();
        console.log("the store last config is ");
        console.log(storage_con._instance.getLastestNodeConfig());

        if(!!lastestConfig && !!lastestConfig.currentNodeId)//表示可以根据历史记录节点恢复
        {
            console.log("initChapterProgress 001  ");
            global.selectActorId = parseInt(lastestConfig.actor);
            global.selectChapterId = parseInt( lastestConfig.chapter);
        }
        else
        {
            if(global.getFinishActorCount()>0)//选择男主四选一
            {
                console.log("initChapterProgress 002 ");
                global.selectActorId = 1000;
                global.selectChapterId = 2002;
            }
            else
            {
                console.log("initChapterProgress 003  ");
                //默认没有任何进度，从公共部分开始
                global.selectActorId = 1000;
                global.selectChapterId = 2001;
            }
            
        }
    },
    initApp()
    {
        var activecode = storage_con._instance.getActiveCode();
        
        if(!!!activecode)
        {
            if (typeof wx != 'undefined') {
                this.showActiveCodePanel();//显示激活界面
                this.initLocalInfoFromServer();
            }
            else
            {
                this.checkInitialUserInfo(); 
            }
        }
        else{
            console.log("initApp is called 02 !")
            global.activecode = activecode;
            this.checkInitialUserInfo();
        }

        var localnickname = storage_con._instance.getUserNickName();
        var localbirthday =  storage_con._instance.getBirthdayDay();
  
        global.historyPlotDic = [];//清空记录
        console.log("昵称 为：" + localnickname);
        console.log("生日 为：" + localbirthday);
       
        if(!!localnickname && !!localbirthday)
        {
            global.userBaseInfo.userNickName = localnickname;
            global.userBaseInfo.birthday = localbirthday;
            this.topNicknameLabel.string = localnickname;

            this.userInfoConObj.getComponent("userInfoPanelCon").updateUserBaseInfo(localnickname,localbirthday);
        }
        global.isFromDialogueToMemory = false;
    },
    initLocalInfoFromServer()
    {
        this.wxConObj.getComponent("wxCon").initEvent((rc,data)=>{
            if(rc>0)
            {
                console.log("initLocalInfoFromServer is called 02 ");
                global.activecode = data.activecode;
                global.userBaseInfo.userNickName = data.nickname;
                global.userBaseInfo.birthday = data.birthday;

                this.userInfoConObj.getComponent("userInfoPanelCon").updateUserBaseInfo( data.nickname, data.birthday);

                storage_con._instance.saveActiveCode(code);
                storage_con._instance.saveBirthdayDay(data.birthday);
                storage_con._instance.saveUserNickName(data.nickname);

                this.activePanelObj.active = false;
                
                if (typeof wx != 'undefined') {
                    wx.showToast({
                        title: "激活码验证成功！"
                    });
                }
                this.checkInitialUserInfo();
            }
            else
            {
                console.log("initApp is called 03");
                this.showActiveCodePanel();//显示激活界面
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
                    title: "验证错误！！！",
                    icon:'fail'
                });
            }
            console.log("验证码错误 !!!" );
            return;
        }
        else
        {
            wx.showLoading({
                title: '验证中...',
            });
            var that =this;
            webApi.activeApp(activeCodeStr,function(rb){
                wx.hideLoading();
                if(rb>0)
                {
                    global.activecode = activeCodeStr;
                    storage_con._instance.saveActiveCode(activeCodeStr);
                    that.activePanelObj.active = false;
                    wx.showToast({
                        title: "验证成功！！！"
                    });
                    that.checkInitialUserInfo();
                }
                else
                {
                    wx.showToast({
                        title: "验证失败！！！",
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
            console.log("userinfoOkBtnClick  001 " );
            console.log(this.nicknameEditBox.string);
            this.showTip("昵称信息错误，请检查！");
            return;
        }
        
        if(!!!this.yearEditBox.string)
        {
            console.log("userinfoOkBtnClick  002");
            this.showTip("请填写正确的年份");
            return;
        }
        else
        {
            var year = this.yearEditBox.string;
            if(this.isLetter(year)||year.length!=4)
            {
                console.log("userinfoOkBtnClick  003");
                this.showTip("请填写正确的年份");
                return;
            }
        }

        if(!!!this.mouthEditBox.string)
        {
            this.showTip("请填写正确的月份");
            return;
        }
        else
        {
            var mounth = this.mouthEditBox.string;
            if(this.isLetter(mounth)||mounth.length!=2)
            {
                this.showTip("请填写正确的月份");
                return;
            }
        }

        if(!!!this.dayEditBox.string)
        {
            this.showTip("请填写正确的日期");
            return;
        }
        else
        {
            var day = this.dayEditBox.string;
            if(this.isLetter(day)||day.length!=2)
            {
                this.showTip("请填写正确的日期");
                return;
            }
        }

        var nickname =this.nicknameEditBox.string;
        var birthday = this.yearEditBox.string +this.mouthEditBox.string + this.dayEditBox.string;
        console.log("nickname is " + nickname);
        console.log("birthday is " + birthday);
        
        storage_con._instance.saveBirthdayDay(birthday);
        storage_con._instance.saveUserNickName(nickname);

        global.userBaseInfo.userNickName = nickname;
        global.userBaseInfo.birthday = birthday;

        this.topNicknameLabel.string = nickname;
        this.initUserInfoPanelObj.active = false;

        this.userInfoConObj.getComponent("userInfoPanelCon").updateUserBaseInfo(nickname,birthday);

        webApi.udpateNickame(nickname,function(rb){
            console.log(rb);
        });

        webApi.udpateBirthday(birthday,function(rb){
                console.log(rb);
        });

    },
    isLetter(str) {
       return  !(/^\d+$/.test(str));
    },
    showTip(title)
    {
        if (typeof wx != 'undefined') {
            wx.showToast({
                title: title
            });
        }
        else
        {
            console.log("show tip is called title is " + title);
            TipCon._instance.showTip(title);
        }
    }
});

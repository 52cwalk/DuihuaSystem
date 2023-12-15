var storage_con = require("storage_con");
var global = require("globalSetting");
var webApi  = require("webApi");
var TipCon =require("TipCon") ;
var musicCon = require("musicCon");
cc.Class({
    extends: cc.Component,

    properties: {
       mainHeadSprite:cc.Sprite,
       userMaskObj:cc.Node,
       mainUserInfoPanel:cc.Node,
       exchangecodePanelObj:cc.Node,

       nicknameLabel:cc.Label,
       birthdayLabel:cc.Label,

       nicknamePanelObj:cc.Node,
       birthdayPanelObj:cc.Node,

       nicknameEditBox:cc.EditBox,
       yearEditBox:cc.EditBox,
       mouthEditBox:cc.EditBox,
       dayEditBox:cc.EditBox,
       topNicknameLabel:cc.Label,
       
       achievementProgressBar:cc.Sprite,
       bagProgressBar:cc.Sprite,

       achievementProgressLabel:cc.Label,
       bagProgressLabel:cc.Label,
       homeAchievementProgressLabel:cc.Label,
       achievementjsonData:cc.JsonAsset,
       bagjsonData:cc.JsonAsset,

        exchangeCodeLabel:cc.Label,
        exchangeCodeNewTipSpriteObj:cc.Node,
        btnExchangeCodeNewTipSpriteObj:cc.Node
    },
     onLoad () {
    
     },
    start () {
        
        this.initRewardProgress();
     
        this.isShowExchangeCode = false;
        var code = storage_con._instance.getExchangeCode();
        var aitem= storage_con._instance.getReward("achievement_kjzx");
        if(!!aitem && !!code)
        {
            this.exchangeCodeLabel.string = code;
            this.isShowExchangeCode = true;
        }
        var eguide= storage_con._instance.getExchangeGuide();
        if(!!eguide && eguide==1)
        {
            this.exchangeCodeNewTipSpriteObj.active = true;
            this.btnExchangeCodeNewTipSpriteObj.active = true;
        }
        
        this.intervalTime = 60000;
        this.preTime= Date.now();

    },
    initMusic()
    {
        var musicEffectVolume = cc.sys.localStorage.getItem("effectMusicVolume");
        if(musicEffectVolume>=0)
        {
            global.musicEffectVolume =musicEffectVolume;
        }

        var musicBgVolume = cc.sys.localStorage.getItem("bgMusicVolume");
        if(musicBgVolume>=0)
        {
            global.musicBgVolume =musicBgVolume;
        }

        var musicBgEnabled = cc.sys.localStorage.getItem("enableMusicBgVolume");
        if(musicBgEnabled == 0)
        {
            global.musicBgEnabled = false;
        }
        else
        {
            global.musicBgEnabled = true;
        }

        var musicEffectEnabled = cc.sys.localStorage.getItem("enableMusicEffectVolume");
        if(musicEffectEnabled == 0)
        {
            global.musicEffectEnabled = false;
        }
        else
        {
            global.musicEffectEnabled = true;
        }
     
    },
    copyExchangeCode()
    {
        var that = this;
        if(this.isShowExchangeCode)
        {
            if (typeof wx != 'undefined') {
                wx.setClipboardData({
                    data: this.exchangeCodeLabel.string,
                    success (res) {
                      wx.getClipboardData({
                        success (res) {
                            that.showTip("已复制到粘贴�?");
                        }
                      })
                    }
                })
            }
        }
        else
        {
            that.showTip("暂未获得兑换码，无法复制",-1);
        }
    },
    initRewardProgress()
    {
        this.achievementConfigData = (this.achievementjsonData.json);
        this.bagConfigData = (this.bagjsonData.json);
        var aActiveCount = 0;
        for(var i = 0;i!=this.achievementConfigData.length;i++)
        {
            var aitem= storage_con._instance.getReward(this.achievementConfigData[i].bagId);
            if(!!aitem)
            {
                aActiveCount++;
            }
            
        }

        var aProgress = aActiveCount/this.achievementConfigData.length;
        var aProgressStr = aActiveCount.toString()+" / " + this.achievementConfigData.length;
        this.achievementProgressLabel.string = aProgressStr;
        this.homeAchievementProgressLabel.string = aProgressStr;
        this.achievementProgressBar.fillRange = aProgress;

        var bActiveCount = 0;
        for(var i = 0;i!=this.bagConfigData.length;i++)
        {
            var aitem= storage_con._instance.getReward(this.bagConfigData[i].bagId);
            if(!!aitem)
            {
                bActiveCount++;
            }
            
        }

        var bProgress = bActiveCount/this.bagConfigData.length;
        var bProgressStr = bActiveCount.toString()+" / " + this.bagConfigData.length;
        this.bagProgressLabel.string = bProgressStr;
        this.bagProgressBar.fillRange = bProgress;
    },
    showMainUserInfoPanel()
    {
        this.userMaskObj.active = true;
        this.mainUserInfoPanel.active = true;
    },
    closeMainUserInfoPanel()
    {
        this.userMaskObj.active = false;
        this.mainUserInfoPanel.active = false;
    },
    showExchangeCodePanel()
    {
        if(this.isShowExchangeCode)
        {
            var vs = storage_con._instance.getExchangeGuide();
            if(!!vs)
            {
                storage_con._instance.setExchangeGuide(2);
            }
        }
        this.exchangeCodeNewTipSpriteObj.active = false;
        this.btnExchangeCodeNewTipSpriteObj.active = false;
        this.exchangecodePanelObj.active = true;
    },
    closeExchangeCodePanel()
    {
        this.exchangecodePanelObj.active = false;
    },
    clearRecordOkBtnClick()
    {
        
    },
    updateHeadImg()
    {
        var headPath = storage_con._instance.getSelectHeadPath();
        console.log(" updateHeadImg is called " + headPath);
        if(!!headPath)
        {
            var that = this;
            cc.loader.loadRes("heads/"+headPath, cc.SpriteFrame, function(err, ret) {
                            if (err) {
                            }
                        that.mainHeadSprite.spriteFrame = ret;
                          
            }.bind(this));
        }
    },
    updateUserBaseInfo(nickname,birthday)
    {
        if(!!nickname)
        {
            this.nicknameLabel.string = nickname;
            this.topNicknameLabel.string =nickname;
            console.log("update name is " + nickname);
        }
        
        if(!!birthday)
        {
            this.birthdayLabel.string = birthday.substr(2,2) +" / " +birthday.substr(4,2)  +" / " + birthday.substr(6,2);
        }
    },
    showNicknameModifyPanel()
    {
        this.nicknameEditBox.string = global.userBaseInfo.userNickName;
        this.nicknamePanelObj.active =true;
        this.preTime = "00";
    },
    showBirthdaymodifyyPanel()
    {
        var birthday = global.userBaseInfo.birthday;
        console.log(" var birthday = global.userBaseInfo.birthday; ");
        console.log(birthday)
        this.birthdayLabel.string = birthday.substr(2,2) +" / " +birthday.substr(4,2)  +" / " + birthday.substr(6,2);

        this.dayEditBox.string = birthday.substr(6,2);
        this.mouthEditBox.string =birthday.substr(4,2);
        this.yearEditBox.string = birthday.substr(0,4);

        this.birthdayPanelObj.active = true;
        this.preTime = "00";
    },
    hideNicknameModifyPanel()
    {
        this.nicknamePanelObj.active =false;
    },
    hideBirthdaymodifyyPanel()
    {
        this.birthdayPanelObj.active = false;
    },
    updateNickName()
    {
    
        var currentTime = Date.now();
        var ccstime = currentTime - this.preTime;
        if(ccstime<this.intervalTime)
        {
            this.showTip("请勿频繁操作�?,-1);
            return;
        }
        var nickname = this.nicknameEditBox.string;
        if(!!!this.nicknameEditBox.string)
        {
            console.log("userinfoOkBtnClick  001 " );
            console.log(this.nicknameEditBox.string);
            this.showTip("昵称信息错误，请检查！",-1);
            return;
        }
        if (typeof wx != 'undefined') {

            webApi.checkContentLawful(nickname,(rb)=>{
                this.preTime = currentTime;
                if( rb=="0")
                {
                    webApi.udpateNickame(nickname,function(rb){
                        console.log(rb);
                    });

                    this.nicknameLabel.string = nickname;
                    this.topNicknameLabel.string = nickname;
                    this.nicknamePanelObj.active = false;
                    storage_con._instance.saveUserNickName(nickname);
                    global.userBaseInfo.userNickName = nickname;
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
            this.nicknameLabel.string = nickname;
            this.topNicknameLabel.string = nickname;
            this.nicknamePanelObj.active = false;
            storage_con._instance.saveUserNickName(nickname);
            global.userBaseInfo.userNickName = nickname;
        }
    },
    updateBirthday()
    {
        var year = this.yearEditBox.string;
        var mouth = this.mouthEditBox.string;
        var day = this.dayEditBox.string;
        
        var currentTime = Date.now();
        var ccstime = currentTime - this.preTime;
        if(ccstime<this.intervalTime)
        {
            this.showTip("请勿频繁操作�?,-1);
            return;
        }
        if(!!!year)
        {
            console.log("userinfoOkBtnClick  002");
            this.showTip("请填写正确年�?,-1);
            return;
        }
        else
        {
   
            if(this.isLetter(year)||year.length!=4)
            {
                console.log("userinfoOkBtnClick  003");
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

        var birthday = year +mouth+ day;
        storage_con._instance.saveBirthdayDay(birthday);
        global.userBaseInfo.birthday = birthday;
        this.birthdayLabel.string = birthday.substr(2,2) +" / " +birthday.substr(4,2)  +" / " + birthday.substr(6,2);
        
        if (typeof wx != 'undefined') {
            webApi.udpateBirthday(birthday,(rb)=>{
                this.preTime = currentTime;
                console.log(rb);
            });
        }

        this.birthdayPanelObj.active = false;
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
    },
    
    musicBgToogleClick(toggle)
    {
        var checked = toggle.isChecked;
        global.musicBgEnabled = checked;
        storage_con._instance.setEnableBgMusic(checked?1:0);
        if(!checked)
        {
            if(!!musicCon._instance)
            {
                musicCon._instance.stop();
            }
        }
        else
        {
            if(!!musicCon._instance)
            {
                musicCon._instance.recover();
            }
        }
    },
    musicEffectToogleClick(toggle)
    {
        var checked = toggle.isChecked;
        global.musicEffectEnabled = checked;
        storage_con._instance.setEnableEffectMusic(checked?1:0);
    }
});


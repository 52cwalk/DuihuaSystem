var storage_con = require("storage_con");
var global = require("globalSetting");
var webApi  = require("webApi");
var TipCon =require("TipCon") ;

cc.Class({
    extends: cc.Component,

    properties: {
       mainHeadSprite:cc.Sprite,
       userMaskObj:cc.Node,
       mainUserInfoPanel:cc.Node,
       headPanelObj:cc.Node,
       exchangecodePanelObj:cc.Node,
       settingPanelObj:cc.Node,
       createGroupPanelObj:cc.Node,

       nicknameLabel:cc.Label,
       birthdayLabel:cc.Label,

       nicknamePanelObj:cc.Node,
       birthdayPanelObj:cc.Node,

       nicknameEditBox:cc.EditBox,
       yearEditBox:cc.EditBox,
       mouthEditBox:cc.EditBox,
       dayEditBox:cc.EditBox
    },

    // onLoad () {},

    start () {

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
    // update (dt) {},
    showHeadPanel()
    {
        this.headPanelObj.active = true;s
    },
    closeHeadPanel()
    {
        this.headPanelObj.active = false;
    },
    showExchangeCodePanel()
    {
        this.exchangecodePanelObj.active = true;
    },
    closeExchangeCodePanel()
    {
        this.exchangecodePanelObj.active = false;
    },
    showSettingPanel()
    {
        this.settingPanelObj.active = true;
    },
    closeSettingPanel()
    {
        this.settingPanelObj.active = false;
    },
    showCreateGroupPanel()
    {
        this.createGroupPanelObj.active = true;
    },
    closeCreateGroupPanel()
    {
        this.createGroupPanelObj.active = false;
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
                          //  this.sprite.spriteFrame = cc.loader.getRes("img/disk", cc.SpriteFrame);
            }.bind(this));
        }
    },
    updateUserBaseInfo(nickname,birthday)
    {
        this.nicknameLabel.string = nickname;
        this.birthdayLabel.string = birthday.substr(2,2) +" / " +birthday.substr(4,2)  +" / " + birthday.substr(6,2);
    },
    showNicknameModifyPanel()
    {
        this.nicknameEditBox.string = global.userBaseInfo.userNickName;

        this.nicknamePanelObj.active =true;
    },
    showBirthdaymodifyyPanel()
    {
        var birthday = global.userBaseInfo.birthday;
        this.birthdayLabel.string = birthday.substr(2,2) +" / " +birthday.substr(4,2)  +" / " + birthday.substr(6,2);

        this.dayEditBox.string = birthday.substr(6,2);
        this.mouthEditBox.string =birthday.substr(4,2);
        this.yearEditBox.string = birthday.substr(2,2);

        this.birthdayPanelObj.active = true;
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

        var nickname = this.nicknameEditBox.string;
        if(!!!this.nicknameEditBox.string)
        {
            console.log("userinfoOkBtnClick  001 " );
            console.log(this.nicknameEditBox.string);
            this.showTip("昵称信息错误，请检查！");
            return;
        }

        storage_con._instance.saveUserNickName(nickname);
        global.userBaseInfo.userNickName = nickname;

        this.nicknameLabel.string = nickname;
        if (typeof wx != 'undefined') {
            webApi.udpateNickame(nickname,function(rb){
                console.log(rb);
            });
        }
        this.nicknamePanelObj.active = false;
    },
    updateBirthday()
    {
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

        storage_con._instance.saveBirthdayDay(birthday);
        global.userBaseInfo.birthday = birthday;

        var birthday = this.yearEditBox.string +this.mouthEditBox.string + this.dayEditBox.string;

        this.birthdayLabel.string = birthday.substr(2,2) +" / " +birthday.substr(4,2)  +" / " + birthday.substr(6,2);
        
        if (typeof wx != 'undefined') {
            webApi.udpateBirthday(birthday,function(rb){
                console.log(rb);
            });
        }
        this.birthdayPanelObj.active = false;
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

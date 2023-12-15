var dialogueBase = require("dialogueBase");
var storage_con = require("storage_con");
var dialogueSystem = require("dialogueSystem");
var TipCon = require("TipCon");
var global = require("globalSetting");
var reward_con = require("reward_con");
cc.Class({
    extends: dialogueBase,
    properties: {
        inputDialogueCon:cc.Node,
        dynamicText:cc.Label,
        questionTipObj:cc.Node,
        guideObj:cc.Node,
        guideMaskObj:cc.Node
    },
    start () {

        var that = this;
        this.inputDialogueCon.getComponent("inputDialogueCon").initEvent(function(code){
            that.receiveDialogueFunc(code);
        });
    },
    execute()
    {
        this.node.active = true;
        this.isTipClicked = false;
        this.isBirthDayQuesition = false;
        this.isBg7Quesition = false;
        if(this.isShow)
        {

        }
        else
        {
            var questionContent = this.dataConfig.questionAndInputAnswerData.questionContent;
            var answerContent = this.dataConfig.questionAndInputAnswerData.answerContent;

            var isRecoverBirthday = false;
            if(answerContent == "男主角的生日")
            {
                isRecoverBirthday = true;
                this.isBirthDayQuesition = true;
                var birthday = global.userBaseInfo.birthday;
                console.log("global.userBaseInfo.birthday is "+ global.userBaseInfo.birthday);
                birthday = birthday.substr(2);
                this.dataConfig.questionAndInputAnswerData.answerContent = birthday;
                answerContent = birthday;
            }

            if(answerContent == "B-7")
            {
                this.preTime = Date.now();
                this.isBg7Quesition = true;
                this.intervalTime = 30000;
            }

            this.inputDialogueCon.getComponent("inputDialogueCon").createInputItems(answerContent);
            if(isRecoverBirthday)
            {
                 isRecoverBirthday = false;
                 this.dataConfig.questionAndInputAnswerData.answerContent = "男主角的生日";
            }

            this.dynamicText.string = questionContent;

            this.showAction = cc.scaleTo(0.2, 1, 1);
            this.node.runAction(cc.sequence(
                this.showAction,
                cc.callFunc(this.showCompeleted.bind(this))
            ));
            this.isShow = true;
        }
    },
    showCompeleted()
    {
        
    },
    setGuideActive(v)
    {
        this.guideObj.active = v;
        this.guideMaskObj.active = v;
    },
    showTipClick()
    {
        if(this.isHasTipConfig)
        {
            this.questionTipObj.getComponent("questionTip").show();
            this.isTipClicked = true;
            this.setGuideActive(false);
            storage_con._instance.setShowTipGuide();
        }
        else
        {
            TipCon._instance.showTip("此处暂无提示");
        }
    },
    setConfig(dataConfig)
    {
        console.log("setConfig inputQuesDialogue is coming ");
        this.dataConfig = dataConfig;
        if(!!this.questionTipObj)
        {
            var tdatas = this.dataConfig.questionAndInputAnswerData.tipDatas;
            if(!!tdatas && tdatas.length>0)
            {
                this.questionTipObj.getComponent("questionTip").setTipConfig(this.dataConfig.questionAndInputAnswerData.tipDatas);
                this.isHasTipConfig = true;
            }
        }

        var isHaveTipGuide = storage_con._instance.getShowTipGuide();
        if(!!!isHaveTipGuide)
        {
           this.setGuideActive(true);
        }
    
        console.log(this.dataConfig);
    },
    close()
    {
        this.node.active = false;
        this.node.scale = cc.v2(1,0);
        this.isShow  = false;
        this.isHasTipConfig = false;
        this.isTipClicked = false;
        this.isBirthDayQuesition = false;
        this.isBg7Quesition = false;
        if(!!this.questionTipObj)
        {
            this.questionTipObj.getComponent("questionTip").close();
        }
        this.dynamicText.getComponent("dynamicText").close();
      this.setGuideActive(false);
    },
    receiveDialogueFunc(code)
    {
        if(code>0)
        {
            if(!!this.isBirthDayQuesition)
            {
                if(!this.isTipClicked)
                {
                    this.checkConfigTrailConfig();
                }
            }
            else if(!!this.isBg7Quesition)
            {
                var currentTime = Date.now();
                var ccstime = currentTime - this.preTime;
                if(ccstime<this.intervalTime)
                {
                    this.checkConfigTrailConfig();
                }
            }
            else
            {
                this.checkConfigTrailConfig();
            }

            this.close();
            dialogueSystem._instance.currentDialogueEndFunc();
        }
        else
        {
            console.log("your answer is incorrect !");
        }
    },
    checkConfigTrailConfig()
    {
        var bags = this.dataConfig.questionAndInputAnswerData.bags;
        if(!!bags&&bags.length>0)
        {
            reward_con._instance.addRewards(bags);
        }
        var conditions = this.dataConfig.questionAndInputAnswerData.extraData.conditions;
        if(!!conditions&&conditions.length>0)
        {
            var isRight = storage_con._instance.checkIsHaveRewards(conditions);
            if(isRight)
            {
                var ebags = this.dataConfig.questionAndInputAnswerData.extraData.bags;
                if(!!ebags&&ebags.length>0)
                {
                     reward_con._instance.addRewards(ebags);
                }
            }
        }
    },
    closeGuidePanel()
    {
        storage_con._instance.setShowTipGuide();
        this.setGuideActive(false);
    }
    

});


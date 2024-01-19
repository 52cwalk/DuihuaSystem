var dialogueBase = require("dialogueBase");
var storage_con = require("storage_con");
var dialogueSystem = require("dialogueSystem");
var TipCon = require("TipCon");
var global = require("globalSetting");
cc.Class({
    extends: dialogueBase,
    properties: {
        inputDialogueCon:cc.Node,
        dynamicText:cc.Label,
        questionTipObj:cc.Node
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
        if(this.isShow)//正在显示
        {

        }
        else
        {
            var questionContent = this.dataConfig.questionAndInputAnswerData.questionContent;
            var answerContent = this.dataConfig.questionAndInputAnswerData.answerContent;

            if(answerContent == "男主角的生日")
            {
                var birthday = global.userBaseInfo.birthday;
                birthday = birthday.substr(2);
                this.dataConfig.questionAndInputAnswerData.answerContent = birthday;
                answerContent = birthday;
            }

            this.inputDialogueCon.getComponent("inputDialogueCon").createInputItems(answerContent);
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
    showTipClick()
    {
        if(this.isHasTipConfig)
        {
            this.questionTipObj.getComponent("questionTip").show();
        }
        else
        {
            TipCon._instance.showTip("此处没有提示哦！");
        }
    },
    setConfig(dataConfig)
    {
        console.log("setConfig inputQuesDialogue is coming ");
        this.dataConfig = dataConfig;
        if(!!this.questionTipObj)
        {
            var tdatas = this.dataConfig.questionAndInputAnswerData.tipDatas;
            if(!!tdatas)
            {
                this.questionTipObj.getComponent("questionTip").setTipConfig(this.dataConfig.questionAndInputAnswerData.tipDatas);
                this.isHasTipConfig = true;
            }
        }
        console.log(this.dataConfig);
    },
    close()
    {
        this.node.active = false;
        this.node.scale = cc.v2(1,0);
        this.isShow  = false;
        this.isHasTipConfig = false;
        if(!!this.questionTipObj)//关闭谜题提示
        {
            this.questionTipObj.getComponent("questionTip").close();
        }
        this.dynamicText.getComponent("dynamicText").close();
    },
    receiveDialogueFunc(code)
    {
        if(code>0)
        {
            this.checkConfigTrailConfig();//检查成就获得情况
            
            this.close();//关闭当前对话框
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
            storage_con._instance.setRewards(bags,true);//批量更新本地存储数据
        }
        var conditions = this.dataConfig.questionAndInputAnswerData.extraData.conditions;
        if(!!conditions&&conditions.length>0)
        {
            var isRight = storage_con._instance.checkIsHaveRewards(conditions);//获取判断条件
            if(isRight)
            {
                var ebags = this.dataConfig.questionAndInputAnswerData.extraData.bags;
                if(!!ebags&&ebags.length>0)
                {
                    storage_con._instance.setRewards(ebags,true);//批量更新本地存储数据
                }
            }
        }
    }

});

var TipCon =require("TipCon") ;
var global = require("globalSetting");

cc.Class({
    extends: cc.Component,

    properties: {
        badgeObj:cc.Node,
        inputDialogueCon:cc.Node,
        dynamicText:cc.Label,
        questionTipObj:cc.Node
    },
    start () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.trigerClick, this);
        this.prePosition = cc.v2(this.badgeObj.x,this.badgeObj.y);
        this.isShowPreview = false;
        var that = this;
        this.inputDialogueCon.getComponent("inputDialogueCon").initEvent(function(code){
            that.receiveDialogueFunc(code);
        });
        this.isHasTipConfig = false;
        this.isActive = true;
        this.initConfig();
    },
    initConfig()
    {
       this.questionConfig = {
            "isNeedJugdeAnswer": 1,
            "questionContent": "上面好像有什么字……",
            "answerContent": "迎接",
            "tipDatas": ["APP上的警徽与实体警徽有四处不同", "仔细观察，四处不同都集中在警徽的中间骏马处", "四处不同两两组合成两个字"],
            "bags": [],
            "extraData": {
                "bags": [],
                "conditions": [],
                "isNeedExtraCondition": 0
            }
        }

        this.inputDialogueCon.getComponent("inputDialogueCon").createInputItems(this.questionConfig.answerContent);
        var tdatas = this.questionConfig.tipDatas;

        if(!!tdatas)
        {
            this.questionTipObj.getComponent("questionTip").setTipConfig(tdatas);
            this.isHasTipConfig = true;
        }

        this.dynamicText.string = this.questionConfig.questionContent;
    },
    trigerClick(e)
    {
        this.hidePreview();
    },
    receiveDialogueFunc(code)
    {
        if(code>0)
        {
            this.coporateCompelted();
        }
        else
        {
            console.log("your answer is incorrect !");
        }
    },
    nodeTap()
    {
        if(!this.isShowPreview)
        {
            this.showPreview();
        }
        else
        {
            this.hidePreview();
        }
    },
    showPreview()
    {
      //  this._moveToCenterAction = cc.moveTo(0.2, 0, 0);
        this.__showScaleAction = cc.scaleTo(0.2,2,2);

        //var seq1 = cc.sequence([this._moveToCenterAction, this.__showScaleAction]);

    //    this.badgeObj.runAction( this._moveToCenterAction);
        this.badgeObj.runAction(  this.__showScaleAction );
        this.isShowPreview = true;
    },
    hidePreview()
    {
        this._moveToCenterAction = cc.moveTo(0.2, this.prePosition.x,this.prePosition.y );
        this.__showScaleAction = cc.scaleTo(0.2,1,1);

        this.badgeObj.runAction( this._moveToCenterAction);
        this.badgeObj.runAction(  this.__showScaleAction );
        this.isShowPreview = false;
    },
    coporateCompelted()
    {
        TipCon._instance.showTip("恭喜你！已经回答完成");

        this.scheduleOnce(()=>{ 
            global.isFeatureOver = true;
            cc.director.loadScene("dialogue");
         },2);
    },
    showTipClick()
    {
        if(this.isActive )
        {
            if(this.isHasTipConfig)
            {
                this.questionTipObj.getComponent("questionTip").show();
            }
            else
            {
                TipCon._instance.showTip("此处没有提示哦！");
            }
        }
    },

});

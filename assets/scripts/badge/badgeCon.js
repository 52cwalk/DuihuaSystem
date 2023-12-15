var TipCon =require("TipCon") ;
var global = require("globalSetting");
var dialogueLoadingCon = require("dialogueLoadingCon");
cc.Class({
    extends: cc.Component,

    properties: {
        bigDadgeObj:cc.Node,
        inputDialogueCon:cc.Node,
        dynamicText:cc.Label,
        questionTipObj:cc.Node,
        successMaskObj:cc.Node
    },
    start () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.trigerClick, this);
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
       this.huizhangConfig = {
           "nodeId":"huizhang_01",
            "isNeedJugdeAnswer": 1,
        
            "questionContent": global.gFeatureGuideContent,
            "answerContent": "迎接",
           
           "tipDatas":global.gTipDatas,
            "bags": [],
            "extraData": {
                "bags": [],
                "conditions": [],
                "isNeedExtraCondition": 0
            }
        }

        this.inputDialogueCon.getComponent("inputDialogueCon").createInputItems(this.huizhangConfig.answerContent);
        var tdatas = this.huizhangConfig.tipDatas;

        if(!!tdatas&&tdatas.length>0)
        {
            this.questionTipObj.getComponent("questionTip").setTipConfig(tdatas);
            this.isHasTipConfig = true;
        }

        this.dynamicText.string = this.huizhangConfig.questionContent;
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
      
       
       this.__showFadeAction = cc.fadeIn(0.5);

        

    
        this.bigDadgeObj.runAction(  this.__showFadeAction );
        this.isShowPreview = true;
    },
    hidePreview()
    {
        
        this.__showFadeAction = cc.fadeOut(0.2);
        this.bigDadgeObj.runAction(  this.__showFadeAction );
        
        
        this.isShowPreview = false;
    },
    coporateCompelted()
    {
        TipCon._instance.showTip("恭喜你！回答正确");
        if(!!this.successMaskObj)
        {
            this.successMaskObj.active = true;
        }
        this.scheduleOnce(()=>{ 
            dialogueLoadingCon._instance.show();
            global.isFeatureOver = true;
            gotoScene("dialogue");
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
                TipCon._instance.showTip("此处暂无提示");
            }
        }
    },

});


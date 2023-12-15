var TipCon =require("TipCon") ;
var global = require("globalSetting");
var dialogueLoadingCon = require("dialogueLoadingCon");
cc.Class({
    extends: cc.Component,

    properties: {
        mazeItemParent:cc.Node,
        inputDialogueCon:cc.Node,
        dynamicText:cc.Label,
        questionTipObj:cc.Node,
        stickerPreviewObj:cc.Node,
        stickerPreviewSpriteFrames:[cc.SpriteFrame],
        successMaskObj:cc.Node
    },
    start () {

        var childs = this.mazeItemParent.children;
        console.log("childs length is " + childs.length);

        for(var i = 0;i!=childs.length;i++)
        {
            var nodeitem = childs[i];
            nodeitem.getComponent("stickerItem").initCon(this.node);
        }

        this.node.on(cc.Node.EventType.TOUCH_END, this.trigerClick, this);

        this.isShowPreview = false;
        var that = this;
        this.isActive = true;
        this.inputDialogueCon.getComponent("inputDialogueCon").initEvent(function(code){
            that.receiveDialogueFunc(code);
        });
        this.initConfig();
    },
    initConfig()
    {
       this.questionConfig ={
            "isNeedJugdeAnswer": 1,
        
            "questionContent": global.gFeatureGuideContent,
            "answerContent": "直到遇见�?,
       
            "tipDatas":global.gTipDatas,
            "bags": [],
            "extraData": {
                "bags": [],
                "conditions": [],
                "isNeedExtraCondition": 0
            }
        }

        this.inputDialogueCon.getComponent("inputDialogueCon").createInputItems(this.questionConfig.answerContent);

        var tdatas = this.questionConfig.tipDatas;

        if(!!tdatas && tdatas.length>0)
        {
            this.questionTipObj.getComponent("questionTip").setTipConfig(tdatas);
            this.isHasTipConfig = true;
        }
        this.dynamicText.string = this.questionConfig.questionContent;
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
    trigerClick(e)
    {
        if(this.isShowPreview)
        {
            this.__hideFadeAction = cc.fadeOut(0.2);
            this.stickerPreviewObj.runAction(  this.__hideFadeAction );
            this.isShowPreview = false;
        }
    },
    nodeTap(itemno,av)
    {
        if(!!this.stickerPreviewObj &&  !this.isShowPreview )
        {
            var sindex = parseInt(itemno)-1;
            this.stickerPreviewObj.getComponent(cc.Sprite).spriteFrame = this.stickerPreviewSpriteFrames[sindex];
            this.__showFadeAction = cc.fadeIn(0.3);
            this.stickerPreviewObj.runAction(  this.__showFadeAction );
            this.isShowPreview = true;
        }
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


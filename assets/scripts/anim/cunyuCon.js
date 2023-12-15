var global = require("globalSetting");
var TipCon =require("TipCon") ;
var reward_con = require("reward_con");
var dialogueLoadingCon = require("dialogueLoadingCon");
cc.Class({
    extends: cc.Component,

    properties: {
        targetAnimation:cc.Animation,
        multiSelectCon:cc.Node,
        rewardIds:[cc.String],
        successMaskObj:cc.Node
    },

    start () {

        this.isCanTouch = false;
    

        var that = this;
        cc.loader.loadRes('anims/301/zqlchunyu', cc.AnimationClip, function (err, dynamicAnimationClip) {
            
            that.targetAnimation.addClip(dynamicAnimationClip);
            that.targetAnimation.play("zqlchunyu");
        });
        var that = this;
        this.multiSelectCon.getComponent("multiSelectCon").initEvent(function(nextid){
            that.receiveDialogueFunc(nextid);
        });
        this.initConfig();
        this.firstSelectItemId=null;
    },
    initConfig()
    {
       var dConfig = [
            {
                "nodeId": "d01",
                "nextNodeId": "生日",
                "contentId": "生日",
                "isSwitchDirection": 0
            }, {
                "nodeId": "d2",
                "nextNodeId": "CD",
                "contentId": "CD",
                "isSwitchDirection": 0
            }, {
                "nodeId": "d3",
                "nextNodeId": "领带",
                "contentId": "领带",
                "isSwitchDirection": 0
            }, {
                "nodeId": "d4",
                "nextNodeId": "电话",
                "contentId": "电话",
                "isSwitchDirection": 0
            }
        ];

        this.multiSelectCon.getComponent("multiSelectCon").setSelectConfig(dConfig);
    },
    triggerClick(event)
    {
        if(this.isCanTouch)
        {

            global.isFeatureOver = true;
            gotoScene("dialogue");
        }
    },
    animEnd()
    {
        this.isCanTouch = true;
        this.targetAnimation.play("talk");
        console.log(" animEnd is called ");
    },
    
    receiveDialogueFunc(nextid)
    {
        console.log("next id is ");
        if(!!!this.firstSelectItemId)
        {
            this.firstSelectItemId = nextid;
        }
        if(nextid=="领带")
        {
            if(this.firstSelectItemId == nextid)
            {
                reward_con._instance.addRewards(this.rewardIds,true);
            }
            TipCon._instance.showTip("恭喜你答对了�?);
            if(!!this.successMaskObj)
            {
                this.successMaskObj.active = true;
            }
            this.scheduleOnce(()=>{ 
                dialogueLoadingCon._instance.show();
                global.isFeatureOver = true;
                gotoScene("dialogue");
             },2);
        }
        else
        {
            TipCon._instance.showTip("好像不对哦，再看�?);
        }
    },
    backToHome()
    {
        global.isFeatureOver = false;
        global.isFeatureMode = false;
        gotoScene("home");
    },
    showTipClick()
    {
        TipCon._instance.showTip("此处暂无提示");
    },
});


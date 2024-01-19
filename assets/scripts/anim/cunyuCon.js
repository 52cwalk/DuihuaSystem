var global = require("globalSetting");
var TipCon =require("TipCon") ;
cc.Class({
    extends: cc.Component,

    properties: {
        targetAnimation:cc.Animation,
        multiSelectCon:cc.Node
    },

    start () {

        this.isCanTouch = false;
    //    this.node.on(cc.Node.EventType.TOUCH_END, this.triggerClick, this);

        var that = this;
        cc.loader.loadRes('anims/301/zqlchunyu', cc.AnimationClip, function (err, dynamicAnimationClip) {
            // 先将动态加载的clip放入animation中
            that.targetAnimation.addClip(dynamicAnimationClip);
            that.targetAnimation.play("zqlchunyu");
        });
        var that = this;
        this.multiSelectCon.getComponent("multiSelectCon").initEvent(function(nextid){
            that.receiveDialogueFunc(nextid);
        });
        this.initConfig();
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
            cc.director.loadScene("dialogue");
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

        if(nextid=="领带")
        {
            TipCon._instance.showTip("恭喜你答对了！");
     
            this.scheduleOnce(()=>{ 
                global.isFeatureOver = true;
                cc.director.loadScene("dialogue");
             },2);
        }
        else
        {
            TipCon._instance.showTip("好像不对哦，再看看");
        }
    }
});

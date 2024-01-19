var TipCon =require("TipCon") ;
var global = require("globalSetting");

cc.Class({
    extends: cc.Component,

    properties: {
        contentLabel:cc.Label,
        questionTipObj:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    
    start () {
        this.dataConfigs = [
            {
                "title":"拖动红色",
                "itemId":"101",
            },
            {
                "title":"拖动绿色",
                "itemId":"102",
            },
            {
                "title":"拖动黄色",
                "itemId":"103",
            },
            {
                "title":"拖动蓝色",
                "itemId":"104",
            },
            {
                "title":"拖动灰色",
                "itemId":"105",
            }
        ]

        this.cIndex =0;
        this.renderContent();
        this.isActive = true;
        this.initConfig();
    },
    initConfig()
    {
       this.questionConfig ={
            "isNeedJugdeAnswer": 1,
            "questionContent": "便利贴上的数字，好像和墙上的便利贴顺序有关，白起写的是……",
            "answerContent": "直到遇见你",
            "tipDatas": ["菜单上的6组时间对应了制作布丁的6个步骤的结束时间", "从8点开始，到9点结束，每一组时间都要先定好时针的位置", "对比每一组时间时针与分针的夹角，帮助判断时间先后顺序"],
            "bags": [],
            "extraData": {
                "bags": [],
                "conditions": [],
                "isNeedExtraCondition": 0
            }
        }

        var tdatas = this.questionConfig.tipDatas;

        if(!!tdatas)
        {
            this.questionTipObj.getComponent("questionTip").setTipConfig(tdatas);
            this.isHasTipConfig = true;
        }
    },
    dragEnd(obj)
    {
        var pos =cc.v2(obj.x,obj.y) ;
        var containerRect = this.node.getBoundingBox();
        var dId = obj.getComponent("lzyItem").getItemId();
        
        if (containerRect.contains(pos)) {
            console.log("pos, yes you get it ");
            if(dId == this.dataConfigs[this.cIndex].itemId)
            {
                obj.getComponent("lzyItem").lock();
                this.cIndex = this.cIndex+1;
                if(this.cIndex>=this.dataConfigs.length)
                {
                    this.coporateCompelted();
                }
                else
                {
                    this.renderContent();//重新更新内容
                }
            }
            else
            {
                obj.getComponent("lzyItem").reBack();
                
            }
            // 点击在组件内的操作
         }else {
             if(!!obj)
             {
                 obj.getComponent("lzyItem").reBack();
             }
            console.log("no, you lose it ");
         }
    },
    renderContent()
    {
        this.contentLabel.string = this.dataConfigs[this.cIndex].title;
    },
    coporateCompelted()
    {
        TipCon._instance.showTip("恭喜你！已经回答完成");
        this.scheduleOnce(()=>{ 
            global.isFeatureOver = true;
            cc.director.loadScene("dialogue");
         },2);
    },
    backToHome()
    {
        cc.director.loadScene("home");
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

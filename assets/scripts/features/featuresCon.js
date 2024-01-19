var global = require("globalSetting");
var TipCon =require("TipCon") ;

cc.Class({
    extends: cc.Component,

    properties: {
        questionTipObj:cc.Node
    },

    start () {
        
        this.initConfig();
        this.isActive = true;
    },
    initConfig()
    {
       this.questionConfig ={
            "isNeedJugdeAnswer": 1,
            "questionContent": "便利贴上的数字，好像和墙上的便利贴顺序有关，白起写的是……",
            "answerContent": "直到遇见你",
            "tipDatas": ["房间内有三处发光的提示，都是分镜稿可能存在的地方", "以正常人的身高来看，应该只有可能放在那里", "整洁的办公桌，很有收拾的样子，看来分镜稿只可能是在。。。"],
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
    gotoScene(event,sn)
    {
        global.isFeatureOver = true;
        cc.director.loadScene(sn);
    },
    selectClick(obj,id)
    {
        console.log("id is " + id);

        if("102"==id)
        {
            TipCon._instance.showTip("恭喜你答对了！");
            this.scheduleOnce(()=>{ 
                global.isFeatureOver = true;
                cc.director.loadScene("dialogue");
             },2);
        }
        else{
            TipCon._instance.showTip("不对哦，再看看");
        }
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

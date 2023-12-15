var global = require("globalSetting");
var TipCon =require("TipCon") ;
var dialogueLoadingCon = require("dialogueLoadingCon");
cc.Class({
    extends: cc.Component,

    properties: {
        questionTipObj:cc.Node,
        successMaskObj:cc.Node
    },

    start () {
        
        this.initConfig();
        this.isActive = true;
    },
    initConfig()
    {
       this.questionConfig ={
            "isNeedJugdeAnswer": 1,
            "questionContent": "便利贴上的数字，好像和墙上的便利贴顺序有关，张三写的是…�?,
            "answerContent": "直到遇见�?,
            
            "tipDatas":global.gTipDatas,
            "bags": [],
            "extraData": {
                "bags": [],
                "conditions": [],
                "isNeedExtraCondition": 0
            }
        }

        var tdatas = this.questionConfig.tipDatas;
        
        if(!!tdatas && tdatas.length>0)
        {
            this.questionTipObj.getComponent("questionTip").setTipConfig(tdatas);
            this.isHasTipConfig = true;
        }
    },
    gotoScene(event,sn)
    {
        global.isFeatureOver = true;
        gotoScene(sn);
    },
    selectClick(obj,id)
    {
        console.log("id is " + id);

        if("102"==id)
        {
            if(!!this.successMaskObj)
            {
                this.successMaskObj.active = true;
            }
            TipCon._instance.showTip("找到�?);
            this.scheduleOnce(()=>{ 
                dialogueLoadingCon._instance.show();
                global.isFeatureOver = true;
                gotoScene("dialogue");
             },1.5);
        }
        else{
            TipCon._instance.showTip("分镜稿并不在这里�?);
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
                TipCon._instance.showTip("此处暂无提示");
            }
        }
    },
});


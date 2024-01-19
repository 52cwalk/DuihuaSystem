var TipCon =require("TipCon") ;
var global = require("globalSetting");

cc.Class({
    extends: cc.Component,

    properties: {
        mazeItemParent:cc.Node,
        inputDialogueCon:cc.Node,
        dynamicText:cc.Label,
        questionTipObj:cc.Node
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

        this.selectObj = null;

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
            "questionContent": "便利贴上的数字，好像和墙上的便利贴顺序有关，白起写的是……",
            "answerContent": "直到遇见你",
            "tipDatas": ["白起曾经写下的便签纸隐匿在不均匀的分布的7*7便签墙上", "提示的便签纸上的下坠的7寓意着从上往下数的第七行", "第七行其中只有一张便签纸上的话才可能是白起说的，把他写下来"],
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
        if(!! this.selectObj)
        {
            this.selectObj.zIndex  =0;
            this.selectObj.getComponent("stickerItem").hidePreview();
            this.selectObj = null;
        }
    },
    nodeTap(obj,av)
    {
        if(!!this.selectObj)
        {
            this.selectObj.zIndex  =0;
        }
        this.selectObj = obj;
        this.selectObj.zIndex  = 9;
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

var TipCon =require("TipCon") ;
var global = require("globalSetting");
var dialogueLoadingCon = require("dialogueLoadingCon");
cc.Class({
    extends: cc.Component,

    properties: {
        contentLabel:cc.Label,
        questionTipObj:cc.Node,
        targetContainerObjs:[cc.Node],
        selectSpriteFrames:[cc.SpriteFrame],
        successMaskObj:cc.Node
    },

    

     onLoad () {
        this.currentBindObj = null;
     },
    
    start () {
       
        this.cIndex =0;
        this.selectItemNo = 1; 
        this.isActive = true;
        this.initConfig();
        this.objectDic = Object.create(null);
        this.initApp();
    },
    getSelectSpriteFrame(selectNo)
    {
        var index = parseInt(selectNo)-1;
        if(index>=0)
        {
            return this.selectSpriteFrames[index];
        }
        return 0;
    },
    initApp()
    {
        for(var i = 0;i!=this.targetContainerObjs.length;i++)
        {
            this.targetContainerObjs[i].getComponent("lzyContainerItem").setContainerCon(this.node);
            var itemNO = (i+1).toString();
            this.objectDic[i+1] = null;
        }
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
    backToHome()
    {
        gotoScene("home");
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
   
    unSelect(no)
    {
        this.objectDic[no] = null;
    },
    okCheck()
    {
        if(this.checkResult())
        {
            this.coporateCompelted();
        }
        else
        {
            TipCon._instance.showTip("回答错误！！�?);
        }
    },
    checkResult()
    {
        for(var i = 0;i!=this.targetContainerObjs.length;i++)
        {
            var isright = this.targetContainerObjs[i].getComponent("lzyContainerItem").isCurrent();
            if(!isright)
            {
                return false ;
            }
        }
        return true;
    },
    setCurrentBindObj(obj,preSelectNo)
    {
        var preObj = this.objectDic[this.selectItemNo];
        if(!!preObj)
        {
            preObj.getComponent("lzyContainerItem").clear();
        }
        if(!!obj && preSelectNo>0)
        {
            this.objectDic[preSelectNo] = null;
        }
        this.objectDic[this.selectItemNo] = obj;
    },
    setCurrentItemNo(ino)
    {
        this.selectItemNo = ino;
    },
    getCurrentItemNo()
    {
        return this.selectItemNo;
    }
});


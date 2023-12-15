var storage_con  = require("storage_con");
var global = require("globalSetting");
cc.Class({
    extends: cc.Component,

    properties: {
        mainObj:cc.Node,
        previewSpriteObj:cc.Node,
        previewSprites:[cc.SpriteFrame],
        subBranchObj:cc.Node
    },

    start () {
        this.enableClick = false;
        this.initEle();
    },
    initEle()
    {
        
        var publicconfig = storage_con._instance.getActiveChapterConfig("1000");
        
        if(!!publicconfig && !!publicconfig["1000"]["2002"])
        {
            this.mainObj.active = true;
            this.enableClick = true;
        }
        else if(this.checkIfFinished())
        {
            this.mainObj.active = true;
            this.enableClick = true;
        }
        
        var currentActor = storage_con._instance.getCurrentActor();
        
        console.log("currentActor is called " + currentActor);
        if(!!currentActor)
        {
            var iindex = parseInt(currentActor)% 1000;
            if(iindex>0)
            {
                this.previewSpriteObj.getComponent(cc.Sprite).spriteFrame = this.previewSprites[iindex];
                this.mainObj.active = true;
                this.enableClick = true;
            }
        }
        else
        {
           if(!!publicconfig && !!publicconfig["1000"]["2002"])
           {
                this.previewSpriteObj.getComponent(cc.Sprite).spriteFrame = this.previewSprites[0];
           }
        }
    },
    itemClick()
    {
        if(this.enableClick)
        {
            console.log("enable click is called !");
            
            this.subBranchObj.getComponent("subBranchCon").show();
        }
    },
    checkIfFinished()
    {
        var finishDic= storage_con._instance.getFinishedConfig();
    
        console.log("checkIfFinished");
        console.log(finishDic);
        var isFinishAll = true;
        if(!!finishDic)
        {
            for(var akey in global.actorDic)
            {
                if(akey!="1000"&&!finishDic[akey])
                {
                    isFinishAll = false;
                    break;
                }
            }
        }
        else{
            isFinishAll = false;
        }
        
        return isFinishAll;
    },
    updateActor()
    {
        this.initEle();
    }
});


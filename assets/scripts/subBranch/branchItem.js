var storage_con  = require("storage_con");

cc.Class({
    extends: cc.Component,

    properties: {
        actorId:"1001",
        compeletedSpriteObj:cc.Node,
        makePhoneingObj:cc.Node,
        selectSpriteObj:cc.Node,
        maskObj:cc.Node
    },
    onLoad()
    {
    },
    start () {
        this.enableClick = false;
        this.initEle();
    },
    initEle()
    {
        this.enableClick = false;
        this.selectSpriteObj.active = false;
        this.makePhoneingObj.active = false;
        this.compeletedSpriteObj.active = false;
        
        
        var finishedconfig =  storage_con._instance.getFinishedConfig();
        if(!!finishedconfig)
        {
            if(!!finishedconfig[this.actorId])
            {
                this.compeletedSpriteObj.active = true;
                this.enableClick = true;
            }
        }
        
        
        var currentActor = storage_con._instance.getCurrentActor();
        if(currentActor ==this.actorId )
        {
            this.makePhoneingObj.active = true;
            this.enableClick = true;
        }
        
        
        var activeActorList = storage_con._instance.getActivetActor();
        if(!!activeActorList)
        {
            if(!!activeActorList[this.actorId])
            {
                this.enableClick =true;
            }
        }

        if(this.checkIfAllActive())
        {
            this.enableClick = true;
        }

        if(this.enableClick) 
        {
            this.maskObj.active  =false;
        }
        else{
            this.maskObj.active = true;
        }
    },
    initBranchCon(con)
    {
        this.branchConObj = con;
    },
    itemClick()
    {
        if(!!this.branchConObj && this.enableClick)
        {
            this.branchConObj.getComponent("subBranchCon").selectActorItem(this.actorId,this.node);
            this.selectSpriteObj.active = true;
        }
    },
    unSelect()
    {
        this.selectSpriteObj.active = false;
    },
    checkIfAllActive()
    {
        var activeActorList = storage_con._instance.getActivetActor();
        var finishedconfig =  storage_con._instance.getFinishedConfig();
        var isShow = true;
        if(!!finishedconfig)
        {
            if(!!activeActorList)
            {
                for(var akey in activeActorList)
                {
                    if(!!!finishedconfig[akey])
                    {
                        isShow = false;
                        break;
                    }
                }
            }
            else
            {
                isShow = false;
            }
            
        }
        else 
        {
            if(!!activeActorList)
            {
                if(Object.keys(activeActorList).length>0)
                {
                    isShow = false;
                }
            }
            else
            {
                isShow = true;
            }
            
        }
        return isShow;
    }
});


var global = require("globalSetting");
var dialogueSystem = require("dialogueSystem");
var storage_con  = require("storage_con");
cc.Class({
    extends: cc.Component,
    properties: {
        actorItemArr:[cc.Node],
        memoryActorItemPrefabObj:cc.Prefab,

        memoryContainerArr:[cc.Node],
        jsonData:cc.JsonAsset,
        detailInfoPanelObj:cc.Node,
        sumLabel:cc.Label,
        activeLabel:cc.Label,
        progressObj:cc.Sprite
    },
    onLoad()
    {
        this.activeItemDic = {};
        this.actorNewStatus={
            "1000":false,
            "1001":false,
            "1002":false,
            "1003":false,
            "1004":false
        }
    },
    start () {
        this.initConfig();
        this.initEle();

        this.currentActiveNode = null;
        if(this.actorItemArr.length>0)
        {
            this.currentActiveNode = this.actorItemArr[0];
        }

        this.currentContainerArr = null;
        if(this.memoryContainerArr.length>0) 
        {
            this.currentContainerArr = this.memoryContainerArr[0];
        }

        this.currentSelectMemoryIndex = 0;
    
    },
    initConfig()
    {
        this.configData = (this.jsonData.json);
        for(var i = 0;i!=this.configData.length;i++)
        {
            
        }
        this.sumLabel.string = this.configData.length;
    },
    addActiveItem(aid)
    {
        console.log("addActiveItem is called " + aid);
        this.activeItemDic[aid] = true;
        if(!!this.activeItemDic)
        {
            var activeno = Object.keys(this.activeItemDic).length;

            this.activeLabel.string = activeno.toString();
            this.progressObj.fillRange = activeno/this.configData.length;
        }
    },
    initEle()
    {
        for(var i=0;i!=this.actorItemArr.length;i++)
        {
            this.actorItemArr[i].getComponent("memoryActorItem").setEvent((obj,id)=>{
                this.selectMemoryActor(obj,id);
            });
        }

        for(var i = 0;i!=this.configData.length;i++)
        {
            var akey = this.configData[i].bagActor;

            var index = parseInt(akey)%1000;
            
            var memoryActorItemobj = cc.instantiate(this.memoryActorItemPrefabObj);
            memoryActorItemobj.parent = this.memoryContainerArr[index];
            memoryActorItemobj.getComponent("memoryAchieveItem").setMemoryCon(this.node);
            memoryActorItemobj.getComponent("memoryAchieveItem").initItem(this.configData[i]);
        }

        
        
        
        
        
        
        
        
    },
    selectMemoryActor(obj,id)
    {
        if(obj!= this.currentActiveNode)
        {
            this.currentActiveNode.getComponent("memoryActorItem").unSelect();
        }
        this.currentActiveNode = obj;

        var index = parseInt(id)%1000;

        if(this.currentSelectMemoryIndex !=index)
        {
           this.memoryContainerArr[this.currentSelectMemoryIndex].active = false; 
           this.currentSelectMemoryIndex = index;
        }
        this.memoryContainerArr[ this.currentSelectMemoryIndex ].active = true;

        this.unCheckNewStatus(this.memoryContainerArr[ this.currentSelectMemoryIndex ]);
        this.actorId = id;
    },
    updateActorNewStatus(actorid)
    {
        this.actorNewStatus[actorid] = true;
        var index = parseInt(actorid)%1000;
        this.actorItemArr[index].getComponent("memoryActorItem").setNewSpriteStatus(true);
    },
    unCheckNewStatus(obj)
    {
        var children=obj.children;
        for (var i = 0; i < children.length; i++)
        {
            children[i].getComponent("memoryAchieveItem").setNewStatus(false);
        }
        this.currentActiveNode.getComponent("memoryActorItem").setNewSpriteStatus(false);
    },
    checkIfSawAllBags()
    {
        for(var i = 0;i!=this.configData.length;i++)
        {
            var bagv= storage_con._instance.getReward(this.configData[i].bagId);
            if(parseInt(bagv)  == 1)
            {
                storage_con._instance.setNewAchievementReward(true);
                return ;
            }
        }
        storage_con._instance.setNewAchievementReward(false);
    },
    selectmemoryActorItem(cfg)
    {
      this.detailInfoPanelObj.getComponent("memoryDetailCon").show(cfg);  
    },
    cancelClick()
    {
        this.node.active = false;
    },
    backToHome()
    {
        this.checkIfSawAllBags();
        gotoScene("home");
    }
});


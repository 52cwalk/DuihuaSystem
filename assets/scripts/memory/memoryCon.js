var global = require("globalSetting");
var dialogueSystem = require("dialogueSystem");
var storage_con  = require("storage_con");
cc.Class({
    extends: cc.Component,
    properties: {
        actorItemArr:[cc.Node],
        memoryItemPrefabObj:cc.Prefab,

        memoryContainerArr:[cc.Node],
        jsonData:cc.JsonAsset,
        detailInfoPanelObj:cc.Node
    },
    onLoad()
    {
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
    },
    checkIfSawAllBags()
    {
        for(var i = 0;i!=this.configData.length;i++)
        {
            var bagv= storage_con._instance.getReward(this.configData[i].bagId);
            if(parseInt(bagv)  == 1)
            {
                storage_con._instance.setNewBagReward(true);
                return ;
            }
        }
        var isShowNewZhongchou = storage_con._instance.getNewZhongchouMark();
        if(!isShowNewZhongchou)
        {
            storage_con._instance.setNewBagReward(true);
            return;
        }
        storage_con._instance.setNewBagReward(false);
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
            
            var memoryitemobj = cc.instantiate(this.memoryItemPrefabObj);
            memoryitemobj.parent = this.memoryContainerArr[index];
            memoryitemobj.getComponent("memoryItem").setMemoryCon(this.node);
            memoryitemobj.getComponent("memoryItem").initItem(this.configData[i]);
        }

        var isShowNewZhongchou = storage_con._instance.getNewZhongchouMark();
        if(!isShowNewZhongchou)
        {
            this.activeActorNewStatus("1000");
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
        
        this.actorId = id;
    },
    selectMemoryItem(cfg,sf)
    {
        this.detailInfoPanelObj.getComponent("memoryDetailCon").show(cfg,sf);  
    },
    activeActorNewStatus(actorid)
    {
        this.actorNewStatus[actorid] = true;
        var index = parseInt(actorid)%1000;
        this.actorItemArr[index].getComponent("memoryActorItem").setNewSpriteStatus(true);
    },
    checkActorNewStatus(actorid)
    {
        this.actorNewStatus[actorid] = true;
        for(var i = 0;i!=this.configData.length;i++)
        {
            if(actorid == this.configData[i].bagActor)
            {
                var bagv= storage_con._instance.getReward(this.configData[i].bagId);
                if(bagv==1)
                {
                    return;
                }
            }
        }
        if(actorid == "1000")
        {
            var isShowNewZhongchou = storage_con._instance.getNewZhongchouMark();
            if(!isShowNewZhongchou)
            {
                return;
            }
        }
        this.currentActiveNode.getComponent("memoryActorItem").setNewSpriteStatus(false);
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


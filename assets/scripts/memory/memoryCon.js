var global = require("globalSetting");
var dialogueSystem = require("dialogueSystem");

cc.Class({
    extends: cc.Component,
    properties: {
        actorItemArr:[cc.Node],
        memoryItemPrefabObj:cc.Prefab,

        memoryContainerArr:[cc.Node],
        jsonData:cc.JsonAsset,
        detailInfoPanelObj:cc.Node
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
            //console.log(this.configData[i].bagId);
        }
    },
    initEle()
    {
        for(var i=0;i!=this.actorItemArr.length;i++)
        {
            this.actorItemArr[i].getComponent("memoryActorItem").setMemoryCon(this.node);
        }

        for(var i = 0;i!=this.configData.length;i++)
        {
            var akey = this.configData[i].bagActor;

            var index = parseInt(akey)%1000;
            
            var memoryitemobj = cc.instantiate(this.memoryItemPrefabObj);
            memoryitemobj.parent = this.memoryContainerArr[index];
            memoryitemobj.getComponent("memoryItem").initItem(this.configData[i]);
            memoryitemobj.getComponent("memoryItem").setMemoryCon(this.node);
        }

        // var actorDic = {
        //     "1000":"公共",
        //     "1001":"周棋洛",
        //     "1002":"李泽言",
        //     "1003":"白起",
        //     "1004":"许墨"
        // }
        
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
    selectMemoryItem(cfg)
    {
      this.detailInfoPanelObj.getComponent("memoryDetailCon").show(cfg);  
    },
    cancelClick()
    {
        this.node.active = false;
    },
    backToHome()
    {
        if( global.isFromDialogueToMemory )
        {
            global.isRecoverLastNode= true;
            global.isFromDialogueToMemory = false;
            cc.director.loadScene("dialogue");
        }
        else
        {
            cc.director.loadScene("home");
        }
        
    }
});

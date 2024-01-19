var storage_con = require("storage_con");

cc.Class({
    extends: cc.Component,

    properties: {
        actorItemArr:[cc.Node],
        jsonData:cc.JsonAsset,
        headContainerArr:[cc.Node],
        headItemPrefab:cc.Prefab,
        previewHeadSprite:cc.Sprite,
        userInfoPanelObj:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.currentActiveNode = null;
        this.currentActiveNode = this.actorItemArr[0];
        this.currentSelectContainerIndex = 0;
     },

    start () {
        this.configData = (this.jsonData.json);

        this.initEle();
    },
    initEle()
    {
        for(var i=0;i!=this.actorItemArr.length;i++)
        {
            this.actorItemArr[i].getComponent("actorHeadItem").initItem((obj,actorid)=>{
                this.selectArchiveActor(obj,actorid);
            });
        }

        // var actorDic = {
        //     "1000":"公共",
        //     "1001":"周棋洛",
        //     "1002":"李泽言",
        //     "1003":"白起",
        //     "1004":"许墨"
        // }

        for (var akey in this.configData) {
            var index = parseInt(akey)%1000;
            
            for(var i = 0;i!=this.configData[akey].length;i++)
            {
                console.log( "path is " + this.configData[akey][i]);

                var headitemobj = cc.instantiate(this.headItemPrefab);
                headitemobj.parent = this.headContainerArr[index];
                headitemobj.getComponent("headItem").initItem(this.configData[akey][i],(pt)=>{
                    this.headitemClick(pt);
                });

                var headitemobj2 = cc.instantiate(this.headItemPrefab);
                headitemobj2.parent = this.headContainerArr[0];
                headitemobj2.getComponent("headItem").initItem(this.configData[akey][i],(pt,spt)=>{
                    this.headitemClick(pt);
                });
            }
        }
    },
    headitemClick(pt)
    {
        console.log("headitemClick is click " + pt);
        this.selectHeadPath = pt;
        var that = this;
        cc.loader.loadRes("heads/"+this.selectHeadPath, cc.SpriteFrame, function(err, ret) {
                        if (err) {

                        }
                    that.previewHeadSprite.spriteFrame = ret;
                      //  this.sprite.spriteFrame = cc.loader.getRes("img/disk", cc.SpriteFrame);
        }.bind(this));
    },
    selectArchiveActor(obj,id)
    {
        if(obj!= this.currentActiveNode && !!this.currentActiveNode)
        {
            this.currentActiveNode.getComponent("actorHeadItem").unSelect();
        }
        this.currentActiveNode = obj;
        var index = parseInt(id)%1000;
        this.currentSelectActorIndex = index;
        this.actorId = id;

        //console.log("");
        if(this.currentSelectContainerIndex !=index)
        {
           this.headContainerArr[this.currentSelectContainerIndex].active = false; 
           this.currentSelectContainerIndex = index;
        }
        this.headContainerArr[this.currentSelectContainerIndex].active = true;
    },
    okClick()
    {
        if(!!this.selectHeadPath)
        {
            storage_con._instance.saveSelectHeadPath(this.selectHeadPath);
            this.userInfoPanelObj.getComponent("userInfoPanelCon").updateHeadImg();
            this.userInfoPanelObj.getComponent("userInfoPanelCon").closeHeadPanel();
        }
    }

    // update (dt) {},
});

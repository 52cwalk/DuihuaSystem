var storage_con  = require("storage_con");
cc.Class({
    extends: cc.Component,

    properties: {
        titleLabel:cc.Label,
        headsprite:cc.Sprite,
        lockItemObj:cc.Node,
        newSpriteObj:cc.Node,
        mode:0
    },
    onLoad()
    {
    },
    start () {
    },
    setMemoryCon(con)
    {
        this.memoryCon = con;
    },
    initItem(cfg)
    {
        this.dataconfig = cfg;
        this.titleLabel.string = this.dataconfig.bagTitle;
        var pathPre = "";
        if(this.mode==0)
        {
            pathPre = "achievement/";
        }
        else
        {
            pathPre = "memory/";
        }
        
        var that = this;
        cc.loader.loadRes(pathPre+this.dataconfig.bagThumb, cc.SpriteFrame, function(err, ret) {
                        if (err) {
                        }
                        else
                        {
                            that.headsprite.spriteFrame = ret;
                        }

                      
        }.bind(this));

        var bagv= storage_con._instance.getReward(this.dataconfig.bagId);
        if(!!bagv)
        {
            this.isActive = true;
            if(bagv == 1)
            {
                this.newSpriteObj.active = true;
                this.memoryCon.getComponent("memoryCon").activeActorNewStatus(this.dataconfig.bagActor);
            }
            this.lockItemObj.active = false;
        }
        else{
            this.lockItemObj.active = true;
            this.isActive = false;
        }
    },
    itemClick()
    {   
        if(this.isActive)
        {
            storage_con._instance.setReward(this.dataconfig.bagId,2);
            this.memoryCon.getComponent("memoryCon").selectMemoryItem(this.dataconfig,this.headsprite.spriteFrame);
            this.memoryCon.getComponent("memoryCon").checkActorNewStatus(this.dataconfig.bagActor);
            this.newSpriteObj.active = false;
        }
    }
});


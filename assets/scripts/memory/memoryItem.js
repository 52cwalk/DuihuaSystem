var storage_con  = require("storage_con");

cc.Class({
    extends: cc.Component,

    properties: {
        titleLabel:cc.Label,
        headsprite:cc.Sprite,
        lockItemObj:cc.Node,
        mode:0
    },
    onLoad()
    {
        this.isActive = false;
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
                    that.headsprite.spriteFrame = ret;
                      //  this.sprite.spriteFrame = cc.loader.getRes("img/disk", cc.SpriteFrame);
        }.bind(this));

        var bagitem= storage_con._instance.getReward(this.dataconfig.bagId);
        if(!!bagitem)
        {
            this.isActive = true;
        }
        else{
            this.lockItemObj.active = true;
        }
    },
    itemClick()
    {
        if(this.isActive)
        {
            this.memoryCon.getComponent("memoryCon").selectMemoryItem(this.dataconfig);
        }
    }
});

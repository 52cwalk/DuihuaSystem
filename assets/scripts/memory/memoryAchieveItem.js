var storage_con  = require("storage_con");
cc.Class({
    extends: cc.Component,

    properties: {
        titleLabel:cc.Label,
        contentLabel:cc.Label,
        headsprite:cc.Sprite,
        lockItemObj:cc.Node,
        spriteFrames:[cc.SpriteFrame],
        newSpriteObj:cc.Node
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
        this.contentLabel.string = this.dataconfig.bagContent;
        
        var akey = this.dataconfig.bagActor;
        var index = parseInt(akey)%1000;
        this.headsprite.spriteFrame = this.spriteFrames[index];

        var bagv= storage_con._instance.getReward(this.dataconfig.bagId);
        if(!!bagv)
        {
            this.isActive = true;
            this.memoryCon.getComponent("memoryAchieveCon").addActiveItem(this.dataconfig.bagId);
            if(bagv == 1)
            {
                this.newSpriteObj.active = true;
                this.memoryCon.getComponent("memoryAchieveCon").updateActorNewStatus(this.dataconfig.bagActor);
            }
            this.lockItemObj.active = false;
        }
        else{
            this.lockItemObj.active = true;
            this.isActive = false;
        }
    },
    setNewStatus(v)
    {
        var bagv= storage_con._instance.getReward(this.dataconfig.bagId);
        if(!!bagv && bagv == 1)
        {
            storage_con._instance.setReward(this.dataconfig.bagId,2);
        }
        this.newSpriteObj.active = v;
    },
    itemClick()
    {
        if(this.isActive)
        {
            this.memoryCon.getComponent("memoryAchieveCon").selectMemoryItem(this.dataconfig);
        }
    }
});


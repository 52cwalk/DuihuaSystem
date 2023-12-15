var storage_con  = require("storage_con");

cc.Class({
    extends: cc.Component,

    properties: {
        mainObj:cc.Node,
        titleLabel:cc.Label,
        lockobj:cc.Node,
        chapterId:"3001",
        
    },
    onLoad()
    {
        this.isActive = false;
        this.mainObj.scale = cc.v2(0,0);
    },
    start () {
        var progressCon = cc.find("Canvas");
        if(!!progressCon)
        {
            progressCon.getComponent("progressCon").addChapterItem(this.chapterId,this.node);
        }
    },
    setProgressCon(con)
    {
        console.log("setProgressCon is called ");
        this.progressCon = con;
    },
    initItem(chapterId,title)
    {
   
        this.chapterId = chapterId;
        this.titleLabel.string = title;
    },
    setActor(actorid)
    {
        this.actorid = actorid;
        var actorConfig = storage_con._instance.getActiveChapterConfig(actorid);
        if(!!!actorConfig)
        {
            return;
        }
        actorConfig = actorConfig[actorid];
        if(!!actorConfig)
        {
            if(!!actorConfig[this.chapterId])
            {
                this.setActiveItem(true);
            }
            else
            {
                this.setActiveItem(false);
            }
        }
        else
        {
            this.setActiveItem(false);
        }
        console.log("setActor is called " + actorid);
    },
    setActiveItem(v)
    {
        this.lockobj.active = !v;
        this.isActive = v;
        this.mainObj.active = v;
        if(v)
        {
            this.mainObj.scale = cc.v2(1,1);
        }
        else
        {
            this.mainObj.scale = cc.v2(0,0);
        }
    },
    showNewTag()
    {
        this.mainObj.scale = cc.v2(1,1);
        return;
        this.mainObj.scale = cc.v2(0,0);
        var __showScaleAction = cc.scaleTo(0.2,1,1);
        this.mainObj.runAction(  __showScaleAction );
    },
    itemClick()
    {
        if(this.isActive) 
        {
            this.progressCon.getComponent("progressCon").selectProgressChapter(this.chapterId);
        }
    }
});


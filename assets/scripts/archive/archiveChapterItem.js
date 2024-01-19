
cc.Class({
    extends: cc.Component,

    properties: {
        titleLabel:cc.Label,
        topTitleSpriteFrames:[cc.SpriteFrame],
        topTitleBgSpriteObj:cc.Sprite
    },
    start () {
    },
    setArchiveCon(con)
    {
        this.archiveCon = con;
    },
    initItem(aid,cid,title)
    {
        this.chapterId = cid;
        this.actorid = aid;
        var sindex = parseInt(this.actorid)%1000;
     //   this.topTitleBgSpriteObj.spriteFrame =this.topTitleSpriteFrames[sindex];
        this.titleLabel.string = title;
    },
    itemClick()
    {
        this.archiveCon.getComponent("archiveCon").selectArchiveChapter(this.chapterId);
    }
});

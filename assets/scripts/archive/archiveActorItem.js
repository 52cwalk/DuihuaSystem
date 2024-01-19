
cc.Class({
    extends: cc.Component,
    properties: {
        actorId:cc.String,
        titleLabel:cc.Label,
        selectSpirteObj:cc.Node
    },
    start () {

    },
    setArchiveCon(con)
    {
        this.archiveCon = con;
    },
    initItem(id,title)
    {
        this.actorId = id;
        this.titleLabel.string = title;
    },
    itemClick()
    {
        this.archiveCon.getComponent("archiveCon").selectArchiveActor(this.node,this.actorId);
        this.selectSpirteObj.active = true;
    },
    unSelect()
    {
        this.selectSpirteObj.active = false;
    }
});

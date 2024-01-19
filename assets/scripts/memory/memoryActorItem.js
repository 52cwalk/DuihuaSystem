
cc.Class({
    extends: cc.Component,
    properties: {
        actorId:cc.String,
        titleLabel:cc.Label,
        selectSpirteObj:cc.Node
    },
    start () {

    },
    setMemoryCon(con)
    {
        this.memoryCon = con;
    },
    initItem(id,title)
    {
        this.actorId = id;
        this.titleLabel.string = title;
    },
    itemClick()
    {
        this.memoryCon.getComponent("memoryCon").selectMemoryActor(this.node,this.actorId);
        this.selectSpirteObj.active = true;
    },
    unSelect()
    {
        this.selectSpirteObj.active = false;
    }
});

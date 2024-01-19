
cc.Class({
    extends: cc.Component,
    properties: {
        actorId:cc.String,
        selectSpirteObj:cc.Node
    },
    start () {

    },
    initItem(cb)
    {
        this.cb = cb;
    },
    itemClick()
    {
        this.cb(this.node,this.actorId);
        this.selectSpirteObj.active = true;
    },
    unSelect()
    {
        this.selectSpirteObj.active = false;
    }
});

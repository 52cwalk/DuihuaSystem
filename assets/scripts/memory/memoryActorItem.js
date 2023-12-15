
cc.Class({
    extends: cc.Component,
    properties: {
        actorId:cc.String,
        titleLabel:cc.Label,
        selectSpirteObj:cc.Node,
        newSpriteObj:cc.Node
    },
    start () {

    },
    setEvent(callback)
    {
        if(callback)
        {
            this.callback =callback;
        }
    },
    initItem(id,title,callback)
    {
        this.actorId = id;
        this.titleLabel.string = title;
        if(callback)
        {
            this.callback =callback;
        }
    },
    itemClick()
    {
        this.selectSpirteObj.active = true;
        if(this.callback)
        {
            this.callback(this.node,this.actorId);
        }
    },
    unSelect()
    {
        this.selectSpirteObj.active = false;
    },
    setNewSpriteStatus(v)
    {
        this.newSpriteObj.active = v;
    }

});


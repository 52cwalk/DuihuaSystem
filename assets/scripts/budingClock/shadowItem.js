
cc.Class({
    extends: cc.Component,

    properties: {
        itemNo:"101"
    },
    start () {
        this.originPos = cc.v2(this.node.x,this.node.y);
    },
    bindTarget()
    {
        
    },
    reset()
    {
        this.node.setPosition(this.originPos);
        this.node.active = false;
    }
    
});


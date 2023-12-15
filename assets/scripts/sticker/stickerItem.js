
cc.Class({
    extends: cc.Component,

    properties: {
        itemNo:1
    },

    start () {
        this.isShowPreview = false;
        this.node.zIndex = 0;
        this.prePosition = cc.v2(this.node.x,this.node.y);
    },
    initCon(obj)
    {
        this.stickConObj = obj;
    },
    nodeTap()
    {
        if(this.stickConObj )
        {
            this.stickConObj.getComponent("stickerCon").nodeTap(this.itemNo,true);
        }
    },
    showPreview()
    {
        this._moveToCenterAction = cc.moveTo(0.2, 0, 174.918);
        this.__showScaleAction = cc.scaleTo(0.2,5,5);

        

        this.node.runAction( this._moveToCenterAction);
        this.node.runAction(  this.__showScaleAction );
        this.isShowPreview = true;
    },
    hidePreview()
    {
        this._moveToCenterAction = cc.moveTo(0.2, this.prePosition.x,this.prePosition.y );
        this.__showScaleAction = cc.scaleTo(0.2,0.7,0.7);

        this.node.runAction( this._moveToCenterAction);
        this.node.runAction(  this.__showScaleAction );
        this.isShowPreview = false;
    }
});


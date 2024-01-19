
cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    start () {
        this.isShowPreview = false;
        this.prePosition = cc.v2(this.node.x,this.node.y);
    },
    initCon(obj)
    {
        this.stickConObj = obj;
    },
    nodeTap()
    {
        if(!this.isShowPreview)
        {
            if(this.stickConObj )
            {
                this.stickConObj.getComponent("stickerCon").nodeTap(this.node,true);
            }

            this.showPreview();
        }
        else
        {
            this.hidePreview();
        }
    },
    showPreview()
    {
        this._moveToCenterAction = cc.moveTo(0.2, 0, 0);
        this.__showScaleAction = cc.scaleTo(0.2,3,3);

        //var seq1 = cc.sequence([this._moveToCenterAction, this.__showScaleAction]);

        this.node.runAction( this._moveToCenterAction);
        this.node.runAction(  this.__showScaleAction );
        this.isShowPreview = true;


    },
    hidePreview()
    {
        this._moveToCenterAction = cc.moveTo(0.2, this.prePosition.x,this.prePosition.y );
        this.__showScaleAction = cc.scaleTo(0.2,1,1);

        this.node.runAction( this._moveToCenterAction);
        this.node.runAction(  this.__showScaleAction );
        this.isShowPreview = false;
    }


});

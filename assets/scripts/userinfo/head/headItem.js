
cc.Class({
    extends: cc.Component,
    properties: {
        headsprite:cc.Sprite
    },
    start () {

    },
    initItem(pt,cb)
    {
        this.path = pt;
        this.cb = cb;

        var that = this;
        cc.loader.loadRes("heads/"+this.path, cc.SpriteFrame, function(err, ret) {
                        if (err) {

                        }
                    that.headsprite.spriteFrame = ret;
                      //  this.sprite.spriteFrame = cc.loader.getRes("img/disk", cc.SpriteFrame);
        }.bind(this));

    },
    itemClick()
    {
        this.cb(this.path )
    }
    
});

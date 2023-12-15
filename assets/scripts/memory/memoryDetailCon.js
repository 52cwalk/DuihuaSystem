
cc.Class({
    extends: cc.Component,

    properties: {
        mainObj:cc.Node,
        maskObj:cc.Node,
        titleLabel:cc.Label,
        contentLabel:cc.Label,
        previewSprite:cc.Sprite
    },

    

    

    start () {

    },
    show(cfg,sf)
    {
        this.maskObj.active = true;
        this.mainObj.active = true;
        this.contentLabel.string = cfg.bagContent;
        this.titleLabel.string = cfg.bagTitle;
        this.previewSprite.spriteFrame = sf;
    },
    close()
    {
        this.mainObj.active = false;
        this.maskObj.active = false;
    }
    
    
});


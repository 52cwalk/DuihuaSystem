
cc.Class({
    extends: cc.Component,

    properties: {
        mainObj:cc.Node,
        maskObj:cc.Node,
        titleLabel:cc.Label,
        contentLabel:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    show(cfg)
    {
        this.maskObj.active = true;
        this.mainObj.active = true;
        this.contentLabel.string = cfg.bagContent;
        this.titleLabel.string = cfg.bagTitle;
    },
    close()
    {
        this.mainObj.active = false;
        this.maskObj.active = false;
    }
    
    // update (dt) {},
});

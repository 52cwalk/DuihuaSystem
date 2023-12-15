
cc.Class({
    extends: cc.Component,

    properties: {
        titleLabel:cc.Label
    },

    start () {

    },
    setTitle(str)
    {
        this.titleLabel.string = str;
    }
});


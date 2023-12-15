
cc.Class({
    extends: cc.Component,

    properties: {
        chapterId:cc.String
    },
    start () {
        var progressCon = cc.find("Canvas");
        if(!!progressCon)
        {
            progressCon.getComponent("progressCon").addPosItem(this.chapterId,this.node);
        }
    }
});


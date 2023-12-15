
var dialogueLoadingCon = cc.Class({
    extends: cc.Component,

    properties: {
        mainObj:cc.Node,
        loadIngSpriteObj1:cc.Node,
        loadIngSpriteObj2:cc.Node,
        loadIngSpriteObj3:cc.Node,
        isShow:false
    },
    onLoad()
    {
        dialogueLoadingCon._instance = this;
    },
    update(dt)
    {
        if(this.isShow)
        {
            this.loadIngSpriteObj1.angle = this.loadIngSpriteObj1.angle-2;
            this.loadIngSpriteObj2.angle = this.loadIngSpriteObj2.angle+2;
            this.loadIngSpriteObj3.angle = this.loadIngSpriteObj3.angle-2;
        }
    },
    start () {

    },
    show()
    {
        this.isShow = true;
        this.mainObj.active = true;
    },
    hide()
    {
        this.isShow = false;
        this.mainObj.active = false;
    }

    
});
module.exports = dialogueLoadingCon;


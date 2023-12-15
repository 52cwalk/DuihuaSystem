var storage_con  = require("storage_con");
cc.Class({
    extends: cc.Component,

    properties: {
        selectSpriteObj:cc.Node,
        actorId:{
            type:cc.String,
            default:"1001"
        }
    },
    onLoad()
    {
    },
    start () {
    },
    setZhongchouCon(con)
    {
        this.zhongchouCon = con;
    },
    itemClick()
    {   
        this.zhongchouCon.getComponent("zhongchouCon").selectActor(this.actorId,this.node);
        this.selectSpriteObj.active = true;
    },
    clear()
    {
        this.selectSpriteObj.active = false;
    }
});


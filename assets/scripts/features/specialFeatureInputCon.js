var global = require("globalSetting");

cc.Class({
    extends: cc.Component,

    properties: {
        stickerObj:cc.Node,
        badgeObj:cc.Node
    },
    start () {
        
        console.log("  global.specailInputId  is " +  global.specailInputId );
        if( global.specailInputId =="直到遇见�?)
        {
            this.stickerObj.active = true;
        }
        else if( global.specailInputId =="迎接")
        {
            this.badgeObj.active = true;
        }
    }
});


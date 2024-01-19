var global = require("globalSetting");

cc.Class({
    extends: cc.Component,

    properties: {
        actorPhoneObj:cc.Node,
        receivePhoneObj:cc.Node
    },
    start () {
        if( global.specailInputId =="男主来电")
        {
            this.actorPhoneObj.active = true;
        }
        else if( global.specailInputId =="QTE")
        {
            this.receivePhoneObj.active = true;
        }
    }
});

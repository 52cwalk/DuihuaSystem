
var global = require("globalSetting");
cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    start () {
        
    },
    backToHome()
    {
        global.isFeatureOver = false;
        global.isFeatureMode = false;
        gotoScene("home");
    }
});


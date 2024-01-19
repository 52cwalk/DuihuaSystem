var global = require("globalSetting");
var config_data = require("config_data");
var dialogueSystem = require("dialogueSystem");
cc.Class({
    extends: cc.Component,

    properties: {
        autoPlayingSpriteObj:cc.Node
    },
    start () {

    },
    backToHome()
    {
        // global.selectActorId = 1000;
        // global.selectChapterId = 2001;
        config_data._instance.saveLastestConfig();
        cc.director.loadScene("home");
    },
    autoPlayClick()
    {
        this.autoPlayingSpriteObj.active = true;
        dialogueSystem._instance.autoPlay();
    },
    stopAutoPlay()
    {
        this.autoPlayingSpriteObj.active = false;
    },
    updateAutoPlayUI(v)
    {
        this.autoPlayingSpriteObj.active = v;
    },
    gotoMemory()
    {
        config_data._instance.saveLastestConfig();
        global.isFromDialogueToMemory=true;
        cc.director.loadScene("memory_bag");
    }

    // update (dt) {},
});

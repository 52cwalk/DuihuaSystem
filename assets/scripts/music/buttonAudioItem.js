

var global = require("globalSetting");
cc.Class({
    extends: cc.Component,

    properties: {
        clickClip:{
            type: cc.AudioClip, 
            default: null     
          }
    },
    onLoad: function () {
       
    },
    

    

    start () {
        cc.audioEngine.setEffectsVolume(global.musicEffectVolume);
        
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            if (this.clickClip) {
                if(global.musicEffectEnabled)
                {
                    cc.audioEngine.playEffect(this.clickClip,false);
                }
            } else {
                
            }
            return true;
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function () {

        }, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {

        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function () {
        }, this);
    },

    
});


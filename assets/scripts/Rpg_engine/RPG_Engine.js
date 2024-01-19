
var RPG_Engine = cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    statics:{
        _instance:null
    },
    onLoad()
    {
        RPG_Engine._instance = this;
    },
    start () {
        
    }
    // update (dt) {},
});

module.exports = RPG_Engine


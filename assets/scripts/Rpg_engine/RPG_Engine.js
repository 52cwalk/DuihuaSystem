
var RPG_Engine = cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    

    statics:{
        _instance:null
    },
    onLoad()
    {
        RPG_Engine._instance = this;
    },
    start () {
        
    }
    
});

module.exports = RPG_Engine



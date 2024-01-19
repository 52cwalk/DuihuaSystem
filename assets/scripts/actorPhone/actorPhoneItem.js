
cc.Class({
    extends: cc.Component,

    properties: {
      actorid:cc.String,
      selectSpriteObj:cc.Node,
      actorPhoneConObj:cc.Node
    },
    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    itemClick()
    {
       this.actorPhoneConObj.getComponent("actorPhoneCon").selectActor(this.actorid,this.node);
       this.selectSpriteObj.active = true;
    },
    unSelect()
    {
        this.selectSpriteObj.active = false;
    }

    // update (dt) {},
});

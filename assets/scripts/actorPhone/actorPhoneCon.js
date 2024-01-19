var global = require("globalSetting");

cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    start () {
        this.selectActorObj = null;
        this.selectActorId = null;
    },
    selectActor(aid,obj)
    {
        this.selectActorId = aid;
        if(this.selectActorObj != obj && this.selectActorObj != null)
        {
            this.selectActorObj.getComponent("actorPhoneItem").unSelect();
        }
        this.selectActorObj = obj;
    },
    okClick()
    {
        console.log("ok btn clicked " + this.selectActorId) ;
   
        if(!!!this.selectActorId )
        {
            return;
        }

        var aid = this.selectActorId;
        
        global.selectPhoneActorId = aid;
        global.isFeatureOver = true;
        if(global.getFinishActorCount()==1)
        {
            if(!!!global.finishActorList[aid])
            {
                global.isEmitQTE = true;
                console.log("  global.isEmitQTE is "+   global.isEmitQTE);
           //     global.addFinishActor(aid);//加入激活的角色场景
            }
        }

        cc.director.loadScene("dialogue");
    }
});

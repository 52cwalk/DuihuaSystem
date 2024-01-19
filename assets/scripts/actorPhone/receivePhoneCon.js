
var global = require("globalSetting");
var storage_con = require("storage_con");

cc.Class({
    extends: cc.Component,
    properties: {
    },
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    start () {
        this.intervalTime = 0;
        this.timer = 5;
        this._isCompleted = false;
        this.conditionKey="QET成功";
    },
    update(dt)
    {
        if(this._isCompleted)
        {
            return;
        }
        this.intervalTime += dt;
        if(this.intervalTime>= this.timer)
        {
            this.intervalTime=0;
            //这个地方将撰写没有接听电话的 全局标记设置为false（需要本地保存），在其他场景进行判断
            console.log("yse， we can not do it !");
            this._isCompleted = true;

            global.isFeatureOver = true;
            cc.director.loadScene("dialogue");
            
        }
    },
    dragEnd(obj)
    {
        var pos =cc.v2(obj.x,obj.y) ;
        var containerRect = this.node.getBoundingBox();
        
        if (containerRect.contains(pos)) {
            this.coporateCompelted();
         }
         else {
             if(!!obj)
             {
                 obj.getComponent("touchDotPhoneItem").reBack();
             }
            console.log("no, you lose it ");
         }
    },
    coporateCompelted()
    {
         //这个地方将撰写没有接听电话的 全局标记设置为true（需要本地保存），在其他场景进行判断
         console.log("yse， we have completed!");
         storage_con._instance.setReward( this.conditionKey,"true");
         global.isFeatureOver = true;
         cc.director.loadScene("dialogue");
    }
});

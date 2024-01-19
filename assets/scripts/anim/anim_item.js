
cc.Class({
    extends: cc.Component,

    properties: {
        bodyObj:cc.Node,
        eyeObj:cc.Node,
        mouthObj:cc.Node,
        poseObj:cc.Node,
        shipingObj:cc.Node
    },
    onLoad()
    {
        this.bodyId = "";
        this.eyeId = "";
        this.mouthId = "";
        this.poseId = "";
        this.shipingId = "";
    },
    start () {
        
        this.node.opacity = 0;

        /*
        this.scheduleOnce(()=>{ 
            var moveTo = cc.fadeIn(0.1);
            this.node.runAction(moveTo);
         },2);

         this.scheduleOnce(()=>{ 
            var moveTo = cc.fadeOut(0.05);
            this.node.runAction(moveTo);
         },5);
        */
    },
    initPreAnim()
    {
        this.animName="";
        var animation = this.getComponent(cc.Animation)
        // animation.play('name-of-animationClip') // 直接播放动画
        // 动态加载动画
        var that = this;
        cc.loader.loadRes('anims/20/'+this.animName, cc.AnimationClip, function (err, dynamicAnimationClip) {
            // 先将动态加载的clip放入animation中
            animation.addClip(dynamicAnimationClip);
            animation.play(that.animName);
        })
    },
    //(this.bodyId,this.eyeId,this.mouthId,this.poseId,this.shipingId)
    loadItem(bodydata,eyedata,mouthdata,posedata,shipingdata)
    {
        this.overCount = 0;
        this.overSumCount = 5;

        this.loadSprite(this.bodyObj,this.bodyId,bodydata,()=>{this.checkIsLoadOver()});
        this.loadSprite(this.eyeObj,this.eyeId ,eyedata,()=>{this.checkIsLoadOver()});
        this.loadSprite(this.mouthObj,this.mouthId ,mouthdata,()=>{this.checkIsLoadOver()});
        this.loadSprite(this.poseObj,this.poseId ,posedata,()=>{this.checkIsLoadOver()});
        this.loadSprite(this.shipingObj,this.shipingId ,shipingdata,()=>{this.checkIsLoadOver()});
    },
    close()
    {
        this.bodyObj.getComponent(cc.Sprite).spriteFrame = null;
        this.eyeObj.getComponent(cc.Sprite).spriteFrame = null;
        this.mouthObj.getComponent(cc.Sprite).spriteFrame = null;
        this.poseObj.getComponent(cc.Sprite).spriteFrame = null;
        this.shipingObj.getComponent(cc.Sprite).spriteFrame = null;

        this.bodyId = "";
        this.eyeId = "";
        this.mouthId = "";
        this.poseId = "";
        this.shipingId = "";

        this.node.opacity = 0;
    },
    checkIsLoadOver()
    {
        this.overCount ++;
        if(this.overCount>=this.overSumCount)
        {
            this.overCount =0;
            this.overSumCount = 0;

            if( 0 == this.node.opacity )
            {
                this.scheduleOnce(()=>{ 
                    var fadeTo = cc.fadeIn(0.15);
                    this.node.runAction(fadeTo);
                 },0.5);
            }
            
        }
    },
    loadSprite(targetObj,tid,data,func)
    {
        if(!!!data)
        {
            targetObj.getComponent(cc.Sprite).spriteFrame = null;
            tid = "";
            func();
            return;
        }
        
        if(tid == data.sliceid)
        {
            func();
            return;
        }
        
        cc.loader.loadRes("anims/"+data.url+data.sliceid, cc.SpriteFrame, function(err, ret) {
            if (err) {
            }

            tid = data.sliceid;

            targetObj.getComponent(cc.Sprite).spriteFrame = ret;
            targetObj.setPosition(cc.v2(data.posx,data.posy));
            if(!!func)
            {
                func()
            }

          //  this.sprite.spriteFrame = cc.loader.getRes("img/disk", cc.SpriteFrame);
        }.bind(this));
    },
    initAnimData(data)
    {
        /*
        var eyeData ={
            pos:{
                x:0,
                y:0
            },
            id:"is"
        }
        */

        var that = this;

        var eyeData = data.eyeData;
        if(!!eyeData)
        {
         
            cc.loader.loadRes("anims/400/"+eyeData.id, cc.SpriteFrame, function(err, ret) {
                            if (err) {

                            }
                            that.eyeObj.getComponent(cc.Sprite).spriteFrame = ret;
                            that.eyeObj.setPosition(cc.v2(eyeData.pos.x,eyeData.pos.y));
                          //  this.sprite.spriteFrame = cc.loader.getRes("img/disk", cc.SpriteFrame);
                        }.bind(this));
        }

        /*
        var bodyData ={
            pos:{
                x:0,
                y:0
            },
            id:"is"
        }
        */

        var bodyData = data.bodyData;
        if(!!bodyData)
        {
            cc.loader.loadRes("anims/400/"+bodyData.id, cc.SpriteFrame, function(err, ret) {
                if (err) {
        
                }
                that.bodyObj.getComponent(cc.Sprite).spriteFrame = ret;
                that.bodyObj.setPosition(cc.v2(bodyData.pos.x,bodyData.pos.y));
              //  this.sprite.spriteFrame = cc.loader.getRes("img/disk", cc.SpriteFrame);
            }.bind(this));
        }
   
      
        var mouthData = data.mouthData;
        if(!!mouthData)
        {
          
            cc.loader.loadRes("anims/400/"+mouthData.id, cc.SpriteFrame, function(err, ret) {
                            if (err) {

                            }
                            that.mouthObj.getComponent(cc.Sprite).spriteFrame = ret;
                            that.mouthObj.setPosition(cc.v2(mouthData.pos.x,mouthData.pos.y));
                          //  this.sprite.spriteFrame = cc.loader.getRes("img/disk", cc.SpriteFrame);
                        }.bind(this));
        }

        var poseData = data.poseData;

        if(!!poseData)
        {

            cc.loader.loadRes("anims/400/"+poseData.id, cc.SpriteFrame, function(err, ret) {
                            if (err) {

                            }
                            that.poseObj.getComponent(cc.Sprite).spriteFrame = ret;
                            that.poseObj.setPosition(cc.v2(poseData.pos.x,poseData.pos.y));
                          //  this.sprite.spriteFrame = cc.loader.getRes("img/disk", cc.SpriteFrame);
                        }.bind(this));
        }

    }

    // update (dt) {},
});

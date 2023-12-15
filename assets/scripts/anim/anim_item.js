
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

        
    },
    initPreAnim()
    {
        this.animName="";
        var animation = this.getComponent(cc.Animation)
        
        
        var that = this;
        cc.loader.loadRes('anims/20/'+this.animName, cc.AnimationClip, function (err, dynamicAnimationClip) {
            
            animation.addClip(dynamicAnimationClip);
            animation.play(that.animName);
        })
    },
    
    loadItem(bodyid)
    {
        this.overCount = 0;
        this.overSumCount = 1;
        this.bodyId = bodyid;
        this.loadSprite(this.bodyObj,this.bodyId,()=>{this.checkIsLoadOver()});
    },
    close()
    {
        var fadeout = cc.fadeTo(0.1,0);
        var delay1 = cc.delayTime(0.5);
        var seq1 = cc.sequence([fadeout,cc.callFunc(()=>{
            this.bodyObj.getComponent(cc.Sprite).spriteFrame = null;
    
            this.bodyId = "";
            this.node.opacity = 0;
        })]);

        this.node.runAction(seq1);
    },
    checkIsLoadOver()
    {
        this.overCount ++;
        if(this.overCount>=this.overSumCount)
        {
            this.overCount =0;
            this.overSumCount = 0;
            this.scheduleOnce(()=>{ 
                var fadeTo = cc.fadeIn(0.1);
                this.node.runAction(fadeTo);
             },0.05);
        }
    },
    loadSprite(targetObj,tid,func)
    {
        if(!!!tid)
        {
            targetObj.getComponent(cc.Sprite).spriteFrame = null;
            tid = "";
            func();
            return;
        }
        
       
        cc.loader.loadRes("anims/"+tid, cc.SpriteFrame, function(err, ret) {
            if (err) {
                if(!!func)
                {
                    func()
                }
                return;
            }
            else
            {
                targetObj.getComponent(cc.Sprite).spriteFrame = ret;
                if(!!func)
                {
                    func()
                }
            }
            
          
        }.bind(this));
    },
    initAnimData(data)
    {
        

        var that = this;

        var eyeData = data.eyeData;
        if(!!eyeData)
        {
         
            cc.loader.loadRes("anims/400/"+eyeData.id, cc.SpriteFrame, function(err, ret) {
                            if (err) {

                            }
                            that.eyeObj.getComponent(cc.Sprite).spriteFrame = ret;
                            that.eyeObj.setPosition(cc.v2(eyeData.pos.x,eyeData.pos.y));
                          
                        }.bind(this));
        }

        

        var bodyData = data.bodyData;
        if(!!bodyData)
        {
            cc.loader.loadRes("anims/400/"+bodyData.id, cc.SpriteFrame, function(err, ret) {
                if (err) {
        
                }
                that.bodyObj.getComponent(cc.Sprite).spriteFrame = ret;
                that.bodyObj.setPosition(cc.v2(bodyData.pos.x,bodyData.pos.y));
              
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
                          
                        }.bind(this));
        }

    }

    
});



var bgSwitchCon = cc.Class({
    extends: cc.Component,
    properties: {
        targetMaskObj:cc.Node,
        bgNodeObj:cc.Node,
        currentBgId:null
    },
    statics:{
        _instance:null
    },
    onLoad()
    {
        bgSwitchCon._instance =this;
        
    },
    start () {
        this.currentBgId = null;
        this.isAtCenter = false;
  //      this.paths=["bg01","bg02"];
   //     this.pIndex = 0;
    //   this.startChange();
    },
    startChange()
    {
        this.pIndex = (this.pIndex+1)%this.paths.length;
        var cPath = this.paths[this.pIndex];
        this.changeBg(cPath);
    },
    swithAnim(func=null)
    {
        this.isAtCenter = true;
        this.targetMaskObj.setPosition(cc.v2(-1300,0));
        var moveOut = cc.moveTo(1.2, cc.v2(1300, 0));

        let moveOutEnd = cc.callFunc(() => {
            if(!!func)
            {
                this.isAtCenter = false;
                func(1);
            }
        }, this);

        this.targetMaskObj.runAction(cc.sequence(moveOut,moveOutEnd));
    },
    changeBg(bgid,func=null)
    {
      //  console.log("this.currentBgId is  " + this.currentBgId);
     //   console.log("bgid is " + bgid);
        
        if(this.currentBgId == bgid)
        {
            if(!!func)
            {
                func(0);
            }
            return;
        }

        if(!!bgid&&!!!this.currentBgId)
        {
            console.log("sdf")
            this.changeSprite(bgid,(v)=>{
                this.isLoadOver = true;
                this.bgNodeObj.getComponent(cc.Sprite).spriteFrame = this.bgSpriteFrame ;
                func(v);
            });
            
            this.currentBgId = bgid;
            return;
        }

        this.currentBgId = bgid;

        this.isLoadOver = false;

        this.targetMaskObj.setPosition(cc.v2(-1300,0));
        var moveTo = cc.moveTo(0.6, cc.v2(0, 0));
        
        var moveOut = cc.moveTo(0.6, cc.v2(1300, 0));

        let moveOutEnd = cc.callFunc(() => {
            if(!!func)
            {
                this.isAtCenter = false;
                func(1);
            }
        }, this);

        this.changeSprite(bgid,(v)=>{
            this.isLoadOver = true;
            if(this.isAtCenter)
            {
                this.bgNodeObj.getComponent(cc.Sprite).spriteFrame = this.bgSpriteFrame ;
                this.targetMaskObj.runAction(cc.sequence(moveOut,moveOutEnd));
            }
        });

        let moveCenterEnd = cc.callFunc(() => {
            this.isAtCenter = true;//在中间了
            if(this.isLoadOver)
            {
                this.bgNodeObj.getComponent(cc.Sprite).spriteFrame = this.bgSpriteFrame ;
                this.targetMaskObj.runAction(cc.sequence(moveOut,moveOutEnd));
            }
        }, this);

        this.targetMaskObj.runAction(cc.sequence(moveTo,moveCenterEnd));
    },
    loadBgDirectWithOutAnim(bgid,func)
    {
        this.changeSprite(bgid,(v)=>{
            this.isLoadOver = true;
            console.log("loadBgDirectWithOutAnim is called " + v);
            if(!!func)
            {
                func(1);
            }
            else{
                func(0);
            }
        });
    },
    changeSprite(id,func=null)
    {
        var that = this;
        cc.loader.loadRes("bgs/"+id, cc.SpriteFrame, function(err, ret) {
            if (err) {
                console.log(err);
                if(!!func)
                {
                    func(-1);
                }
                return;
            }
            that.bgSpriteFrame = ret;
          
            if(!!func)
            {
                func(1);
            }
          //  this.sprite.spriteFrame = cc.loader.getRes("img/disk", cc.SpriteFrame);
        }.bind(this));
    }
    /*
    changeSprite(id,func=null)
    {
        var that = this;
        cc.loader.loadRes("bgs/"+id, cc.SpriteFrame, function(err, ret) {
            if (err) {
                console.log(err);
                if(!!func)
                {
                    func(-1);
                }
                return;
            }
            that.bgNodeObj.getComponent(cc.Sprite).spriteFrame = ret;
            if(!!func)
            {
                func(1);
            }
          //  this.sprite.spriteFrame = cc.loader.getRes("img/disk", cc.SpriteFrame);
        }.bind(this));
    }
    */

});

module.exports = bgSwitchCon

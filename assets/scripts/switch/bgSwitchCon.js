var global = require("globalSetting");

var bgSwitchCon = cc.Class({
    extends: cc.Component,
    properties: {
        targetMaskObj:cc.Node,
        hideMaskObj:cc.Node,
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
        this.preBgId = null;
        this.isAtCenter = false;
        this.hideMaskObj.active = false;

  
   
    
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
    checkIfNeedSwitch(id)
    {
        return id != this.currentBgId;
    },
    changeBg(bgid,func=null)
    {
      
     
        
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
            this.changeSprite(bgid,(v)=>{
                this.isLoadOver = true;
                this.bgNodeObj.getComponent(cc.Sprite).spriteFrame = this.bgSpriteFrame ;
                func(v);
            });
            this.hideMaskObj.active = false;
            this.currentBgId = bgid;
            if(!!!global.dialogueBgDic)
            {
                global.dialogueBgDic = {};
            }
            
            global.dialogueBgDic[this.currentBgId] = true;
            return;
        }

        this.isLoadOver = false;

        this.targetMaskObj.setPosition(cc.v2(-1300,0));
        var moveTo = cc.moveTo(0.6, cc.v2(0, 0));
        
        var moveOut = cc.moveTo(0.6, cc.v2(1300, 0));
        this.preBgId =   this.currentBgId ;

        let moveOutEnd = cc.callFunc(() => {
            if(!!func)
            {
                this.isAtCenter = false;
                func(1);
            }
            this.hideMaskObj.active = false;
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
            this.isAtCenter = true;
            if(this.isLoadOver)
            {
                this.bgNodeObj.getComponent(cc.Sprite).spriteFrame = this.bgSpriteFrame ;
                this.targetMaskObj.runAction(cc.sequence(moveOut,moveOutEnd));
            }
        }, this);

        this.targetMaskObj.runAction(cc.sequence(moveTo,moveCenterEnd));
        
        this.currentBgId = bgid;
        global.dialogueBgDic[this.currentBgId] = true;
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
          
        }.bind(this));
    }
    

});

module.exports = bgSwitchCon


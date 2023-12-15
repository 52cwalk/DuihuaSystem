var dialogueSystem = require("dialogueSystem");
var global = require("globalSetting");
var musicCon = require("musicCon");
var storage_con  = require("storage_con");

cc.Class({
    extends: cc.Component,

    properties: {
        leftDialogueObj:cc.Node,
        rightDialogueObj:cc.Node,
        centerDialogueObj:cc.Node,
        currentDialogueObj:null,
        animConObj:cc.Node,
        fliterObj:cc.Node,
        selfHeadSpriteFrames:[cc.SpriteFrame]
    },

    

    onLoad () {
        var that = this;
        this.leftDialogueObj.getComponent("dialogueTextItem").initEvent(
            function(e)
            {
                that.receiveDialogueFunc(e);
            },
            function(e)
            {
                that.printAnimEndFunc(e);
            }
        );
        this.rightDialogueObj.getComponent("dialogueTextItem").initEvent(
            function(e)
            {
                that.receiveDialogueFunc(e);
            },
            function(e)
            {
                that.printAnimEndFunc(e);
            }
        );
        this.centerDialogueObj.getComponent("dialogueTextItem").initEvent(
            function(e)
            {
                that.receiveDialogueFunc(e);
            },
            function(e)
            {
                that.printAnimEndFunc(e);
            }
        );
        this.leftDialogueObj.getComponent("dialogueTextItem").initDialogueTextCon(this.node);
        this.rightDialogueObj.getComponent("dialogueTextItem").initDialogueTextCon(this.node);
        this.centerDialogueObj.getComponent("dialogueTextItem").initDialogueTextCon(this.node);
    },
    start () {
        
    },
    next()
    {
        
    },
    updateLie()
    {

    },
    getSelfHeadSprite(id)
    {   
        for(var i = 0;i!=this.selfHeadSpriteFrames.length;i++)
        {
            if(id == this.selfHeadSpriteFrames[i].name)
            {
                return this.selfHeadSpriteFrames[i];
            }
        }
        return this.selfHeadSpriteFrames[0];
    },
    close()
    {
        if(!!this.currentDialogueObj)
        {
            this.currentDialogueObj.getComponent("dialogueTextItem").close();
        }
        if(!!this.animConObj)
        {
            this.animConObj.getComponent("animCon").close();
            this.hideFliter();
        }
    },
    receiveDialogueFunc(e)
    {
        if(!!this.currentDialogueObj)
        {
            this.currentDialogueObj.getComponent("dialogueTextItem").close();
        }
        dialogueSystem._instance.currentDialogueEndFunc();
    },
    printAnimEndFunc(e)
    {
        dialogueSystem._instance.printAnimEndFunc();
    },
    continueNext()
    {
        if(!!this.currentDialogueObj)
        {
            this.currentDialogueObj.getComponent("dialogueTextItem").execute();
        }
    },
    updateDialogue()
    {

    },
    execute(configData)
    {
        var dir = global.getDirectionByName(configData.actorId);
        if(!!musicCon._instance )
        {
            if(!!configData.musicId)
            {
                musicCon._instance.playAudio(configData.musicId);
                storage_con._instance.saveLastDialogueMusicBg(configData.musicId);
            }
            else
            {
                
            }
        }
        else
        {
            console.log("musicCon is null ");
        }

        if(!!configData.fliterId)
        {
            this.showFliter();
        }
        else
        {
            this.fliterObj.opacity = 0;
        }

        if(!!configData.dialogueData.LieName)
        {
            if(!!this.animConObj)
            {
                
                this.animConObj.getComponent("animCon").setLieItemConfig(configData.dialogueData.LieName);
                this.animConObj.getComponent("animCon").loadItem();
                global.dialogueLihuiDic[configData.dialogueData.LieName] = true;
            }
        }
        else
        {
            if(!!this.animConObj)
            {
                this.animConObj.getComponent("animCon").close();
            }
        }

        if(dir==0)
        {
            if( !!this.currentDialogueObj)
            {
                this.currentDialogueObj.getComponent("dialogueTextItem").close();
            }
            
            this.leftDialogueObj.getComponent("dialogueTextItem").setConfig(configData);
            this.leftDialogueObj.getComponent("dialogueTextItem").execute();
            this.currentDialogueObj = this.leftDialogueObj;
        }
        else if (dir==1)
        {
            if( !!this.currentDialogueObj)
            {
                this.currentDialogueObj.getComponent("dialogueTextItem").close();
            }
            
            this.rightDialogueObj.getComponent("dialogueTextItem").setConfig(configData);
            this.rightDialogueObj.getComponent("dialogueTextItem").execute();
            this.currentDialogueObj = this.rightDialogueObj;
        }
        else if (dir==-1)
        {
            if( !!this.currentDialogueObj)
            {
                this.currentDialogueObj.getComponent("dialogueTextItem").close();
            }
            
            this.centerDialogueObj.getComponent("dialogueTextItem").setConfig(configData);
            this.centerDialogueObj.getComponent("dialogueTextItem").execute();
            this.currentDialogueObj = this.centerDialogueObj;
        }
        else
        {
            if( !!this.currentDialogueObj)
            {
                this.currentDialogueObj.getComponent("dialogueTextItem").close();
            }
            
            this.leftDialogueObj.getComponent("dialogueTextItem").setConfig(configData);
            this.leftDialogueObj.getComponent("dialogueTextItem").execute();
            this.currentDialogueObj = this.leftDialogueObj;
        }
    },
    showFliter()
    {
         var fadein = cc.fadeTo(0.3,255);
         this.fliterObj.runAction(fadein);
    },
    hideFliter()
    {
        var fadeout = cc.fadeTo(0.1,0);
        this.fliterObj.runAction(fadeout);
    }
    
});


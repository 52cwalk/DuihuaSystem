var dialogueSystem = require("dialogueSystem");
var global = require("globalSetting");

cc.Class({
    extends: cc.Component,

    properties: {
        leftDialogueObj:cc.Node,
        rightDialogueObj:cc.Node,
        centerDialogueObj:cc.Node,
        currentDialogueObj:null,
        animConObj:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

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
    },
    start () {
        
    },
    next()
    {
        
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
        }

    },
    receiveDialogueFunc(e)
    {
        if(dialogueSystem._instance.isNextOverNode()&& dialogueSystem._instance.isAutoPlay)
        {
            
        }
        else
        {
            if(!!this.currentDialogueObj)
            {
                this.currentDialogueObj.getComponent("dialogueTextItem").close();
            }
            dialogueSystem._instance.currentDialogueEndFunc();
        }
        
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
    execute(configData)
    {
        var dir = configData.dialogueData.direction;
        var dir = global.getDirectionByName(configData.actorId);
        
        if(!!configData.dialogueData.LieName)
        {
            if(!!this.animConObj)
            {
                console.log("configData.dialogueData.LieName " + configData.dialogueData.LieName);
                this.animConObj.getComponent("animCon").setLieItemConfig(configData.dialogueData.LieName);
                this.animConObj.getComponent("animCon").loadItem();
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
    }
    // update (dt) {},
});

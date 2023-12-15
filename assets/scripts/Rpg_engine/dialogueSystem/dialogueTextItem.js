var dialogueBase = require("dialogueBase");
var storage_con = require("storage_con");
var global = require("globalSetting");
var historyConSystem = require("historyConSystem");
var reward_con = require("reward_con");
cc.Class({
    extends: dialogueBase,
    properties: {
        dialogueBg:cc.Node,
        dynamicText:cc.Node,
        headImgObj:cc.Node,
        nickNameLabel:cc.Label,
        nickNameFrameObj:cc.Node,
        spriteFrames:[cc.SpriteFrame],
        nicknameSpriteFrames:[cc.SpriteFrame]
    },
    onLoad () {
        this.dIndex = 0;
        this.isShow = false;
    },
    initDialogueTextCon(obj)
    {
        this.dialogueTexConObj = obj;
    },
    initEvent(ev,dynamicEndEvent)
    {
        this.progressOverEvent=ev;
        if(!!this.dynamicText)
        {
            this.dynamicText.getComponent("dynamicText").initPrintAnimEndEvent(dynamicEndEvent);
        }
    },
    execute()
    {
        this.node.active = true;
        if(this.isShow)
        {
            if(this.dIndex>=this.dataConfig.dialogueData.dialogueContents.length)
            {
                var isCompleted = this.dynamicText.getComponent("dynamicText").isCompleted();
                if(isCompleted)
                {
                    if(!!this.progressOverEvent )
                    {
                        this.checkConfigTrailConfig();
                        this.progressOverEvent (this.node);
                        return;
                    }
                }
                else
                {
                    this.dynamicText.getComponent("dynamicText").lockText();
                }
            }
            else
            {
                
                var isCompleted = this.dynamicText.getComponent("dynamicText").isCompleted();
                if(isCompleted)
                {
                    var tContent = this.dataConfig.dialogueData.dialogueContents[this.dIndex];
                    if(!!tContent)
                    {
                        tContent = tContent.replace("$u",global.getUserNickName("$u"));
                    }
                    
                    this.dynamicText.getComponent("dynamicText").showText(tContent);
              
                    if(!!!historyConSystem)
                    {
                        historyConSystem = require("historyConSystem");
                    }
                    historyConSystem._instance.showContentByIndex( this.dataConfig.nodeId, this.dIndex);
                    this.dIndex ++;
                }
                else
                {
                    this.dynamicText.getComponent("dynamicText").lockText();
                }
            }
        }
        else
        {
            this.node.scale = cc.v2(1,0.5);
            this.showAction = cc.scaleTo(0.15, 1, 1);
            
            this.node.runAction(cc.sequence(
                this.showAction,
                
                cc.callFunc(this.showCompeleted.bind(this))
            ));
        }
        this.isShow  = true;
    },
    setConfig(dataConfig)
    {
     
        this.dataConfig = dataConfig;
        if(!! this.nickNameLabel)
        {
            this.nickNameLabel.string = global.getUserNickName(this.dataConfig.actorId);
            var sindex = this.getNameFrameByNickName(this.dataConfig.actorId);
            this.nickNameFrameObj.getComponent(cc.Sprite).spriteFrame = this.nicknameSpriteFrames[sindex];
        }
        this.checkSelfHeadSprite();
        var bgTypeIndex =  global.getDialogueBgByName(this.dataConfig.actorId);
        this.dialogueBg.getComponent(cc.Sprite).spriteFrame = this.spriteFrames[bgTypeIndex];
        historyConSystem._instance.addHisItemByConfig( this.dataConfig );
     
    },
    checkSelfHeadSprite()
    {
        var actorStatusId = "";
        if(!!this.dataConfig.actorStatusId)
        {
            actorStatusId = this.dataConfig.actorStatusId.trim();
        }
        if(this.dataConfig.actorId.trim() == "$u" && !!this.headImgObj)
        {
            var headsprite = this.dialogueTexConObj.getComponent("dialogureTextCon").getSelfHeadSprite(actorStatusId);
            if(!!headsprite)
            {
                this.headImgObj.getComponent(cc.Sprite).spriteFrame = headsprite;
            }
        }
    },
    getNameFrameByNickName(v)
    {
        var spriteindex =0;
        if(v.trim() == "zqdd�?)
        {
            spriteindex = 0;
        }else if(v.trim() == "li四")
        {
            spriteindex = 1;
        }else if(v.trim() == "张三")
        {
            spriteindex = 2;
        }else if(v.trim() == "xdft")
        {
            spriteindex = 3;
        }
        else if(v.trim() == "$u")
        {
            spriteindex = 4;
        }
        else if(v.trim() == "�张三起")
        {
            spriteindex = 4;
        }
        else if(v.trim() == "凌肖")
        {
            spriteindex = 5;
        }
        else if(!!v)
        {
            spriteindex = 6;
        }
        return spriteindex;
    },
    showCompeleted()
    {
        this.execute();
    },
    close()
    {
        this.node.active = false;
        this.node.scale = cc.v2(1,0);
        this.dIndex = 0;
        this.isShow  = false;
        this.dynamicText.getComponent("dynamicText").close();
    },
    
    checkConfigTrailConfig()
    {
        var bags = this.dataConfig.dialogueData.bags;
        if(!!bags&&bags.length>0)
        {
            reward_con._instance.addRewards(bags);
        }

        var conditions = this.dataConfig.dialogueData.extraData.conditions;
        if(!!conditions&&conditions.length>0)
        {
            var isRight = storage_con._instance.checkIsHaveRewards(conditions);
            if(isRight)
            {
                var ebags = this.dataConfig.dialogueData.extraData.bags;
                if(!!ebags&&ebags.length>0)
                {
                    reward_con._instance.addRewards(ebags);
                }
            }
        }
    }

    
});


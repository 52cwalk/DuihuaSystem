var dialogueBase = require("dialogueBase");
var storage_con = require("storage_con");
var global = require("globalSetting");
var historyConSystem = require("historyConSystem");

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
        if(this.isShow)//正在显示
        {
            if(this.dIndex>=this.dataConfig.dialogueData.dialogueContents.length)
            {
                var isCompleted = this.dynamicText.getComponent("dynamicText").isCompleted();
                if(isCompleted)//条件满足可以进行打字效果
                {
                    if(!!this.progressOverEvent )
                    {
                        this.checkConfigTrailConfig();//完善配置表中需要的成就，判断条件等
                        this.progressOverEvent (this.node);
                        return;
                    }
                }
                else//结束打印效果
                {
                    this.dynamicText.getComponent("dynamicText").lockText();
                }
            }
            else
            {
                //显示打字机效果
                var isCompleted = this.dynamicText.getComponent("dynamicText").isCompleted();
                if(isCompleted)//条件满足可以进行打字效果
                {
                    var tContent = this.dataConfig.dialogueData.dialogueContents[this.dIndex];
                    if(!!tContent)
                    {
                        tContent = tContent.replace("$u",global.getUserNickName("$u"));
                    }
                    
                    this.dynamicText.getComponent("dynamicText").showText(tContent);
                    historyConSystem._instance.showContentByIndex( this.dataConfig.nodeId, this.dIndex);//添加回顾记录
                    this.dIndex ++;
                }
                else//结束打印效果
                {
                    this.dynamicText.getComponent("dynamicText").lockText();
                }
            }
        }
        else
        {
            this.showAction = cc.scaleTo(0.2, 1, 1);
            this.node.runAction(cc.sequence(
                this.showAction,
                cc.callFunc(this.showCompeleted.bind(this))
            ));
        }
        this.isShow  = true;
    },
    setConfig(dataConfig)
    {
     //   console.log("setConfig data is coming ");
        this.dataConfig = dataConfig;
        if(!! this.nickNameLabel)
        {
            this.nickNameLabel.string = global.getUserNickName(this.dataConfig.actorId);
            var sindex = this.getNameFrameByNickName(this.dataConfig.actorId);
            this.nickNameFrameObj.getComponent(cc.Sprite).spriteFrame = this.nicknameSpriteFrames[sindex];
        }
        var bgTypeIndex =  global.getDialogueBgByName(this.dataConfig.actorId);
        this.dialogueBg.getComponent(cc.Sprite).spriteFrame = this.spriteFrames[bgTypeIndex];
        historyConSystem._instance.addHisItemByConfig( this.dataConfig );//添加回顾记录
     //   console.log(this.dataConfig);
    },
    getNameFrameByNickName(v)
    {
        var spriteindex =0;
        if(v.trim() == "周棋洛")
        {
            spriteindex = 0;
        }else if(v.trim() == "李泽言")
        {
            spriteindex = 1;
        }else if(v.trim() == "白起")
        {
            spriteindex = 2;
        }else if(v.trim() == "许墨")
        {
            spriteindex = 3;
        }
        else if(v.trim() == "$u")
        {
            spriteindex = 4;
        }else if(!!v)
        {
            spriteindex = 5;
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
    //完善配置表中需要的成就，判断条件等
    checkConfigTrailConfig()
    {
        var bags = this.dataConfig.dialogueData.bags;
        if(!!bags&&bags.length>0)
        {
            storage_con._instance.setRewards(bags,true);//批量更新本地存储数据
        }

        var conditions = this.dataConfig.dialogueData.extraData.conditions;
        if(!!conditions&&conditions.length>0)
        {
            var isRight = storage_con._instance.checkIsHaveRewards(conditions);//获取判断条件
            if(isRight)
            {
                var ebags = this.dataConfig.dialogueData.extraData.bags;
                if(!!ebags&&ebags.length>0)
                {
                    storage_con._instance.setRewards(ebags,true);//批量更新本地存储数据
                }
            }
        }
    }

    // update (dt) {},
});

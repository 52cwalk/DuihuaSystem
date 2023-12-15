
var global = require("globalSetting");
cc.Class({
    extends: cc.Component,
    properties: {
        actorLabel:cc.Label,
        contentLabelPrefab:cc.Prefab,
        parentObj:cc.Node
    },
    start () {

    },
    setConfig(config)
    {
        this.dataConfig = config;
        if(!! this.actorLabel)
        {
            var nickname = global.getUserNickName(this.dataConfig.actorId);
            if(!!nickname)
            {
                this.actorLabel.string = global.getUserNickName(this.dataConfig.actorId);
            }
            else
            {
                this.actorLabel.node.active = false;
            }

        }
      
     
    },
    initAllLabel()
    {
        for(var i = 0;i!=this.dataConfig.dialogueData.dialogueContents.length;i++)
        {
            var str = this.dataConfig.dialogueData.dialogueContents[i];
            str=  str.replace("$u",global.getUserNickName("$u"));
            var contentLabelObj = cc.instantiate(this.contentLabelPrefab);
            contentLabelObj.parent = this.parentObj;
            contentLabelObj.getComponent(cc.Label).string = str;
            contentLabelObj.active = false;
        }
    },
    showContent(index)
    {
        var str = this.dataConfig.dialogueData.dialogueContents[index];
        if(!!str&& str!="null")
        {
            str= str.replace("$u",global.getUserNickName("$u"));
            var contentLabelObj = cc.instantiate(this.contentLabelPrefab);
            contentLabelObj.parent = this.parentObj;
            contentLabelObj.getComponent(cc.Label).string = str;
        }
    },
    initByLocalConfig(config)
    {
        this.setConfig(config);
        for(var i = 0;i!=this.dataConfig.dialogueData.dialogueContents.length;i++)
        {
            var str = this.dataConfig.dialogueData.dialogueContents[i];
            str= str.replace("$u",global.getUserNickName("$u"));
            var contentLabelObj = cc.instantiate(this.contentLabelPrefab);
            contentLabelObj.parent = this.parentObj;
            contentLabelObj.getComponent(cc.Label).string = str;
        }
    }
});


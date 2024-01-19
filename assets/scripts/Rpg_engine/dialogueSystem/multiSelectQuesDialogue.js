var dialogueBase = require("dialogueBase");
var storage_con = require("storage_con");
var dialogueSystem = require("dialogueSystem");
cc.Class({
    extends: dialogueBase,

    properties: {
        multiSelectCon:cc.Node,
        dynamicText:cc.Label
    },

    start () {

        var that = this;
        this.multiSelectCon.getComponent("multiSelectCon").initEvent(function(nextid){
            that.receiveDialogueFunc(nextid);
        });
    },
    execute()
    {
        console.log("multiSelectQuesDialogue show is called ");
        this.node.active = true;

        if(this.isShow)//正在显示
        {

        }
        else
        {
            var questionContent = this.dataConfig.multiChoicesData.questionContent;
            var selectConfigs = this.dataConfig.multiChoicesData.subRelationContents;

            this.multiSelectCon.getComponent("multiSelectCon").setSelectConfig(selectConfigs);
            this.dynamicText.string = questionContent;

            // this.showAction = cc.scaleTo(0.2, 1, 1);
            // this.node.runAction(cc.sequence(
            //     this.showAction,
            //     cc.callFunc(this.showCompeleted.bind(this))
            // ));
        }
    },
    showCompeleted()
    {

    },
    setConfig(dataConfig)
    {
        console.log("setConfig multiSelectQuesDialogue is coming ");
        this.dataConfig = dataConfig;
        console.log(this.dataConfig);
    },
    close()
    {
        this.node.active = false;
        this.isShow  = false;
    },
    receiveDialogueFunc(nextid)
    {
        if(!!nextid&&nextid!="")
        {
            this.close();//关闭当前对话系统
            dialogueSystem._instance.gotoOtherBranchById(nextid);
        }
        else
        {
            console.log("the branch is null ");
        }
    }
});

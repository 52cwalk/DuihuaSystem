var dialogueBase = require("dialogueBase");
var storage_con = require("storage_con");
var dialogueSystem = require("dialogueSystem");
var global = require("globalSetting");
cc.Class({
    extends: dialogueBase,

    properties: {
        multiSelectCon:cc.Node,
        dynamicText:cc.Label
    },

    start () {

        var that = this;
        this.multiSelectCon.getComponent("multiSelectCon").initEvent(function(nextid,no){
            that.receiveDialogueFunc(nextid,no);
        });
    },
    execute()
    {
        console.log("multiSelectQuesDialogue show is called ");
        this.node.active = true;

        if(this.isShow)
        {

        }
        else
        {
            var questionContent = this.dataConfig.multiChoicesData.questionContent;
            var selectConfigs = this.dataConfig.multiChoicesData.subRelationContents;

            this.multiSelectCon.getComponent("multiSelectCon").setSelectConfig(selectConfigs);
            if(!!questionContent)
            {
                this.dynamicText.node.active = true;
                this.dynamicText.string = questionContent;
            }
            else
            {
                this.dynamicText.node.active = false;
            }


            
            
            
            
            
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
    receiveDialogueFunc(nextid,selectNo)
    {
        
        if(!!nextid&&nextid!="")
        {
            this.close();
            if(!!global.branchStr && global.branchStr !="")
            {
                global.branchStr = global.branchStr +"_"+ selectNo;
            }
            else
            {
                global.branchStr = selectNo.toString();
            }

            dialogueSystem._instance.gotoMultiSelectBranchById(nextid);
        }
        else
        {
            console.log("the branch is null ");
        }
    }
});


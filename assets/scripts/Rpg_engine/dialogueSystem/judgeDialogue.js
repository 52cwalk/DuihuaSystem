var dialogueBase = require("dialogueBase");
var storage_con = require("storage_con");
var global = require("globalSetting");
var dialogueSystem = require("dialogueSystem");
cc.Class({
    extends: dialogueBase,
    properties: {
    },
    start () {
    },
    execute()
    {
        var conditions = this.dataConfig.judgeConditionData.conditions;

        console.log("judgeConditionData is condition is ");
        console.log(conditions);
        
        var isValid = storage_con._instance.checkIsHaveRewards(conditions);
        var validNextId ="";
        var selectNo = 0;
        if(isValid)
        {
            selectNo = 1;
            console.log("yes, 你的条件是正确的�?)
            validNextId = this.dataConfig.judgeConditionData.conditionBranch.yesNextNodeId;
        }
        else
        {
            selectNo = 0;
            console.log("no, 你的条件是错误的�?)
            validNextId = this.dataConfig.judgeConditionData.conditionBranch.noNextNodeId;
        }
        
        if(!!validNextId&&validNextId!="")
        {
            if(!!global.branchStr && global.branchStr !="")
            {
                global.branchStr = global.branchStr +"_"+ selectNo;
            }
            else
            {
                global.branchStr = selectNo.toString();
            }
        }
        else
        {
            console.log("the branch is null ");
        }

        console.log("valid next id is " + validNextId);
        dialogueSystem._instance.gotoMultiSelectBranchById(validNextId);

    },
    setConfig(dataConfig)
    {
        console.log("setConfig judgeDialogue is coming ");
        this.dataConfig = dataConfig;
    },
    close()
    {

    }
});


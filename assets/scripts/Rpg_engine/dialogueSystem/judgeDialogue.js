var dialogueBase = require("dialogueBase");
var storage_con = require("storage_con");
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
        
        var isValid = storage_con._instance.checkIsHaveRewards(conditions);//判断条件是否符合
        if(isValid)
        {
            console.log("yes, 你的条件是正确的！")
            var validNextId = this.dataConfig.judgeConditionData.conditionBranch.yesNextNodeId;
            dialogueSystem._instance.gotoOtherBranchById(validNextId);
        }
        else
        {
            console.log("no, 你的条件是错误的！")
            var invalidNextId = this.dataConfig.judgeConditionData.conditionBranch.noNextNodeId;
            dialogueSystem._instance.gotoOtherBranchById(invalidNextId);
        }
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

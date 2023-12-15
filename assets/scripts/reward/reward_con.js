var storage_con = require("storage_con");
var TipCon =require("TipCon");
var global = require("globalSetting");
var reward_con = cc.Class({
    extends: cc.Component,

    properties: {
        bagJsonData:cc.JsonAsset,
        achievementJsonData:cc.JsonAsset,
    },
    onLoad()
    {
        reward_con._instance = this;
        this.bagDic =Object.create(null);
        this.achievementDic =Object.create(null);
    },
    start () {
        this.bagJson =  this.bagJsonData.json;
        
        for(var i = 0;i!=this.bagJson.length;i++)
        {
            this.bagDic[this.bagJson[i].bagId] = this.bagJson[i];
        }

        this.achievementJson = (this.achievementJsonData.json);
       
        for(var i = 0;i!=this.achievementJson.length;i++)
        {
            this.achievementDic[this.achievementJson[i].bagId] = this.achievementJson[i];
        }
        this.getAllBagAchievementKey = "achievement_llmm";
    },
    addRewards(bags)
    {
        for(var i = 0;i!=bags.length;i++)
        {
            var bagitem =  storage_con._instance.getReward(bags[i]);
            if(!!!bagitem)
            {
                global.dialogueRewardDic[bags[i]] = true;
                storage_con._instance.addCurrentRewards(bags[i]);
                storage_con._instance.setReward(bags[i],1);
            }
        }
        console.log("global.dialogueRewardDic");
        console.log(global.dialogueRewardDic);
        
        this.checkAllBags();
    },
    addReward(bag)
    {
        global.dialogueRewardDic[bag] = true;
        var bagitem =  storage_con._instance.getReward(bag);
        if(!!!bagitem)
        {
            storage_con._instance.addCurrentRewards(bag);
            console.log("global.dialogueRewardDic");
            console.log(global.dialogueRewardDic);
    
            if(!!bag)
            {
                storage_con._instance.setReward(bag,1);
            }
        }
        this.checkAllBags();
    },
    checkAllBags()
    {
        var llmnachievement = storage_con._instance.getReward(this.getAllBagAchievementKey);
        if(!!llmnachievement)
        {
            return;
        }
        var isAllBagGeted = true;
        for(var bkey in this.bagDic)
        {
            var bagitem =  storage_con._instance.getReward(bkey);
            if(!!!bagitem)
            {
                isAllBagGeted = false;
            }
        }
        
        if(isAllBagGeted)
        {
            storage_con._instance.setReward(this.getAllBagAchievementKey,1);
            global.dialogueRewardDic[this.getAllBagAchievementKey] = true;
        }
    },
    getRewards()
    {
        var rewards={};
        rewards.bags=[];
        rewards.achievements=[];
        for(var ckey in global.dialogueRewardDic)
        {
            if(!!this.bagDic[ckey])
            {
                storage_con._instance.setNewBagReward(true);
                rewards.bags.push(this.bagDic[ckey].bagTitle);
            }
            else if(!!this.achievementDic[ckey])
            {
                storage_con._instance.setNewAchievementReward(true);
                rewards.achievements.push(this.achievementDic[ckey].bagTitle);
            }
        }
        console.log("rewards is called ");
        console.log(rewards);
        return rewards;

    }
});

module.exports = reward_con;


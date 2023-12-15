var storage_con = require("storage_con");
var global = require("globalSetting");
var historyConSystem = require("historyConSystem");

var config_data = cc.Class({
    extends: cc.Component,

    properties: {
        jsonData:cc.TextAsset
    },
    statics:{
        _instance:null
    },
    onLoad()
    {
        config_data._instance = this;
        
        this.dialogueConfigData = null;
        this.allConfigData = null;

        this.currentNodeId = null;
        this.chapterStoryPlots=[];
        this.loadConfig();
    },
    start () {

    },
    loadConfig()
    {
        
        





        
        
        
    },
    getCurrentNodeConfigById(id)
    {
        this.currentNodeId = this.dialogueConfigData[id].nodeId;
        if(!!this.currentNodeId)
        {
          return this.dialogueConfigData[id]
        }
        return null;
    },
    getCurrentNodeConfig()
    {
        return this.dialogueConfigData[this.currentNodeId];
    },
    getNextConfig()
    {
        var nextid = this.dialogueConfigData[this.currentNodeId].nextNodeId;
        this.currentNodeId = nextid;
        if(!!nextid)
        {
          return this.dialogueConfigData[nextid]
        }
        return null;
    },
    getTempNextConfig()
    {
        var nextid = this.dialogueConfigData[this.currentNodeId].nextNodeId;
        if(!!nextid)
        {
          return this.dialogueConfigData[nextid]
        }
        return null;
    },
    saveFeatureNodeConfig()
    {
        var ncof = this.dialogueConfigData[this.currentNodeId];
        var config = {};

        

        config.actor = this.allConfigData.actor;
        config.actorName = this.allConfigData.actorName;
        config.chapter = this.allConfigData.chapter;
        config.chapterName = this.allConfigData.chapterName;
        config.currentNodeId = this.currentNodeId;
        storage_con._instance.saveCurrentNodeConfig(config);
    },
    saveLastestConfig()
    {
        var config = {};
        config.actor = this.allConfigData.actor;
        config.actorName = this.allConfigData.actorName;
        config.chapter = this.allConfigData.chapter;
        config.chapterName = this.allConfigData.chapterName;
        config.currentNodeId = this.currentNodeId;
        storage_con._instance.saveLastestNodeConfig(config);
    },
    loadConfigActor(cname,callbackfunc)
    {
        var that = this;
        cc.loader.loadRes('config/actordialogue/'+cname, function (err, object) {
            if (err) {
                console.log(err);
                if(!!callbackfunc)
                {
                    callbackfunc(-1);
                }
                return;
            }

            that.allConfigData = object.json;
            that.currentNodeId = that.allConfigData.startNodeId;
            that.dialogueConfigData =  that.allConfigData.chapterContents;
            if(!!callbackfunc)
            {
                callbackfunc(1);
            }
        });
    },
    loadNextChapterConfig(callbackfunc=null)
    {
        var actorid = global.selectActorId;
        var chapterId = global.selectChapterId;
        var cname = actorid.toString()+"_"+(chapterId).toString();
        
        this.loadConfigActor(cname,callbackfunc);
    },
    handleFeatureConfig()
    {
        var preConfig = storage_con._instance.getCurrentNodeConfig();

        if(!!preConfig && !!preConfig.currentNodeId)
        {
            this.currentNodeId = this.dialogueConfigData[preConfig.currentNodeId].nextNodeId;
        }
    },
    handleLastestConfig()
    {
        var lastestConfig = storage_con._instance.getLastestNodeConfig();

        if(!!lastestConfig && !!lastestConfig.currentNodeId)
        {
            global.selectActorId = lastestConfig.actor;
            global.selectChapterId = lastestConfig.chapter;

            this.currentNodeId = lastestConfig.currentNodeId;
        }
    },
    getCurrentStoryPlots()
    {
        this.currentNodeId = this.allConfigData.startNodeId;

        for (var key in global.chapterDic) {
            var chapteritemobj = cc.instantiate(this.chapterItemPrefabObj);
            chapteritemobj.parent = this.chapterParentObj;
            chapteritemobj.getComponent("archiveChapterItem").initItem(key,global.chapterDic[key]);
            chapteritemobj.getComponent("archiveChapterItem").setArchiveCon(this.node);
        }
    },
    getSkip()
    {
        var currentid =  this.currentNodeId;
        var skipNodeConfig = this.getNextSkipNode(currentid,currentid);
        console.log("skipNodeConfig is called ");
        console.log(skipNodeConfig);
        this.currentNodeId = skipNodeConfig.nodeId;
        this.saveLastestConfig();
    },
    getNextSkipNode(nid,skipNodeId)
    {
        var nconfig = this.dialogueConfigData[nid];
        
        if(nconfig.nodeType ==  global.nodeType.QuestionAndInputAnswer||
            nconfig.nodeType ==  global.nodeType.MultiChoices||
            nconfig.nodeType ==  global.nodeType.GotoFeatureScene)
            {
                return nconfig;
            }
            else if(nconfig.nodeType ==  global.nodeType.JudgeCondition)
            {
                var conditions = nconfig.judgeConditionData.conditions;

                console.log("judgeConditionData is condition is ");
                console.log(conditions);
                
                var isValid = storage_con._instance.checkIsHaveRewards(conditions);
                if(isValid)
                {
                    console.log("yes, 你的条件是正确的�?)
                    var validNextId = nconfig.judgeConditionData.conditionBranch.yesNextNodeId;
                    return this.getNextSkipNode(validNextId,skipNodeId);
                }
                else
                {
                    console.log("no, 你的条件是错误的�?)
                    var invalidNextId = nconfig.judgeConditionData.conditionBranch.noNextNodeId;
                    return this.getNextSkipNode(invalidNextId,skipNodeId);
                }
            }
        else
        {
            var nNextConfig = this.dialogueConfigData[nconfig.nextNodeId];
            
            if(nNextConfig.nodeType== global.nodeType.Over ||nNextConfig.nodeType== global.nodeType.SubOver)
            {
                return nNextConfig;
            }
            else
            {
                if(nconfig.nodeType== global.nodeType.Dialogue && skipNodeId != nconfig.nodeId)
                {
              
              
                    historyConSystem._instance.addHisItemBySkip( nconfig );
                }
                return this.getNextSkipNode(nconfig.nextNodeId,skipNodeId);
            }
        }
        
    },
   
});

module.exports = config_data

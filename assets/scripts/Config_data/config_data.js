var storage_con = require("storage_con");
var global = require("globalSetting");

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
        /*
        this.allConfigData = JSON.parse(this.jsonData.text);
        this.currentNodeId = this.allConfigData.startNodeId;
        this.dialogueConfigData =  this.allConfigData.chapterContents;
        */
        
//var selectActorId = 1000;
//var selectChapterId = 3000;

/*
        var jsonName = global.selectActorId+"_"+global.selectChapterId;
        cc.loader.loadRes('config/actordialogue/'+jsonName, function (err, object) {
            if (err) {
                console.log(err);
                if(!!callbackfunc)
                {
                    callbackfunc(-1);
                }
                return;
            }

            //console.log("   console.log( object.json); is called ");
            //console.log( object.json);
            that.allConfigData = object.json;
            that.currentNodeId = that.allConfigData.startNodeId;
            that.dialogueConfigData =  that.allConfigData.chapterContents;
        });
*/

        // console.log("allConfigData");
        // console.log(this.allConfigData);
        // console.log(this.dialogueConfigData);
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
        console.log("getCurrentNodeConfig is called ");
        console.log(this.currentNodeId);
        console.log(this.dialogueConfigData);

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

        /*
        "actor": "1001",
        "actorName": "周棋洛",
        "chapter": "3002",
        "chapterName": "02男主分线",
        */

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
        //global.selectChapterId++;
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

        console.log("handleLastestConfig is ");
        console.log(lastestConfig);
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
    }
});

module.exports = config_data
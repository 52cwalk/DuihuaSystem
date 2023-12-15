
var global = require("globalSetting");
var config_data = require("config_data");
var storage_con = require("storage_con");
var historyConSystem =cc.Class({
    extends: cc.Component,

    properties: {
        mainObj:cc.Node,
        historyPlotItemPrefab:cc.Prefab,
        parentObj:cc.Node,
        scrollView:cc.ScrollView
    },
    statics:{
        _instance:null
    },
    onLoad()
    {
        historyConSystem._instance = this;
        this.objectDic = Object.create(null);
    },
    start () {
        var config = storage_con._instance.getLastestContent(config);
        if(!!config)
        {
            if(global.isRecoverLastNode)
            {
                console.log("继续保持了相对的节点�?);
                if(!!config.contents&&config.contents.length>0)
                {
                    global.localHistoryPlotDic = config.contents;
                    global.localHistoryPlotDic.pop();
                    this.initByLocalConfig();
                }
            }
            else if(global.isFeatureMode)
            {
                console.log("从特殊场景返�?!!");
                if(!!config.contents&&config.contents.length>0)
                {
                    global.localHistoryPlotDic = config.contents;
                    this.initByLocalConfig();
                }
            }
            else
            {
                console.log("清空了最近的记录的节�?);
                storage_con._instance.clearLastestContent();
                global.localHistoryPlotDic=[];
            }
        }
        else
        {
            global.localHistoryPlotDic=[];
        }
        this.mainObj.opacity = 0;
    },
    saveLastestContent()
    {
        var config = {};
        config.actor = global.selectActorId;
        config.chapter = global.selectChapterId;
        config.contents= global.localHistoryPlotDic;
        storage_con._instance.saveLastestContent(config);
    },

    addHisItemByConfig(config)
    {
    
        var contentLabelObj = cc.instantiate(this.historyPlotItemPrefab);
        contentLabelObj.parent = this.parentObj;
        contentLabelObj.getComponent("historyPlotItem").setConfig(config);
        this.objectDic[config.nodeId] = contentLabelObj;
        global.localHistoryPlotDic.push(config);
        this.saveLastestContent();
    },
    addHisItemBySkip(config)
    {
    
        var contentLabelObj = cc.instantiate(this.historyPlotItemPrefab);
        contentLabelObj.parent = this.parentObj;
        contentLabelObj.getComponent("historyPlotItem").initByLocalConfig(config);
        this.objectDic[config.nodeId] = contentLabelObj;
        global.localHistoryPlotDic.push(config);
        this.saveLastestContent();
    },
    showContentByIndex(nid,idx)
    {
        var sobj = this.objectDic[nid];
        if(!!sobj)
        {
            sobj.getComponent("historyPlotItem").showContent(idx);
        }
    },
    clear()
    {
        for (var key in this.objectDic) {
            this.objectDic[key].destroy();
        }
        this.objectDic = Object.create(null);
        storage_con._instance.clearLastestContent();
        global.localHistoryPlotDic = [];
    },
    show()
    {
        this.mainObj.active = true;
        this.scrollView.scrollToBottom(0.1);

        this.scheduleOnce(()=>{ 
            this.mainObj.opacity = 255;
        
          
         },0.15);
    },
    close()
    {
        this.mainObj.opacity = 0;
        this.mainObj.active = false;
    },
    initByLocalConfig()
    {
        if(global.localHistoryPlotDic.length>0)
        {
            for(var i = 0;i!=global.localHistoryPlotDic.length;i++)
            {
                var contentLabelObj = cc.instantiate(this.historyPlotItemPrefab);
                contentLabelObj.parent = this.parentObj;
                contentLabelObj.getComponent("historyPlotItem").initByLocalConfig(global.localHistoryPlotDic[i]);
                this.objectDic[global.localHistoryPlotDic[i].nodeId] = contentLabelObj;
            }
        }
    }
});


module.exports = historyConSystem




var global = require("globalSetting");
var historyConSystem =cc.Class({
    extends: cc.Component,

    properties: {
        mainObj:cc.Node,
        historyPlotItemPrefab:cc.Prefab,
        parentObj:cc.Node
    },
    statics:{
        _instance:null
    },
    onLoad()
    {
        historyConSystem._instance = this;
        this.objectDic = Object.create(null);//创建一个字典
    },
    start () {
            //this.node.on(cc.Node.EventType.TOUCH_END, this.triggerClick, this);
            this.initByLocalConfig();//加载从本地缓存读取的内容
    },
    addHisItemByConfig(config)
    {
    //var str = this.dataConfig.dialogueData.dialogueContents[index];
        var contentLabelObj = cc.instantiate(this.historyPlotItemPrefab);
        contentLabelObj.parent = this.parentObj;
        contentLabelObj.getComponent("historyPlotItem").setConfig(config);
        this.objectDic[config.nodeId] = contentLabelObj;
        global.historyPlotDic.push(config);
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
        this.objectDic = Object.create(null);//创建新的字典
        global.historyPlotDic = [];//清空主菜单
    },
    show()
    {
        this.mainObj.active = true;
    },
    close()
    {
        this.mainObj.active = false;
    },
    initByLocalConfig()
    {
        if(global.historyPlotDic.length>0)
        {
            for(var i = 0;i!=global.historyPlotDic.length;i++)
            {
                var contentLabelObj = cc.instantiate(this.historyPlotItemPrefab);
                contentLabelObj.parent = this.parentObj;
                contentLabelObj.getComponent("historyPlotItem").initByLocalConfig(global.historyPlotDic[i]);
                this.objectDic[global.historyPlotDic[i].nodeId] = contentLabelObj;
            }
        }
    }
});


module.exports = historyConSystem



var storage_con = require("storage_con");
var TipCon =require("TipCon") ;
var global = require("globalSetting");
cc.Class({
    extends: cc.Component,
    properties: {
        mazeJsonData:cc.TextAsset,
        mazeSelectItems:[cc.Node],
        contentLabel:cc.Label,
        questionTipObj:cc.Node
    },
    onLoad () {
        this.mazeConfigData = JSON.parse(this.mazeJsonData.text);
        var fdata = this.mazeConfigData[0];
        for(var j = 0;j!= this.mazeSelectItems.length;j++)
        {
            this.mazeSelectItems[j].getComponent("mazeSelectItem").setMazeCon(this.node);
        }
        this.answerPaths=["向前","向右","向左","向前","向左","向右"];
        this.userPaths=[];
        this.conditionKey="isBestRoad";
        this.roadPathStr="";
        this.showNormalContent(fdata);
    },
    start()
    {
        this.isActive = true;
        this.initConfig();
    },
    initConfig()
    {
       this.questionConfig ={
            "isNeedJugdeAnswer": 1,
            "questionContent": "便利贴上的数字，好像和墙上的便利贴顺序有关，白起写的是……",
            "answerContent": "直到遇见你",
            "tipDatas": ["取出工牌里的卡纸，翻开观察地图", "APP上显示的起点是恋语大学校牌边上，结合地图，确认出发点", "观察地图路径，找到最短路径，注意每次到达一个路口后人的朝向"],
            "bags": [],
            "extraData": {
                "bags": [],
                "conditions": [],
                "isNeedExtraCondition": 0
            }
        }

        var tdatas = this.questionConfig.tipDatas;

        if(!!tdatas)
        {
            this.questionTipObj.getComponent("questionTip").setTipConfig(tdatas);
            this.isHasTipConfig = true;
        }
    },
    loadNodeItem(cfdata,roadTitle=null)
    {
        if(cfdata.nodeType == 0)
        {

            this.roadPathStr=this.roadPathStr+"->"+roadTitle;
            this.contentLabel.string = this.roadPathStr;
            this.userPaths.push(roadTitle);
            this.showNormalContent(cfdata);
        }
        else if(cfdata.nodeType == 1)
        {
            this.roadPathStr=this.roadPathStr+"->"+roadTitle;
            this.contentLabel.string = this.roadPathStr;
            this.userPaths.push(roadTitle);

            this.showSuccess();
        }
        else if(cfdata.nodeType == -1)
        {
            TipCon._instance.showTip("没选对哦，再试试呢！");
            //this.showFail();
        }
    },
    initSelectItems(selectItemsConfigs)
    {
        var no = selectItemsConfigs.length;
        for(var i = 0;i!=no;i++)
        {
            var selectObj = this.mazeSelectItems[i];
            selectObj.active = true;
            selectObj.getComponent("mazeSelectItem").initEle(selectItemsConfigs[i]);
        }
    },
    closeAllSelects()
    {
        var no = this.mazeSelectItems.length;
        for(var j = 0;j!= this.mazeSelectItems.length;j++)
        {
            this.mazeSelectItems[j].active = false;
        }
    },
    setSelectConfig(cdata)
    {
        this.selectConfigData = cdata;
        this.createselectItems();
    },
    setNextItem(nextid,roadTitle)
    {
        var nodedata = this.getDataById(nextid);
       // this.closeAllSelects();
        if(!!nodedata)
        {
            this.loadNodeItem(nodedata,roadTitle);
        }
    },
    showNormalContent(cdata)
    {
        /*
        if(!!cdata.dialogueContent)
        {
            this.contentLabel.string = cdata.dialogueContent;
        }
        else
        {
            this.contentLabel.string = null;
        }
        */

        console.log(cdata.nodeId );
        if(!!cdata.selectItems&&cdata.selectItems.length>0)
        {
         this.initSelectItems(cdata.selectItems);   
        }
    },
    showSuccess()
    {
        TipCon._instance.showTip("恭喜你，完成挑战！");
        if(this.checkTheBestPath())
        {
            storage_con._instance.setReward( this.conditionKey,"true");
        }
        else
        {
            storage_con._instance.deleteReward( this.conditionKey);
        }

        this.scheduleOnce(()=>{ 
            global.isFeatureOver = true;
            cc.director.loadScene("dialogue");
         },2);
       // this.contentLabel.string = "success ！";
    },
    showFail()
    {
      //  this.contentLabel.string = "game over ！";
    },
    getDataById(nid)
    {
        for(var i=0;i!=this.mazeConfigData.length;i++)
        {
           
            if(this.mazeConfigData[i].nodeId == nid){
                return this.mazeConfigData[i];
            }
        }
        return null;
    },
    backToHome()
    {
        cc.director.loadScene("home");
    },
    checkTheBestPath()
    {
        if(this.userPaths.length!=this.answerPaths.length)
        {
            return false;
        }
        else
        {
            for(var i = 0;i!=this.answerPaths.length;i++)
            {
                if(this.answerPaths[i]!=this.userPaths[i])
                {
                    return false;
                }
            }
        }
        return true;
    },
    showTipClick()
    {
        if(this.isActive )
        {
            if(this.isHasTipConfig)
            {
                this.questionTipObj.getComponent("questionTip").show();
            }
            else
            {
                TipCon._instance.showTip("此处没有提示哦！");
            }
        }
    },
});

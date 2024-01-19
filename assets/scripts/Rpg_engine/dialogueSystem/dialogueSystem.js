var global = require("globalSetting");
var config_data = require("config_data");
var bgSwitchCon = require("bgSwitchCon");
var TipCon = require("TipCon");
var historyConSystem = require("historyConSystem");
var storage_con  = require("storage_con");

var dialogueSystem =cc.Class({
    extends: cc.Component,

    properties: {
        currentNodeId:cc.String,
        dialogureTextConObj:cc.Node,
        inputDialogueConObj:cc.Node,
        mulitSelectDialogueConObj:cc.Node,
        judgeDialogueConObj:cc.Node,
        dialogueUIConObj:cc.Node
    },
    statics:{
        _instance:null
    },
    onLoad()
    {
        dialogueSystem._instance = this;
        this.currentDialogueConObj = null;
        this.isAutoPlay = global.isAutoPlay;
        this.dialogueUIConObj.getComponent("dialogueUICon").updateAutoPlayUI(this.isAutoPlay);
        this.node.on(cc.Node.EventType.TOUCH_END, this.triggerClick, this);
        this.isFirstEnter = true;
    },
    start () {
        this.currentDialogueNodeOver = true;
     //   this.initActorAndChapter();//初始化男主和章节
        var jsonName = global.selectActorId+"_"+global.selectChapterId;
        console.log("jsonName is called is " + jsonName);
        this.loadChapterByTargetName(jsonName);
        this.isEnableTouch=true;
        console.log( "global.userBaseInfo");
        console.log( global.userBaseInfo);
    },
    initActorAndChapter()
    {
        var lastestConfig = storage_con._instance.getLastestNodeConfig();
        if(!!lastestConfig && !!lastestConfig.currentNodeId)
        {
            global.selectActorId = parseInt(lastestConfig.actor);
            global.selectChapterId = parseInt( lastestConfig.chapter);
        }
        else
        {
            global.selectActorId = 1000;
            global.selectChapterId = 2001;
        }
    },
    triggerClick (event) {//点击触发下一步操作逻辑
        if(!this.isEnableTouch)
        {
            return;
        }
        this.isAutoPlay = false;
        global.isAutoPlay = false;
        this.dialogueUIConObj.getComponent("dialogueUICon").stopAutoPlay();

        this.next();
    },
    printAnimEndFunc()
    {
        if(this.isAutoPlay)
        {
            this.scheduleOnce(()=>{ 
                this.autoPlayNext();
             },0.5);
        }
    },
    //切换对话框模式
    currentDialogueEndFunc()
    {
        if(this.isAutoPlay)
        {
            this.currentDialogueNodeOver = true;
            this.currentDialogueConfig = config_data._instance.getNextConfig();
            this.autoPlayNext();
        }
        else
        {
            this.currentDialogueNodeOver = true;
            this.currentDialogueConfig = config_data._instance.getNextConfig();
            this.next();
        }
    },
    gotoOtherBranchById(id)
    {
        this.isAutoPlay = false;
        global.isAutoPlay = false;
        this.dialogueUIConObj.getComponent("dialogueUICon").stopAutoPlay();
        this.currentDialogueNodeOver = true;
        this.currentDialogueConfig = config_data._instance.getCurrentNodeConfigById(id);
        this.next();
    },
    executeProgress()
    {
        this.currentDialogueConfig = config_data._instance.getCurrentNodeConfig();
        console.log("executeProgress is called !");
        console.log(this.currentDialogueConfig);
        this.anlaysisDialogue(this.currentDialogueConfig.nodeType);
    },
    executeNextChapterProgress()
    {
        historyConSystem._instance.clear()//清空回顾记录
        this.currentDialogueConfig = config_data._instance.getCurrentNodeConfig();
        this.anlaysisDialogue(this.currentDialogueConfig.nodeType);
    },
    autoPlay()
    {
        this.isAutoPlay = true;
        this.autoPlayNext();
    },
    isNextOverNode()
    {
        var  nNodeConfig = config_data._instance.getTempNextConfig();
        if(!!nNodeConfig&&!!nNodeConfig.nodeType)
        {
            return (nNodeConfig.nodeType ==  global.nodeType.Over);
        }
        else
        {
            return false;
        }
    },
    onDestory()
    {
        this.closeAutoPlay();
    },
    closeAutoPlay()
    {
        this.isAutoPlay = false;
        global.isAutoPlay = false;
        this.dialogueUIConObj.getComponent("dialogueUICon").stopAutoPlay();
    },
    autoPlayNext()
    {
        if(this.currentDialogueConfig.nodeType ==  global.nodeType.Dialogue)
        {
            if(this.currentDialogueNodeOver)
            {
                this.executeDialogue();
            }
            else
            {
                this.dialogureTextConObj.getComponent("dialogureTextCon").continueNext();
            }
        }
        else if(this.currentDialogueConfig.nodeType ==  global.nodeType.QuestionAndInputAnswer||
            this.currentDialogueConfig.nodeType ==  global.nodeType.MultiChoices||
            this.currentDialogueConfig.nodeType ==  global.nodeType.GotoFeatureScene||
            this.currentDialogueConfig.nodeType ==  global.nodeType.JudgeCondition)
        {
                if(this.currentDialogueConfig.nodeType== global.nodeType.Over )
                {
                    console.log("this.currentDialogueConfig.nodeType this.currentDialogueConfig.nodeType this.currentDialogueConfig.nodeType!!!");
                }

            if(this.currentDialogueNodeOver)
            {
                this.anlaysisDialogue(this.currentDialogueConfig.nodeType);
            }
        }
        else
        {

        }
    },
    next()
    {
        if(this.currentDialogueConfig.nodeType ==  global.nodeType.Dialogue)
        {
            if(this.currentDialogueNodeOver)
            {
                this.executeDialogue();
            }
            else
            {
                this.dialogureTextConObj.getComponent("dialogureTextCon").continueNext();
            }
        }
        else if(this.currentDialogueConfig.nodeType ==  global.nodeType.Start)
        {
            this.currentDialogueConfig = config_data._instance.getNextConfig();
            this.anlaysisDialogue(this.currentDialogueConfig.nodeType);
        }
        else if(this.currentDialogueConfig.nodeType ==  global.nodeType.Over)
        {
            console.log(" executeOverNode 444 ");
            this.anlaysisDialogue(this.currentDialogueConfig.nodeType);
        }
        else if(this.currentDialogueConfig.nodeType ==  global.nodeType.QuestionAndInputAnswer||
            this.currentDialogueConfig.nodeType ==  global.nodeType.MultiChoices||
            this.currentDialogueConfig.nodeType ==  global.nodeType.GotoFeatureScene||
            this.currentDialogueConfig.nodeType ==  global.nodeType.JudgeCondition)
        {
            if(this.currentDialogueNodeOver)
            {
                this.anlaysisDialogue(this.currentDialogueConfig.nodeType);
            }
        }
        config_data._instance.saveLastestConfig();//记录最新进展情况
    },
    hide()
    {
        
    },
    anlaysisDialogue(nt)
    {
        switch(nt)
        {
            case global.nodeType.Dialogue:
                this.executeDialogue();
                break;
            case global.nodeType.DialogueAndImage:
                this.executeImageDialgoue();
                break;
            case global.nodeType.QuestionAndInputAnswer:
                this.executeQuestionInput();
                break;
            case global.nodeType.SingleChoice:
                this.executeSingleChoice();
                break;
            case global.nodeType.MultiChoices:
                this.executeMultiChoices();
                break;
            case global.nodeType.JudgeCondition:
                this.executeJudgeCondition();
                break;
            case global.nodeType.GotoFeatureScene:
                this.executeFeatureScene();
                break;
            case global.nodeType.Start:
                this.executeStartNode();
                    break;
            case global.nodeType.Over:
                this.executeOverNode();
                break;
        }
    },
    executeStartNode()
    {
        this.next();
    },
    executeOverNode()
    {
        if(global.selectActorId == global.publishActorId)
        {
            console.log("publishActorId 01 is " + global.selectActorId + " selectChapterId " +global.selectChapterId );
            if( global.selectChapterId == 2001)
            {
                global.selectChapterId = parseInt( global.selectChapterId) + 1;
                console.log("publishActorId 02 is " + global.selectActorId + " selectChapterId " +global.selectChapterId );
                config_data._instance.loadNextChapterConfig((v)=>{
                    if(v>0)
                    {
                        this.executeNextChapterProgress();
                        this.isEnableTouch = true;
                    }
                });
            }
            else if( global.selectChapterId == 2002)
            {
                global.selectActorId = global.selectPhoneActorId;
                global.selectChapterId = 3001;
                
                config_data._instance.loadNextChapterConfig((v)=>{
                    if(v>0)
                    {
                        this.swithChapterAnim((rv)=>{
                            this.executeNextChapterProgress();
                            this.isEnableTouch = true;
                        });
                    }
                });
            }
        }
        else
        {
            if(global.selectChapterId ==  global.chapterEndId )
            {
                storage_con._instance.clearCurrentNodeConfig();//清楚本地的读取章节进度
                storage_con._instance.clearLastestNodeConfig();
                storage_con._instance.addFinishedActor(global.selectActorId);
                cc.director.loadScene("home");
                return;
            }
            
            global.selectChapterId = parseInt(global.selectChapterId) + 1;

            if(global.selectChapterId == 3004)
            {
                if( !global.isEmitQTE)
                {
                    global.selectChapterId = global.selectChapterId+1;
                }
                else if(global.isEmitQTE)
                {
                    global.isEmitQTE = false;
                }
            }
            
            //加载下一个章节
            config_data._instance.loadNextChapterConfig((v)=>{
                if(v>0)
                {
                    this.swithChapterAnim((rv)=>{
                        console.log("  已经切换了章节了哦 222 ");
                        this.executeNextChapterProgress();
                        this.isEnableTouch = true;
                    });
                }
            });
        }
    },
    loadChapterByTargetName(jsonName)
    {
        this.closeAllDialogue();
        config_data._instance.loadConfigActor(jsonName,(v)=>{
            if(v>0)
            {
                
                if(global.isFeatureMode&&global.isFeatureOver)
                {
                    console.log("data from feature mode  ");
                    config_data._instance.handleFeatureConfig();
                    //表示从特殊场景恢复
                    global.isFeatureMode = false;
                    global.isFeatureOver = false;
                }
                else if(global.isRecoverLastNode)//恢复之前的节点
                {
                    global.isRecoverLastNode = false;
                    console.log("data from lastest mode  ");
                    config_data._instance.handleLastestConfig();
                }
                this.executeProgress();
            }
        });
    },
    executeDialogue()
    {
        this.currentDialogueNodeOver = false;//将是否当前节点信息显示完整 设置为false;
        if(!!this.currentDialogueConfig.bgId&&this.currentDialogueConfig.bgId!="")
        {
            this.checkBgConfig((rv)=>{
                this.dialogureTextConObj.getComponent("dialogureTextCon").execute(this.currentDialogueConfig);
                this.isEnableTouch = true;
            });
        }
        else
        {
            this.dialogureTextConObj.getComponent("dialogureTextCon").execute(this.currentDialogueConfig);
            this.isFirstEnter = false;
            this.isEnableTouch = true;
        }
    },
    executeImageDialgoue()
    {
        
    },
    executeQuestionInput()
    {
        this.currentDialogueNodeOver = false;//将是否当前节点信息显示完整 设置为false;
        if(!!this.currentDialogueConfig.bgId&&this.currentDialogueConfig.bgId!="")
        {
            this.checkBgConfig((rv)=>{
                this.inputDialogueConObj.getComponent("inputQuesDialogue").setConfig(this.currentDialogueConfig);
                this.inputDialogueConObj.getComponent("inputQuesDialogue").execute();
                this.isEnableTouch = true;
            });
        }
        else
        {
            this.inputDialogueConObj.getComponent("inputQuesDialogue").setConfig(this.currentDialogueConfig);
            this.inputDialogueConObj.getComponent("inputQuesDialogue").execute();
            this.isFirstEnter = false;
            this.isEnableTouch = true;
        }
    },
    executeSingleChoice()
    {

    },
    executeMultiChoices()
    {
        console.log( this.currentDialogueConfig);
        this.currentDialogueNodeOver = false;//将是否当前节点信息显示完整 设置为false;

        if(!!this.currentDialogueConfig.bgId)
        {
            this.checkBgConfig((rv)=>{
                this.mulitSelectDialogueConObj.getComponent("multiSelectQuesDialogue").setConfig(this.currentDialogueConfig);
                this.mulitSelectDialogueConObj.getComponent("multiSelectQuesDialogue").execute();
                this.isEnableTouch = true;
            });
        }
        else
        {
            this.mulitSelectDialogueConObj.getComponent("multiSelectQuesDialogue").setConfig(this.currentDialogueConfig);
            this.mulitSelectDialogueConObj.getComponent("multiSelectQuesDialogue").execute();
            this.isFirstEnter = false;
            this.isEnableTouch = true;
        }
    },
    executeJudgeCondition()
    {
        this.currentDialogueNodeOver = false;//将是否当前节点信息显示完整 设置为false;
        if(!!this.currentDialogueConfig.bgId)
        {
            this.checkBgConfig((rv)=>{
                this.judgeDialogueConObj.getComponent("judgeDialogue").setConfig(this.currentDialogueConfig);
                this.judgeDialogueConObj.getComponent("judgeDialogue").execute();
                this.isEnableTouch = true;
            });
        }
        else
        {
            this.judgeDialogueConObj.getComponent("judgeDialogue").setConfig(this.currentDialogueConfig);
            this.judgeDialogueConObj.getComponent("judgeDialogue").execute();
            this.isFirstEnter = false;
            this.isEnableTouch = true;
        }
    },
    executeFeatureScene()
    {
        this.currentDialogueNodeOver = false;//将是否当前节点信息显示完成 设置为false;
        var sceneid= this.currentDialogueConfig.featureData.featureSceneId;
        var sceneName = global.getFeatureSceneName(sceneid);
        if(!!sceneName)
        {
            global.isFeatureMode = true;
            global.isFeatureOver = false;
            global.isAutoPlay = this.isAutoPlay;
            config_data._instance.saveFeatureNodeConfig();
            console.log("sceneName is " + sceneName);
            cc.director.loadScene(sceneName);
        }
    },
    checkBgConfig(func = null)
    {
        this.isEnableTouch = false;
        if(!!this.currentDialogueConfig.bgId)
        {
            bgSwitchCon._instance.changeBg(this.currentDialogueConfig.bgId,func);
        }
    },
    swithChapterAnim(func = null)
    {
        this.isEnableTouch = false;
        bgSwitchCon._instance.swithAnim(func);
    },
    closeAllDialogue()
    {
        this.dialogureTextConObj.getComponent("dialogureTextCon").close();
        this.inputDialogueConObj.getComponent("inputQuesDialogue").close();
        this.mulitSelectDialogueConObj.getComponent("multiSelectQuesDialogue").close();
        this.judgeDialogueConObj.getComponent("judgeDialogue").close();
    }

    // update (dt) {},
});

module.exports = dialogueSystem
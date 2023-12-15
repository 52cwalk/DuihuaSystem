var global = require("globalSetting");
var config_data = require("config_data");
var bgSwitchCon = require("bgSwitchCon");
var TipCon = require("TipCon");
var historyConSystem = require("historyConSystem");
var storage_con  = require("storage_con");
var musicCon = require("musicCon");
var dialogueSystem =cc.Class({
    extends: cc.Component,

    properties: {
        currentNodeId:cc.String,
        dialogureTextConObj:cc.Node,
        inputDialogueConObj:cc.Node,
        mulitSelectDialogueConObj:cc.Node,
        judgeDialogueConObj:cc.Node,
        dialogueUIConObj:cc.Node,
        dialogueLoadingCon:cc.Node,
        dialogueOverCon:cc.Node
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
        this.intervalTime = 300;
    },
    start () {
        this.currentDialogueNodeOver = true;
        this.currentChapterOver = false;
     
        var jsonName = global.selectActorId+"_"+global.selectChapterId;
        console.log("jsonName is called is " + jsonName);
        this.loadChapterByTargetName(jsonName);
        this.isEnableTouch=true;

        var newConfigData = storage_con._instance.getNewNodeConfig( global.selectActorId);

        if(!!newConfigData)
        {
            if(newConfigData.chapter == global.selectChapterId )
            {
                storage_con._instance.clearNewNodeConfig(global.selectActorId);
            }
        }

        if(global.selectChapterId ==  global.publicEndChapterId)
        {
            storage_con._instance.addFinishedActor(global.selectActorId);
            storage_con._instance.saveLastPublicNewConfig(2);
        }

        this.preTime= Date.now();
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
    triggerClick (event) {
        if(!this.isEnableTouch)
        {
            return;
        }
        var currentTime = Date.now();
        var ccstime = currentTime - this.preTime;
        if(ccstime<this.intervalTime)
        {
            return;
        }
        this.preTime = currentTime;
        this.stopAutoPlay();
        this.next();
    },
    isAutoPlaying()
    {
        return this.isAutoPlay;
    },
    printAnimEndFunc()
    {
        if(this.isAutoPlay)
        {
            this.scheduleOnce(()=>{ 
                if(this.isAutoPlay)
                {
                    this.autoPlayNext();
                }
             },0.5);
        }
    },
    
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
    
    gotoMultiSelectBranchById(id)
    {
        this.isAutoPlay = false;
        global.isAutoPlay = false;
        this.dialogueUIConObj.getComponent("dialogueUICon").stopAutoPlay();
        
        console.log("global.branchStr is called " + global.branchStr);
        var isEnableSkip = storage_con._instance.checkActorSkipRecord(global.selectActorId,global.selectChapterId,global.branchStr);
        if(!isEnableSkip)
        {
            this.dialogueUIConObj.getComponent("dialogueUICon").setSkipEnabled(false);
        }
        
        storage_con._instance.saveRecoverSkipStatus(global.branchStr);
        
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
            return (nNodeConfig.nodeType ==  global.nodeType.Over) || (nNodeConfig.nodeType ==  global.nodeType.SubOver);
        }
        else
        {
            return false;
        }
    },
    onDestory()
    {
        this.stopAutoPlay();
    },
    
    stopAutoPlay()
    {
        this.isAutoPlay = false;
        global.isAutoPlay = false;
        this.dialogueUIConObj.getComponent("dialogueUICon").stopAutoPlay();
    },
    isEnabelAutoPlay()
    {
        if(!!this.currentDialogueConfig)
        {
            return this.currentDialogueConfig.nodeType ==  global.nodeType.Dialogue
        }
        else{
            return false;
        }
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
            if(this.currentDialogueNodeOver)
            {
                this.anlaysisDialogue(this.currentDialogueConfig.nodeType);
            }
        }
        if(this.currentDialogueConfig.nodeType== global.nodeType.Over ||
            this.currentDialogueConfig.nodeType== global.nodeType.SubOver)
        {
           
            this.stopAutoPlay();
            this.anlaysisDialogue(this.currentDialogueConfig.nodeType);
          
        }
        else
        {

        }
    },
    next()
    {
        if(this.currentDialogueConfig.nodeType ==  global.nodeType.Dialogue)
        {
            config_data._instance.saveLastestConfig();
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
        else if(this.currentDialogueConfig.nodeType ==  global.nodeType.Over || this.currentDialogueConfig.nodeType ==  global.nodeType.SubOver)
        {
           
            this.anlaysisDialogue(this.currentDialogueConfig.nodeType);
        }
        else if(this.currentDialogueConfig.nodeType ==  global.nodeType.QuestionAndInputAnswer||
            this.currentDialogueConfig.nodeType ==  global.nodeType.MultiChoices||
            this.currentDialogueConfig.nodeType ==  global.nodeType.GotoFeatureScene||
            this.currentDialogueConfig.nodeType ==  global.nodeType.JudgeCondition)
        {
            config_data._instance.saveLastestConfig();
            if(this.currentDialogueNodeOver)
            {
                this.anlaysisDialogue(this.currentDialogueConfig.nodeType);
            }
        }
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
            case global.nodeType.SubOver:
                this.executeSubOverNode();
                break;
        }
    },
    executeStartNode()
    {
        this.next();
    },
    executeSubOverNode()
    {
        if(this.currentChapterOver)
        {
            return;
        }
        this.currentChapterOver = true;
        storage_con._instance.clearCurrentNodeConfig();
        storage_con._instance.clearLastestNodeConfig();
        this.stopAutoPlay();
        this.dialogueOverCon.getComponent("dialogueOverCon").showSubOver();
    },
    executeOverNode()
    {
        if(this.currentChapterOver)
        {
            return;
        }
        this.currentChapterOver = true;

        this.stopAutoPlay();
        this.isEnableTouch = false;
        if(global.selectActorId != global.publishActorId)
        {
            var selectChapterId = parseInt(global.selectChapterId) + 1;
            if(selectChapterId == global.QTEChapterId)
            {
                var qteactor =  storage_con._instance.getQTEActor();
                console.log("qteactor is called " + qteactor);
                if(!!qteactor && qteactor == global.selectActorId)
                {
                    console.log("QTE 条件触发成功！！�?");
                     
                     this.closeAllDialogue();
                     global.selectChapterId =selectChapterId;
                    config_data._instance.loadNextChapterConfig((v)=>{
                        if(v>0)
                        {
                            this.currentChapterOver = false;
                            storage_con._instance.addActiveChapter(global.selectActorId ,selectChapterId);
                            this.swithChapterAnim((rv)=>{
                                console.log("  已经切换了章节了�?222 ");
                                this.executeNextChapterProgress();
                                this.isEnableTouch = true;
                            });
                        }
                    });
                }
                else
                {
                    this.dialogueOverCon.getComponent("dialogueOverCon").show();
                }
            }
            else
            {
                this.dialogueOverCon.getComponent("dialogueOverCon").show();
            }
        }
        else
        {
            this.dialogueOverCon.getComponent("dialogueOverCon").show();
        }
    },
    testShowClick()
    {
        this.dialogueOverCon.getComponent("dialogueOverCon").show();
    },
    loadChapterByTargetName(jsonName)
    {
        this.closeAllDialogue();
        config_data._instance.loadConfigActor(jsonName,(v)=>{
            if(v>0)
            {
                storage_con._instance.addActiveChapter(global.selectActorId ,global.selectChapterId);
                if(global.isFeatureMode&&global.isFeatureOver)
                {
                    console.log("data from feature mode  ");
                    config_data._instance.handleFeatureConfig();
                    
                    global.isFeatureMode = false;
                    global.isFeatureOver = false;

                    var lastRewards = storage_con._instance.getCurrentRewards();
                    if(!!lastRewards)
                    {
                        global.dialogueRewardDic = lastRewards;
                    }
                    global.gTipDatas=[];
                }
                else if(global.isRecoverLastNode)
                {
                    global.isRecoverLastNode = false;
                    console.log("data from lastest mode  ");
                    config_data._instance.handleLastestConfig();
                    
                    var lastRewards = storage_con._instance.getCurrentRewards();
                    if(!!lastRewards)
                    {
                        global.dialogueRewardDic = lastRewards;
                    }

                    var musicid = storage_con._instance.getLastDialogueMusicBg();
                    if(musicid && !!musicCon._instance)
                    {
                        musicCon._instance.playRecoverAudio(musicid);
                    }
                }
                else
                {
                    storage_con._instance.clearCurrentRewards();
                }

                this.executeProgress();
                this.isEnableTouch = true;
            }
        });
    },
    executeDialogue()
    {
        this.currentDialogueNodeOver = false;
        if(!!this.currentDialogueConfig.bgId&&this.currentDialogueConfig.bgId!="")
        {
            if(this.checkIfNeedSwitch())
            {
                this.dialogureTextConObj.getComponent("dialogureTextCon").close();
            }
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

        if(!!this.currentDialogueConfig.isMergeNode)
        {
         
            if(!!global.branchStr && global.branchStr !="")
            {
                global.branchStr = global.branchStr +"_"+ +"-1";
            }
            else
            {
                global.branchStr = "-1";
            }
            var isEnableSkip = storage_con._instance.checkStartActorSkipStatus(global.selectActorId,global.selectChapterId);
            if(isEnableSkip)
            {
                this.dialogueUIConObj.getComponent("dialogueUICon").setSkipEnabled(true);
            }
            storage_con._instance.saveRecoverSkipStatus(global.branchStr);
            console.log("global.branchStr is called " + global.branchStr);
       
        }

    },
    executeImageDialgoue()
    {
        
    },
    executeQuestionInput()
    {
        this.currentDialogueNodeOver = false;
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
        this.currentDialogueNodeOver = false;

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
        this.currentDialogueNodeOver = false;
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
        this.currentDialogueNodeOver = false;
        var sceneid= this.currentDialogueConfig.featureData.featureSceneId;
        global.gTipDatas =  this.currentDialogueConfig.featureData.tipDatas;
        global.gFeatureGuideContent = this.currentDialogueConfig.featureData.guideContent;
        console.log(" global.gTipDatas is ");
        console.log( global.gTipDatas );
        console.log(" global.gFeatureGuideContent is ");
        console.log( global.gFeatureGuideContent );
        
        var sceneName = global.getFeatureSceneName(sceneid);
        if(!!sceneName)
        {
            global.isFeatureMode = true;
            global.isFeatureOver = false;
            global.isAutoPlay = this.isAutoPlay;
            config_data._instance.saveFeatureNodeConfig();
            console.log("sceneName is " + sceneName);
            this.showLoading();
            gotoScene(sceneName);
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
    checkIfNeedSwitch()
    {
        var isChange = bgSwitchCon._instance.checkIfNeedSwitch(this.currentDialogueConfig.bgId);
        return isChange;
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
    },
    checkIfFinished()
    {
        var finishDic= storage_con._instance.getFinishedConfig();
       
            var isFinishAll = true;
            if(!!finishDic)
            {
                for(var akey in global.actorDic)
                {
                    if(akey!="1000"&&!finishDic[akey])
                    {
                        isFinishAll = false;
                        break;
                    }
                }
            }
            else{
                isFinishAll = false;
            }
            
            return isFinishAll;
    },
    skip()
    {
        this.showLoading();

        this.scheduleOnce(()=>{ 
            this.hideLoading();

            this.closeAllDialogue();
            config_data._instance.getSkip();
            this.currentDialogueConfig = config_data._instance.getCurrentNodeConfig();
            this.anlaysisDialogue(this.currentDialogueConfig.nodeType);
         },1);
    },
    showLoading()
    {
        this.dialogueLoadingCon.getComponent("dialogueLoadingCon").show();
    },
    hideLoading()
    {
        this.dialogueLoadingCon.getComponent("dialogueLoadingCon").hide();
    },
    releaseBgAndLihui()
    {
        console.log("global.dialogueBgDic is ");
        console.log(global.dialogueBgDic);

        console.log("global.dialogueLihuiDic is ");
        console.log(global.dialogueLihuiDic);
        
        
        for(var key in global.dialogueBgDic)
        {
            cc.loader.releaseRes("bgs/"+key,cc.SpriteFrame);
        }

        for(var key in global.dialogueLihuiDic)
        {
            cc.loader.releaseRes("anims/"+key,cc.SpriteFrame);
        }
        
    }
    
});

module.exports = dialogueSystem

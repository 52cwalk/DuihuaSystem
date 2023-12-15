var global = require("globalSetting");
var storage_con  = require("storage_con");
var reward_con = require("reward_con");
var musicCon = require("musicCon");
var dialogueSystem = require("dialogueSystem");
cc.Class({
    extends: cc.Component,

    properties: {
        mainObj:cc.Node,
        chapterLabel:cc.Label,
        bagPanelObj:cc.Node,
        bagParentObj:cc.Node,
        achievementPanelObj:cc.Node,
        achievementParentObj:cc.Node,
        bagPrefab:cc.Prefab,
        achievementPrefab:cc.Prefab,
        bgObj:cc.Node
    },

    start () {
       
    },
    showSubOver()
    {
        if(!!musicCon._instance)
        {
            musicCon._instance.stop();
        }
        this.mainObj.active = true;

        if(!!global.branchStr)
        {
            
            storage_con._instance.saveActorSkipRecord(global.selectActorId,global.selectChapterId,global.branchStr);
        }

        var isFinished = storage_con._instance.getTargetFinishedStatus(global.selectActorId,global.selectChapterId);
        console.log("isFinished is 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01");
        if(!isFinished)
        {
            storage_con._instance.saveNewNodeConfig(global.selectActorId,global.selectChapterId);
            console.log("isFinished is 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02");
        }

        storage_con._instance.clearRecoverSkipStatus();
        this.showRewards();
    },
    show()
    {
        if(!!musicCon._instance)
        {
            musicCon._instance.stop();
        }
        
        var selectActorId = global.selectActorId;
        var selectChapterId = global.selectChapterId;

        var title = global.chapterDic[selectChapterId];
        var qteactor =  storage_con._instance.getQTEActor();
        console.log("global.branchStr is " + global.branchStr);
        if(!!global.branchStr)
        {
            
            storage_con._instance.saveActorSkipRecord(global.selectActorId,global.selectChapterId,global.branchStr);
        }
        storage_con._instance.clearRecoverSkipStatus();
        if(!!qteactor && qteactor == global.selectActorId)
        {
            if(global.selectChapterId == global.QTEChapterId)
            {
                storage_con._instance.addFinishedChapter(global.selectActorId,parseInt(global.selectChapterId)-1);
           
            }
        }

        
        storage_con._instance.addFinishedChapter(global.selectActorId,global.selectChapterId);

        if(selectActorId == global.publishActorId)
        {
            console.log("select actor id is 001 " + selectActorId);
            if( global.selectChapterId == 2001)
            {
                console.log("select actor id is 002 " + selectActorId);

                storage_con._instance.clearCurrentNodeConfig();
                storage_con._instance.clearLastestNodeConfig();

                storage_con._instance.addActiveChapter(1000,2002);

            }
            else if( global.selectChapterId == 2003)
            {
                storage_con._instance.clearCurrentNodeConfig();
                storage_con._instance.clearLastestNodeConfig();

                var eguide= storage_con._instance.getExchangeGuide();
                if(!!!eguide)
                {
                    storage_con._instance.setExchangeGuide(1);
                }
            }
        }  
        else
        {
            if(global.selectChapterId ==  global.chapterEndId )
            {
                console.log("global.selectActorId global.selectActorId global.selectActorId is called " + global.selectActorId);
                storage_con._instance.addFinishedActor(global.selectActorId);
                storage_con._instance.clearCurrentNodeConfig();
                storage_con._instance.clearLastestNodeConfig();

                storage_con._instance.setShowSelectActorConfig();
                if(this.checkIfFinished())
                {
                    var newPublicConfig = storage_con._instance.getLastPublicNewConfig();
                    if(!!!newPublicConfig)
                    {
                        
                        storage_con._instance.saveLastPublicNewConfig(1);
                    }
                    storage_con._instance.clearShowSelectActorConfig(); 
                }
            }
            else
            {
                storage_con._instance.clearCurrentNodeConfig();
                storage_con._instance.clearLastestNodeConfig();
                
                selectChapterId = parseInt(selectChapterId) +1;
                storage_con._instance.clearShowSelectActorConfig();
                
                if(selectChapterId == global.QTEChapterId)
                {
                    console.log("qteactor is called " + qteactor);
                    if(!!qteactor && qteactor == global.selectActorId)
                    {
                        
                    }
                    else
                    {
                        selectChapterId = parseInt(selectChapterId) +1;
                        console.log("selectChapterId is called 01 " + selectChapterId);
                        this.checkIfAddNewChapter(selectChapterId);
                    }
                    
                }
                else
                {
                   this.checkIfAddNewChapter(selectChapterId);
                
                }
            }
        }

        if(this.checkIfFinished())
        {
            storage_con._instance.clearCurrentNodeConfig();
            storage_con._instance.clearLastestNodeConfig();
            storage_con._instance.clearAllNewNodeConfig();
        }

        this.mainObj.active = true;
        this.showRewards();
    },
    checkIfAddNewChapter(selectChapterId)
    {
        var activeChapterConfigData = storage_con._instance.getActiveChapterConfig(global.selectActorId);
        if(!!activeChapterConfigData)
        {
            activeChapterConfigData = activeChapterConfigData[global.selectActorId];
            if(!!activeChapterConfigData &&!!activeChapterConfigData[selectChapterId] )
            {
                
            }
            else
            {
                storage_con._instance.saveNewNodeConfig(global.selectActorId,selectChapterId);
            }
        }
        else
        {
            storage_con._instance.saveNewNodeConfig(global.selectActorId,selectChapterId);
        }
    },
    showRewards()
    {
        var reward = reward_con._instance.getRewards();
        for(var i = 0;i!=reward.bags.length;i++)
        {
            console.log("bags is " + reward.bags[i]);
            var titleObj = cc.instantiate(this.bagPrefab);
            titleObj.parent = this.bagParentObj;
            titleObj.getComponent("rewardItem").setTitle(reward.bags[i]);
        }

        for(var i = 0;i!=reward.achievements.length;i++)
        {
            console.log("achievements is " + reward.achievements[i]);
            var titleObj = cc.instantiate(this.achievementPrefab);
            titleObj.parent = this.achievementParentObj;
            titleObj.getComponent("rewardItem").setTitle(reward.achievements[i]);
        }
        
        var bagmode = 0;
        
        var achievementmode = 0;
        if(reward.bags.length>0)
        {
            bagmode=1;
        }

        if(reward.achievements.length>0)
        {
            achievementmode=1
        }

        var fadein = cc.fadeTo(0.5,255);
        var delay1 = cc.delayTime(0.5);
        var seq1 = cc.sequence([fadein,delay1,cc.callFunc(()=>{
            if(bagmode>0 && achievementmode>0)
            {
                this.playAnim(this.bagPanelObj,()=>{
                    this.playAnim(this.achievementPanelObj,()=>{
                        this.close();
                    });
                })
            }
            else if(bagmode>0)
            {
                this.playAnim(this.bagPanelObj,()=>{
                    this.close();
                })
            } else if(achievementmode>0)
            {
                this.playAnim(this.achievementPanelObj,()=>{
                    this.close();
                })
            }
            else
            {
                this.scheduleOnce(()=>{ 
                    this.close();
                },1);
            }
        })]);
        this.bgObj.runAction(seq1);
    },
    playAnim(targetObj,func)
    {
        var fadein = cc.fadeTo(0.5,255);
        var delay2 = cc.delayTime(1);
        var fadeout = cc.fadeTo(0.3,0);
        var seq1 = cc.sequence([fadein,delay2,fadeout,cc.callFunc(()=>{
            func();
        })]);
        targetObj.runAction(seq1);
    },

    close()
    {
        dialogueSystem._instance.showLoading();
        dialogueSystem._instance.releaseBgAndLihui();
        musicCon._instance.loadPreHomeAudio((v)=>{
            if(v>0)
            {
                
            }
            else
            {
               
            }
            gotoScene("home");
        });

       
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
    }
});


var global = require("globalSetting");
var dialogueSystem = require("dialogueSystem");
var storage_con  = require("storage_con");
var musicCon = require("musicCon");
var dialogueLoadingCon = require("dialogueLoadingCon");
cc.Class({
    extends: cc.Component,
    properties: {
        chapterBtnsParentObj:cc.Node,
        firstChapterItemObj:cc.Node,
        endChapterItemObj:cc.Node,
        ingSpriteObj:cc.Node,
        newSpriteObj:cc.Node,
        subBranchObj:cc.Node,
        zixianItemObj:cc.Node,
        chapterContainerObj:cc.Node,
        progressScrollviewObj:cc.ScrollView,
        guideObj:cc.Node,
        guideMaskObj:cc.Node
    
    },
    onLoad()
    {
        this.chapterItemDic={};
        this.chapterIngDic={};
    },
   
    start () {
        this.subBranchObj.getComponent("subBranchCon").initEvent((actorid)=>{
            this.updateSelectActor(actorid);
        });
        this.initPublicActor();
  
        if(!!musicCon._instance)
        {
            musicCon._instance.playAudio("res4");
        }

        var recoveChapterPosy = storage_con._instance.getHomeChapterPos();
        if(!!recoveChapterPosy)
        {
         
        }
    },
    getScrollViewPrecent(posy)
    {
        var sumHeight = 2244;
        var percent = (sumHeight/2 +posy)/sumHeight;
        return percent;
    },
    updateSelectActor(actorid)
    {
        if(global.selectActorId == actorid)
        {
            return;
        }
        console.log("updateSelectActor updateSelectActor is called  " + actorid);
        
        storage_con._instance.saveCurrentActor(actorid);
        storage_con._instance.addActiveActor(actorid);

        global.selectActorId =  actorid ;

        var finishDIc = storage_con._instance.getFinishedConfig();
        if(!!finishDIc)
        {
            if( Object.keys(finishDIc).length==1)
            {
                if(!!!finishDIc[actorid])
                {
                    storage_con._instance.saveQTEActor(global.selectActorId);
                }
            }
        }
        var activeChapterConfigData = storage_con._instance.getActiveChapterConfig(global.selectActorId);
        if(!!activeChapterConfigData)
        {

        }
        else
        {
            storage_con._instance.saveNewNodeConfig(global.selectActorId,3001);
        }
        
        this.recover();
        this.initEle();
        this.zixianItemObj.getComponent("zixianItem").updateActor();
    },
    
    addChapterItem(id,obj)
    {
        if(id < "3000")
        {
            return;
        }
        this.chapterItemDic[id] = obj;
        obj.getComponent("progressChapterItem").setProgressCon(this.node);
        if(Object.keys(this.chapterItemDic).length == (Object.keys(global.chapterDic).length-1) )
        {
            this.initEle();
            console.log("加载完成�?);
        }
    },
    initReceivePhoneStatus()
    {
        var currentActor = storage_con._instance.getCurrentActor();
        var isFinishFirstChapter = storage_con._instance.getTargetFinishedStatus("1000","2001");
        if(!!!currentActor&& isFinishFirstChapter)
        {
            var finishDIc = storage_con._instance.getFinishedConfig();
            if(!!!finishDIc)
            {
                this.setNewObjPos(this.zixianItemObj);
            }
        }
    },
    initPublicActor()
    {
        var lastestConfig = storage_con._instance.getLastestNodeConfig();
 
        console.log("lastestConfig");
        console.log(lastestConfig);
        if(!!lastestConfig)
        {
            if(lastestConfig.actor =="1000" &&  lastestConfig.chapter =="2001" )
            {
                console.log("initPublicSelectActor is called " );
                console.log(lastestConfig);
                this.chapterIngDic[lastestConfig.actor] = true;
                this.setIngObjPos(this.firstChapterItemObj);
            }
        }

        if(this.checkIfFinished())
        {
            var newPublicConfig = storage_con._instance.getLastPublicNewConfig();
            if(!!newPublicConfig && newPublicConfig==1)
            {
                this.setNewObjPos(this.endChapterItemObj);
            }

            if(!!lastestConfig&&lastestConfig.actor =="1000" &&  lastestConfig.chapter =="2003" )
            {
                this.chapterIngDic[lastestConfig.actor] = true;
                this.setIngObjPos(this.endChapterItemObj);
            }

            this.endChapterItemObj.active = true;
        }
        
    },
    initEle()
    {
        
        
        
        
        
        
        

        var lastestConfig = storage_con._instance.getLastestNodeConfig();
        console.log("lastestConfig is ");
        console.log(lastestConfig);
        var currentActor = storage_con._instance.getCurrentActor();
        console.log("currentActor is ");
        console.log(currentActor);

        var qteActor = storage_con._instance.getQTEActor();
        console.log("getQTEActor is ");
        console.log(qteActor);

        if(!!currentActor)
        {
                this.actorId = currentActor;
                var recoverChapterId = null;
                var recoverActorId = null;
                if(!!lastestConfig)
                {
                    recoverChapterId = lastestConfig.chapter;
                    recoverActorId = lastestConfig.actor;
                }
                
                var activeChapterConfigData = storage_con._instance.getActiveChapterConfig(this.actorId);
                var newConfigData = storage_con._instance.getNewNodeConfig(this.actorId);
  
                if(!!activeChapterConfigData)
                {
                    activeChapterConfigData = activeChapterConfigData[this.actorId];
                    for (var ckey in activeChapterConfigData) {
                        if(ckey != global.QTEChapterId &&ckey!=null)
                        {
                            if(!!this.chapterItemDic[ckey.toString()])
                            {
                                this.chapterItemDic[ckey.toString()].getComponent("progressChapterItem").setActor(this.actorId);
                                this.chapterItemDic[ckey.toString()].getComponent("progressChapterItem").setActiveItem(true);
                                 if(ckey == recoverChapterId && this.actorId == recoverActorId)
                                {
                                    this.setIngObjPos(this.chapterItemDic[ckey.toString()]);
                                    this.chapterIngDic[ckey.toString()] =true;
                                }
                            }
                        }
                    }
                }

                var newChapterId = null;
                if(!!newConfigData)
                {
                    newChapterId = newConfigData.chapter;
                    if(!!this.chapterItemDic[newChapterId.toString()])
                    {
                        this.chapterItemDic[newChapterId.toString()].getComponent("progressChapterItem").setActor(this.actorId);
                        this.chapterItemDic[newChapterId.toString()].getComponent("progressChapterItem").setActiveItem(true);
                        this.setNewObjPos(this.chapterItemDic[newChapterId.toString()]);
                        this.chapterItemDic[newChapterId.toString()].getComponent("progressChapterItem").showNewTag();
                    }

                    
                }

                if(currentActor == qteActor)
                {
                    if(recoverChapterId == global.QTEChapterId )
                    {
                        var preChapterId = parseInt(global.QTEChapterId) - 1;
                        this.setIngObjPos(this.chapterItemDic[preChapterId.toString()]);
                        this.chapterIngDic[global.QTEChapterId.toString()] =true;
                    }
                }

                if(!!!lastestConfig && !!!newConfigData)
                {
                    var maxChapter = storage_con._instance.getMaxActiveChapter(this.actorId);
                     var finishDic= storage_con._instance.getFinishedConfig();
                    if(!!finishDic)
                    {
                        if(maxChapter>0 && !!!finishDic[this.actorId])
                        {
                            this.setIngObjPos(this.chapterItemDic[maxChapter.toString()]);
                        }
                    }
                    else
                    {
                        if(maxChapter>0)
                        {
                            this.setIngObjPos(this.chapterItemDic[maxChapter.toString()]);
                        }
                    }
                    console.log("maxChapter is called !" + maxChapter);
                }
        }
        else
        {
            var activeChapterConfigData = storage_con._instance.getActiveChapterConfig("1000");
            var isFirstFinished = storage_con._instance.getTargetFinishedStatus("1000","2001");

            if(!!activeChapterConfigData)
            {
                activeChapterConfigData = activeChapterConfigData["1000"];
                if(!!activeChapterConfigData  )
                {
                    if(!!activeChapterConfigData["2001"] )
                    {
                        if(!isFirstFinished)
                        {
                            this.setIngObjPos(this.firstChapterItemObj);
                        }
                        else
                        {
                            this.initReceivePhoneStatus(); 
                        }
                    }
                    else
                    {
                        this.setFirstNewObjPos();
                        this.setGuideActive(true);
                    }
                }
                else
                {
                    this.setFirstNewObjPos();
                    this.setGuideActive(true);
                }
            }  
            else
            {
                this.setFirstNewObjPos();
                this.setGuideActive(true);
            }
        }
    },
    setGuideActive(v)
    {
        var localnickname = storage_con._instance.getUserNickName();
        var localbirthday =  storage_con._instance.getBirthdayDay();
        if(!!localnickname && !!localbirthday)
        {
            this.guideObj.active = v;
            this.guideMaskObj.active = v;
        }
        else
        {
            this.guideObj.active = false;
            this.guideMaskObj.active = false;
        }
    },
    selectActor(id)
    {
        this.actorId = id;
    },
    selectProgressChapter(id)
    {
        console.log(" selectProgressChapter id s"+id);
        this.chapterId = id;
        
        if(this.chapterId=="2002")
        {
            this.actorId = "1000";
        }
        this.okClick();

        console.log("current selectProgressChapter id is " + id);
    },
    okClick()
    {
        if(!!this.actorId&& !!this.chapterId)
        {
            if(!!this.chapterIngDic[this.chapterId])
            {
                global.isRecoverLastNode = true;
            }
            if(parseInt(this.chapterId) == (global.QTEChapterId-1))
            {
                if(!!this.chapterIngDic[(global.QTEChapterId).toString()])
                {
                    this.chapterId = global.QTEChapterId.toString();
                    global.isRecoverLastNode = true;
                }
            }
            global.selectActorId =  parseInt(this.actorId) ;
            global.selectChapterId =  parseInt(this.chapterId) ;

            this.loadDialogue();
        }
    },
    loadDialogue()
    {
        dialogueLoadingCon._instance.show();
        musicCon._instance.loadLocalAudios(global.selectChapterId ,(v)=>{
            if(v>0)
            {
                console.log("当前加载完成！！！当前加载完成！！！当前加载完成！！！当前加载完成！！！当前加载完成！！�?);
            }
            else
            {
                console.log("当前加载失败！！！当前加载失败！！！当前加载失败！！！当前加载失败！！！当前加载失败！！�?);
            }
            this.gotoDialogue();
        });
    },
    gotoFirstChapter()
    {
        global.selectActorId = 1000 
        global.selectChapterId = 2001;
        
        this.chapterId =   global.selectActorId;

        console.log("this.chapterIngDic");
        console.log(this.chapterIngDic);
        if(!!this.chapterIngDic[this.chapterId])
        {
            global.isRecoverLastNode = true;
        }
        
        this.loadDialogue();
    },
    gotoEndChapter()
    {
        global.selectActorId = 1000;
        global.selectChapterId = 2003;
        
        console.log("global.selectActorId is " +  global.selectActorId  + " selectchapter is  " + global.selectChapterId);
        this.chapterId =   global.selectActorId;

        this.loadDialogue();
    },

    isIngChapter(cid)
    {
        if(!!this.chapterIngDic[this.chapterId])
        {
            return true;
        }
        else{
            return false;
        }
    },
    cancelClick()
    {
        this.node.active = false;
    },
    backToHome()
    {
        gotoScene("home");
    },
    setIngObjPos(obj)
    {
        var posx =obj.x;
        var posy = obj.y;
        var percent = this.getScrollViewPrecent(posy);
        this.progressScrollviewObj.scrollToPercentVertical(percent);
        this.ingSpriteObj.setPosition(cc.v2(posx,posy));
    },
    setNewObjPos(obj)
    {
        var posx =obj.x;
        var posy = obj.y;
        var percent = this.getScrollViewPrecent(posy);
        this.progressScrollviewObj.scrollToPercentVertical(percent);
        this.newSpriteObj.setPosition(cc.v2(posx,posy));
    },
    setFirstNewObjPos()
    {
        var posx =this.firstChapterItemObj.x;
        var posy = this.firstChapterItemObj.y;
        this.newSpriteObj.setPosition(cc.v2(posx,posy));
    },
    gotoSubBranch()
    {
        global.selectActorId =  1000 ;
        global.selectChapterId =  2002;
        this.loadDialogue();
    },
    showSubBranchPanel()
    {
        this.subBranchObj.getComponent("subBranchCon").show();
    },
    recover()
    {
        for(var ckey in this.chapterItemDic) 
        {
            if(this.chapterItemDic[ckey])
            {
                this.chapterItemDic[ckey.toString()].getComponent("progressChapterItem").setActiveItem(false);
            }
        }

        this.chapterIngDic={};
        var posx =30000;
        var posy =10000;
        this.newSpriteObj.setPosition(cc.v2(posx,posy));
        this.ingSpriteObj.setPosition(cc.v2(posx,posy));

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
    gotoDialogue()
    {
        if(!!musicCon._instance)
        {
            musicCon._instance.stop();
        }
        global.branchStr = "";
        this.saveChapterPos();
        gotoScene("dialogue");
    },
    saveChapterPos()
    {
        var posY = this.chapterContainerObj.y;
        storage_con._instance.saveHomeChapterPos(posY);
    }




});


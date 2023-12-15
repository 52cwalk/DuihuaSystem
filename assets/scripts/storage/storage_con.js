var global = require("globalSetting");

var storage_con = cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    statics:{
        _instance:null
    },
    onLoad()
    {
        storage_con._instance = this;
    },
    start()
    {
        
        
    },
    deleteReward(key)
    {
        cc.sys.localStorage.removeItem(key);
    },
    getReward(key)
    {
      return  cc.sys.localStorage.getItem(key);
    },
    setReward(key,value)
    {
        cc.sys.localStorage.setItem(key,value);
    },
    checkIsHaveRewards(rews)
    {
        for(var i=0; i!= rews.length;i++)
        {
            var sv = this.getReward(rews[i]);
            console.log("checkIsHaveRewards is called key is " + rews[i]+" value is " + sv);
            if(!!!sv)
            {
                return false;
            }
        }
        return true;
    },
    setRewards(rews,v)
    {
        for(var i=0; i!= rews.length;i++)
        {
            this.setReward(rews[i],v);
        }
    },
    saveUserNickName(unn)
    {
        cc.sys.localStorage.setItem("l_user_nickname",unn);
    },
    getUserNickName()
    {
        return cc.sys.localStorage.getItem("l_user_nickname");
    },
    saveBirthdayDay(cv)
    {
        cc.sys.localStorage.setItem("birthday",cv);
    },
    getBirthdayDay()
    {
        return  cc.sys.localStorage.getItem("birthday");
    },
    saveCurrentNodeConfig(config)
    {
        cc.sys.localStorage.setItem("l_currentnode_config", JSON.stringify(config));
    },
    getCurrentNodeConfig()
    {
        var currentconfig = cc.sys.localStorage.getItem("l_currentnode_config");
        if(!!currentconfig)
        {
            return  JSON.parse( currentconfig);
        }
        else
        {
            return null;
        }
    },
    clearCurrentNodeConfig()
    {
         cc.sys.localStorage.removeItem("l_currentnode_config");
    },
    addActiveActor(actor)
    {
        var activeactorConfig = this.getActivetActor();
        if(!!activeactorConfig) 
        {
            activeactorConfig[actor] = true;
        }
        else
        {
            activeactorConfig = {};
            activeactorConfig[actor] = true;
        }

        cc.sys.localStorage.setItem("activeactor",  JSON.stringify(activeactorConfig));
    },
    getActivetActor()
    {
        var actorconfig = cc.sys.localStorage.getItem("activeactor");
        if(!!actorconfig)
        {
            return  JSON.parse( actorconfig);
        }
        else
        {
            return null;
        }
        
    },
    saveCurrentActor(actor)
    {
        cc.sys.localStorage.setItem("l_currentactor", actor);
    },
    getCurrentActor()
    {
        var actor = cc.sys.localStorage.getItem("l_currentactor");
        if(!!actor)
        {
            return  actor;
        }
        else
        {
            return null;
        }
    },
    clearCurrentActor()
    {
        cc.sys.localStorage.removeItem("l_currentactor");
    },
    saveQTEActor(actor)
    {
        cc.sys.localStorage.setItem("QTE_actor", actor);
    },
    getQTEActor()
    {
        var actor = cc.sys.localStorage.getItem("QTE_actor");
        if(!!actor)
        {
            return  actor;
        }
        else
        {
            return null;
        }
    },
    clearQTEActor()
    {
        cc.sys.localStorage.removeItem("QTE_actor");
    },
      
    saveLastestNodeConfig(config)
    {
        cc.sys.localStorage.setItem("l_lastestnode_config", JSON.stringify(config));
    },
    getLastestNodeConfig()
    {
        var lastconfig = cc.sys.localStorage.getItem("l_lastestnode_config");
        if(!!lastconfig)
        {
            return  JSON.parse( lastconfig);
        }
        else
        {
            return null;
        }
    },
    clearLastestNodeConfig()
    {
         cc.sys.localStorage.removeItem("l_lastestnode_config");
    },
    saveChapterConfig(actor,chapter)
    {
        var chapterDatas = getActorChapterConfig(actor);
        if(!!chapterDatas)
        {
            var idx = chapterDatas.indexOf(chapter);
            if(idx<0)
            {
                chapterDatas = chapterDatas+"_"+ chapter;
            }
        }
        else
        {
            chapterDatas = chapter;
        }
        if(!!chapterDatas)
        {
            cc.sys.localStorage.setItem(actor+"_chapters",chapterDatas);
        }
    },
    getActorChapterConfig(actor)
    {
        return  cc.sys.localStorage.getItem(actor+"_chapters");
    },
    getTargetChapterConfig(actor,chapter)
    {
        var chapterDatas=  getActorChapterConfig(actor);
        if(!!chapterDatas)
        {
            var idx = chapterDatas.indexOf(chapter);
            if(idx>=0)
            {
                return true;
            }
        }
        return false;
    },
    
     addFinishedActor(aid)
     {
        var fconfig = this.getFinishedConfig();
        if(!fconfig)
        {
            fconfig = {};
            fconfig[aid] =true;
        }
        else
        {
            fconfig[aid] = true;
        }
        this.saveFinishedConfig(fconfig);
     },
    saveFinishedConfig(config)
    {
        cc.sys.localStorage.setItem("finished_ActorList", JSON.stringify(config));
    },
    getFinishedConfig()
    {
        var finishActorConfig = cc.sys.localStorage.getItem("finished_ActorList");

        if(!!finishActorConfig)
        {
            return  JSON.parse(finishActorConfig);
        }
        else{
            return null;
        }
    },
    getTargetFinishedStatus(actor,chapter)
    {
        var finishChapterConfig = this.getFinishedChapterConfig(actor);

        if(!!finishChapterConfig && !!finishChapterConfig[actor][chapter])
        {
            return true;
        }
        return false;
    },

    addFinishedChapter(aid,chapterid)
     {
        console.log("是的，我进来了，完成章节 id :" + aid +" 章节id : " + chapterid);

        var fconfig = this.getFinishedChapterConfig(aid);
        console.log("fconfig")
        if(!fconfig)
        {
            fconfig = {};
            fconfig[aid]={};
            fconfig[aid][chapterid] = true;
        }
        else
        {
            if(!!!fconfig[aid])
            {
                fconfig[aid]={};
                fconfig[aid][chapterid] = true;
            }
            else
            {
                fconfig[aid][chapterid] = true;
            }
        }
        this.saveFinishedChapterConfig(aid,fconfig);
     },
    saveFinishedChapterConfig(aid,config)
    {
        cc.sys.localStorage.setItem(aid+"_FinishedChapterList", JSON.stringify(config));
    },
    getFinishedChapterConfig(aid)
    {
        var finishedConfig = cc.sys.localStorage.getItem(aid+"_FinishedChapterList");
        if(!!finishedConfig)
        {
            return  JSON.parse(finishedConfig);
        }
        else{
            return null;
        }
    },
    addActiveChapter(aid,chapterid)
     {
        console.log("是的，我进来了，激活了 角色id :" + aid +" 章节id : " + chapterid);

        var fconfig = this.getActiveChapterConfig(aid);
        if(!fconfig)
        {
            fconfig = {};
            fconfig[aid]={};
            fconfig[aid][chapterid] = true;
        }
        else
        {
            if(!!!fconfig[aid])
            {
                fconfig[aid]={};
                fconfig[aid][chapterid] = true;
            }
            else
            {
                fconfig[aid][chapterid] = true;
            }
        }
        this.saveActiveConfig(aid,fconfig);
     },
    saveActiveConfig(aid,config)
    {
        cc.sys.localStorage.setItem(aid+"_ActiveChapterList", JSON.stringify(config));
    },
    getActiveChapterConfig(aid)
    {
        var activeConfig = cc.sys.localStorage.getItem(aid+"_ActiveChapterList");
        if(!!activeConfig)
        {
            return  JSON.parse(activeConfig);
        }
        else{
            return null;n
        }
    },
    getMaxActiveChapter(aid)
    {
        var activeConfig = cc.sys.localStorage.getItem(aid+"_ActiveChapterList");

        activeConfig = JSON.parse(activeConfig);
        console.log("getMaxActiveChapter is called ");
        console.log(activeConfig);
        
        if(!!activeConfig[aid])
        {
            var maxChapter = 0;
            for(var akey in activeConfig[aid])
            {
                if(parseInt(akey) > maxChapter)
                {
                    maxChapter = parseInt(akey);
                }
            }
            return maxChapter;
        }
        else{
            if(aid == "1000")
            {
                return "2001";
            }
            return null;
        }
        
    },
    addCurrentRewards(ckey)
    {
        var fconfig = this.getCurrentRewards();
        if(!fconfig)
        {
            fconfig = {};
            fconfig[ckey] =true;
        }
        else
        {
            fconfig[ckey] = true;
        }
        this.saveCurrentRewards(fconfig);
    },
    saveCurrentRewards(config)
    {
        cc.sys.localStorage.setItem("currentRewards", JSON.stringify(config));
    },
    getCurrentRewards()
    {
        var rewardConfig = cc.sys.localStorage.getItem("currentRewards");
        if(!!rewardConfig)
        {
            return  JSON.parse(rewardConfig);
        }
        else{
            return null;
        }
    },
    clearCurrentRewards()
    {
        cc.sys.localStorage.removeItem("currentRewards");
    },
    saveNewNodeConfig(actor,chapterid)
    {
        var config = {
            actor:actor,
            chapter:chapterid
        }
        cc.sys.localStorage.setItem(actor+"_newChapter",  JSON.stringify(config));
    },
    getNewNodeConfig(actor)
    {
        var newConfig = cc.sys.localStorage.getItem(actor + "_newChapter");
        if(!!newConfig)
        {
            return  JSON.parse(newConfig);
        }
        else{
            return null;
        }
    },
    
    clearNewNodeConfig(actor)
    {
        cc.sys.localStorage.removeItem(actor + "_newChapter");
    },
    clearAllNewNodeConfig()
    {
        if(!!global)
        {
            for(var akey in global.actorDic)
            {
                cc.sys.localStorage.removeItem(akey + "_newChapter");
            }
        }
    },
    saveLastPublicNewConfig(v)
    {
        cc.sys.localStorage.setItem("lastPublic", v);
    },
    getLastPublicNewConfig(v)
    {
        return cc.sys.localStorage.getItem("lastPublic");
    },
    saveOpenid(op)
    {
        cc.sys.localStorage.setItem("userOpenid",op);
    },
    getOpenid()
    {
        return  cc.sys.localStorage.getItem("userOpenid");
    },
    saveActiveCode(code)
    {
        cc.sys.localStorage.setItem("activeCode",code);
    },
    getActiveCode()
    {
        return  cc.sys.localStorage.getItem("activeCode");
    },
    saveExchangeCode(code)
    {
        cc.sys.localStorage.setItem("exchangeCode",code);
    },
    getExchangeCode()
    {
        return  cc.sys.localStorage.getItem("exchangeCode");
    },
    saveSelectHeadPath(pt)
    {
        cc.sys.localStorage.setItem("headpath",pt);
    },
    getSelectHeadPath()
    {
        return  cc.sys.localStorage.getItem("headpath");
    },
    saveLastDialogueMusicBg(musicid)
    {
        cc.sys.localStorage.setItem("dialogueMusicId",musicid);
    },
    getLastDialogueMusicBg()
    {
        return cc.sys.localStorage.getItem("dialogueMusicId");
    },
    saveHomeChapterPos(posY)
    {
        cc.sys.localStorage.setItem("homeChapterPos",posY);
    },
    getHomeChapterPos()
    {
        return cc.sys.localStorage.getItem("homeChapterPos");
    },
    saveLastestContent(huiguContents)
    {
        cc.sys.localStorage.setItem("lastestHuigu",JSON.stringify(huiguContents));
    },
    getLastestContent()
    {
        var currentconfig = cc.sys.localStorage.getItem("lastestHuigu");
        if(!!currentconfig)
        {
            return  JSON.parse( currentconfig);
        }
        else
        {
            return null;
        }
    },
    saveActorSkipRecord(actorid,chapterid,branchStr)
    {
        var branchDic = this.getActorSkipRecord(actorid);
        if(!!branchDic)
        {
            if(!!branchDic[chapterid])
            {
                if(branchDic[chapterid].indexOf(branchStr)<0)
                {
                    branchDic[chapterid].push(branchStr);
                }
            }
            else{
                branchDic[chapterid] = [];
                branchDic[chapterid].push(branchStr);
            }
        }
        else
        {
            branchDic = {};
            branchDic[chapterid] = [];
            branchDic[chapterid].push(branchStr);
        }
        cc.sys.localStorage.setItem(actorid+"_skipBranch",JSON.stringify(branchDic));
    },
    getActorSkipRecord(actorid)
    {
        var branchdata = cc.sys.localStorage.getItem(actorid+"_skipBranch");
        if(!!branchdata)
        {
            var branchDic = JSON.parse( branchdata);
            if(!!branchDic)
            {
                return branchDic;
            }
            else
            {
                return null;
            }
        }
        else
        {
            return null;
        }
    },
    getActorChapterSkipRecord(actorid,chapterid)
    {
        var branchdata = cc.sys.localStorage.getItem(actorid+"_skipBranch");
        if(!!branchdata)
        {
            var branchDic = JSON.parse( branchdata);
            if(!!branchDic[chapterid])
            {
                return branchDic[chapterid];
            }
            else
            {
                return null;
            }
        }
        else
        {
            return null;
        }
    },
    checkActorSkipRecord(actorid,chapterid,branchStr)
    {
        var branchDic = this.getActorChapterSkipRecord(actorid,chapterid);
        console.log("in checkActor Skip Record is ");
        console.log(branchDic);
        if(!!branchDic&&branchDic.length>0)
        {
            for(var i = 0;i!=branchDic.length;i++)
            {
                if(branchDic[i].indexOf(branchStr)>=0)
                {
                    return true;
                }
            }
        }
        console.log(" checkActorSkipRecord is return false; ");
        return false;
    },
    checkStartActorSkipStatus(actorid,chapterid)
    {
        var branchDic = this.getActorChapterSkipRecord(actorid,chapterid);
        if(!!branchDic&&branchDic.length>0)
        {
            return true;
        }
        return false;
    },
    saveRecoverSkipStatus(branchStr)
    {
        cc.sys.localStorage.setItem("currentRecoverSkipStatus",branchStr);
    },
    getRecoverSkipStatus()
    {
       return cc.sys.localStorage.getItem("currentRecoverSkipStatus");
    },
    clearRecoverSkipStatus()
    {
        cc.sys.localStorage.removeItem("currentRecoverSkipStatus");
    },
    clearLastestContent()
    {
        cc.sys.localStorage.removeItem("lastestHuigu");
    },
    getBgMusicVolume()
    {
        return cc.sys.localStorage.getItem("bgMusicVolume");
    },
    setBgMusicVolume(v)
    {
        cc.sys.localStorage.setItem("bgMusicVolume",v);
    },
    getEffectMusicVolume()
    {
        return cc.sys.localStorage.getItem("effectMusicVolume");
    },
    setEffectMusicVolume(v)
    {
        cc.sys.localStorage.setItem("effectMusicVolume",v);
    },
    setEnableBgMusic(v)
    {
        cc.sys.localStorage.setItem("enableMusicBgVolume",v);
    },
    getEnableBgMusic(v)
    {
        return cc.sys.localStorage.getItem("enableMusicBgVolume");
    },
    setEnableEffectMusic(v)
    {
        cc.sys.localStorage.setItem("enableMusicEffectVolume",v);
    },
    getEnableEffectMusic()
    {
        return cc.sys.localStorage.getItem("enableMusicEffectVolume");
    },
    setNewAchievementReward(v)
    {
        if(v)
        {
            cc.sys.localStorage.setItem("isHaveNewAchievementReward",v);
        }
        else
        {
            cc.sys.localStorage.removeItem("isHaveNewAchievementReward");
        }
    },
    getNewAchievementReward()
    {
        return cc.sys.localStorage.getItem("isHaveNewAchievementReward");
    },
    setNewBagReward(v)
    {
        if(v)
        {
            cc.sys.localStorage.setItem("isHaveNewBagReward",v);
        }
        else
        {
            cc.sys.localStorage.removeItem("isHaveNewBagReward");
        }
    },
    getNewBagReward()
    {
        return cc.sys.localStorage.getItem("isHaveNewBagReward");
    },
    setNewZhongchouMark(v)
    {
        cc.sys.localStorage.setItem("isFinishedZhongchou",v);
    },
    getNewZhongchouMark()
    {
        return cc.sys.localStorage.getItem("isFinishedZhongchou");
    },
    clearProgress()
    {
        
        
        
        
        
        
        
    },
    setShowSelectActorConfig()
    {
        cc.sys.localStorage.setItem("isShowSelectActorMenu",1);
    },
    getShowSelectActorConfig()
    {
        return cc.sys.localStorage.getItem("isShowSelectActorMenu");
    },
    clearShowSelectActorConfig()
    {
        cc.sys.localStorage.removeItem("isShowSelectActorMenu");
    },

    setShowTipGuide()
    {
        cc.sys.localStorage.setItem("isShowTipGuide",1);
    },
    getShowTipGuide()
    {
        return cc.sys.localStorage.getItem("isShowTipGuide");
    },
    clearShowTipGuide()
    {
        cc.sys.localStorage.removeItem("isShowTipGuide");
    },

    setExchangeGuide(v)
    {
        cc.sys.localStorage.setItem("isExchangeTipGuide",v);
    },
    getExchangeGuide()
    {
        return cc.sys.localStorage.getItem("isExchangeTipGuide");
    },
    clearExchangeGuide()
    {
        cc.sys.localStorage.removeItem("isExchangeTipGuide");
    },
});

module.exports = storage_con;





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
        // let keys = Object.keys(cc.sys.localStorage);
        // cc.log("all localStorage keys: ", JSON.stringify(keys));
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
            if(!!!sv||sv!="true"||sv==false)
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
    saveSelectHeadPath(pt)
    {
        cc.sys.localStorage.setItem("headpath",pt);
    },
    getSelectHeadPath()
    {
        return  cc.sys.localStorage.getItem("headpath");
    },
    
});

module.exports = storage_con;



var global = require("globalSetting");

var bgAudioClipItem = cc.Class({
    name: "bgAudioClipItem",
    properties: {
        audioClipId:"audioname",
        
        audioClip:{
            type: cc.AudioClip,
            default:null,
        },
    }
});

var musicCon = cc.Class({
    extends: cc.Component,
    properties: {
    
  
    },
    statics:{
        _instance:null
    },  
    onLoad()
    {
        if(!!musicCon._instance)
        {
            this.node.destroy();
            console.log("musicCon is called is not exsited !");
            return;
        }
        musicCon._instance =this;
        if (typeof wx != 'undefined') {
            wx.onShow(()=>{
                console.log("yes ,weo jin rule game !");
             
            });
        }
       

        cc.game.addPersistRootNode(this.node);

        cc.game.on(cc.game.EVENT_GAME_INITED, () => {
            cc.game.on(cc.game.EVENT_SHOW, () => {
                
                cc.game.resume();
                
               
                if (typeof wx != 'undefined') {
                    wx.setKeepScreenOn({
                        keepScreenOn: true,
                        complete:function()
                        {
                            console.log("禁止屏幕熄灭调用完成！！�?);
                        }
                    });
                }
                console.log("我已经重新进入了游戏了哦 我已经重新进入了游戏了哦 我已经重新进入了游戏了哦 !!!!!!" );
            });
    
            cc.game.on(cc.game.EVENT_HIDE, () => {

               
              
                cc.game.pause();
                console.log("我已经进入了后台了哈 我已经进入了后台了哈 我已经进入了后台了哈  我已经进入了后台了哈 ！！�?);
            });
        })
        this.playEnabled = true;
        this.musicClipDic ={};
    },
    start () {
        this.currentClipId = "";
        this.musicBgObjId = -1;

        if (typeof wx != 'undefined') {
            wx.setKeepScreenOn({
                keepScreenOn: true,
                complete:function()
                {
                    console.log("禁止屏幕熄灭调用完成！！�?);
                }
              });
        }
        

	
    },
    stopClick()
    {
        this.stopFade();
    },
    playAudio(mid)
    {
        this.lastMusicUrl = mid;
        global.currentMusicBgId = mid;
        
        this.loadOtherMusic(mid);
    },
    playRecoverAudio(mid)
    {
        this.loadOtherMusic(mid);
    },
    loadOtherMusic(id)
    {
        if( this.currentClipId ==id  && !!this.currentClipId)
        {
            return;
        }

        var that = this;

        cc.audioEngine.stopAll();
        console.log("this.musicClipDic");
        console.log(this.musicClipDic);
        
        
        
        

        
        
        
        
        
        
        {
            cc.loader.loadRes("music/bg/"+id, cc.AudioClip, function(err, clip) {
                            if (err) {
                                console.log(err);
                                console.log("加载音乐错误！！�?);
                                cc.audioEngine.stopAll();
                                return;
                            }
                        that.musicBgObjId = cc.audioEngine.playMusic(clip, true);
                        
                        
                        if(!!that.currentClipId)
                        {
                            console.log("前一个音乐id " + that.currentClipId);

                            cc.loader.releaseRes("music/bg/"+that.currentClipId,cc.AudioClip);
                        }
                        
                        that.currentClipId = id;
                  
                     
                        console.log("重新加载音乐 " +  that.musicBgObjId  +" 完成！！" +" bgm id is "+ that.currentClipId);
                          
                    });
        }
        

    },
    playFade()
    {
        var curVolume = 0;
        cc.audioEngine.setVolume( this.musicBgObjId, curVolume);
        this.schedule(()=> {
            if(curVolume < this.maxVolume){
                curVolume += 0.1;
            }
            else
            {
                curVolume = this.maxVolume;
            }
            cc.audioEngine.setVolume( this.musicBgObjId, curVolume);
            console.log("音量  进度" + curVolume );
        }, 0.2, 10, 0.01);
    },
   
    stopFade()
    {
        var curVolume =  cc.audioEngine.getVolume(this.musicBgObjId);
        this.schedule(()=> {
            if (curVolume > 0) {
                curVolume -= 0.1;
                if(curVolume<=this.maxVolume && curVolume>=0)
                {
                    cc.audioEngine.setVolume( this.musicBgObjId, curVolume);
                }
            }
            else
            {
                curVolume = 0;
                cc.audioEngine.stop(this.musicBgObjId);
            }
        }, 0.2, 10, 0.01);
    },
    getTargetAudioClip(id)
    {
        for(var i = 0;i!=this.audioClips.length;i++)
        {
            if(this.audioClips[i].audioClipId == id)
            {
                return this.audioClips[i].audioClip;
            }         
        }
        return null;
    },
    stop()
    {
        console.log("music stop is called pre-musicid is" +this.currentClipId);
        this.currentClipId = "";
        this.musicBgObjId = -1;
        cc.audioEngine.stopAll();
    },
    recover()
    {
        this.playAudio(this.lastMusicUrl);
    },
    loadLocalAudios(chapterid,func)
    {
        var audioids = global.chapterMusic[chapterid];
        if(!!!audioids)
        {
            console.log("we have back loadLocalAudios !!! ");
            func(0);
            return;
        }
        this.audioLength = audioids.length;
        this.loadOverCount = 0;
        var that = this;
        this.musicClipDic ={};
        for(var i = 0;i!=audioids.length;i++)
        {
            console.log("记载�? " +(i+1)+" 个音�?id is " +  audioids[i]);
            cc.loader.loadRes("music/bg/"+audioids[i], cc.AudioClip, function(err, clip) {
                if (err) {
                    console.log(err);
                    func(0);
                    return;
                }
              
                that.loadOverCount++;
                if(that.loadOverCount == that.audioLength )
                {
                    func(1);
                }
                
            });
        }
    },
    loadPreHomeAudio(func)
    {
        this.loadLocalAudios("2002",func);
    },
    setBgMusicVolume(v)
    {
        this.bgMusicVolume = v;
     
        if(this.musicBgObjId>=0)
        {
            cc.audioEngine.setMusicVolume(global.bgMaxVolume * this.bgMusicVolume); 
        }
    }

    
});


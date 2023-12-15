var global = require("globalSetting");
var config_data = require("config_data");
var dialogueSystem = require("dialogueSystem");
var dialogueLoadingCon = require("dialogueLoadingCon");
const storage_con = require("../storage/storage_con");
var musicCon = require("musicCon");
cc.Class({
    extends: cc.Component,

    properties: {
        autoPlayingSpriteObj:cc.Sprite,
        autoPlaySpriteFrame:cc.SpriteFrame,
        playingSpriteFrame:cc.SpriteFrame,
        skipBtnObj:cc.Node
    },
    onLoad()
    {
        this.enableSkip = false;
    },
    start () {
        var isEnableSkip = storage_con._instance.checkStartActorSkipStatus(global.selectActorId,global.selectChapterId);
        var isFinished = storage_con._instance.getTargetFinishedStatus(global.selectActorId,global.selectChapterId);
        
        if((global.isFeatureMode&&global.isFeatureOver)||global.isRecoverLastNode)
        {
            var recoverChapter = storage_con._instance.getRecoverSkipStatus();
         
         
            if(!!recoverChapter)
            {
                global.branchStr = recoverChapter;
                var currentEnableSkip = storage_con._instance.checkActorSkipRecord(global.selectActorId,global.selectChapterId,global.branchStr);
            
           
                if(currentEnableSkip)
                {
                    this.setSkipEnabled(true);
                }
                else
                {
                    if(isEnableSkip)
                    {
                        if(global.branchStr.indexOf("-1"))
                        {
                            var splitArr = global.branchStr.split("_");
                            console.log("splitArr —�?splitArr- splitArr—�?splitArr is ");
                            console.log(splitArr);
                            if(splitArr[splitArr.length-1] =="-1")
                            {
                                this.setSkipEnabled(true);
                            }
                        }
                    }
                    
                }
            }else if(isFinished||isEnableSkip)
            {
                this.setSkipEnabled(true);
            }
        }
        else
        {
            storage_con._instance.clearRecoverSkipStatus();
            if(isEnableSkip || isFinished)
            {
                this.setSkipEnabled(true);
            }
        }

        this.intervalTime = 1000;
        this.preTime= Date.now();
    },
    backToHome()
    {
        
        

        if(!!musicCon._instance)
        {
            musicCon._instance.stop();
        }
       
        dialogueSystem._instance.releaseBgAndLihui();
        
        config_data._instance.saveLastestConfig();
        dialogueLoadingCon._instance.show();
        
        if(global.selectChapterId == "3100")
        {
            storage_con._instance.clearLastestNodeConfig();
        }
        
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
    
    autoPlayClick()
    {

        var currentTime = Date.now();
        var ccstime = currentTime - this.preTime;
        if(ccstime<this.intervalTime)
        {
            return;
        }
        this.preTime = currentTime;

        if( dialogueSystem._instance.isEnabelAutoPlay())
        {
            if(dialogueSystem._instance.isAutoPlaying())
            {
                dialogueSystem._instance.stopAutoPlay();
                this.updateAutoPlayUI(false);
            }
            else
            {
                dialogueSystem._instance.autoPlay();
                this.updateAutoPlayUI(true);
            }
        }
    },
    stopAutoPlay()
    {
        this.updateAutoPlayUI(false);
    },
    updateAutoPlayUI(v)
    {
        this.autoPlayingSpriteObj.spriteFrame = v?this.playingSpriteFrame:this.autoPlaySpriteFrame;
    },
    setSkipEnabled(v)
    {
        this.skipBtnObj.active = v;
        console.log("哈哈哈哈啊手动阀双方的，是的，我进来了！！！！！"+v);
        this.enableSkip = v;
    },
    skipPlayClick()
    {
        if(this.enableSkip)
        {
            if(!dialogueSystem._instance.isAutoPlaying())
            {
                dialogueSystem._instance.skip();
            }
        }
    },
    gotoMemory()
    {
        config_data._instance.saveLastestConfig();
        gotoScene("memory_bag");
    }

    
});


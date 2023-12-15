var global = require("globalSetting");
var musicCon = require("musicCon");
var dialogueLoadingCon = require("dialogueLoadingCon");
var storage_con  = require("storage_con");
cc.Class({
    extends: cc.Component,

    properties: {
        zhongchounewObj:cc.Node,
        memoryConObj:cc.Node
      
    },
    onLoad()
    {
    },
    start () {
        var isShowNewZhongchou = storage_con._instance.getNewZhongchouMark();
        if(!!!isShowNewZhongchou)
        {
            this.zhongchounewObj.active = true;
        }

        
    },
    gotoDialogue()
    {
        global.selectActorId =  1000 ;
        global.selectChapterId =  3100;
        dialogueLoadingCon._instance.show();
        storage_con._instance.setNewZhongchouMark(true);
        this.memoryConObj.getComponent("memoryCon").checkIfSawAllBags();
        if(!!musicCon._instance)
        {
            musicCon._instance.loadLocalAudios(global.selectChapterId ,(v)=>{
                if(v>0)
                {
                    console.log("当前加载众筹音乐完成！！！当前加载众筹音乐完成！！！当前加载众筹音乐完成！！！当前加载众筹音乐完成！！！当前加载众筹音乐完成！！�?);
                }
                else
                {
                    console.log("当前加载众筹音乐失败！！！当前加载众筹音乐失败！！！当前加载众筹音乐失败！！！当前加载众筹音乐失败！！！当前加载众筹音乐失败！！�?);
                }
                gotoScene("dialogue");
            });
        }
    },
    

});


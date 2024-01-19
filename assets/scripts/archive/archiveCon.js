var global = require("globalSetting");
var dialogueSystem = require("dialogueSystem");

cc.Class({
    extends: cc.Component,
    properties: {
        actorItemArr:[cc.Node],
        chapterItemPrefabObj:cc.Prefab,
        chapterContainerArr:[cc.Node],
        bgObjsArr:[cc.Node],
    },

    start () {
        this.initEle();
        this.currentActiveNode = null;
        if(this.actorItemArr.length>0)
        {
            this.currentActiveNode = this.actorItemArr[0];
        }

        this.currentChapterNode = null;
        if(this.chapterContainerArr.length>0)
        {
            this.currentChapterNode = this.chapterContainerArr[0];
        }

        this.currentSelectActorIndex = 0;

    
    },
    initEle()
    {
        for(var i=0;i!=this.actorItemArr.length;i++)
        {
            this.actorItemArr[i].getComponent("archiveActorItem").setArchiveCon(this.node);
        }

        // var actorDic = {
        //     "1000":"公共",
        //     "1001":"周棋洛",
        //     "1002":"李泽言",
        //     "1003":"白起",
        //     "1004":"许墨"
        // }
        
        for (var akey in global.actorDic) {
            var index = parseInt(akey)%1000;
            console.log(index);
            if(index==0)
            {
                for (var ckey in global.publicDic) {
                    var chapteritemobj = cc.instantiate(this.chapterItemPrefabObj);
                    chapteritemobj.parent = this.chapterContainerArr[index];
                    chapteritemobj.getComponent("archiveChapterItem").initItem(akey,ckey,global.publicDic[ckey]);
                    chapteritemobj.getComponent("archiveChapterItem").setArchiveCon(this.node);
                }
                this.actorId = akey;//初始化选中角色
            }
            else
            {
                for (var ckey in global.chapterDic) {
                    var chapteritemobj = cc.instantiate(this.chapterItemPrefabObj);
                    chapteritemobj.parent = this.chapterContainerArr[index];
                    chapteritemobj.getComponent("archiveChapterItem").initItem(akey,ckey,global.chapterDic[ckey]);
                    chapteritemobj.getComponent("archiveChapterItem").setArchiveCon(this.node);
                }
            }
        }
    },
    selectArchiveActor(obj,id)
    {
        if(obj!= this.currentActiveNode)
        {
            this.currentActiveNode.getComponent("archiveActorItem").unSelect();
        }
        this.currentActiveNode = obj;

        var index = parseInt(id)%1000;

        if(this.currentSelectActorIndex !=index)
        {
           this.chapterContainerArr[this.currentSelectActorIndex].active = false; 
           this.bgObjsArr[this.currentSelectActorIndex].active = false;
           this.currentSelectActorIndex = index;
        }
        this.chapterContainerArr[ this.currentSelectActorIndex ].active = true;
        this.bgObjsArr[this.currentSelectActorIndex].active = true;
        this.actorId = id;
    },
    selectArchiveChapter(id)
    {
        this.chapterId = id;
        this.okClick();

        console.log("current selectArchiveChapter id is " + id);
    },
    okClick()
    {
        if(!!this.actorId&& !!this.chapterId)
        {
            global.selectActorId =  parseInt(this.actorId) ;
            global.selectChapterId =  parseInt(this.chapterId) ;
            cc.director.loadScene("dialogue");
        }
    },
    cancelClick()
    {
        this.node.active = false;
    },
    backToHome()
    {
        cc.director.loadScene("home");
    }
});

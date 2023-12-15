var storage_con  = require("storage_con");

cc.Class({
    extends: cc.Component,

    properties: {
        branchItemObjs:[cc.Node],
        mainObj:cc.Node,
        logicObj1:cc.Node,
        logicObj2:cc.Node,
    },

    start () {
        this.initEle();
        if(this.checkIsShowActorMenu())
        {
            this.show();
        }
    },
    initEle()
    {
        for(var i =0;i!=this.branchItemObjs.length;i++)
        {
            this.branchItemObjs[i].getComponent("branchItem").initBranchCon(this.node);
        }
        this.selectObj = null;
    },
    initEvent(sevent)
    {
        this.selectEvent = sevent;
    },
    selectActorItem(aid,obj)
    {
        if(!!this.selectObj && this.selectObj!=obj)
        {
            this.selectObj.getComponent("branchItem").unSelect();
        }
        this.selectObj = obj;
        this.selectActorId = aid;
    },
    show()
    {
        this.mainObj.active = true;
        for(var i =0;i!=this.branchItemObjs.length;i++)
        {
            this.branchItemObjs[i].getComponent("branchItem").initEle();
        }
        this.selectObj = null;
        var finishedconfig =  storage_con._instance.getFinishedConfig();
        if(finishedconfig && (Object.keys(finishedconfig).length)!=4)
        {
            var flength = Object.keys(finishedconfig).length;

            if(flength>0 && flength < 4)
            {
                this.logicObj1.active = false;
                this.logicObj2.active = true;
            }
            else
            {
                this.logicObj1.active = true;
                this.logicObj2.active = false;
            }
        }
        else{
            this.logicObj1.active = true;
            this.logicObj2.active = false;
        }
    },
    close()
    {
        this.mainObj.active = false;
        storage_con._instance.clearShowSelectActorConfig();
    },
    okClick()
    {
        if(!!this.selectActorId && !!this.selectEvent)
        {
            this.selectEvent(this.selectActorId);
            this.close();
        }
    },
    checkIsShowActorMenu()
    {
        var isShow = storage_con._instance.getShowSelectActorConfig();
        if(isShow ==1)
        {
            var finishedconfig =  storage_con._instance.getFinishedConfig();
            if(finishedconfig && (Object.keys(finishedconfig).length)!=4)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        return false;
    }

});


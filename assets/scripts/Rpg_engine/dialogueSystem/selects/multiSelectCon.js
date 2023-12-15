
cc.Class({
    extends: cc.Component,
    properties: {
        selectItemPrefab:cc.Prefab,
        selectParent:cc.Node
    },

    onLoad () {
        this.selectItems=[];
    },
    initEvent(func)
    {
        this.receiveSelectResultEvent = func;
    },
    createselectItems()
    {
        this.destoryPreSelects();

        for(var i = 0;i!=this.selectConfigData.length;i++)
        {
            var selectObj = cc.instantiate(this.selectItemPrefab);
            this.selectItems.push(selectObj);

            this.selectParent.addChild( selectObj);
            selectObj.getComponent("answerSelectItem").initEle(this.selectConfigData[i]);
            selectObj.getComponent("answerSelectItem").setInputCon(this.node,i+1);
        }
    },
    setSelectConfig(cdata)
    {
        this.selectConfigData = cdata;
        this.createselectItems();
        
		
		
    },
    setNextItem(nextid,branchNo)
    {
        if(!!this.receiveSelectResultEvent)
        {
            this.receiveSelectResultEvent(nextid,branchNo);
        }
        console.log("you have select next id is " + nextid +" branchNo " + branchNo) ;
    },
    destoryPreSelects()
    {
        for(var i = 0;i!=this.selectItems.length;i++)
        {
            if(!!this.selectItems[i])
            {
                this.selectItems[i].destroy();
            }
        }
        this.selectItems = [];
    }


});



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
            selectObj.getComponent("answerSelectItem").setInputCon(this.node);
        }
    },
    setSelectConfig(cdata)
    {
        this.selectConfigData = cdata;
        this.createselectItems();
        // "multiChoicesData": {
		// 	"questionContent": "海关监管环境",
		// 	"subRelationContents": [{
    },
    setNextItem(nextid)
    {
        if(!!this.receiveSelectResultEvent)
        {
            this.receiveSelectResultEvent(nextid);
        }
        console.log("you have select next id is " + nextid);
    },
    destoryPreSelects()
    {
        for(var i = 0;i!=this.selectItems.length;i++)
        {
            if(!this.selectItems[i])
            {
                destroy(this.selectItems[i]);
            }
        }
        this.selectItems = [];
    }


});

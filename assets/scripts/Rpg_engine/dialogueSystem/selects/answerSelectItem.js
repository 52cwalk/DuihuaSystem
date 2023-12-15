
cc.Class({
    extends: cc.Component,
    properties: {
        selectLabel:cc.Label
    },

    onLoad () {
        this.selectConfigData = null;
    },
    initEle(cdata)
    {
        
		
		
        

        this.selectConfigData=cdata;
        this.selectLabel.string = cdata.contentId;
    },
    setInputCon(obj,no)
    {
        this.multiSelectConObj = obj;
        this.num = no;
    },
    itemClick()
    {
        if(!!this.multiSelectConObj)
        {
            this.multiSelectConObj.getComponent("multiSelectCon").setNextItem(this.selectConfigData.nextNodeId,this.num);
        }
    }

});


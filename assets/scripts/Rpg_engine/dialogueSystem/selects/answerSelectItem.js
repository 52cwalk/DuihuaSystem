
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
        // "nodeId": "23f9d03e-a91f-437f-abb3-76935b7bbb85",
		// 		"nextNodeId": "2a284c81-f0bf-440f-9b48-6c4636bbd777",
		// 		"contentId": "规划局",
        // 		"isSwitchDirection": 0

        this.selectConfigData=cdata;
        this.selectLabel.string = cdata.contentId;
    },
    setInputCon(obj)
    {
        this.multiSelectConObj = obj;
    },
    itemClick()
    {
        if(!!this.multiSelectConObj)
        {
            this.multiSelectConObj.getComponent("multiSelectCon").setNextItem(this.selectConfigData.nextNodeId);
        }
    }

});

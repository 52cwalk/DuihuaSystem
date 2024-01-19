
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
        this.selectLabel.string = cdata.itemText;
    },
    setMazeCon(obj)
    {
        this.mazeConObj = obj;
    },
    itemClick()
    {
        if(!!this.mazeConObj)
        {
            this.mazeConObj.getComponent("mazeCon").setNextItem(this.selectConfigData.relationNodeId,this.selectConfigData.itemText);
        }
    }

});

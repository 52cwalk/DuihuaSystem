
cc.Class({
    extends: cc.Component,

    properties: {
        itemNo:"1",
        selectSprite:cc.Sprite,
        
        selectObj:cc.Node
    },
    start () {
        this.selectNo=0;
    },
    setContainerCon(obj)
    {
        this.ContainerConObj = obj;
    },
    setSelectNo(id)
    {
        this.selectNo = id;
        if(!!this.ContainerConObj)
        {
            var selectFrame = this.ContainerConObj.getComponent("lzyItemContainer").getSelectSpriteFrame(this.selectNo);
            this.selectSprite.spriteFrame = selectFrame;
            this.selectObj.active = true;
        }
    },
    isFill()
    {
        return this.selectNo>0;
    },
    clear()
    {
        this.ContainerConObj.getComponent("lzyItemContainer").unSelect(this.selectNo);
        this.selectObj.active = false;
        this.selectNo = 0;
    },
    itemClick()
    {
        var itemNo = this.ContainerConObj.getComponent("lzyItemContainer").getCurrentItemNo();
        this.ContainerConObj.getComponent("lzyItemContainer").setCurrentBindObj(this.node,this.selectNo);
        this.setSelectNo(itemNo);
    },
    getSelectNo()
    {
        return this.selectNo;
    },
    isCurrent()
    {
        if(parseInt( this.selectNo ) ==parseInt( this.itemNo )  )
        {
            return true;
        }
        return false;
    }

});


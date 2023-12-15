
cc.Class({
    extends: cc.Component,

    properties: {
        stepItemObjs:[cc.Node],
        lzyContainerConObj:cc.Node
    },
    start () {
        this.selectIndex = 0;
        this.leftPos = cc.v2(-800,0);
        this.middlePos = cc.v2(0,0);
        this.rightPos = cc.v2(800,0);
    },
    leftClick()
    {
        if(this.selectIndex==0)
        {
            return;
        }

        var rightmove1 = cc.moveTo(0.5,this.rightPos);
        var rightmove2 = cc.moveTo(0.5,this.middlePos);

        this.stepItemObjs[this.selectIndex].runAction(rightmove1);
        this.stepItemObjs[this.selectIndex-1].runAction(rightmove2);

        
        
         this.selectIndex = this.selectIndex-1;

         this.lzyContainerConObj.getComponent("lzyItemContainer").setCurrentItemNo(this.selectIndex+1);
    },
    rightClick()
    {
        
        if(this.selectIndex==this.stepItemObjs.length-1)
        {
            return;
        }
        
        var leftmove1 = cc.moveTo(0.5,this.leftPos);
        var leftmove2 = cc.moveTo(0.5,this.middlePos);

        this.stepItemObjs[this.selectIndex].runAction(leftmove1);
        this.stepItemObjs[this.selectIndex+1].runAction(leftmove2);

        
        

        this.selectIndex = this.selectIndex+1;
        this.lzyContainerConObj.getComponent("lzyItemContainer").setCurrentItemNo(this.selectIndex+1);

    }
});


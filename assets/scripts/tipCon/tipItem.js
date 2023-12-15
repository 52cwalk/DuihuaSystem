
cc.Class({
    extends: cc.Component,

    properties: {
        showLabel:cc.Label,
        delayTime:0.5
    },

     onLoad()
     {
        this.isShow = false;
        this.originPos = cc.v2(this.node.x,this.node.y);
     },
    start () {
    },
    showTip(ss)
    {
        if(this.isShow)
        {
      
        }
        this.showLabel.string = ss;
        this.node.setPosition(this.originPos);

        var show = cc.fadeTo(0.5,255);
        
        var time = cc.delayTime(this.delayTime);
        var mov = cc.moveBy(1.5,cc.p(0,this.originPos.y+300));

        var seq1 = cc.sequence([show, time, mov]);
        this.node.runAction(seq1);
        
        var hide = cc.fadeTo(2,0);
        this.isShow = true;
        var seq2 = cc.sequence([time, hide,cc.callFunc(()=>{
            this.isShow = false;
        })]);
        
        this.node.runAction(seq2);
    },
    isShowing()
    {
        return this.isShow;
    }

    
});


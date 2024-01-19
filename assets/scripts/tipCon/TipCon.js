
var TipCon =cc.Class({
    extends: cc.Component,

    properties: {
        showLabel:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

     statics:{
         _instance:null
     },
     onLoad()
     {
        TipCon._instance = this;
        this.isShow = false;
     },
    start () {
        this._showAction = cc.moveTo(0.5, 0, 0);
        this._hideAction = cc.moveTo(0.5, 0, 1500);

        this._showRanbgAction = cc.fadeTo(1,200);
        this._hideRanbgAction = cc.fadeTo(1,0);

        //this.showTip("test isng!!! ");
    },
    showTip(ss)
    {
        if(this.isShow)
        {
      //      return;
        }
        this.showLabel.string = ss;
        this.node.setPosition(cc.v2(0,0));

        var show = cc.fadeTo(0.5,255);
        var time = cc.delayTime(0.8);
        var mov = cc.moveBy(2,cc.p(0,200));

        var seq1 = cc.sequence([show, time, mov]);
        this.node.runAction(seq1);

        var hide = cc.fadeTo(2,0);
        this.isShow = true;
        var seq2 = cc.sequence([time, hide,cc.callFunc(()=>{
            this.isShow = false;
        })]);

        this.node.runAction(seq2);

    }
    // update (dt) {},
});

export default TipCon;
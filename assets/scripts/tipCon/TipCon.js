
var TipCon =cc.Class({
    extends: cc.Component,

    properties: {
        tipItemObjs:[cc.Node]
    },

    

     statics:{
         _instance:null
     },
     onLoad()
     {
        TipCon._instance = this;
     },
    start () {
    },
    showTip(st)
    {
        var emptyTipItem = this.getEmptyTipItem();
        console.log("enter showTip is 01 " + st );
        if(emptyTipItem)
        {
            console.log("enter showTip is  02 " + st );
            emptyTipItem.getComponent("tipItem").showTip(st);
        }
    },
    getEmptyTipItem()
    {

        for(var i= 0 ;i!=this.tipItemObjs.length;i++)
        {
            var isShowing = this.tipItemObjs[i].getComponent("tipItem").isShowing();
            if(!isShowing)
            {
                return this.tipItemObjs[i];
            }
        }
        return null;
    }

    
});

export default TipCon;

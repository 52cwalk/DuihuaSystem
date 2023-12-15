
cc.Class({
    extends: cc.Component,

    properties: {
        cunyuConObj:cc.Node
    },


    start () {

    },
    animEnd(b)
    {
        if(!!this.cunyuConObj)
        {
            this.cunyuConObj.getComponent("cunyuCon").animEnd();
        }
        console.log("yes, your anim play test is end !");
    }
});



cc.Class({
    extends: cc.Component,

    properties: {
        contentObjs:[cc.Node],
        toogleBtns:[cc.Node],
        mainObj:cc.Node,
        defaultToggleObj:cc.Toggle
    },
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    start () {

    },
    setTipConfig(cf)
    {
        for(var i=0;i!=this.contentObjs.length;i++)
        {
            this.contentObjs[i].getComponent("questionTipContentItem").reset();
        }
        var tdatas  = cf;
        for(var i=0;i!=this.contentObjs.length;i++)
        {
            this.contentObjs[i].getComponent("questionTipContentItem").setContent(tdatas[i]);
        }
        this.tipItemClick(null,1);//默认第一个点击
    },
    tipItemClick(eobj,data)
    {
        for(var i=0;i!=this.contentObjs.length;i++)
        {
            this.contentObjs[i].active = (data==i+1);
        }
        this.setToggleBtnActive(data)
        console.log( "console.log(data); " +  data);
    },
    show()
    {
        this.mainObj.active = true;
    },
    close()
    {
        this.defaultToggleObj.isChecked = true;
        this.mainObj.active = false;
    },
    setToggleBtnActive(v)
    {
        for(var i = 0;i!=this.toogleBtns.length;i++ )
        {
            var posx = this.toogleBtns[i].x;
            if(v == (i+1))
            {
                this.toogleBtns[i].setPosition(cc.v2(posx,20));
            }
            else
            {
                this.toogleBtns[i].setPosition(cc.v2(posx,0));
            }
        }
    }
    // update (dt) {},
});

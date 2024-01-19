
cc.Class({
    extends: cc.Component,

    properties: {
       confirmBtn:cc.Node,
       contentLabel:cc.Label,
       tipLabel:cc.Label,
       tipBtnsContainObj:cc.Node,
       isShowTipContent:true,
    },

    start () {

    },
    setContent(ct)
    {
        this.contentLabel.string = ct;//为提示内容赋值
    },
    showTipContent()
    {
        if(!!this.tipBtnsContainObj)
        {
            this.tipBtnsContainObj.active = true;
        }

        this.confirmBtn.active = false;
        /*
        this.tipLabel.node.active = false;
        this.contentLabel.node.active = true;
        this.confirmBtn.active = false;
        console.log(" showTipContent is called  ");
        */
    },
    cancelClick()
    {
        if(!!this.tipBtnsContainObj)
        {
            this.tipBtnsContainObj.active = false;
        }
        this.confirmBtn.active = true;
    },
    okClick()
    {
        if(!!this.tipBtnsContainObj)
        {
            this.tipBtnsContainObj.active = false;
        }
        this.confirmBtn.active = false;
        this.contentLabel.node.active = true;
    },
    reset()
    {
        if(!this.isShowTipContent)
        {
            this.tipLabel.node.active  = true;
            this.contentLabel.node.active = false;
            this.confirmBtn.active = true;
            if(!!this.tipBtnsContainObj)
            {
                this.tipBtnsContainObj.active = false;
            }
        }
    }

    // update (dt) {},
});

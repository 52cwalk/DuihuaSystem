
cc.Class({
    extends: cc.Component,

    properties: {
       contentLabel:cc.Label,
       tipLabel:cc.Label,
       tipBtnsContainObj:cc.Node,
       isShowTipContent:true,
    },
    start () {

    },
    setContent(ct)
    {
        this.contentLabel.string = ct;
    },
    showTipContent()
    {
        if(!!this.tipBtnsContainObj)
        {
            this.tipBtnsContainObj.active = true;
        }
        
    },
    cancelClick()
    {
        if(!!this.tipBtnsContainObj)
        {
            this.tipBtnsContainObj.active = true;
        }
    },
    okClick()
    {
        if(!!this.tipBtnsContainObj)
        {
            this.tipBtnsContainObj.active = false;
        }
        this.contentLabel.node.active = true;
    },
    reset()
    {
        if(!this.isShowTipContent)
        {
            this.tipLabel.node.active  = true;
            this.contentLabel.node.active = false;
            if(!!this.tipBtnsContainObj)
            {
                this.tipBtnsContainObj.active = true;
            }
        }
    }

    
});





cc.Class({
    extends: cc.Component,

    properties: {
        showText:cc.Label
    },
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    start () {
        this.fullContent = "";
        this.targetContent = ""
    },
    setInputCon(obj)
    {
        this.inputCon = obj;
    },
    inputEnter()
    {
        // var df = this.inputCon.getComponent("inputDialogueCon").getInputedContent();
        // if(!!df)
        // {
        //     this.node.getComponent(cc.EditBox).string = df;
        // }
    },
    inputEditDone()
    {
        var editStr = this.node.getComponent(cc.EditBox).string;
        
        this.inputCon.getComponent("inputDialogueCon").inputContentDone(editStr);
    },
    clear()
    {
        this.node.getComponent(cc.EditBox).string = "";
        this.showText.string = "";
        this.fullContent = "";
        this.targetContent = "";
    },
    setFullContent(fullStr)
    {
        this.fullContent = fullStr;
        this.node.getComponent(cc.EditBox).string =  this.fullContent ;
    },
    setTargetContent(targetStr)
    {
        this.targetContent = targetStr;
        this.showText.string = this.targetContent;
    }
    // update (dt) {},
});

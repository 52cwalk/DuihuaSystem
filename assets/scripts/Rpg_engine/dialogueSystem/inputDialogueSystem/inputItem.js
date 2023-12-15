


cc.Class({
    extends: cc.Component,

    properties: {
        showText:cc.Label,
    },
    
    
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
        
        
        
        
        
        this.node.getComponent(cc.EditBox).string =  this.fullContent ;
        console.log("current input name is " + this.name +" current content is  " + this.fullContent);
        
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
      
    },
    setTargetContent(targetStr)
    {
        this.targetContent = targetStr;
        this.showText.string = this.targetContent;
    }
    
});


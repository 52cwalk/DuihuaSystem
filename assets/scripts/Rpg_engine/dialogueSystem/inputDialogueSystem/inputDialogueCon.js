var TipCon = require("TipCon");

cc.Class({
    extends: cc.Component,

    properties: {
        inputItemPrefab:cc.Prefab,
        inputParent:cc.Node
    },
    onLoad () {
        this.inputItems=[];
        this.answerContent = ""
        this.editAnswerContent = ""
    },
    initEvent(func)
    {
        this.answValidEvent = func;
    },
    createInputItems(str)
    {
        this.destoryPreInputs();
    
        this.answerContent = str.trim().toUpperCase();
        var inputCount = this.answerContent.length;

        for(var i=0;i!=inputCount;i++)
        {
            var inputObj = cc.instantiate(this.inputItemPrefab);
            this.inputItems.push(inputObj);
            this.inputParent.addChild( inputObj);
            inputObj.getComponent("inputItem").setInputCon(this.node);
            
            
            
            
        }
    },
    getInputedContent()
    {
        return this.editAnswerContent ;
    },
    inputContentDone(rStr)
    {
        var len = rStr.length;
        rStr = rStr.toUpperCase();
        this.editAnswerContent = rStr;
        if(len>0&&len>this.answerContent.length)
        {
            len = this.answerContent.length;
            this.editAnswerContent = rStr.substr(0,len);
        }
        for(var i = 0;i!=this.inputItems.length;i++)
        {
         
            this.inputItems[i].getComponent("inputItem").clear();
            this.inputItems[i].getComponent("inputItem").setFullContent(this.editAnswerContent);
        }
        for(var i = 0;i!=len;i++)
        {
         
            this.inputItems[i].getComponent("inputItem").setTargetContent(rStr[i]);
        }

        console.log(" this.editAnswerContent  is " +  this.editAnswerContent );
    },
    okBtnClick()
    {
        
        
        if(this.answerContent === this.editAnswerContent && this.answerConten!="")
        {
            if(!! this.answValidEvent )
            {
                this.answValidEvent(1);    
            }
        }
        else
        {
            TipCon._instance.showTip("回答错误�?");
            if(!! this.answValidEvent )
            {
                this.answValidEvent(0);    
            }    
        }
    },
    destoryPreInputs()
    {
        this.editAnswerContent = "";
        this.answerContent = "";
        this.inputParent.removeAllChildren();
        this.inputItems = [];
        return;

        for(var i = 0;i!=this.inputItems.length;i++)
        {
            if(!this.inputItems[i])
            {
                this.inputItems[i].destroy();
            }
        }
        this.inputItems = [];
    }
});


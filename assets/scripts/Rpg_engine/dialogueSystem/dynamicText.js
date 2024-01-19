
cc.Class({
    extends: cc.Component,
    properties: {
        dialogueLabel:cc.Label
    },
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this._isCompleted = true;
        this.dialogueText = "";
        this.interValHandle = null;
    },
    isCompleted()
    {
        return this._isCompleted;  
    },
    start () {
        this.timer = 0.05;
        this.intervalTime =0;
    },
    initPrintAnimEndEvent(ev)
    {
        this.printAnimEndEvent=ev;
    },
    update(dt)
    {
        if(this._isCompleted)
        {
            return;
        }
        this.intervalTime += dt;
        
        if(this.intervalTime>= this.timer)
        {
            this.intervalTime=0;
            if(this.dindex < this.dialogueText.length) {
                this.dialogueLabel.string = this.dialogueText.substr(0, ++this.dindex);
            }
            else
            {
                this._isCompleted = true;
                if(!!this.printAnimEndEvent)
                {
                    this.printAnimEndEvent();
                }
            }
        }
    },
    showText(text)
    {
        this.dialogueLabel.string = "";
        let self = this;
        this.dindex = 0;
        text = text || "";
        this.dialogueText = text;
        this._isCompleted = false;

        return;
        self.interValHandle = setInterval(function () {
      
                if(index < text.length) {
                self.dialogueLabel.string = text.substr(0, ++index);
                return;
                }
                clearInterval(self.interValHandle);
                self._isCompleted = true;
        }, 100);
        return true;
    },
    lockText()
    {
        this._isCompleted = true;
        this.dialogueLabel.string =   this.dialogueText;

        if(!!this.printAnimEndEvent)
        {
            this.printAnimEndEvent();
        }
        return;
        if(!this._isCompleted) {
            this.dialogueLabel.string =   this.dialogueText;
            if(!!this.interValHandle)
            {
                clearInterval(this.interValHandle);
                this.interValHandle = null;
            }
            this._isCompleted = true;
        }
    },
    close()
    {
        this.dialogueLabel.string = "";
        this._isCCompleted = true;
        this.dialogueText = "";
      //  clearInterval(this.interValHandle);
        this.interValHandle = null;
    }

    // update (dt) {},
});

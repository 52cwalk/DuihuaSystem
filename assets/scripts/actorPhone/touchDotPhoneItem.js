
cc.Class({
    extends: cc.Component,

    properties: {
        dragable: {
            default: true,
        },
    
        dropable: {
            default: true,
        },
    
        dragStartEvents: {
            default: [],
            type: cc.Component.EventHandler,
        },
        dragStopEvents: {
            default: [],
            type: cc.Component.EventHandler,
        },
        dropEvents: {
            default: [],
            type: cc.Component.EventHandler,
        },
        interactable: {
            default: true,
        }
    },
    start () {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);

        console.log("item is click ");
    },
    onDisable()
    {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    },
    _onTouchBegan(event) {
        if (!this.interactable || !this.enabledInHierarchy) return;
        if(this.dragable) {
            this._dragTesting = true;
        }
        this.startPos = cc.v2(this.node.x,this.node.y);
    },
    
    _onTouchMove(event) {
        if(this.dragable) {
            var delta = event.touch.getDelta();
            this.node.x += delta.x;
            this._inDrag = true;
        }
    },
    _onTouchEnded(event) {
        if(!this.dragable)
        {
            return;
        }
        if (!this.interactable || !this.enabledInHierarchy) return;
        
        this._dragTesting = false;
        if (this._inDrag) {
            
            cc.Component.EventHandler.emitEvents(this.dragStopEvents, this.node);
            this.node.emit('stop', this);
        }
        if(this.dropable) {
            cc.Component.EventHandler.emitEvents(this.dropEvents, event);
            this.node.emit('drop', this);
        }
        this._inDrag = false;
        event.stopPropagation();
    },
    _onTouchCancel(event) {
        if (!this.interactable || !this.enabledInHierarchy) return;
    
        if (this._inDrag) {
            cc.Component.EventHandler.emitEvents(this.dragStopEvents, this.node);
            this.node.emit('stop', this);
        }
        this._inDrag = false;
        event.stopPropagation();
    },
    reBack()
    {
        this.backToOriginAction= cc.moveTo(0.2,this.startPos.x,this.startPos.y);
        this.node.runAction( this.backToOriginAction);
    },
    lock()
    {
        this.dragable = false;
    }
});


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
        },
        itemNo:"101",
        contentObj:cc.Node
    },
    start () {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);

        this.node.on(cc.Node.EventType.MOUSE_ENTER, this._onMouseEnter, this);

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
        console.log("sdf touch enter !!! ");
        if (!this.interactable || !this.enabledInHierarchy) return;
        if(this.dragable) {
            this._dragTesting = true;
        }
        this.startPos = cc.v2(this.node.x,this.node.y);
        this.dargObj = this.containerConObj.getComponent("lzyItemContainer").getShadowObjByNo(this.itemNo);
        if(!!this.dargObj)
        {
            console.log("the dargObj is not null  ");
            this.contentObj.active = false;
            this.dargObj.active = true;
        }
        else{
            console.log("the dargObj is null  ");
        }
    },
    setContainerCon(obj)
    {
        this.containerConObj = obj;
    },
    _onTouchMove(event) {
        if(!!this.dargObj)
        {
            if(this.dragable) {
                var delta = event.touch.getDelta();
                this.dargObj.x += delta.x;
                this.dargObj.y += delta.y;
                this._inDrag = true;
            }
        }
       
       
    },
    
    _onTouchEnded(event) {
        if(!this.dragable)
        {
            return;
        }
        if(!!this.dargObj)
        {
            this.dargObj = null;
        }

        cc.log(`touch end`);
        if (!this.interactable || !this.enabledInHierarchy) return;
        
        this._dragTesting = false;
        if (this._inDrag) {
            
            cc.Component.EventHandler.emitEvents(this.dragStopEvents, this.node);
            this.node.emit('stop', this);
            cc.log(`[drag] stop drag`);
        }
        
        if(this.dropable) {
            cc.Component.EventHandler.emitEvents(this.dropEvents, event);
            this.node.emit('drop', this);
            cc.log(`[drop]`);
        }
    
        this._inDrag = false;
    
        event.stopPropagation();
    },
    
    _onTouchCancel(event) {
        if (!this.interactable || !this.enabledInHierarchy) return;
    
        if (this._inDrag) {
            cc.Component.EventHandler.emitEvents(this.dragStopEvents, this.node);
            this.node.emit('stop', this);
            cc.log(`[drag] stop drag`);
        }
        this._inDrag = false;
        event.stopPropagation();
    },
    _onMouseEnter(event)
    {
        console.log("是的，你已经进入了感应器�?);
    },
    lock()
    {
        this.dragable = false;
    },
    getItemNo()
    {
        return this.itemNo
    },
    reset()
    {
        this.dragable = true;
        this.contentObj.active = true;

        if(!!this.dargObj)
        {
            this.dargObj.getComponent("shadowItem").reset();
        }
    }

});



cc.Class({
    extends: cc.Component,

    properties: {
        rotationEnable:true
    },
    start () {
        var that = this;
     
        this.node.on(cc.Node.EventType.TOUCH_START, function(e){that.movestart(e)}, this.node);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e){that.moving(e)}, this.node);
        this.node.on(cc.Node.EventType.TOUCH_END, function(e){that.movend(e)}, this.node);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(e){that.movend(e)}, this.node);
        this.currentNodePos = this.node.convertToWorldSpaceAR(cc.v2(0,0));
        console.log("  this.currentNodePos  ");
        console.log(  this.currentNodePos );
    },
    setRotationEnable(v)
    {
        this.rotationEnable = v;
    },
    initEvent(update,end)
    {
        this.updateEvent = update;
        this.endEvent = end;
    },
    movestart(event)
    {
        if(!this.rotationEnable)
        {
            return;
        }
        var point = event.touch._point;
        this.xx = point.x;
        this.yy = point.y;
        var touchpoint= event.touch.getLocation();
        this.prePoint = touchpoint;
    },
    rotateNode(position){
        
       
        var dis  = this.currentNodePos.sub(position);
        var atan2Angle = Math.atan2(dis.y,dis.x);
        var angle = atan2Angle/Math.PI*180 + 90;
        
        this.node.angle = angle;

        var dis1 = this.prePoint.sub(this.currentNodePos);
        var dis2 = position.sub(this.currentNodePos);

       

        this.prePoint = position;
        
        var angle = dis1.signAngle(dis2);
        
        var deltaAngle = angle / Math.PI * 180;



        if(!!this.updateEvent)
        {
            this.updateEvent(deltaAngle);
        }
    },
    
    moving(event)
    {
        if(!this.rotationEnable)
        {
            return;
        }
        this.rotateNode(event.touch.getLocation());
    },
    movend(et)
    {
        if(!this.rotationEnable)
        {
            return;
        }
       if(!!this.endEvent)
       {
        this.endEvent();
       }
    },
    angleByTwoVec(vec1,vec2)
    {
        var csd1 = vec1;
        var csd2 = vec2;
        
        var sin = csd1.x * csd2.y - csd2.x * csd1.y;  
        var cos = csd1.x * csd2.x + csd1.y * csd2.y;
     
        var ange1 = Math.atan2(sin, cos) * (180 / Math.PI);

        return ange1;
    }

});


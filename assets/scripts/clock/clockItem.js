
cc.Class({
    extends: cc.Component,

    properties: {
        
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
    initEvent(update,end)
    {
        this.updateEvent = update;
        this.endEvent = end;
    },
    movestart(event)
    {
        var point = event.touch._point;
        this.xx = point.x;
        this.yy = point.y;
        var touchpoint= event.touch.getLocation();
        this.prePoint = touchpoint;//cc.v2(touchpoint.x-worldPos.x,touchpoint.y-worldPos.y) ;
    },
    rotateNode(position){
       // var worldPos = this.node.convertToWorldSpaceAR(this.node.position);
        var dis  = this.currentNodePos.sub(position);
        var atan2Angle = Math.atan2(dis.y,dis.x);
        var angle = atan2Angle/Math.PI*180 - 180;
        //var angle = Math.floor(angle -180);
        this.node.angle = angle;

        var dis1 = this.prePoint.sub(this.currentNodePos);
        var dis2 = position.sub(this.currentNodePos);

       // var deltaAngle = this.angleByTwoVec(dis1,dis2) ;

        this.prePoint = position;
        
        var angle = dis1.signAngle(dis2);
        //将弧度转换为欧拉角
        var deltaAngle = angle / Math.PI * 180;

      //  console.log(deltaAngle)
        
        if(!!this.updateEvent)
        {
            this.updateEvent(deltaAngle);
        }
    },
    /*
    rotateNode(position){
        // var worldPos = this.node.convertToWorldSpaceAR(this.node.position);
         var dis  = this.currentNodePos.sub(position);
         var atan2Angle = Math.atan2(dis.y,dis.x);
         var angle = atan2Angle/Math.PI*180 - 180;
         //var angle = Math.floor(angle -180);
         this.node.angle = angle;
 
         var dis1 = this.prePoint.sub(this.currentNodePos);
         var dis2 = position.sub(this.currentNodePos);
 
         var deltaAngle = this.angleByTwoVec(dis1,dis2) ;
 
         this.prePoint = position;
         if(!!this.updateEvent)
         {
             this.updateEvent(deltaAngle);
         }
     },
     */
    moving(event)
    {
        this.rotateNode(event.touch.getLocation());
       
    },
    movend(et)
    {
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

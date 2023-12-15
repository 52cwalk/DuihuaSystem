
var TipCon =require("TipCon") ;
var global = require("globalSetting");
var dialogueLoadingCon = require("dialogueLoadingCon");
cc.Class({
    extends: cc.Component,
    properties: {
        minArrowObj:cc.Node,
        hourArrowObj:cc.Node,
        titlelabel:cc.Label,
        clocklabel:cc.Label,
        checkBtn:cc.Node,
        questionTipObj:cc.Node,
        tipSpriteObj:cc.Node,
        tipClockSpriteFrame:[cc.SpriteFrame],
        errorRange:6,
        successMaskObj:cc.Node
    },
    start () {

        this.timesonfig = [
            {
                corName:'15 : 00',
                minTargetAngle:0,
                hourTargetAngle:270,
                isCompeleted:false
            },
            {
                corName:'18 : 00',
                minTargetAngle:0,
                hourTargetAngle:180,
                isCompeleted:false
            },{
                corName:'19 : 17',
                minTargetAngle:258,
                hourTargetAngle:142,
                isCompeleted:false
            }
        ];

        this.minArrowObj.getComponent("clockItem").initEvent((a)=>{this.updateMinPoint(a)},()=>{this.endMinPoint()});
        this.hourArrowObj.getComponent("clockItem").initEvent((a)=>{this.updateHourPoint(a)},()=>{this.endHourPoint()});
        this.sumMinDeltaAngle = 0;
        this.sumHourDeltaAngle = 0;

        this.preHourAngle = this.hourArrowObj.angle;
        this.preMinAngle = this.minArrowObj.angle;

        this.isCompleteCorrect = false;
        this.timeConfigIndex = 0;

        this.tipSpriteObj.getComponent(cc.Sprite).spriteFrame = this.tipClockSpriteFrame[0];

        this.isActive = true;
        this.initConfig();

        if(!!this.hourArrowObj)
        {
            this.hourArrowObj.getComponent("clockItem").setRotationEnable(false);
        }

    },
    initConfig()
    {
       this.questionConfig ={
            "isNeedJugdeAnswer": 1,
            "questionContent": "便利贴上的数字，好像和墙上的便利贴顺序有关，张三写的是…�?,
            "answerContent": "直到遇见�?,
         
              "tipDatas":global.gTipDatas,
            "bags": [],
            "extraData": {
                "bags": [],
                "conditions": [],
                "isNeedExtraCondition": 0
            }
        }

        if(!!global.gFeatureGuideContent)
        {
            this.titlelabel.string = global.gFeatureGuideContent;
        }
        
        var tdatas = this.questionConfig.tipDatas;

        if(!!tdatas && tdatas.length>0)
        {
            this.questionTipObj.getComponent("questionTip").setTipConfig(tdatas);
            this.isHasTipConfig = true;
        }
    },
    updateMinPoint(angle)
    {
        this.sumMinDeltaAngle += angle;
        
        this.keepHourByMin(this.sumMinDeltaAngle);
    },
    endMinPoint()
    {
        if(this.isCompleteCorrect)
        {
            this.sumMinDeltaAngle = 0;
            this.sumHourDeltaAngle = 0;

            this.preMinAngle = this.minArrowObj.angle;
            this.preHourAngle = this.hourArrowObj.angle;

            var hour = 0;
            var min = 0;

            var intervalMinTime = (this.minArrowObj.angle+360)%360;
            var intervalHourTime = (this.hourArrowObj.angle+360)%360;
         
            var minAngle =0 ;
            var hourAngle =0;
  
            hourAngle = ((360 - intervalHourTime)/30)%60;
            hour = this.getHourClock(hourAngle);

            intervalMinTime = (this.minArrowObj.angle+360)%360;
            minAngle = Math.round( (360 - intervalMinTime)/6 )%60;
            min =minAngle<10?("0"+minAngle.toString()): minAngle.toString();

            hour = parseInt(hour);
            this.clocklabel.string = hour+" : "+min;
        }
    },
    getHourClock(hourAngle)
    {
        var targetAngle = 0;
        var targetAngle2 = 360;
       
        var minAngle = (this.minArrowObj.angle%360+360)%360;
        if( (Math.abs(targetAngle-minAngle)<this.errorRange  || (Math.abs(targetAngle2-minAngle)<this.errorRange )))
        {
            var correntHourAngle =  Math.round(hourAngle) *30;
            this.hourArrowObj.angle = 360 - correntHourAngle;
            this.minArrowObj.angle = 0;
            this.preMinAngle = this.minArrowObj.angle;
            this.preHourAngle = this.hourArrowObj.angle;

            var intervalHourTime = (this.hourArrowObj.angle+360)%360;
            hourAngle = ((360 - intervalHourTime)/30)%60;
        }

        if((Math.abs(targetAngle2-minAngle)<30 ))
        {
            hourAngle = hourAngle+0.1;
        }

       

        var hour = 12 + parseInt(hourAngle);
        return hour;
    },
    updateHourPoint(angle)
    {
        if(this.isCompleteCorrect)
        {
            this.sumHourDeltaAngle += angle;
            this.sumHourDeltaAngle = this.sumHourDeltaAngle;
            this.keepMinByHour(this.sumHourDeltaAngle);
        }
    },
    endHourPoint()
    {
        this.sumMinDeltaAngle = 0;
        this.sumHourDeltaAngle = 0;
        this.preHourAngle = this.hourArrowObj.angle;
        this.preMinAngle = this.minArrowObj.angle;
        console.log("endHourPoint event end ");
    },
    keepHourByMin(angle)
    {
        
        var reAngle = (this.preHourAngle  + (angle)/12);
    
        this.hourArrowObj.angle = reAngle;
    },
    keepMinByHour(angle)
    {
        
        var reAngle = (this.preMinAngle  + (angle)*12);
      
        this.minArrowObj.angle = reAngle;
    },
    coporateCompelted()
    {
        TipCon._instance.showTip("恭喜你！你已经完成了时钟调整�?);
        if(!!this.successMaskObj)
        {
            this.successMaskObj.active = true;
        }
        this.scheduleOnce(()=>{ 
            dialogueLoadingCon._instance.show();
            global.isFeatureOver = true;
            gotoScene("dialogue");
         },2);
    },
    checkCorrent()
    {
        if(!this.isCompleteCorrect)
        {
            var minAngle = (this.minArrowObj.angle%360+360)%360;
            var hourAngle = (this.hourArrowObj.angle%360+360)%360;
            console.log("minAngle is " + minAngle +" hourangle is  " + hourAngle);
            var targetAngle = 0;
            var targetAngle2 = 360;
            if((Math.abs(targetAngle-minAngle)<this.errorRange || Math.abs(targetAngle2-minAngle)<this.errorRange) &&
            (Math.abs(targetAngle-hourAngle)<this.errorRange || Math.abs(targetAngle2-hourAngle)<this.errorRange) )
            {
                this.minArrowObj.angle = 0;
                this.hourArrowObj.angle = 0;
    
                this.preHourAngle = this.hourArrowObj.angle;
                this.preMinAngle = this.minArrowObj.angle;

                this.isCompleteCorrect = true;
                
                this.sumMinDeltaAngle = 0;
                this.sumHourDeltaAngle = 0;
            
                this.clocklabel.string = "12 : 00";
                TipCon._instance.showTip("时间正确，继续修�?);
                this.showNextTipClock();
            }
            else
            {
                TipCon._instance.showTip("不对，再试试�?);
            }
        }
        else
        {
            this.checkTimeClock();
        }
    },
    showNextTipClock()
    {
        if( this.timeConfigIndex == this.timesonfig.length)
        {
            return;
        }
        if(this.timeConfigIndex ==1)
        {
            this.hideAction = cc.rotateTo(1,-180);
            this.tipSpriteObj.runAction(
                this.hideAction,
             );
        }
        else
        {
            this.hideAction = cc.scaleTo(0.2, 1, 0);
            this.tipSpriteObj.runAction(cc.sequence(
                this.hideAction,
                cc.callFunc(this.hideCompeleted.bind(this))
            ));
        }
       
    },
    hideCompeleted()
    {
        this.tipSpriteObj.angle = 0;
        this.tipSpriteObj.getComponent(cc.Sprite).spriteFrame = this.tipClockSpriteFrame[this.timeConfigIndex+1];

        this.showAction = cc.scaleTo(0.3, 1, 1);
        this.tipSpriteObj.runAction(this.showAction);
    },
    checkTimeClock()
    {
        var minAngle = (this.minArrowObj.angle%360+360)%360;
        var hourAngle = (this.hourArrowObj.angle%360+360)%360;
        var minTargetAngle = this.timesonfig[this.timeConfigIndex].minTargetAngle;
        var hourTargetAngle = this.timesonfig[this.timeConfigIndex].hourTargetAngle;

        console.log("minAngle is " + minAngle);
        console.log("hourAngle is " + hourAngle);

        console.log("minTargetAngle is " + minTargetAngle);
        console.log("hourTargetAngle is " + hourTargetAngle);
        
        if(Math.abs(minTargetAngle-minAngle)<this.errorRange &&(Math.abs(hourTargetAngle-hourAngle)<this.errorRange || Math.abs(hourTargetAngle+360-hourAngle)<this.errorRange))
        {
            this.minArrowObj.angle =  this.timesonfig[this.timeConfigIndex].minTargetAngle;
            this.hourArrowObj.angle = this.timesonfig[this.timeConfigIndex].hourTargetAngle;
            
            this.preHourAngle = this.hourArrowObj.angle;
            this.preMinAngle = this.minArrowObj.angle;

            var timeName= this.timesonfig[this.timeConfigIndex].corName;
           
            this.timeConfigIndex = this.timeConfigIndex +1 ;
            console.log(" this.timeConfigIndex is caled " +  this.timeConfigIndex);

            if(this.timeConfigIndex != this.timesonfig.length)
            {
                TipCon._instance.showTip("时间正确，继续修�?);
            }

            this.clocklabel.string = timeName;

            this.showNextTipClock();
            if( this.timeConfigIndex == this.timesonfig.length)
            {
                this.checkBtn.active = false;
                this.coporateCompelted();
            }
        }
        else
        {
            TipCon._instance.showTip("不对，再试试�?);
        }
    },
    showTipClick()
    {
        if(this.isActive )
        {
            if(this.isHasTipConfig)
            {
                this.questionTipObj.getComponent("questionTip").show();
            }
            else
            {
                TipCon._instance.showTip("此处暂无提示");
            }
        }
    },

});


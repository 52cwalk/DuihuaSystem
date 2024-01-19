
var TipCon =require("TipCon") ;
var global = require("globalSetting");

cc.Class({
    extends: cc.Component,
    properties: {
        minArrowObj:cc.Node,
        hourArrowObj:cc.Node,
        titlelabel:cc.Label,
        checkBtn:cc.Node,
        questionTipObj:cc.Node
    },
    start () {

        this.timesonfig = [
            {
                corName:'3:00',
                minTargetAngle:90,
                hourTargetAngle:0,
                isCompeleted:false
            },
            {
                corName:'6:00',
                minTargetAngle:90,
                hourTargetAngle:270,
                isCompeleted:false
            },{
                corName:'4:00',
                minTargetAngle:90,
                hourTargetAngle:330,
                isCompeleted:false
            }
        ];

        this.titleConfigs=[
            "请将时针和分钟调整到正确位置",
            "请将时间调整到3点整",
            "请将时间调整到6点整",
            "请将时间调整到4点整",
            "恭喜你，你已经完成了挑战！"
        ]

        this.minArrowObj.getComponent("clockItem").initEvent((a)=>{this.updateMinPoint(a)},()=>{this.endMinPoint()});
        this.hourArrowObj.getComponent("clockItem").initEvent((a)=>{this.updateHourPoint(a)},()=>{this.endHourPoint()});
        this.sumMinDeltaAngle = 0;
        this.sumHourDeltaAngle = 0;

        this.preHourAngle = this.hourArrowObj.angle;
        this.preMinAngle = this.minArrowObj.angle;

        this.isCompleteCorrect = false;
        this.timeConfigIndex = 0;

        this.titlelabel.string = this.titleConfigs[0];
        this.isActive = true;
        this.initConfig();
    },
    initConfig()
    {
       this.questionConfig ={
            "isNeedJugdeAnswer": 1,
            "questionContent": "便利贴上的数字，好像和墙上的便利贴顺序有关，白起写的是……",
            "answerContent": "直到遇见你",
            "tipDatas": ["将公章摆放成与APP上看到的方位一致的样子", "从起始范围开始观察，找出唯一符合真实时间逻辑的时刻，并在APP上调整至该时刻", "根据公章变化，调整位置后继续观察唯一符合逻辑的时刻并继续录入，直至得到最后的时刻"],
            "bags": [],
            "extraData": {
                "bags": [],
                "conditions": [],
                "isNeedExtraCondition": 0
            }
        }

        var tdatas = this.questionConfig.tipDatas;

        if(!!tdatas)
        {
            this.questionTipObj.getComponent("questionTip").setTipConfig(tdatas);
            this.isHasTipConfig = true;
        }
    },
    updateMinPoint(angle)
    {
        if(this.isCompleteCorrect)
        {
            this.sumMinDeltaAngle += angle;
         //   console.log(this.sumMinDeltaAngle);
            this.keepHourByMin(this.sumMinDeltaAngle);
        }
    },
    endMinPoint()
    {
        this.sumMinDeltaAngle = 0;
        this.sumHourDeltaAngle = 0;
        this.preHourAngle = this.hourArrowObj.angle;
        this.preMinAngle = this.minArrowObj.angle;
        console.log("endMinPoint event end ");
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
        //  console.log("分钟 :"+ angle );
        var reAngle = (this.preHourAngle  + (angle)/12);
    //    console.log(" angle " +angle+ +" minArrowObj " + this.minArrowObj.angle + " reAngle " + reAngle);
        this.hourArrowObj.angle = reAngle;
    },
    keepMinByHour(angle)
    {
        //  console.log("分钟 :"+ angle );
        var reAngle = (this.preMinAngle  + (angle)*12);
      //  console.log(" angle " +angle+ +" hourArrowObj " + this.hourArrowObj.angle + " reAngle " + reAngle);
        this.minArrowObj.angle = reAngle;
    },
    
    coporateCompelted()
    {
        TipCon._instance.showTip("恭喜你！你已经完成了时钟调整！");

        this.scheduleOnce(()=>{ 
            global.isFeatureOver = true;
            cc.director.loadScene("dialogue");
         },2);
    },
    checkCorrent()
    {
        if(!this.isCompleteCorrect)
        {
            var minAngle = (this.minArrowObj.angle%360+360)%360;
            var hourAngle = (this.hourArrowObj.angle%360+360)%360;

            var targetAngle = 90;
            if(Math.abs(targetAngle-minAngle)<6&&Math.abs(targetAngle-hourAngle)<6)
            {
                this.minArrowObj.angle = 90;
                this.hourArrowObj.angle = 90;
    
                this.preHourAngle = this.hourArrowObj.angle;
                this.preMinAngle = this.minArrowObj.angle;
    
                this.isCompleteCorrect = true;
                TipCon._instance.showTip("yes,调整完成，请按照提示炒作");
                this.titlelabel.string = this.titleConfigs[this.timeConfigIndex+1];
            }
            else
            {
                TipCon._instance.showTip("不对，再试试！");
            }
        }
        else
        {
            this.checkTimeOclock();
        }
    },
    checkTimeOclock()
    {
        var minAngle = (this.minArrowObj.angle%360+360)%360;
        var hourAngle = (this.hourArrowObj.angle%360+360)%360;
        var minTargetAngle = this.timesonfig[this.timeConfigIndex].minTargetAngle;
        var hourTargetAngle = this.timesonfig[this.timeConfigIndex].hourTargetAngle;

        console.log("minAngle is " + minAngle);
        console.log("hourAngle is " + hourAngle);

        console.log("minTargetAngle is " + minTargetAngle);
        console.log("hourTargetAngle is " + hourTargetAngle);
        
        if(Math.abs(minTargetAngle-minAngle)<6 &&(Math.abs(hourTargetAngle-hourAngle)<6 || Math.abs(hourTargetAngle+360-hourAngle)<6))
        {
            this.minArrowObj.angle =  this.timesonfig[this.timeConfigIndex].minTargetAngle;
            this.hourArrowObj.angle = this.timesonfig[this.timeConfigIndex].hourTargetAngle;
            
            this.preHourAngle = this.hourArrowObj.angle;
            this.preMinAngle = this.minArrowObj.angle;

            var timeName= this.timesonfig[this.timeConfigIndex].corName;
            TipCon._instance.showTip("恭喜你！你成功调整到 : "+ timeName);

            this.timeConfigIndex = this.timeConfigIndex +1 ;
            this.titlelabel.string = this.titleConfigs[this.timeConfigIndex+1];

            if( this.timeConfigIndex == this.timesonfig.length)
            {
                this.titlelabel.string = this.titleConfigs[this.timeConfigIndex+1];
                this.checkBtn.active = false;

                this.coporateCompelted();
            }
        }
        else
        {
            TipCon._instance.showTip("不对，再试试！");
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
                TipCon._instance.showTip("此处没有提示哦！");
            }
        }
    },

});

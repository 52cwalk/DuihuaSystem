var storageCon  = require("storage_con");

var nodeType = cc.Enum({
    Dialogue: 0,//普通对话框
    DialogueAndImage:1,//文字对话+图片
    NormalInput:2,//普通输入型
    QuestionAndInputAnswer:4,//问题输入答案型
    SingleChoice:8,//单选答案型
    MultiChoices:16,//多选答案型分支型
    JudgeCondition:32,//判断条件型
    GotoFeatureScene:64,//跳转功能场景型
    SwitchChapter:128,//切换场景型
    Over:1024,
    Start:2048
});

var actorType = cc.Enum({
    None:0,
    Actor:1,
   Self:2,
   Narrator:4
});


var chapterDic = {
    "3001":"01男主分线",
    "3002":"02男主分线",
    "3003":"03男主分线转折",
    "3004":"凌肖彩蛋",
    "3005":"03共同发展",
    "3006":"04男主分线",
    "3007":"05共通转折",
    "3008":"05男主分线",
    "3009":"06男主分线",
    "3010":"07共通转折分线",
    "3011":"08男主分线",
    "3012":"09共通黑衣人",
    "3013":"09男主分线结局",
    "3014":"10日后谈"
}

var publicDic = {
    "2001":"01共通开端",
    "2002":"10后日谈",
    "2003":"10真实结局"
}

var actorDic = {
    "1000":"公共",
    "1001":"周棋洛",
    "1002":"李泽言",
    "1003":"白起",
    "1004":"许墨"
}

var isAnswerNode = false;

var userBaseInfo={
    userNickName:"",
    userHeadImg:"",
    birthday:""
}

var getUserNickName = function(acid)
{
    if(acid =="$u")
    {
        if(!!userBaseInfo.userNickName)
        {
            return userBaseInfo.userNickName;
        }
        else{
            var nn= storageCon._instance.getUserNickName();
            return nn;
        }
    }
    if(acid =="旁白")
    {
        return "";
    }
    if(!!!acid)
    {
        return "";
    }
    return acid;
}


var getDirectionByName = function(acid)
{
    if(acid =="$u")
    {
        return 0;
    }
    else if(!!acid)
    {
        if(acid =="旁白")
        {
            return -1
        }
        return 1;
    }
    else 
    {
        return -1;
    }
}

var getDialogueBgByName = function(acid)
{
    if(acid =="$u")
    {
        return 0;
    }
    else if(!!acid)
    {
        if(acid =="旁白")
        {
            return 2
        }
        return 1;
    }
    else
    {
        return 2;
    }
}

var getFeatureSceneName = function(acid)
{
    if(acid =="找分镜稿页面")
    {
        return "fenjing";
    }
    else if(acid=="男主来电")
    {
        this.specailInputId = "男主来电";
        return "actorphone";
    }
    else if(acid=="QTE")
    {
        this.specailInputId = "QTE";
        return "actorphone";
    }
    else if(acid =="唇语观察")
    {
        return "zqllihui";
    }
    else if(acid == "制作布丁的时间顺")
    {
        return "dragclock";
    }
    else if(acid == "迎接")
    {
        this.specailInputId = "迎接"
        return "specialInput";
    }
    else if(acid == "直到遇见你")
    {
        this.specailInputId = "直到遇见你"
        return "specialInput";
    }
    else if(acid=="从引导开始多次答")
    {
        return "clock";
    }
    else if(acid=="方向选择行进路线")
    {
        return "maze";
    }
    
    return "fenjing";
    //return null
}


var addFinishActor = function(actorid)
{
    if(!this.finishActorList[actorid])
    {
        this.finishActorArr[actorid] = true;
    }
}

var getFinishActorCount = function()
{
    var count = 0;
    if(!!this.finishActorList)
    {
        for(var key in this.finishActorList){
            count++;
        }
    }

    return count;
    
}



var setFinishActor = function(cfg)
{
    this.finishActorList = cfg;
}

var isFeatureOver = false;
var isFeatureMode = false;
var isEmitQTE = false;

var selectActorId = 1000;
var selectChapterId = 2001;

var publishActorId = 1000;
var chapterEndId = 3014;

var selectPhoneActorId = -1;//用于用户选择男主使用
var historyPlotDic = [];
var specailInputId="";
var isAutoPlay = false;
var isRecoverLastNode = false;
var isFromDialogueToMemory = false;
var finishActorList= {};


/////////网络请求///////////
var openid = null;
var activecode = null;

module.exports = {
    nodeType,
    actorType,
    isAnswerNode,
    chapterDic,
    actorDic,
    publicDic,
    userBaseInfo,
    getUserNickName,
    getFeatureSceneName,
    getDirectionByName,
    getDialogueBgByName,
    isFeatureOver,
    isFeatureMode,
    selectActorId,
    selectChapterId,
    publishActorId,
    chapterEndId,
    selectPhoneActorId,
    historyPlotDic,
    specailInputId,
    isAutoPlay,
    openid,
    activecode,
    finishActorList,
    getFinishActorCount,
    addFinishActor,
    setFinishActor,
    isEmitQTE,
    isRecoverLastNode
}
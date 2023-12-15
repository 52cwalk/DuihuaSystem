var storageCon  = require("storage_con");

var nodeType = cc.Enum({
    Dialogue: 0,
    DialogueAndImage:1,
    NormalInput:2,
    QuestionAndInputAnswer:4,
    SingleChoice:8,
    MultiChoices:16,
    JudgeCondition:32,
    GotoFeatureScene:64,
    SwitchChapter:128,
    Over:1024,
    Start:2048,
    SubOver:4096
});

var actorType = cc.Enum({
    None:0,
    Actor:1,
   Self:2,
   Narrator:4
});




var chapterMusic = {
    "2001":["res"],
    "2002":["res4"],
    "2003":["res3"],

    "3001":["res"],
    "3010":["res2","res7"],
    "3011":["res2","res"],
    "3100":["res"]
}


var chapterDic = {
    "3001":"01�?,
    "3002":"02?,
    "3003":"03分"
    
}

var publicDic = {
    "2001":"01通开�?,
    "2002":"10日�?,
    "2003":"10局"
}

var actorDic = {
    "1000":"puddcic",
    "1001":"zqdd�?,
    "1002":"li四",
    "1003":"张三",
    "1004":"xdft"
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
 
    return acid;
}


var getDirectionByName = function(acid)
{
    if(acid =="$u")
    {
        return 0;
    }
    else if(acid =="�?张三")
    {
        return 0;
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
    else
    {
        return 2;
    }
}

var getFeatureSceneName = function(acid)
{
   
    
    return "fenjing";
    
}

var isFeatureOver = false;
var isFeatureMode = false;
var isEmitQTE = false;
var isSkipShowSelectActor = false;

var branchStr = "";
var selectActorId = 1000;
var selectChapterId = 2001;

var publishActorId = 1000;
var publicEndChapterId = 2003;

var chapterEndId = 3011;
var QTEChapterId = 3004;

var selectPhoneActorId = -1;
var localHistoryPlotDic = [];
var gTipDatas=[];
var gFeatureGuideContent="";
var dialogueRewardDic = {};
var specailInputId="";
var isAutoPlay = false;
var isRecoverLastNode = false;


var openid = null;
var exchangecode = null;
var activecode = null;
var musicBgEnabled = true;
var musicEffectEnabled = true;


var bgMaxVolume = 0.7;
var musicEffectVolume = 1;
var musicBgVolume = 1;

var currentMusicBgId = "";

var dialogueBgDic = {};
var dialogueBgMusicDic = {};
var dialogueLihuiDic = {};


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
    localHistoryPlotDic,
    dialogueRewardDic,
    specailInputId,
    isAutoPlay,
    openid,
    exchangecode,
    activecode,
    isEmitQTE,
    isRecoverLastNode,
    isSkipShowSelectActor,
    QTEChapterId,
    publicEndChapterId,
    chapterMusic,
    bgMaxVolume,
    musicEffectVolume,
    musicBgVolume,
    musicBgEnabled,
    musicEffectEnabled,
    currentMusicBgId,
    branchStr,
    dialogueBgDic,
    dialogueBgMusicDic,
    dialogueLihuiDic,
    gTipDatas,
    gFeatureGuideContent
}


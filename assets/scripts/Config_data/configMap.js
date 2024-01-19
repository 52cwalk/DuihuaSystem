
var getUserNickName = function(acid)
{
    if(acid =="$u")
    {
        return userBaseInfo.userNickName;
    }
    if(acid =="旁白")
    {
        return "旁白";
    }
    if(!!!acid)
    {
        return "";
    }
    return "X";
}

var getFeatureSceneName = function(acid)
{
    if(acid =="找分镜稿页面")
    {
        return "fenjing";
    }
    if(acid =="旁白")
    {
        return "旁白";
    }
    if(!!!acid)
    {
        return "";
    }
    return "X";
}

module.exports={
    getUserNickName,
    getFeatureSceneName
}
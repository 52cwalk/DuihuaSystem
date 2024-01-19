

var getApiHost = function()
{
    var Host = "";
    Host = "http://localhost:4001/lianyu/";
    if (typeof wx != 'undefined') {
        Host = "https://lianyu.hzsdgames.com/lianyu/";
        return Host;
    }
    else
    {
        Host = "http://localhost:4001/lianyu/";
        return Host;
    }
}

var getHost = function()
{
    var Host = "";
    Host = "http://localhost:4001/";
    if (typeof wx != 'undefined') {
        Host = "https://lianyu.hzsdgames.com/";
        return Host;
    }
    else
    {
        Host = "http://localhost:4001/";
        return Host;
    }
}

var login = function(params,cb) {
    
    var requestApi = getApiHost()+"login";

    let xhr = new XMLHttpRequest();
    //xhr.setRequestHeader("Authorization", true);
    var that = this;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            if(cb)
            {
                var response = JSON.parse(xhr.responseText);
                console.log("response!");
                console.log(response);
                cb(xhr.responseText);
            }
        }
    };

    let data = {
        "jscode":params
    }
    console.log("data is " + data);
    xhr.open("get", requestApi, true);

    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');

    xhr.send(data);
}


///更新金币数量
var updateCoin = function(coinno,cb) {

    var requestApi = getApiHost()+"updateCoin";

    let xhr = new XMLHttpRequest();
    var that = this;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {

            var response = JSON.parse(xhr.responseText);
            console.log(" updateCoin upadte coin No is success !");

            if(response.code>0)
            {

            }
        }
    };

    let data = {};

    data.coinno = coinno;
    
    xhr.open("post", requestApi, true);

    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');

    xhr.send(data);
}


///更新金币数量
var activeApp = function(activecode,cb) {

    var requestApi = getApiHost()+"activeApp";

    let xhr = new XMLHttpRequest();
    var that = this;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            var response = JSON.parse(xhr.responseText);
            console.log(" activeApp is back ");
            console.log(response);
            cb(response.code);
        }
    };

    let data = {};

    var global = require("globalSetting");
    data.openid = global.openid;
    data.activecode = activecode;
    
    xhr.open("post", requestApi, true);

    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');

    xhr.send(data);
}



///更新生日
var udpateBirthday = function(birthday,cb) {

    var requestApi = getApiHost()+"udpateBirthday";

    let xhr = new XMLHttpRequest();
    var that = this;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            var response = JSON.parse(xhr.responseText);
            console.log(" udpateBirthday is back ");
            console.log(response);
            cb(response.code);
        }
    };

    let data = {};


    var global = require("globalSetting");

    if(!!global.openid)
    {
        data.openid = global.openid;
        data.birthday = birthday;
        xhr.open("post", requestApi, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        xhr.send(data);
    }
}


///更新昵称
var udpateNickame = function(nickname,cb) {

    var requestApi = getApiHost()+"udpateNickame";

    let xhr = new XMLHttpRequest();
    var that = this;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            var response = JSON.parse(xhr.responseText);
            console.log(" udpateNickame is back ");
            console.log(response);
            cb(response.code);
        }
    };

    let data = {};

    var global = require("globalSetting");

    if(!!global.openid)
    {
        data.openid = global.openid;
        data.nickname = nickname;
        
        xhr.open("post", requestApi, true);
    
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    
        xhr.send(data);
    }
}



var getUserInfo = function(params,cb) {
    var requestApi = getApiHost()+"getUserInfo";

    let xhr = new XMLHttpRequest();
    var that = this;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            if(cb)
            {
                var response = JSON.parse(xhr.responseText);
                console.log("getUserInfo back !");
                console.log(response);
                cb(xhr.responseText);
            }
        }
    };
    let data = {};
    var global = require("globalSetting");
    if(!!global.openid)
    {
        data.openid = global.openid;
        xhr.open("get", requestApi, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        xhr.send(data);    
    }
}

/*
updateMaxLevel
updateCoin
*/

module.exports = 
{
    login:login,
    getHost:getHost,
    getUserInfo:getUserInfo,
    updateCoin:updateCoin,
    activeApp:activeApp,
    udpateBirthday,
    udpateNickame
}



var getApiHost = function()
{
    var Host = "";
    Host = "http:
    if (typeof wx != 'undefined') {
        Host = "https:
        return Host;
    }
    else
    {
        Host = "http:
        return Host;
    }
}

var getHost = function()
{
    var Host = "";
    Host = "http:
    if (typeof wx != 'undefined') {
        Host = "https:
        return Host;
    }
    else
    {
        Host = "http:
        return Host;
    }
}

var login = function(params,cb) {
    
    console.log("getApiHost() is called ");
    console.log(getApiHost());
    var requestApi = getApiHost()+"login";

    let xhr = new XMLHttpRequest();
    
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



var activeApp = function(activecode,cb) {

    var requestApi = getApiHost()+"activeApp";

    let xhr = new XMLHttpRequest();
    var that = this;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            var response = JSON.parse(xhr.responseText);
            console.log(" activeApp is back ");
            console.log(response);
            if(response.code>0&& !!response.user)
            {
                cb(response.code,response.user.exchangecode);
            }
            else
            {
                cb(response.code,null);
            }
            
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




var checkContentLawful = function(content,cb) {

    var requestApi = getApiHost()+"checkContentLawful";

    let xhr = new XMLHttpRequest();
    var that = this;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            var response = JSON.parse(xhr.responseText);
            console.log(" checkContentLawful is back ");
            console.log(response);
            if(response.code>0)
            {
                cb(response.data.errcode);
            }
            else
            {
                cb("-1");
            }
        }
    };

    let data = {};

    var global = require("globalSetting");

    if(!!global.openid)
    {
        data.openid = global.openid;
        data.content = content;
        
        xhr.open("post", requestApi, true);
    
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    
        xhr.send(data);
    }
}




module.exports = 
{
    login:login,
    getHost:getHost,
    getUserInfo:getUserInfo,
    updateCoin:updateCoin,
    activeApp:activeApp,
    udpateBirthday,
    udpateNickame,
    checkContentLawful
}


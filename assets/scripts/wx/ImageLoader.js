
var loadImage = function (url2,callback){
    cc.loader.load({url: url2 +'?file=a.jpg'},function (err,tex) {
        console.log("信息回来�?iimgloader ");
        
        callback(tex);
    });
}

module.exports={
    loadImage:loadImage
}

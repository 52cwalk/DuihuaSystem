
var loadImage = function (url2,callback){
    cc.loader.load({url: url2 +'?file=a.jpg'},function (err,tex) {
        console.log("信息回来了 iimgloader ");
        //var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(0, 0, tex.width, tex.height));
        callback(tex);
    });
}

module.exports={
    loadImage:loadImage
}
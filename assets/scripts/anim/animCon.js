
cc.Class({
    extends: cc.Component,

    properties: {
        animItemObj:cc.Node,
        spinConfigText:cc.JsonAsset
    },
    start () {
        this.bodyId = "";
        this.eyeId = "";
        this.mouthId = "";
        this.poseId = "";
        this.shipingId = "";

        this.spinConfigData =this.spinConfigText.json;// JSON.parse(this.spinConfigText.text);
      //  console.log(this.spinConfigData);
    },
    bodyEdit(str,obj)
    {
        this.bodyId = str;
        console.log("str is called !" + str);
    },
    eyeEdit(str,obj)
    {
        this.eyeId = str;
    },
    mouthEdit(str,obj)
    {
        this.mouthId = str;
    },
    poseEdit(str,obj)
    {
        this.poseId = str;
    },
    shipingEdit(str,obj)
    {
        this.shipingId = str;
    },
    setLieItemConfig(bodyid = null,eyeid = null,mouthid = null,poseid = null,shipingid = null)
    {
        this.bodyId = bodyid;
        this.eyeId = eyeid;
        this.mouthId = mouthid;
        this.poseId = poseid;
        this.shipingId = shipingid;
    },
    loadItem()
    {
        var bodydata = this.findItemDataBySliceId(this.bodyId);

        var eyedata = this.findItemDataBySliceId(this.eyeId);

        var mouthdata = this.findItemDataBySliceId(this.mouthId);

        var posedata = this.findItemDataBySliceId(this.poseId);

        var shipingdata = this.findItemDataBySliceId(this.shipingId);

        this.animItemObj.getComponent("anim_item").loadItem(bodydata,eyedata,mouthdata,posedata,shipingdata);
    },
    close()
    {
        this.setLieItemConfig();
        this.animItemObj.getComponent("anim_item").close();
    },
    findItemDataBySliceId(id)
    {
        for(var i=0;i != this.spinConfigData.length;i++)
        {
            if(id == this.spinConfigData[i].sliceid)
            {
                return this.spinConfigData[i];
            }
        }
        return null;
    },
    backToHome()
    {
        cc.director.loadScene("home");
    }


});


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

        this.spinConfigData =this.spinConfigText.json;
      
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
    setLieItemConfig(bodyid = null)
    {
        this.bodyId = bodyid;
    },
    loadItem()
    {
        this.animItemObj.getComponent("anim_item").loadItem(this.bodyId);
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
        gotoScene("home");
    }


});


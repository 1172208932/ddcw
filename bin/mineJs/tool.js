///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**获取前端的IP地址 */
function getIP() {
    return returnCitySN['cip'];
}

/**微信震动接口 */
function vibrateShor_wx(){
    try{
        wx.vibrateShort( {
                    success:function() {
                    },
                    fail:function(){
                    },
                    complete:function(){
                        
                    }
                } );
    }catch(e){
        // console.log("vibrateShort ------------- error!");
    }
}

function audio_Go(){
    try{
        wx.onAudioInterruptionEnd(function(){
            manager.TsJsmanager.playMusic();                
        })

        wx.onShow(function () {
           manager.TsJsmanager.playMusic();
        })
    }catch(e){
        console.log("onAudioInterruptionEnd ------------- error!");
    }
}

audio_Go();
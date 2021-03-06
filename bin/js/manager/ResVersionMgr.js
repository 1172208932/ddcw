/**
* name
*/
var manager;
(function (manager) {
    var HttpRequest = Laya.HttpRequest;
    var ResVersionMgr = /** @class */ (function () {
        function ResVersionMgr() {
        }
        /**获取带MD5的资源路径 */
        ResVersionMgr.prototype.getMd5Url = function (url) {
            return url;
        };
        ///////////////////////////////////////////////////获取APP版本号/////////////////////////////////////////////////////////////////////////////////////////////
        /**登录 */
        ResVersionMgr.prototype.login = function (code) {
            console.log("用户数据", Main.app.mwx.m_strAllUserData);
            if (Main.app.mwx.m_strAllUserData != null) {
                console.log("走userdata数据");
                this.onLoginPhpComplete(Main.app.mwx.m_strAllUserData);
            }
            else {
                this.onLoginPhpComplete("fail");
            }
            // else
            // {
            // 	console.log("走get.php数据")				
            // 	var http:HttpRequest = new HttpRequest();   //new一个HttpRequest类
            // 	http.once(Laya.Event.COMPLETE , this , this.onLoginPhpComplete , [http.data]); //数据传输完成后，会返回一个data
            // 	http.once(Laya.Event.ERROR , this , this.onLoginPhpError, [http.data]);    //数据传输失败后返回
            // 	http.send("https://"+ configManager.instance.hallIp +"/get.php" , 'code='+code , 'post' , 'text');
            // }
        };
        // /**登录返回 */
        // public onLoginPhpComplete(http:HttpRequest):void{
        // 	manager.EventManager.instance.event(manager.EventManager.LOGIN_SUCCESS , [http.data]);
        // }
        /**登录返回 */
        ResVersionMgr.prototype.onLoginPhpComplete = function (http) {
            manager.EventManager.instance.event(manager.EventManager.LOGIN_SUCCESS, [http]);
        };
        ResVersionMgr.prototype.onLoginPhpError = function (http) {
            manager.EventManager.instance.event(manager.EventManager.LOGIN_FAIL);
        };
        /**保存数据 */
        ResVersionMgr.prototype.saveData = function (userid, data) {
            var time = new Date().getTime();
            var http = new HttpRequest(); //new一个HttpRequest类
            http.once(Laya.Event.COMPLETE, this, this.onSavePhpComplete, [http]); //数据传输完成后，会返回一个data
            http.once(Laya.Event.ERROR, this, this.onSavePhpError); //数据传输失败后返回
            http.send("https://" + manager.configManager.instance.hallIp + "/save.php", 'ts=' + time + '&rid=' + userid + '&data=' + data, 'post', 'text');
        };
        ResVersionMgr.prototype.onSavePhpComplete = function (http) {
            var data = http.data;
        };
        ResVersionMgr.prototype.onSavePhpError = function () {
        };
        Object.defineProperty(ResVersionMgr, "instance", {
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            get: function () {
                if (this._instance == null) {
                    this._instance = new ResVersionMgr();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        ResVersionMgr._instance = null;
        return ResVersionMgr;
    }());
    manager.ResVersionMgr = ResVersionMgr;
})(manager || (manager = {}));
//# sourceMappingURL=ResVersionMgr.js.map
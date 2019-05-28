/**
 * TS 调用 JS 的函数集合
 * JS 调用 TS 的回调函数
* name
*/
var manager;
(function (manager) {
    var TsJsmanager = /** @class */ (function () {
        function TsJsmanager() {
        }
        ///////////////////////////////////////APP 直调 TS///////////////////////////////////////////////////////////////
        ///////////////////////////////////////JS 调用 TS////////////////////////////////////////////////////////////////
        TsJsmanager.playMusic = function () {
            manager.SoundPlayMgr.instance.playBgMusic(manager.SoundPlayMgr.instance.bgmIndex);
        };
        return TsJsmanager;
    }());
    manager.TsJsmanager = TsJsmanager;
})(manager || (manager = {}));
//# sourceMappingURL=TsJsmanager.js.map
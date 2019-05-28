var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var manager;
(function (manager) {
    /**事件全局发送 ， 接受管理器
     * 可在它身上 发送 事件 到其他模块
     * 可在它身上 接受 其他模块发送的事件
    */
    var EventManager = /** @class */ (function (_super) {
        __extends(EventManager, _super);
        function EventManager() {
            return _super.call(this) || this;
        }
        Object.defineProperty(EventManager, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new EventManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        EventManager._instance = null;
        EventManager.REMOVESOURCE_FROM_BLOCKBACKGROUND = "EventManager" + "REMOVESOURCE_FROM_BLOCKBACKGROUND";
        EventManager.LOGIN_SUCCESS = "EventManager" + "LOGIN_SUCCESS";
        EventManager.LOGIN_FAIL = "EventManager" + "LOGIN_FAIL";
        return EventManager;
    }(laya.events.EventDispatcher));
    manager.EventManager = EventManager;
})(manager || (manager = {}));
//# sourceMappingURL=EventManager.js.map
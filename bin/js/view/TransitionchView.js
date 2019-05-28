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
var module;
(function (module) {
    var TransitionchView = /** @class */ (function (_super) {
        __extends(TransitionchView, _super);
        function TransitionchView() {
            var _this = _super.call(this) || this;
            _this.type = 1;
            _this.t = 0;
            _this.plantFun = null;
            _this.topFun = null;
            return _this;
        }
        TransitionchView.prototype.start = function (plantFun, topFun) {
            this.plantFun = plantFun;
            this.topFun = topFun;
            this.visible = true;
            this.box1.x = 0;
            this.type = 1;
            this.t = 0;
            manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_Curtain_RtoL");
            manager.EnterFrameManager.instance.addItem(this);
        };
        TransitionchView.prototype.onEnterFrame = function () {
            if (this.type == 1) {
                this.box1.x += 20;
                if (this.box1.x >= 1550) {
                    this.type = 2;
                    this.plantFun.run();
                }
            }
            else if (this.type == 2) {
                this.t += 30;
                if (this.t >= 1600) {
                    this.type = 3;
                    this.topFun.run();
                }
            }
            else if (this.type == 3) {
                this.box1.x += 30;
                if (this.box1.x >= 3510) {
                    manager.EnterFrameManager.instance.removeItem(this.faceId);
                    this.visible = false;
                }
            }
        };
        TransitionchView.prototype.destroy = function () {
            manager.EnterFrameManager.instance.removeItem(this.faceId);
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return TransitionchView;
    }(ui.game.TransitionchViewUI));
    module.TransitionchView = TransitionchView;
})(module || (module = {}));
//# sourceMappingURL=TransitionchView.js.map
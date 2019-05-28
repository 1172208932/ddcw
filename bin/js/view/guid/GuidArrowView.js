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
    var GuidArrowView = /** @class */ (function (_super) {
        __extends(GuidArrowView, _super);
        function GuidArrowView() {
            var _this = _super.call(this) || this;
            _this.type = 1;
            _this.img_arrow = null;
            _this.t = 0;
            _this.img_arrow = new laya.ui.Image("ui/arrow-yellow.png");
            _this.img_arrow.pivot(64, 26);
            _this.addChild(_this.img_arrow);
            //箭头
            _this.img_arrow.zOrder = 10;
            _this.faceId = manager.EnterFrameManager.instance.id;
            return _this;
        }
        GuidArrowView.prototype.setGuidRun = function (step) {
            console.log("setGuidRun1");
            this.pos(650, -85);
            // this.img_arrow.rotation = 90;
            this.img_arrow.scale(2.5, 2.5);
            this.type = 1;
            manager.EnterFrameManager.instance.addItem(this);
            module.RaceManager.instance.on(module.RaceManager.CHANGE_GUID_RUN_COMPLETE, this, this.onGuidRunComplete);
        };
        GuidArrowView.prototype.setGuidRun2 = function () {
            console.log("setGuidRun2");
            this.pos(325, 785);
            this.img_arrow.rotation = -90;
            this.img_arrow.scale(2.5, 2.5);
            this.type = 1;
            manager.EnterFrameManager.instance.addItem(this);
        };
        GuidArrowView.prototype.setGuidRun3 = function () {
            console.log("setGuidRun3");
            this.pos(165, 128);
            this.img_arrow.rotation = 90;
            this.img_arrow.scale(2.5, 2.5);
            this.type = 1;
            manager.EnterFrameManager.instance.addItem(this);
        };
        GuidArrowView.prototype.setGuidRun4 = function () {
            console.log("setGuidRun4");
            this.pos(100, 56);
            this.img_arrow.rotation = 180;
            this.img_arrow.scale(2.5, 2.5);
            this.type = 2;
            manager.EnterFrameManager.instance.addItem(this);
        };
        GuidArrowView.prototype.setGuidRun5 = function () {
            console.log("setGuidRun5");
            this.pos(370, 10);
            this.img_arrow.rotation = 90;
            this.img_arrow.scale(2.5, 2.5);
            this.type = 1;
            manager.EnterFrameManager.instance.addItem(this);
            // 移除通知
            manager.EventManager.instance.on("OPEN_SELECTGATEDIALOG", this, this.onGuidRunComplete);
        };
        GuidArrowView.prototype.onEnterFrame = function () {
            if (this.type == 1) {
                if (this.t < 20) {
                    this.y -= 1;
                    this.t++;
                }
                else {
                    this.y += 1;
                    this.t++;
                    if (this.t >= 40) {
                        this.t = 0;
                    }
                }
            }
            else if (this.type == 2) {
                if (this.t < 20) {
                    this.x -= 1;
                    this.t++;
                }
                else {
                    this.x += 1;
                    this.t++;
                    if (this.t >= 40) {
                        this.t = 0;
                    }
                }
            }
        };
        GuidArrowView.prototype.onGuidRunComplete = function () {
            this.destroy();
        };
        GuidArrowView.prototype.destroy = function () {
            module.RaceManager.instance.off(module.RaceManager.CHANGE_GUID_RUN_COMPLETE, this, this.onGuidRunComplete);
            manager.EventManager.instance.off("OPEN_SELECTGATEDIALOG", this, this.onGuidRunComplete);
            manager.EnterFrameManager.instance.removeItem(this.faceId);
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return GuidArrowView;
    }(laya.ui.Component));
    module.GuidArrowView = GuidArrowView;
})(module || (module = {}));
//# sourceMappingURL=GuidArrowView.js.map
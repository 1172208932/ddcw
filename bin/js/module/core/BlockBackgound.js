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
    /**弹窗使用的蒙版 */
    var BlockBackgound = /** @class */ (function (_super) {
        __extends(BlockBackgound, _super);
        function BlockBackgound(blockAp) {
            if (blockAp === void 0) { blockAp = 0.5; }
            var _this = _super.call(this) || this;
            _this.source = null;
            _this._isBackClose = true;
            _this.mouseEnabled = true;
            _this.on(laya.events.Event.CLICK, _this, _this.onCloseClick);
            _this.width = Laya.stage.width;
            _this.height = Laya.stage.height;
            var maskimg = new laya.ui.Image("ui/mask.png");
            maskimg.sizeGrid = "9,3,9,3";
            maskimg.height = Laya.stage.height;
            maskimg.width = Laya.stage.width;
            _this.addChild(maskimg);
            _this.alpha = blockAp;
            manager.EventManager.instance.on(manager.EventManager.REMOVESOURCE_FROM_BLOCKBACKGROUND, _this, _this.onRemoeSource);
            return _this;
        }
        BlockBackgound.prototype.removeEvents = function () {
            this.off(laya.events.Event.CLICK, this, this.onCloseClick);
            manager.EventManager.instance.off(manager.EventManager.REMOVESOURCE_FROM_BLOCKBACKGROUND, this, this.onRemoeSource);
            if (this.source != null)
                this.source.off(laya.events.Event.REMOVED, this, this.destroy);
        };
        Object.defineProperty(BlockBackgound.prototype, "sourceView", {
            set: function (value) {
                this.source = value;
                this.source.on(laya.events.Event.REMOVED, this, this.destroy);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BlockBackgound.prototype, "isBackClose", {
            set: function (value) {
                this._isBackClose = value;
            },
            enumerable: true,
            configurable: true
        });
        BlockBackgound.prototype.onCloseClick = function () {
            if (this._isBackClose) {
                if (this.source != null) {
                    this.source.destroy();
                }
                this.destroy();
            }
        };
        BlockBackgound.prototype.onRemoeSource = function () {
            if (this.source != null) {
                this.source.off(laya.events.Event.REMOVED, this, this.destroy);
                this.source = null;
            }
        };
        BlockBackgound.prototype.destroy = function () {
            this.removeEvents();
            this.source = null;
            if (this.parent)
                this.parent.removeChild(this);
            _super.prototype.destroy.call(this);
        };
        return BlockBackgound;
    }(laya.ui.Component));
    module.BlockBackgound = BlockBackgound;
})(module || (module = {}));
//# sourceMappingURL=BlockBackgound.js.map
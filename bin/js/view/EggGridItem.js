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
    var Point = laya.maths.Point;
    var EggGridItem = /** @class */ (function (_super) {
        __extends(EggGridItem, _super);
        function EggGridItem() {
            var _this = _super.call(this) || this;
            _this._index = 0;
            _this.eggInfo = null;
            _this.animation = null;
            _this.aniId = 0;
            _this.txt_time = null;
            _this.maskimg = null;
            _this.downTime = 0;
            _this.faceId = manager.EnterFrameManager.instance.id;
            _this.on(laya.events.Event.CLICK, _this, _this.onClick);
            _this.txt_time = new module.FontClip("ui/num_b_", 0, 78, 120, 17, "center");
            _this.txt_time.scale(0.8, 0.8);
            _this.addChild(_this.txt_time);
            _this.maskimg = new laya.ui.Image("ui/mask.png");
            _this.maskimg.sizeGrid = "9,3,9,3";
            _this.img_exp2.mask = _this.maskimg;
            return _this;
        }
        Object.defineProperty(EggGridItem.prototype, "index", {
            get: function () {
                return this._index;
            },
            set: function (value) {
                this._index = value;
                this.showGrid();
            },
            enumerable: true,
            configurable: true
        });
        EggGridItem.prototype.updateSlot = function () {
            this.showGrid();
        };
        EggGridItem.prototype.showGrid = function () {
            this.eggInfo = module.RaceManager.instance.userInfo.getEggInfoByIndex(this._index);
            if (module.RaceManager.instance.userInfo.isOpenSlot(this._index)) {
                this.img_lock.visible = false;
                if (this.eggInfo != null) {
                    this.img_ying.visible = false;
                    this.img_exp1.visible = this.img_exp2.visible = true;
                    this.downTime = this.eggInfo.time - new Date().getTime();
                    this.createAni();
                    if (this.downTime > 0) {
                        this.img_exp1.visible = this.img_exp2.visible = true;
                        manager.EnterFrameManager.instance.addItem(this);
                    }
                    else {
                        this.img_exp1.visible = this.img_exp2.visible = false;
                        manager.EnterFrameManager.instance.removeItem(this.faceId);
                    }
                }
                else {
                    this.removeAni();
                    this.txt_time.text = "";
                    this.img_ying.visible = true;
                    this.img_exp1.visible = this.img_exp2.visible = false;
                    manager.EnterFrameManager.instance.removeItem(this.faceId);
                }
            }
            else {
                this.removeAni();
                this.txt_time.text = "";
                this.img_ying.visible = this.img_lock.visible = true;
                this.img_exp1.visible = this.img_exp2.visible = false;
                manager.EnterFrameManager.instance.removeItem(this.faceId);
            }
        };
        EggGridItem.prototype.onEnterFrame = function () {
            if (this.downTime > 0) {
                this.downTime -= 30;
                this.maskimg.width = (this.downTime / this.eggInfo.tLength) * this.img_exp2.width;
                if (this.downTime <= 0) {
                    this.animation.play(0, true, "ani_open");
                    this.img_exp1.visible = this.img_exp2.visible = false;
                    manager.EnterFrameManager.instance.removeItem(this.faceId);
                    this.txt_time.text = "";
                    manager.EventManager.instance.event(module.GuidTipView4.CHANGE_TIP4);
                }
                else {
                    this.showTime();
                }
            }
            else {
            }
        };
        EggGridItem.prototype.showTime = function () {
            var s = Math.floor(this.downTime / 1000);
            var h = Math.floor(s / 3600);
            if (h > 0) {
                var m = Math.floor((s % 3600) / 60);
                this.txt_time.text = this.getTwoChar(h) + "a" + this.getTwoChar(m);
            }
            else {
                m = Math.floor(s / 60);
                s = s % 60;
                this.txt_time.text = this.getTwoChar(m) + "a" + this.getTwoChar(s);
            }
        };
        EggGridItem.prototype.getTwoChar = function (value) {
            return value >= 10 ? "" + value : "0" + value;
        };
        EggGridItem.prototype.onClick = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            if (module.RaceManager.instance.userInfo.isOpenSlot(this._index)) {
                if (this.eggInfo != null) {
                    if (this.downTime > 0) {
                        var coin = this.downTime / 1000 >= 3600 ? 2000 : //大于一小时
                            this.downTime / 1000 >= 1800 ? 750 : //大于半小时
                                this.downTime / 1000 >= 600 ? 250 : //大于十分钟
                                    this.downTime / 1000 >= 300 ? 200 : //大于五分钟
                                        50;
                        manager.EventManager.instance.event(module.RaceView.SHOW_HATCH_NOW, [this.eggInfo, coin, this.localToGlobal(new Point(0, 0))]);
                    }
                    else {
                        module.RaceManager.instance.openEgg(this.eggInfo);
                        util.server('oppen_egg', null);
                    }
                }
                else {
                }
            }
            else {
                var dialog = new module.UnlockEggSlotDialog(this._index);
                manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, true, 0.6);
            }
        };
        EggGridItem.prototype.createAni = function () {
            var plantId = this.eggInfo.plantId > 100 ? this.eggInfo.plantId - 100 : this.eggInfo.plantId;
            if (this.aniId != plantId) {
                this.removeAni();
                this.animation = new laya.display.Animation();
                this.animation.loadAnimation(manager.ResVersionMgr.instance.getMd5Url("ani/eggAnis" + plantId + ".ani"));
                this.animation.pos(50, 87);
                this.addChildAt(this.animation, 2);
                if (this.downTime > 0) {
                    if (module.RaceManager.instance.userInfo.coin >= 250) {
                        this.animation.play(0, true, "ani_hatch");
                    }
                    else {
                        this.animation.play(0, true, "ani_waite");
                    }
                }
                else {
                    this.animation.play(0, true, "ani_open");
                }
            }
        };
        EggGridItem.prototype.removeAni = function () {
            if (this.animation != null) {
                this.animation.destroy();
                this.animation = null;
            }
        };
        EggGridItem.prototype.destroy = function () {
            manager.EnterFrameManager.instance.removeItem(this.faceId);
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return EggGridItem;
    }(ui.game.EggGridItemUI));
    module.EggGridItem = EggGridItem;
})(module || (module = {}));
//# sourceMappingURL=EggGridItem.js.map
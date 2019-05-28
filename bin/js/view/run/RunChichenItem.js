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
    var RunChichenItem = /** @class */ (function (_super) {
        __extends(RunChichenItem, _super);
        function RunChichenItem() {
            var _this = _super.call(this) || this;
            _this.box = null;
            _this.img = null;
            _this.hatImg = null;
            _this.isBeginShow = false;
            _this._data = null;
            _this.moveScale = 1;
            _this.t1 = 0;
            _this.max = 0;
            _this.cp = new Array();
            _this.cpIndex = 1;
            _this.state = 0;
            _this.level = 0;
            _this.hatId = 0;
            _this.time = 0;
            //////////////////////////////////////////////////////////////////////////////////////////////////////
            _this.rank = 0;
            _this.bx = 0;
            _this.x1 = 0;
            _this.x2 = 0;
            _this.ex = 0;
            _this.cx = 0;
            _this.lastType = 1;
            _this.speed = 0;
            _this.mTime = 0;
            _this.roadSpeed = 20;
            _this.initView();
            return _this;
        }
        RunChichenItem.prototype.initView = function () {
            this.box = new laya.ui.Component();
            this.addChild(this.box);
            this.img = new laya.ui.Image("ui/01-01.png");
            this.box.addChild(this.img);
            this.initRect();
        };
        RunChichenItem.prototype.setData = function (value, level, hatId) {
            if (hatId === void 0) { hatId = 0; }
            this._data = value;
            this.level = level;
            this.hatId = hatId;
            var l = level % 10 == 0 ? 10 : level % 10;
            this.scale(-1 * value.getScale(l), value.getScale(l));
            this.loadImg();
        };
        Object.defineProperty(RunChichenItem.prototype, "data", {
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        RunChichenItem.prototype.loadImg = function () {
            Laya.loader.load(this._data.getFileUrls(), laya.utils.Handler.create(this, this.onLoadedImage));
        };
        RunChichenItem.prototype.onLoadedImage = function () {
            this.changeToStand();
            this.isBeginShow = true;
        };
        RunChichenItem.prototype.onEnterFrame = function () {
            if (this.isBeginShow == false)
                return;
            this.time -= 30;
            switch (this.state) {
                case module.ChichenInfo.STATE_STAND:
                    this.compress_stand();
                    break;
                case module.ChichenInfo.STATE_RUN:
                    this.compress_run();
                    break;
                case module.ChichenInfo.STATE_HOCK:
                    this.compress_shock();
                    break;
            }
        };
        /**站立时变形*/
        RunChichenItem.prototype.compress_stand = function () {
            if (this.cpIndex == 1) {
                var p = core.Utils.PointOnCubicBezier1_2(this.cp[0], this.cp[1], this.t1 / this.max);
                this.box.scale(p.x * this.moveScale, p.y);
                this.t1 += 1;
                if (this.t1 > this.max) {
                    this.t1 = 1;
                    this.cpIndex = 2;
                }
            }
            else {
                p = core.Utils.PointOnCubicBezier1_2(this.cp[1], this.cp[2], this.t1 / this.max);
                this.box.scale(p.x * this.moveScale, p.y);
                this.t1 += 1;
                if (this.t1 > this.max) {
                    this.t1 = 1;
                    this.cpIndex = 1;
                }
            }
        };
        /**跑时变形*/
        RunChichenItem.prototype.compress_run = function () {
            if (this.cpIndex == 1) {
                this.t1 += 1;
                if (this.t1 >= this.max) {
                    this.changeChichenSkin(5);
                    this.cpIndex = 2;
                    this.t1 = 0;
                }
            }
            else {
                this.t1 += 1;
                if (this.t1 >= this.max) {
                    this.changeChichenSkin(6);
                    this.cpIndex = 1;
                    this.t1 = 0;
                }
            }
        };
        /**惊吓时变形*/
        RunChichenItem.prototype.compress_shock = function () {
            if (this.cpIndex == 1) {
                this.t1 += 1;
                if (this.t1 >= this.max) {
                    this.changeChichenSkin(3);
                    this.cpIndex = 2;
                    this.t1 = 0;
                }
            }
            else {
                this.t1 += 1;
                if (this.t1 >= this.max) {
                    this.changeChichenSkin(1);
                    this.cpIndex = 1;
                    this.t1 = 0;
                    if (this.time <= 0) {
                        this.changeToStand();
                    }
                }
            }
        };
        /**进入站立状态 */
        RunChichenItem.prototype.changeToStand = function () {
            this.state = module.ChichenInfo.STATE_STAND;
            this.t1 = 0;
            this.max = 20;
            this.cp = [];
            this.cp.push(new Point(1, 1));
            this.cp.push(new Point(1.1, 0.9));
            this.cp.push(new Point(1, 1));
            this.cpIndex = 1;
            this.showState();
        };
        /**进入跑状态 */
        RunChichenItem.prototype.changeToRun = function () {
            this.state = module.ChichenInfo.STATE_RUN;
            this.t1 = 1;
            this.max = 5;
            this.cpIndex = 1;
            this.showState();
        };
        /**进入惊吓状态 */
        RunChichenItem.prototype.changeToShock = function () {
            if (this.state == module.ChichenInfo.STATE_STAND) {
                this.state = module.ChichenInfo.STATE_HOCK;
                this.time = 400;
                this.t1 = 1;
                this.max = 5;
                this.cpIndex = 1;
                this.showState();
            }
            else if (this.state == module.ChichenInfo.STATE_HOCK) {
                this.time = 400;
            }
        };
        RunChichenItem.prototype.changeToSlowRun = function () {
            this.max = 50;
        };
        RunChichenItem.prototype.showState = function () {
            switch (this.state) {
                case module.ChichenInfo.STATE_STAND:
                    this.changeChichenSkin(1);
                    break;
                case module.ChichenInfo.STATE_RUN:
                    this.changeChichenSkin(5);
                    break;
                case module.ChichenInfo.STATE_HOCK:
                    this.changeChichenSkin(1);
                    break;
            }
        };
        RunChichenItem.prototype.changeChichenSkin = function (index) {
            this.img.skin = this._data.getURl(index);
            this.img.x = this._data.getWidth(index) / 2 * -1;
            this.img.y = this._data.getHeight(index) * -1;
            this.updateHat(index);
        };
        RunChichenItem.prototype.updateHat = function (index) {
            if (this.hatId == 0) {
                if (this.hatImg != null) {
                    this.hatImg.destroy();
                    this.hatImg = null;
                }
            }
            else {
                if (this.hatImg == null) {
                    this.hatImg = new laya.ui.Image(module.RaceManager.instance.getHatImg(this.hatId));
                }
                else {
                    this.hatImg.skin = module.RaceManager.instance.getHatImg(this.hatId);
                }
                this.hatImg.pivot(this.hatImg.width / 2, this.hatImg.height / 2);
                this.img.addChild(this.hatImg);
                this.hatImg.pos(module.RaceManager.instance.getHatx(this._data.configId, this.hatId, index), module.RaceManager.instance.getHaty(this._data.configId, this.hatId, index));
            }
        };
        RunChichenItem.prototype.initRect = function () {
            this.bx = 50;
            this.ex = Math.floor(Laya.stage.width - 50);
            this.cx = Math.floor(Laya.stage.width / 2);
            this.x1 = Math.floor((this.ex - this.bx) / 3 + this.bx);
            this.x2 = Math.floor(this.ex - ((this.ex - this.bx) / 3));
        };
        RunChichenItem.prototype.resetSpeed = function () {
            if (this.x <= this.x1) {
                this.speed = Math.floor(Math.random() * 8) + this.roadSpeed;
            }
            else if (this.x > this.x1 && this.x < this.x2) {
                this.speed = Math.floor(Math.random() * 8) * (Math.random() * 2 < 1 ? 1 : -1) + this.roadSpeed;
            }
            else if (this.x >= this.x2) {
                this.speed = Math.floor(Math.random() * 8 * -1) + this.roadSpeed;
            }
            this.mTime = Math.floor(Math.random() * 30) + 50;
        };
        RunChichenItem.prototype.moveTo = function () {
            this.mTime -= 1;
            this.x += (this.speed - this.roadSpeed);
            if (this.mTime <= 0) {
                this.resetSpeed();
            }
            else {
                if (Math.abs(this.bx - this.x) < 5 || Math.abs(this.ex - this.x) < 5) {
                    this.resetSpeed();
                }
            }
        };
        RunChichenItem.prototype.setSpurtSpeed = function () {
            if (this.rank == 1) {
                if (this.x < this.x2) {
                    var b = Math.ceil((this.x2 - this.x) / 20);
                    this.speed = b + this.roadSpeed;
                }
                else {
                    this.speed = this.roadSpeed;
                }
            }
            else if (this.rank == 2) {
                if (this.x > this.cx) {
                    b = Math.ceil((this.x - this.cx) / 20);
                    this.speed = this.roadSpeed - b;
                }
                else if (this.x < this.cx) {
                    b = Math.ceil((this.cx - this.x) / 20);
                    this.speed = this.roadSpeed + b;
                }
                else {
                    this.speed = this.roadSpeed;
                }
            }
            else if (this.rank == 3) {
                if (this.x > this.x1) {
                    b = Math.ceil((this.x - this.x1) / 20);
                    this.speed = this.roadSpeed - b;
                }
                else {
                    this.speed = this.roadSpeed;
                }
            }
            this.mTime = 20;
        };
        RunChichenItem.prototype.moveSpurt = function () {
            this.mTime -= 1;
            this.x += (this.speed - this.roadSpeed);
            if (this.mTime <= 0) {
                this.speed = this.roadSpeed;
                this.mTime = 100000;
            }
        };
        RunChichenItem.prototype.setLastSpeed = function () {
            this.speed = 40;
            this.lastType = 1;
        };
        RunChichenItem.prototype.moveLast = function (tx, by) {
            if (this.lastType == 1) {
                this.x += (this.speed - this.roadSpeed);
                if (this.x > Laya.stage.width + 150) {
                    this.changeToStand();
                    if (this.rank == 1) {
                        this.pos(tx + 340, by + 430);
                    }
                    else if (this.rank == 2) {
                        this.pos(tx + 115, by + 545);
                    }
                    else if (this.rank == 3) {
                        this.pos(tx + 565, by + 585);
                    }
                    this.lastType = 2;
                }
            }
            else {
                this.x -= this.roadSpeed;
            }
        };
        RunChichenItem.prototype.setPos = function (xx, yy) {
            this.pos(xx, yy);
        };
        return RunChichenItem;
    }(laya.ui.Component));
    module.RunChichenItem = RunChichenItem;
})(module || (module = {}));
//# sourceMappingURL=RunChichenItem.js.map
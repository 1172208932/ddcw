var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
* name
*/
var module;
(function (module) {
    var Point = laya.maths.Point;
    var ChichenItem = (function (_super) {
        __extends(ChichenItem, _super);
        function ChichenItem() {
            var _this = _super.call(this) || this;
            _this.box = null;
            _this.img = null;
            _this.isBeginShow = false;
            _this._data = null;
            _this.moveScale = 1;
            _this.box = new laya.ui.Component();
            _this.addChild(_this.box);
            _this.img = new laya.ui.Image("ui/01-01.png");
            _this.box.addChild(_this.img);
            return _this;
        }
        Object.defineProperty(ChichenItem.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this.x = this._data.x;
                this.y = this._data.y;
                this.loadImg();
            },
            enumerable: true,
            configurable: true
        });
        /**是否点击中 */
        ChichenItem.prototype.collision = function (pos) {
            if (this._data.state == module.ChichenInfo.STATE_SLEEP) {
                return false;
            }
            else {
                var r = Math.min(this._data.config.getWidth(1) / 2, this._data.config.getHeight(1) / 2);
                if (Math.pow(this.x - pos.x, 2) + Math.pow((this.y - r) - pos.y, 2) <= Math.pow(r, 2)) {
                    return true;
                }
            }
        };
        /**飞行数据 */
        ChichenItem.prototype.getFlyData = function () {
            var r = Math.min(this._data.config.getWidth(1) / 2, this._data.config.getHeight(1) / 2);
            var pos = new Point(this.x, this.y - r);
            return [pos, 1, 1];
        };
        ChichenItem.prototype.loadImg = function () {
            Laya.loader.load(this._data.config.getFileUrls(), laya.utils.Handler.create(this, this.onLoadedImage));
        };
        ChichenItem.prototype.onLoadedImage = function () {
            this.changeToStand();
            this.showState();
            this.isBeginShow = true;
        };
        ChichenItem.prototype.onEnterFrame = function () {
            if (this.isBeginShow == false)
                return;
            this._data.time -= 30;
            switch (this._data.state) {
                case module.ChichenInfo.STATE_STAND:
                    this.compress_stand();
                    break;
                case module.ChichenInfo.STATE_EAT:
                    this.compress_eat();
                    break;
                case module.ChichenInfo.STATE_WALK:
                    this.compress_walk();
                    break;
                case module.ChichenInfo.STATE_RUN:
                    break;
                case module.ChichenInfo.STATE_SLEEP:
                    break;
            }
        };
        /**站立时变形*/
        ChichenItem.prototype.compress_stand = function () {
            if (this._data.cpIndex == 1) {
                var p = core.Utils.PointOnCubicBezier1_2(this._data.cp[0], this._data.cp[1], this._data.t1 / this._data.max);
                this.box.scale(p.x * this.moveScale, p.y);
                this._data.t1 += 1;
                if (this._data.t1 > this._data.max) {
                    this._data.t1 = 1;
                    this._data.cpIndex = 2;
                }
            }
            else {
                p = core.Utils.PointOnCubicBezier1_2(this._data.cp[1], this._data.cp[2], this._data.t1 / this._data.max);
                this.box.scale(p.x * this.moveScale, p.y);
                this._data.t1 += 1;
                if (this._data.t1 > this._data.max) {
                    if (this._data.time <= 0) {
                        this.changeStateBySelf();
                    }
                    else {
                        this._data.t1 = 1;
                        this._data.cpIndex = 1;
                    }
                }
            }
        };
        /**吃东西时变形*/
        ChichenItem.prototype.compress_eat = function () {
            if (this._data.cpIndex == 1) {
                this._data.t1 += 1;
                if (this._data.t1 >= this._data.max) {
                    this.img.skin = this._data.config.getURl(2);
                    this.img.x = this._data.config.getWidth(2) / 2 * -1;
                    this.img.y = this._data.config.getHeight(2) * -1;
                    this._data.cpIndex = 2;
                    this._data.t1 = 0;
                }
            }
            else {
                this._data.t1 += 1;
                if (this._data.t1 >= this._data.max) {
                    this.img.skin = this._data.config.getURl(1);
                    this.img.x = this._data.config.getWidth(1) / 2 * -1;
                    this.img.y = this._data.config.getHeight(1) * -1;
                    this._data.cpIndex = 1;
                    this._data.t1 = 0;
                    if (this._data.time <= 0) {
                        this.changeStateBySelf();
                    }
                }
            }
        };
        /**行走时变形*/
        ChichenItem.prototype.compress_walk = function () {
            if (this._data.movet1 <= this._data.moveMax) {
                var p = core.Utils.PointOnCubicBezier1_2(this._data.moveCp[0], this._data.moveCp[1], this._data.movet1 / this._data.moveMax);
                this.pos(p.x, p.y);
                this._data.movet1 += 1;
            }
            if (this._data.cpIndex == 1) {
                p = core.Utils.PointOnCubicBezier1_2(this._data.cp[0], this._data.cp[1], this._data.t1 / this._data.max);
                this.box.scale(p.x * this.moveScale, p.y);
                this._data.t1 += 1;
                if (this._data.t1 > this._data.max) {
                    this._data.t1 = 1;
                    this._data.cpIndex = 2;
                }
            }
            else {
                p = core.Utils.PointOnCubicBezier1_2(this._data.cp[1], this._data.cp[2], this._data.t1 / this._data.max);
                this.box.scale(p.x * this.moveScale, p.y);
                this._data.t1 += 1;
                if (this._data.t1 > this._data.max) {
                    if (this._data.movet1 > this._data.moveMax) {
                        this.changeStateBySelf();
                    }
                    else {
                        this._data.t1 = 1;
                        this._data.cpIndex = 1;
                    }
                }
            }
        };
        /**动物自己改变状态 */
        ChichenItem.prototype.changeStateBySelf = function () {
            var arr = [module.ChichenInfo.STATE_STAND, module.ChichenInfo.STATE_EAT, module.ChichenInfo.STATE_WALK];
            var state = arr[Math.floor(Math.random() * arr.length)];
            if (state == module.ChichenInfo.STATE_STAND) {
                this.changeToStand();
            }
            else if (state == module.ChichenInfo.STATE_EAT) {
                this.changeToEat();
            }
            else if (state == module.ChichenInfo.STATE_WALK) {
                this.changeToWalk();
            }
            this.showState();
        };
        /**进入站立状态 */
        ChichenItem.prototype.changeToStand = function () {
            this._data.state = module.ChichenInfo.STATE_STAND;
            this._data.time = 2000 + Math.floor(Math.random() * 2000);
            this._data.t1 = 0;
            this._data.max = 20;
            this._data.cp = [];
            this._data.cp.push(new Point(1, 1));
            this._data.cp.push(new Point(1.1, 0.9));
            this._data.cp.push(new Point(1, 1));
            this._data.cpIndex = 1;
        };
        /**进入吃东西状态 */
        ChichenItem.prototype.changeToEat = function () {
            this._data.state = module.ChichenInfo.STATE_EAT;
            this._data.time = 2000 + Math.floor(Math.random() * 2000);
            this._data.t1 = 1;
            this._data.max = 20;
            this._data.cpIndex = 1;
        };
        /**进入走状态 */
        ChichenItem.prototype.changeToWalk = function () {
            this._data.state = module.ChichenInfo.STATE_WALK;
            this._data.t1 = 0;
            this._data.max = 10;
            this._data.cp = [];
            this._data.cp.push(new Point(1, 1));
            this._data.cp.push(new Point(1.2, 0.8));
            this._data.cp.push(new Point(1, 1));
            this._data.cpIndex = 1;
            this._data.moveCp = [];
            this._data.moveCp.push(new Point(this.x, this.y));
            this._data.moveCp.push(module.RaceManager.instance.getNextPos());
            this._data.movet1 = 1;
            this._data.moveMax = Math.floor(this._data.moveCp[0].distance(this._data.moveCp[1].x, this._data.moveCp[1].y) / 2);
            if (this._data.moveCp[0].x <= this._data.moveCp[1].x) {
                this.moveScale = -1;
            }
            else {
                this.moveScale = 1;
            }
        };
        ChichenItem.prototype.showState = function () {
            switch (this._data.state) {
                case module.ChichenInfo.STATE_STAND:
                    this.img.skin = this._data.config.getURl(1);
                    this.img.x = this._data.config.getWidth(1) / 2 * -1;
                    this.img.y = this._data.config.getHeight(1) * -1;
                    break;
                case module.ChichenInfo.STATE_EAT:
                    this.img.skin = this._data.config.getURl(1);
                    this.img.x = this._data.config.getWidth(1) / 2 * -1;
                    this.img.y = this._data.config.getHeight(1) * -1;
                    break;
                case module.ChichenInfo.STATE_WALK:
                    this.img.skin = this._data.config.getURl(1);
                    this.img.x = this._data.config.getWidth(1) / 2 * -1;
                    this.img.y = this._data.config.getHeight(1) * -1;
                    break;
                case module.ChichenInfo.STATE_RUN:
                    this.img.skin = this._data.config.getURl(5);
                    this.img.x = this._data.config.getWidth(1) / 2 * -1;
                    this.img.y = this._data.config.getHeight(1) * -1;
                    break;
                case module.ChichenInfo.STATE_SLEEP:
                    this.img.skin = this._data.config.getURl(7);
                    this.img.x = this._data.config.getWidth(1) / 2 * -1;
                    this.img.y = this._data.config.getHeight(1) * -1;
                    break;
            }
        };
        return ChichenItem;
    }(laya.ui.Component));
    module.ChichenItem = ChichenItem;
})(module || (module = {}));
//# sourceMappingURL=ChichenItem.js.map
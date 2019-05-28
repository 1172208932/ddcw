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
    var Event = laya.events.Event;
    var Point = laya.maths.Point;
    var LocalStorage = laya.net.LocalStorage;
    var PlantView = /** @class */ (function (_super) {
        __extends(PlantView, _super);
        function PlantView() {
            var _this = _super.call(this) || this;
            _this.sp_decal = null;
            _this.chichenView = null;
            _this.sp_top = null;
            _this.handImg = null;
            /**场地上的配饰图片 */
            _this.decalImgs = new Array();
            /**抖动偏移值 X */
            _this.shakeX = [0, 5, 0, -5, 0, 5, 0, -5, 0];
            /**抖动偏移值 Y */
            _this.shakeY = [0, 5, 0, -5, 0, -5, 0, 5, 0];
            _this.shakeType = 0;
            _this.shakeIndex = 0;
            _this.faceId = manager.EnterFrameManager.instance.id;
            _this.initView();
            _this.initEvents();
            return _this;
        }
        PlantView.prototype.initView = function () {
            this.sp_decal = new laya.ui.Component();
            this.addChild(this.sp_decal);
            this.chichenView = new module.ChichenView();
            this.addChild(this.chichenView);
            this.sp_top = new laya.ui.Component();
            this.addChild(this.sp_top);
            this.handImg = new laya.ui.Image("ui/btn_touming.png");
            this.handImg.width = Laya.stage.width;
            this.handImg.height = Laya.stage.height;
            this.addChild(this.handImg);
            this.handImg.on(Event.CLICK, this, this.onHandClick);
            this.handImg.on(Event.MOUSE_DOWN, this, this.onHandMouseDown);
            this.handImg.on(Event.MOUSE_UP, this, this.onHandMouseUp);
        };
        PlantView.prototype.initEvents = function () {
            manager.EventManager.instance.on(module.RaceView.CLICK_CHICHEN, this, this.onClickChichen);
            module.RaceManager.instance.on(module.RaceManager.ADD_COIN_IN_PLANT, this, this.onAddCoinInPlant);
            module.RaceManager.instance.on(module.RaceManager.REMOVE_COIN_FROM_PLANT, this, this.onRemoveCoinFromPlant);
            module.RaceManager.instance.on(module.RaceManager.ADD_CHICHEN_TO_PLANT, this, this.onAddChichenToPlant);
            module.RaceManager.instance.on(module.RaceManager.REMOVE_CHICHEN_FROM_PLANT, this, this.onRemoveChichenFromPlant);
            module.RaceManager.instance.on(module.RaceManager.UPGRADE_CHICHEN, this, this.onUpgradeChichen);
            module.RaceManager.instance.on(module.RaceManager.CHANGE_CHICHEN_HAT, this, this.onChangeHAt);
        };
        PlantView.prototype.removeEvents = function () {
            manager.EventManager.instance.off(module.RaceView.CLICK_CHICHEN, this, this.onClickChichen);
            module.RaceManager.instance.off(module.RaceManager.ADD_COIN_IN_PLANT, this, this.onAddCoinInPlant);
            module.RaceManager.instance.off(module.RaceManager.REMOVE_COIN_FROM_PLANT, this, this.onRemoveCoinFromPlant);
            module.RaceManager.instance.off(module.RaceManager.ADD_CHICHEN_TO_PLANT, this, this.onAddChichenToPlant);
            module.RaceManager.instance.off(module.RaceManager.REMOVE_CHICHEN_FROM_PLANT, this, this.onRemoveChichenFromPlant);
            module.RaceManager.instance.off(module.RaceManager.UPGRADE_CHICHEN, this, this.onUpgradeChichen);
            module.RaceManager.instance.off(module.RaceManager.CHANGE_CHICHEN_HAT, this, this.onChangeHAt);
        };
        PlantView.prototype.onHandClick = function (e) {
            var touches = e.touches;
            var point = (touches && touches.length > 0) ? new Point(touches[0].stageX, touches[0].stageY) : new Point(e.stageX, e.stageY);
            this.chichenView.onHandClick(point);
        };
        /**按下 */
        PlantView.prototype.onHandMouseDown = function (e) {
            this.handImg.on(Event.MOUSE_MOVE, this, this.onHandMouseMove); //开启滑动检查
        };
        /**移动 */
        PlantView.prototype.onHandMouseMove = function (e) {
            var touches = e.touches;
            var point = (touches && touches.length > 0) ? new Point(touches[0].stageX, touches[0].stageY) : new Point(e.stageX, e.stageY);
            this.chichenView.onHandMove(point);
        };
        /**弹起 */
        PlantView.prototype.onHandMouseUp = function (e) {
            this.handImg.off(Event.MOUSE_MOVE, this, this.onHandMouseMove);
        };
        /**初始化场地 */
        PlantView.prototype.initData = function () {
            this.initDecal();
            this.initChichen();
            manager.EnterFrameManager.instance.addItem(this);
        };
        PlantView.prototype.show = function () {
            this.visible = true;
            manager.EnterFrameManager.instance.addItem(this);
        };
        PlantView.prototype.hide = function () {
            this.visible = false;
            manager.EnterFrameManager.instance.removeItem(this.faceId);
        };
        /**改变场地 */
        PlantView.prototype.changePlant = function () {
            this.clearAll();
            this.initDecal();
            this.initChichen();
            this.showCardentip();
        };
        PlantView.prototype.onEnterFrame = function () {
            this.chichenView.onEnterFrame();
            this.shakeView();
            // if (Main.app.is_wx) {
            this.checkFlyVideo();
            // }
        };
        /**初始化场地图片 */
        PlantView.prototype.initDecal = function () {
            var decals = module.RaceManager.instance.getMapData();
            for (var i = 0; i < decals.length; i++) {
                var data = decals[i];
                var ps = data.P.split(",");
                var type = Number(ps[0]);
                var layer = ps.length >= 2 ? Number(ps[1]) : 0;
                var sx = ps.length >= 3 ? Number(ps[2]) : 0;
                var sy = ps.length >= 4 ? Number(ps[3]) : 0;
                if (type == 0) {
                    this.bg.skin = manager.configManager.instance.CDN_BOOT + "map/" + data.U + ".png";
                }
                else if (type == 1) {
                    var img = new laya.ui.Image(manager.configManager.instance.CDN_BOOT + "map/" + data.U + ".png");
                    this.addImage(data.U + ".png", layer, sx, sy, img, data);
                }
                else if (type == 2) {
                    var ani = new laya.display.Animation();
                    ani.loadAnimation(manager.ResVersionMgr.instance.getMd5Url(data.U));
                    this.addAnimation(ani, layer, sx, sy, data);
                }
            }
        };
        /**初始化场地中的动物 */
        PlantView.prototype.initChichen = function () {
            this.chichenView.initChichen();
        };
        /**添加一个图片 */
        PlantView.prototype.addImage = function (url, layer, sx, sy, img, data) {
            if (layer == 1) {
                this.sp_decal.addChild(img);
            }
            else if (layer == 2) {
                this.chichenView.addSp(img);
            }
            else if (layer == 3) {
                this.sp_top.addChild(img);
            }
            var size = module.RaceManager.instance.getMapImageSize(url);
            img.scale(sx, sy);
            var w = Math.abs(sx) * size[0];
            var h = Math.abs(sy) * size[1];
            var a = sx < 0 ? w : 0;
            if (data.x != undefined) {
                img.x = data.x;
            }
            else {
                if (data.L != undefined) {
                    img.x = data.L + a;
                }
                else if (data.R != undefined) {
                    img.x = Laya.stage.width - data.R - w + a;
                }
                else if (data.CX != undefined) {
                    img.x = (Laya.stage.width - w) / 2 + data.CX;
                }
            }
            if (data.y != undefined) {
                img.y = data.y;
            }
            else {
                if (data.T != undefined) {
                    img.y = data.T;
                }
                else if (data.B != undefined) {
                    img.y = Laya.stage.height - data.B - h;
                }
                else if (data.CY != undefined) {
                    img.y = (Laya.stage.height - h) / 2 + data.CY;
                }
            }
            this.decalImgs.push(img);
        };
        /**添加一个场地动画 */
        PlantView.prototype.addAnimation = function (ani, layer, sx, sy, data) {
            if (layer == 1) {
                this.sp_decal.addChild(ani);
            }
            else if (layer == 2) {
                this.chichenView.addAni(ani);
            }
            else if (layer == 3) {
                this.sp_top.addChild(ani);
            }
            ani.scale(sx, sy);
            if (data.x != undefined) {
                ani.x = data.x;
            }
            else {
                if (data.L != undefined) {
                    ani.x = data.L;
                }
                else if (data.R != undefined) {
                    ani.x = Laya.stage.width - data.R;
                }
                else if (data.CX != undefined) {
                    ani.x = (Laya.stage.width) / 2 + data.CX;
                }
            }
            if (data.y != undefined) {
                ani.y = data.y;
            }
            else {
                if (data.T != undefined) {
                    ani.y = data.T;
                }
                else if (data.B != undefined) {
                    ani.y = Laya.stage.height - data.B;
                }
                else if (data.CY != undefined) {
                    ani.y = (Laya.stage.height) / 2 + data.CY;
                }
            }
        };
        PlantView.prototype.showCardentip = function () {
            var plantInfo = module.RaceManager.instance.getPlantInfo();
            if (plantInfo.plantId > 100 && module.RaceManager.instance.isShowTip) {
                module.RaceManager.instance.isShowTip = false;
                var view = new module.GuidTipView5();
                this.addChild(view);
            }
        };
        PlantView.prototype.clearAll = function () {
            for (var i = 0; i < this.decalImgs.length; i++) {
                this.decalImgs[i].destroy();
            }
            this.decalImgs = [];
            this.chichenView.clearAll();
        };
        /**在场地中添加一个金币 */
        PlantView.prototype.onAddCoinInPlant = function (coinInfo) {
            this.chichenView.addCoin(coinInfo);
        };
        /**移除一个金币 */
        PlantView.prototype.onRemoveCoinFromPlant = function (coinInfo) {
            this.chichenView.removeCoin(coinInfo);
        };
        /**添加一个动物 */
        PlantView.prototype.onAddChichenToPlant = function (chichenInfo) {
            this.chichenView.addChichenToPlant(chichenInfo);
        };
        /**移除一个动物 */
        PlantView.prototype.onRemoveChichenFromPlant = function (chichenInfo) {
            this.chichenView.removeChichenFromPlant(chichenInfo);
        };
        PlantView.prototype.onGotoMeal = function () {
            this.chichenView.onGotoMeal();
        };
        PlantView.prototype.onCloseMeal = function () {
            this.chichenView.onCloseMeal();
        };
        /**升级 */
        PlantView.prototype.onUpgradeChichen = function (chichenInfo) {
            this.chichenView.upgradeChihcen(chichenInfo);
        };
        PlantView.prototype.onChangeHAt = function (chichenInfo) {
            this.chichenView.onChangeHAt(chichenInfo);
        };
        /**检查是否放飞行宝箱 */
        PlantView.prototype.checkFlyVideo = function () {
            var curTimes = 0;
            var saveTime = LocalStorage.getItem(Main.DianDianChongWu_NowDay4);
            if (saveTime == Main.app.mwx.nowday) {
                var storageTimes = Number(LocalStorage.getItem(Main.DianDianChongWu_GetCoinsByShare_Times));
                if (!!storageTimes)
                    curTimes = storageTimes;
            }
            else {
                LocalStorage.setItem(Main.DianDianChongWu_NowDay4, Main.app.mwx.nowday);
                LocalStorage.setItem(Main.DianDianChongWu_GetCoinsByShare_Times, '0');
            }
            if (Main.app.mwx.ofCoinsBox == 3 && curTimes >= 5) {
                return;
            }
            // 条件满足时展示悬浮的大量金币按钮
            if (this.visible == true) {
                module.RaceManager.instance.userInfo.flyVideDownTime -= 30;
                if (module.RaceManager.instance.userInfo.flyVideDownTime < 0) {
                    var item = new module.FlyVideoItem();
                    this.addChild(item);
                    module.RaceManager.instance.userInfo.flyVideDownTime = 100 * 24 * 60 * 60 * 1000;
                }
            }
        };
        PlantView.prototype.shakeView = function () {
            if (this.shakeType == 1) {
                this.x = this.shakeX[this.shakeIndex];
                this.y = this.shakeY[this.shakeIndex];
                this.shakeIndex++;
                if (this.shakeIndex >= this.shakeX.length) {
                    this.shakeIndex = 0;
                    this.shakeType = 0;
                }
            }
        };
        PlantView.prototype.onClickChichen = function () {
            this.shakeType = 1;
        };
        PlantView.prototype.destroy = function () {
            this.removeEvents();
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return PlantView;
    }(ui.game.PlantViewUI));
    module.PlantView = PlantView;
})(module || (module = {}));
//# sourceMappingURL=PlantView.js.map
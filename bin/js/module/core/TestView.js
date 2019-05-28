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
    var TestView = /** @class */ (function (_super) {
        __extends(TestView, _super);
        function TestView() {
            var _this = _super.call(this) || this;
            _this.x1 = 125;
            _this.x2 = 375;
            _this.x3 = 625;
            _this.y1 = 600;
            _this.y2 = 900;
            _this.y3 = 1200;
            _this.chichenID = 0;
            _this.hatID = 0;
            _this.posList = new Array();
            _this.imgs = new Array();
            _this.hatImgs = new Array();
            _this.selectImg = null;
            _this.upc = 0;
            _this.downc = 0;
            _this.leftc = 0;
            _this.rightc = 0;
            _this.upb = 0;
            _this.downb = 0;
            _this.leftb = 0;
            _this.rightb = 0;
            _this.posList = module.ChichenConfig.HAT;
            var sp = new laya.ui.Component();
            sp.graphics.drawLine(_this.x1, 0, _this.x1, Laya.stage.height, "#00ff00", 2);
            sp.graphics.drawLine(_this.x2, 0, _this.x2, Laya.stage.height, "#00ff00", 2);
            sp.graphics.drawLine(_this.x3, 0, _this.x3, Laya.stage.height, "#00ff00", 2);
            sp.graphics.drawLine(0, _this.y1, 750, _this.y1, "#00ff00", 2);
            sp.graphics.drawLine(0, _this.y2, 750, _this.y2, "#00ff00", 2);
            sp.graphics.drawLine(0, _this.y3, 750, _this.y3, "#00ff00", 2);
            _this.addChildAt(sp, 1);
            _this.btn_next.on(laya.events.Event.CLICK, _this, _this.onBtnNext);
            _this.btn_prev.on(laya.events.Event.CLICK, _this, _this.onBtnPrev);
            _this.btn_save.on(laya.events.Event.CLICK, _this, _this.onBtnSave);
            for (var i = 1; i <= 11; i++) {
                _this["btn_hat" + i].on(laya.events.Event.CLICK, _this, _this.onBtnHat);
            }
            Laya.stage.on(laya.events.Event.KEY_DOWN, _this, _this.onKeyDown);
            Laya.stage.on(laya.events.Event.KEY_UP, _this, _this.onKeyUp);
            Laya.timer.loop(30, _this, _this.move);
            return _this;
        }
        TestView.prototype.onBtnNext = function () {
            if (this.chichenID < 176) {
                this.chichenID += 1;
            }
            else {
                this.chichenID = 1;
            }
            this.loadChichenImg();
        };
        TestView.prototype.onBtnPrev = function () {
            if (this.chichenID > 1) {
                this.chichenID -= 1;
            }
            else {
                this.chichenID = 176;
            }
            this.loadChichenImg();
        };
        TestView.prototype.onBtnHat = function (e) {
            if (this.chichenID != 0) {
                var id = Number(e.currentTarget.name);
                this.loadHatImag(id);
            }
        };
        TestView.prototype.loadChichenImg = function () {
            var config = module.RaceManager.instance.chichenConfigDic.get(this.chichenID);
            Laya.loader.load(config.getFileUrls(), laya.utils.Handler.create(this, this.onLoadedImage));
            this.txt_id.text = this.chichenID + "";
        };
        TestView.prototype.onLoadedImage = function () {
            this.clearAll();
            this.clearhat();
            var config = module.RaceManager.instance.chichenConfigDic.get(this.chichenID);
            for (var index = 1; index <= 7; index++) {
                var img = new laya.ui.Image(config.getURl(index));
                img.x = config.getWidth(index) / 2 * -1 + this.getBx(index);
                img.y = config.getHeight(index) * -1 + this.getBy(index);
                this.addChild(img);
                this.imgs.push(img);
            }
        };
        TestView.prototype.clearAll = function () {
            for (var i = 0; i < this.imgs.length; i++) {
                this.imgs[i].destroy();
            }
            this.imgs = new Array();
        };
        TestView.prototype.clearhat = function () {
            for (var i = 0; i < this.hatImgs.length; i++) {
                this.hatImgs[i].destroy();
            }
            this.hatImgs = new Array();
        };
        TestView.prototype.loadHatImag = function (id) {
            this.clearhat();
            this.hatID = id;
            for (var i = 1; i <= 7; i++) {
                var img = new laya.ui.Image("ui/hat_" + this.hatID + ".png");
                img.name = i + "";
                this.imgs[i - 1].addChild(img);
                img.pivot(img.width / 2, img.height / 2);
                img.x = this.getHatx(i);
                img.y = this.getHaty(i);
                this.hatImgs.push(img);
                img.on(laya.events.Event.CLICK, this, this.onSelectHat);
            }
        };
        TestView.prototype.onSelectHat = function (e) {
            var index = Number(e.currentTarget.name);
            this.selectImg = e.currentTarget;
        };
        TestView.prototype.getBx = function (index) {
            switch (index) {
                case 1:
                    return this.x1;
                case 2:
                    return this.x2;
                case 3:
                    return this.x3;
                case 4:
                    return this.x1;
                case 5:
                    return this.x2;
                case 6:
                    return this.x3;
                case 7:
                    return this.x1;
            }
        };
        TestView.prototype.getBy = function (index) {
            switch (index) {
                case 1:
                    return this.y1;
                case 2:
                    return this.y1;
                case 3:
                    return this.y1;
                case 4:
                    return this.y2;
                case 5:
                    return this.y2;
                case 6:
                    return this.y2;
                case 7:
                    return this.y3;
            }
        };
        TestView.prototype.getHatx = function (index) {
            var arr = this.posList[this.chichenID - 1];
            var i = (this.hatID - 1) * 14 + (index - 1) * 2;
            return arr[i];
        };
        TestView.prototype.getHaty = function (index) {
            var arr = this.posList[this.chichenID - 1];
            var i = (this.hatID - 1) * 14 + (index - 1) * 2 + 1;
            return arr[i];
        };
        TestView.prototype.saveHatX = function (index, xx) {
            var arr = this.posList[this.chichenID - 1];
            var i = (this.hatID - 1) * 14 + (index - 1) * 2;
            arr[i] = xx;
        };
        TestView.prototype.saveHatY = function (index, yy) {
            var arr = this.posList[this.chichenID - 1];
            var i = (this.hatID - 1) * 14 + (index - 1) * 2 + 1;
            arr[i] = yy;
        };
        TestView.prototype.onKeyDown = function (e) {
            switch (e.keyCode) {
                case 87: //上
                    this.upc = 1;
                    break;
                case 65: //左
                    this.leftc = 1;
                    break;
                case 83: //下
                    this.downc = 1;
                    break;
                case 68: //右
                    this.rightc = 1;
                    break;
                case 38: //上
                    this.upb = 1;
                    break;
                case 37: //左
                    this.leftb = 1;
                    break;
                case 40: //下
                    this.downb = 1;
                    break;
                case 39: //右
                    this.rightb = 1;
                    break;
                default:
                    break;
            }
        };
        TestView.prototype.onKeyUp = function (e) {
            switch (e.keyCode) {
                case 87: //上
                    this.upc = 0;
                    break;
                case 65: //左
                    this.leftc = 0;
                    break;
                case 83: //下
                    this.downc = 0;
                    break;
                case 68: //右
                    this.rightc = 0;
                    break;
                case 38: //上
                    this.upb = 0;
                    break;
                case 37: //左
                    this.leftb = 0;
                    break;
                case 40: //下
                    this.downb = 0;
                    break;
                case 39: //右
                    this.rightb = 0;
                    break;
                default:
                    break;
            }
        };
        TestView.prototype.move = function () {
            if (this.upb + this.downb + this.leftb + this.rightb > 0) {
                var bx = this.rightb - this.leftb;
                var by = this.downb - this.upb;
                if (this.selectImg != null) {
                    this.selectImg.x += bx;
                    this.selectImg.y += by;
                    this.saveHatX(Number(this.selectImg.name), this.selectImg.x);
                    this.saveHatY(Number(this.selectImg.name), this.selectImg.y);
                }
            }
        };
        TestView.prototype.onBtnSave = function () {
            if (this.chichenID != 0) {
                var arr = this.posList[this.chichenID - 1];
                console.log("/**" + (this.chichenID) + "*/ [" + arr.join(",") + "],");
            }
        };
        return TestView;
    }(ui.load.TestViewUI));
    module.TestView = TestView;
})(module || (module = {}));
//# sourceMappingURL=TestView.js.map
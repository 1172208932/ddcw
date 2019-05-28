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
    var TestView = (function (_super) {
        __extends(TestView, _super);
        function TestView() {
            var _this = _super.call(this) || this;
            _this.mFactory1 = null;
            _this.mFactory2 = null;
            _this.mFactory3 = null;
            _this.mFactory4 = null;
            _this.mFactory5 = null;
            _this.mHua = null;
            _this.curId = 0;
            _this.imgs = [];
            _this.whs = [];
            _this.urls = null;
            _this.btn_add.on(laya.events.Event.CLICK, _this, _this.onBtnAdd);
            _this.graphics.drawLine(350, 0, 350, 1334, "#00ff00", 2);
            _this.graphics.drawLine(0, 600, 750, 600, "#00ff00", 2);
            return _this;
        }
        TestView.prototype.loadChichen = function (id) {
            Laya.loader.load(this.getFiles(id), laya.utils.Handler.create(this, this.loadComplete2));
        };
        TestView.prototype.loadComplete = function () {
            for (var i = 0; i < this.imgs.length; i++) {
                this.imgs[i].destroy();
            }
            this.imgs = [];
            for (var i = 1; i <= 7; i++) {
                if (i != 4) {
                    var img = new laya.ui.Image(this.getURl(this.curId, i));
                    this.addChild(img);
                    var xx = img.width / 2 * -1;
                    var yy = img.height * -1;
                    img.pos(350 + xx, 600 + yy);
                    this.imgs.push(img);
                }
            }
        };
        TestView.prototype.loadComplete2 = function () {
            for (var i = 1; i <= 7; i++) {
                if (i != 4) {
                    var img = new laya.ui.Image(this.getURl(this.curId, i));
                    this.whs.push(img.width - 100, img.height - 100);
                }
            }
            this.onBtnAdd();
        };
        TestView.prototype.onBtnAdd = function () {
            // if(this.curId < 176){
            // 	this.curId++;
            // }
            // this.loadChichen(this.curId);
            // if(this.curId < 176){
            // 	this.curId++;
            // 	this.loadChichen(this.curId);
            // }else{
            // 	console.log(this.whs.join(","));
            // }
            this.testMap();
        };
        TestView.prototype.getURl = function (id, index) {
            var ss = id < 10 ? "0" + id : "" + id;
            return "chichen/" + ss + "-0" + index + ".png";
        };
        TestView.prototype.getFiles = function (id) {
            var list = [];
            list.push({ url: this.getURl(id, 1), type: laya.net.Loader.IMAGE });
            list.push({ url: this.getURl(id, 2), type: laya.net.Loader.IMAGE });
            list.push({ url: this.getURl(id, 3), type: laya.net.Loader.IMAGE });
            list.push({ url: this.getURl(id, 5), type: laya.net.Loader.IMAGE });
            list.push({ url: this.getURl(id, 6), type: laya.net.Loader.IMAGE });
            list.push({ url: this.getURl(id, 7), type: laya.net.Loader.IMAGE });
            return list;
        };
        TestView.prototype.testMap = function () {
            this.urls = new laya.utils.Dictionary();
            var decalConfig = module.RaceManager.instance.decalConfig;
            for (var i = 0; i < decalConfig.length; i++) {
                for (var j = 0; j < decalConfig[i].length; j++) {
                    var data = decalConfig[i][j];
                    if (data.type == 1) {
                        this.urls.set(data.url, 1);
                    }
                }
            }
            var list = [];
            for (var i = 0; i < this.urls.keys.length; i++) {
                list.push({ url: this.urls.keys[i], type: laya.net.Loader.IMAGE });
            }
            Laya.loader.load(list, laya.utils.Handler.create(this, this.loadComplete3));
        };
        TestView.prototype.loadComplete3 = function () {
            var ss = [];
            for (var i = 0; i < this.urls.keys.length; i++) {
                var url = this.urls.keys[i];
                var img = new laya.ui.Image(url);
                url = url.slice(4, url.length - 4);
                ss.push(url + "," + img.width + "," + img.height);
            }
            console.log(ss.join("|"));
        };
        return TestView;
    }(ui.game.TestViewUI));
    module.TestView = TestView;
})(module || (module = {}));
//# sourceMappingURL=TestView.js.map
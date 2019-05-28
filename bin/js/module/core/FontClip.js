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
 * 图片文字
* name
*/
var module;
(function (module) {
    var Image = laya.ui.Image;
    var FontClip = /** @class */ (function (_super) {
        __extends(FontClip, _super);
        function FontClip(imgname, xx, yy, sw, bw, align) {
            if (align === void 0) { align = "center"; }
            var _this = _super.call(this) || this;
            _this.imgname = "";
            _this.sw = 0;
            _this.bw = 0;
            _this.align = "";
            _this.restrict = "";
            _this._text = "";
            _this.imgList = new Array();
            _this.imgname = imgname;
            _this.sw = sw;
            _this.bw = bw;
            _this.align = align;
            _this.x = xx;
            _this.y = yy;
            return _this;
        }
        Object.defineProperty(FontClip.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (value) {
                this._text = value;
                this.showText2();
            },
            enumerable: true,
            configurable: true
        });
        FontClip.prototype.changeImg = function (imgname) {
            this.imgname = imgname;
            this.showText();
        };
        FontClip.prototype.showText = function () {
            var bx = 0;
            if (this.align == "center")
                bx = (this.sw - (this._text.length * this.bw)) / 2;
            if (this.align == "right")
                bx = this.sw - (this._text.length * this.bw);
            var i = 0;
            for (; i < this._text.length; i++) {
                var char = this._text.charAt(i);
                var img = null;
                if (i < this.imgList.length) {
                    img = this.imgList[i];
                }
                else {
                    img = new Image();
                    this.imgList.push(img);
                }
                this.addChild(img);
                img.skin = this.imgname + char + ".png";
                img.x = bx + i * this.bw;
            }
            for (; i < this.imgList.length; i++) {
                this.removeChild(this.imgList[i]);
            }
        };
        FontClip.prototype.showText2 = function () {
            var i = 0;
            var w = 0;
            var bx = 0;
            for (; i < this._text.length; i++) {
                var char = this._text.charAt(i);
                var img = null;
                if (i < this.imgList.length) {
                    img = this.imgList[i];
                    img.skin = this.imgname + char + ".png";
                }
                else {
                    img = new Image(this.imgname + char + ".png");
                    this.imgList.push(img);
                }
                this.addChild(img);
                w += img.width > this.bw ? this.bw : img.width;
            }
            if (this.align == "center")
                bx = (this.sw - w) / 2;
            if (this.align == "right")
                bx = this.sw - w;
            for (var j = 0; j < this._text.length; j++) {
                this.imgList[j].x = bx;
                bx += (this.imgList[j].width > this.bw ? this.bw : this.imgList[j].width);
            }
            for (; i < this.imgList.length; i++) {
                this.removeChild(this.imgList[i]);
            }
        };
        return FontClip;
    }(laya.ui.Component));
    module.FontClip = FontClip;
})(module || (module = {}));
//# sourceMappingURL=FontClip.js.map
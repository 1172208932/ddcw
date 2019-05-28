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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var game;
    (function (game) {
        var BottomViewUI = /** @class */ (function (_super) {
            __extends(BottomViewUI, _super);
            function BottomViewUI() {
                return _super.call(this) || this;
            }
            BottomViewUI.prototype.createChildren = function () {
                View.regComponent("module.EggGridItem", module.EggGridItem);
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.BottomViewUI.uiView);
            };
            BottomViewUI.uiView = { "type": "View", "props": { "width": 750, "right": 0, "left": 0, "height": 130 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "bg/tiao.png", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Box", "props": { "y": 11, "x": 316, "width": 110, "var": "box_right", "height": 110 }, "child": [{ "type": "Image", "props": { "width": 110, "skin": "ui/bg1.png", "height": 110, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "width": 75, "var": "img_ji2", "skin": "gate/log_1.png", "height": 75, "centerY": -12, "centerX": 0 } }, { "type": "Button", "props": { "width": 110, "var": "btn_gate", "skin": "ui/btn_touming.png", "height": 110, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 48, "x": 27, "width": 56, "var": "img_gate_text", "skin": "gate/logname_1.png", "height": 26 } }, { "type": "Image", "props": { "y": 74, "x": 10, "skin": "gate/bg_text_4.png" } }, { "type": "Label", "props": { "y": 76, "x": 21, "width": 66, "var": "text_garden", "text": "1/8", "strokeColor": "#000000", "stroke": 3, "height": 28, "fontSize": 24, "color": "#FFFFFF", "bold": true, "align": "center" } }] }, { "type": "EggGridItem", "props": { "x": 4, "width": 100, "var": "grid1", "runtime": "module.EggGridItem", "height": 110, "centerY": 0 } }, { "type": "EggGridItem", "props": { "x": 108, "width": 100, "var": "grid2", "runtime": "module.EggGridItem", "height": 110, "centerY": 0 } }, { "type": "EggGridItem", "props": { "x": 212, "width": 100, "var": "grid3", "runtime": "module.EggGridItem", "height": 110, "centerY": 0 } }, { "type": "EggGridItem", "props": { "x": 430, "width": 100, "var": "grid4", "runtime": "module.EggGridItem", "height": 110, "centerY": 0 } }, { "type": "EggGridItem", "props": { "x": 534, "width": 100, "var": "grid5", "runtime": "module.EggGridItem", "height": 110, "centerY": 0 } }, { "type": "EggGridItem", "props": { "x": 638, "width": 100, "var": "grid6", "runtime": "module.EggGridItem", "height": 110, "centerY": 0 } }] };
            return BottomViewUI;
        }(View));
        game.BottomViewUI = BottomViewUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var BuildCardenDialogUI = /** @class */ (function (_super) {
            __extends(BuildCardenDialogUI, _super);
            function BuildCardenDialogUI() {
                return _super.call(this) || this;
            }
            BuildCardenDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.BuildCardenDialogUI.uiView);
            };
            BuildCardenDialogUI.uiView = { "type": "Dialog", "props": { "width": 650, "height": 895 }, "child": [{ "type": "Image", "props": { "y": 4, "x": 0, "width": 650, "skin": "bg/GameOverMessage.png", "sizeGrid": "97,73,80,76", "height": 895 } }, { "type": "Button", "props": { "y": -6, "x": 562, "var": "btn_close", "stateNum": 1, "skin": "ui/btn_close.png" } }, { "type": "Image", "props": { "y": 49, "x": 156, "skin": "font/tip87.png" } }, { "type": "Image", "props": { "y": 132, "x": 37, "width": 576, "skin": "ui/paper2.png", "sizeGrid": "91,59,28,65", "height": 737 } }, { "type": "Image", "props": { "y": 632, "x": 154, "skin": "font/tip88.png" } }, { "type": "Image", "props": { "y": 466, "x": 250, "var": "img_log", "skin": "gate/log_1.png" } }, { "type": "Box", "props": { "y": 708, "x": 176 }, "child": [{ "type": "Image", "props": { "width": 298, "var": "btn_build", "skin": "ui/bg2.png", "sizeGrid": "27,19,31,23", "height": 126 } }, { "type": "Image", "props": { "y": 45, "x": 166, "skin": "ui/Atlas_1.png", "scaleY": 0.6, "scaleX": 0.6, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 50, "x": 86, "width": 47, "skin": "ui/num_a_2.png", "mouseEnabled": false, "height": 42 } }, { "type": "Image", "props": { "y": 50, "x": 125, "skin": "ui/num_a_0.png", "mouseEnabled": false } }] }, { "type": "Image", "props": { "y": 206, "x": 66, "skin": "font/tip90.png" } }, { "type": "Image", "props": { "y": 632, "x": 63, "skin": "ui/constuction.png" } }, { "type": "Image", "props": { "y": 632, "x": 502, "skin": "ui/constuction.png" } }] };
            return BuildCardenDialogUI;
        }(Dialog));
        game.BuildCardenDialogUI = BuildCardenDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var ChangenameDialogUI = /** @class */ (function (_super) {
            __extends(ChangenameDialogUI, _super);
            function ChangenameDialogUI() {
                return _super.call(this) || this;
            }
            ChangenameDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.ChangenameDialogUI.uiView);
            };
            ChangenameDialogUI.uiView = { "type": "Dialog", "props": { "width": 600, "height": 450 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 600, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 450 } }, { "type": "Image", "props": { "y": 43, "x": 43, "width": 511, "skin": "ui/paper2.png", "sizeGrid": "88,97,37,108", "height": 364 } }, { "type": "Label", "props": { "y": 69, "x": 68, "wordWrap": true, "width": 460, "var": "txt_content", "text": "请输入宠物新的名字", "strokeColor": "#0d0d0d", "stroke": 3, "leading": 10, "height": 52, "fontSize": 30, "font": "Microsoft YaHei", "color": "#f9f4f4", "align": "center" } }, { "type": "Button", "props": { "y": 290, "x": 82, "width": 200, "var": "btn_cancel", "stateNum": 1, "skin": "ui/btn_cancel.png", "sizeGrid": "16,15,19,15", "height": 95 } }, { "type": "Button", "props": { "y": 290, "x": 315, "width": 200, "var": "btn_ok", "stateNum": 1, "skin": "ui/btn_ok2.png", "sizeGrid": "16,15,19,15", "height": 95 } }, { "type": "Image", "props": { "y": 308, "x": 329, "skin": "font/tip82.png" } }, { "type": "Image", "props": { "y": 308, "x": 96, "skin": "font/tip83.png" } }, { "type": "TextInput", "props": { "y": 144, "x": 99, "width": 398, "var": "input_name", "skin": "tupian/textinput.png", "sizeGrid": "4,13,10,14", "height": 106, "fontSize": 50, "align": "center" } }] };
            return ChangenameDialogUI;
        }(Dialog));
        game.ChangenameDialogUI = ChangenameDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var CoinsLackingDialogUI = /** @class */ (function (_super) {
            __extends(CoinsLackingDialogUI, _super);
            function CoinsLackingDialogUI() {
                return _super.call(this) || this;
            }
            CoinsLackingDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.CoinsLackingDialogUI.uiView);
            };
            CoinsLackingDialogUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Box", "props": { "width": 500, "height": 500, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 449, "skin": "pngs/0319/bg_4.png", "height": 446, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 120, "width": 243, "skin": "pngs/0319/bg_6.png", "height": 103, "centerX": 0 } }, { "type": "Label", "props": { "y": 260, "width": 300, "var": "coinsTxt", "text": "免费领取", "strokeColor": "#000000", "stroke": 4, "height": 30, "fontSize": 26, "color": "#FFFFFF", "centerX": 0, "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 5, "width": 275, "skin": "pngs/0319/bg_5.png", "height": 81, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 156, "skin": "pngs/0319/txt1.png", "height": 43, "centerY": 0, "centerX": 0 } }] }, { "type": "Image", "props": { "y": 5, "x": 420, "var": "closeBtn", "skin": "pngs/0319/close.png" } }, { "type": "Image", "props": { "y": 360, "x": 155, "width": 191, "var": "receiveBtn", "skin": "pngs/0319/receive.png", "height": 73, "centerX": 0 } }] }] };
            return CoinsLackingDialogUI;
        }(Dialog));
        game.CoinsLackingDialogUI = CoinsLackingDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var ConfirmDialogUI = /** @class */ (function (_super) {
            __extends(ConfirmDialogUI, _super);
            function ConfirmDialogUI() {
                return _super.call(this) || this;
            }
            ConfirmDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.ConfirmDialogUI.uiView);
            };
            ConfirmDialogUI.uiView = { "type": "Dialog", "props": { "width": 650, "height": 500 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 650, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 500 } }, { "type": "Image", "props": { "y": 43, "x": 43, "width": 566, "skin": "ui/paper2.png", "sizeGrid": "89,105,37,108", "height": 421 } }, { "type": "Button", "props": { "y": 335, "x": 85, "width": 200, "var": "btn_cancel", "stateNum": 1, "skin": "ui/btn_cancel.png", "sizeGrid": "16,15,19,15", "height": 95 } }, { "type": "Button", "props": { "y": 335, "x": 366, "width": 200, "var": "btn_ok", "stateNum": 1, "skin": "ui/btn_ok2.png", "sizeGrid": "16,15,19,15", "height": 95 } }, { "type": "Image", "props": { "y": 353, "x": 380, "skin": "font/tip82.png" } }, { "type": "Image", "props": { "y": 353, "x": 99, "skin": "font/tip83.png" } }, { "type": "Image", "props": { "y": 173, "x": 71, "visible": false, "var": "box_1", "skin": "font/tip101.png" } }, { "type": "Image", "props": { "y": 179, "x": 66, "visible": false, "var": "box_2", "skin": "font/tip100.png" } }, { "type": "Box", "props": { "y": 101, "x": 106, "visible": false, "var": "box_3" }, "child": [{ "type": "Image", "props": { "x": 69, "skin": "font/tip103.png" } }, { "type": "Image", "props": { "y": 73, "skin": "font/tip104.png" } }, { "type": "Image", "props": { "y": 146, "x": 28, "skin": "font/tip105.png" } }] }] };
            return ConfirmDialogUI;
        }(Dialog));
        game.ConfirmDialogUI = ConfirmDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var DayBuyDialogUI = /** @class */ (function (_super) {
            __extends(DayBuyDialogUI, _super);
            function DayBuyDialogUI() {
                return _super.call(this) || this;
            }
            DayBuyDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.DayBuyDialogUI.uiView);
            };
            DayBuyDialogUI.uiView = { "type": "Dialog", "props": { "width": 650, "height": 530 }, "child": [{ "type": "Image", "props": { "y": 1, "x": 6, "width": 650, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 530 } }, { "type": "Button", "props": { "y": -9, "x": 558, "var": "btn_close", "stateNum": 1, "skin": "ui/btn_close.png" } }, { "type": "Image", "props": { "y": -24, "x": 143, "width": 376, "skin": "ui/paper2.png", "sizeGrid": "24,23,22,65", "height": 114 } }, { "type": "Image", "props": { "y": 3, "x": 224, "skin": "font/tip5.png" } }, { "type": "Image", "props": { "y": 116, "x": 51, "width": 560, "skin": "ui/paper2.png", "sizeGrid": "24,23,22,65", "height": 238 } }, { "type": "Image", "props": { "y": 132, "x": 151, "skin": "font/tip6.png" } }, { "type": "Image", "props": { "y": 203, "x": 281, "skin": "ui/yuan.png" } }, { "type": "Image", "props": { "y": 221, "x": 298, "skin": "ui/Atlas_0.png", "scaleY": 0.8, "scaleX": 0.8 } }, { "type": "Image", "props": { "y": 288, "x": 274, "skin": "ui/num_a_3.png" } }, { "type": "Image", "props": { "y": 288, "x": 307, "skin": "ui/num_a_0.png" } }, { "type": "Image", "props": { "y": 288, "x": 343, "skin": "ui/num_a_0.png" } }, { "type": "Box", "props": { "y": 368, "x": 188, "var": "box_buy" }, "child": [{ "type": "Button", "props": { "width": 285, "var": "btn_buy", "stateNum": 1, "skin": "ui/btn_22.png", "sizeGrid": "39,31,34,38", "height": 120 } }, { "type": "Image", "props": { "y": 47, "x": 123, "skin": "ui/num_d_1.png" } }] }] };
            return DayBuyDialogUI;
        }(Dialog));
        game.DayBuyDialogUI = DayBuyDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var EatAppleUI = /** @class */ (function (_super) {
            __extends(EatAppleUI, _super);
            function EatAppleUI() {
                return _super.call(this) || this;
            }
            EatAppleUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.EatAppleUI.uiView);
            };
            EatAppleUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 130, "height": 130 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 130, "var": "box_apple", "height": 130 }, "child": [{ "type": "Image", "props": { "width": 130, "skin": "gate/btn_1.png", "height": 130 } }, { "type": "Button", "props": { "y": 0, "x": 0, "width": 130, "var": "btn_apple", "skin": "ui/btn_touming.png", "height": 130, "centerY": 0, "centerX": 0 } }] }] };
            return EatAppleUI;
        }(View));
        game.EatAppleUI = EatAppleUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var EggGridItemUI = /** @class */ (function (_super) {
            __extends(EggGridItemUI, _super);
            function EggGridItemUI() {
                return _super.call(this) || this;
            }
            EggGridItemUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.EggGridItemUI.uiView);
            };
            EggGridItemUI.uiView = { "type": "View", "props": { "width": 100, "height": 110 }, "child": [{ "type": "Image", "props": { "width": 100, "var": "bg", "skin": "ui/bg1.png", "sizeGrid": "14,16,18,16", "height": 110, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "width": 100, "var": "img_ying", "skin": "ui/no-egg.png", "scaleY": 0.7, "scaleX": 0.7, "height": 110, "centerY": -5, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 38, "var": "img_lock", "skin": "ui/block.png", "height": 45, "centerY": 0, "centerX": 0 } }] }, { "type": "Image", "props": { "y": 73, "width": 93, "var": "img_exp1", "skin": "ui/img_11.png", "sizeGrid": "11,13,12,12", "height": 32, "centerX": 0 } }, { "type": "Image", "props": { "y": 73, "width": 93, "var": "img_exp2", "skin": "ui/img_22.png", "sizeGrid": "11,13,12,12", "height": 32, "centerX": 0 } }] };
            return EggGridItemUI;
        }(View));
        game.EggGridItemUI = EggGridItemUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var FeatherLackingDialogUI = /** @class */ (function (_super) {
            __extends(FeatherLackingDialogUI, _super);
            function FeatherLackingDialogUI() {
                return _super.call(this) || this;
            }
            FeatherLackingDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.FeatherLackingDialogUI.uiView);
            };
            FeatherLackingDialogUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1330 }, "child": [{ "type": "Box", "props": { "y": 10, "x": 10, "width": 500, "height": 500, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 449, "skin": "pngs/0319/bg_4.png", "height": 446, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 100, "width": 87, "skin": "pngs/0319/bg_7.png", "height": 129, "centerX": 0 } }, { "type": "Label", "props": { "y": 260, "width": 300, "var": "featherTxt", "text": "免费领取", "strokeColor": "#000000", "stroke": 4, "height": 30, "fontSize": 26, "color": "#FFFFFF", "centerX": 0, "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 5, "width": 275, "skin": "pngs/0319/bg_5.png", "height": 81, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 156, "skin": "pngs/0319/txt3.png", "height": 43, "centerY": 0, "centerX": 0 } }] }, { "type": "Image", "props": { "y": 5, "x": 420, "var": "closeBtn", "skin": "pngs/0319/close.png" } }, { "type": "Image", "props": { "y": 360, "x": 155, "width": 191, "var": "receiveBtn", "skin": "pngs/0319/receive.png", "height": 73, "centerX": 0 } }] }] };
            return FeatherLackingDialogUI;
        }(Dialog));
        game.FeatherLackingDialogUI = FeatherLackingDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var FlyVideoItemUI = /** @class */ (function (_super) {
            __extends(FlyVideoItemUI, _super);
            function FlyVideoItemUI() {
                return _super.call(this) || this;
            }
            FlyVideoItemUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.FlyVideoItemUI.uiView);
            };
            FlyVideoItemUI.uiView = { "type": "View", "props": { "y": 64, "x": 64, "width": 128, "pivotY": 64, "pivotX": 64, "height": 128 }, "child": [{ "type": "Animation", "props": { "y": 64, "x": 64, "source": "ani/VideoAni.ani", "autoPlay": true } }, { "type": "Image", "props": { "y": 106, "x": 14, "skin": "font/tip107.png" } }] };
            return FlyVideoItemUI;
        }(View));
        game.FlyVideoItemUI = FlyVideoItemUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var GameViewUI = /** @class */ (function (_super) {
            __extends(GameViewUI, _super);
            function GameViewUI() {
                return _super.call(this) || this;
            }
            GameViewUI.prototype.createChildren = function () {
                View.regComponent("module.IndexView", module.IndexView);
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.GameViewUI.uiView);
            };
            GameViewUI.uiView = { "type": "View", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "child": [{ "type": "IndexView", "props": { "var": "indexView", "runtime": "module.IndexView" } }, { "type": "Image", "props": { "var": "img_mask", "top": 0, "skin": "ui/mask.png", "sizeGrid": "2,2,2,2", "right": 0, "left": 0, "bottom": 0 } }] };
            return GameViewUI;
        }(View));
        game.GameViewUI = GameViewUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var GetChickenViewUI = /** @class */ (function (_super) {
            __extends(GetChickenViewUI, _super);
            function GetChickenViewUI() {
                return _super.call(this) || this;
            }
            GetChickenViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.GetChickenViewUI.uiView);
            };
            GetChickenViewUI.uiView = { "type": "View", "props": { "width": 100, "height": 100 }, "child": [{ "type": "Box", "props": { "y": 50, "x": 50, "width": 100, "var": "box_get", "height": 100, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 50, "x": 50, "var": "boxImage", "skin": "pngs/0319/btn_1.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 14, "x": 21, "width": 58, "var": "chickenSkin", "skin": "pngs/0319/49-01.png", "height": 62 } }] }, { "type": "Image", "props": { "y": 65, "x": -1, "var": "chickenText", "skin": "pngs/0319/btn_2.png" } }] }] };
            return GetChickenViewUI;
        }(View));
        game.GetChickenViewUI = GetChickenViewUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var GlmmeNewEggDialogUI = /** @class */ (function (_super) {
            __extends(GlmmeNewEggDialogUI, _super);
            function GlmmeNewEggDialogUI() {
                return _super.call(this) || this;
            }
            GlmmeNewEggDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.GlmmeNewEggDialogUI.uiView);
            };
            GlmmeNewEggDialogUI.uiView = { "type": "Dialog", "props": { "width": 590, "height": 680 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 590, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 650 } }, { "type": "Image", "props": { "y": 357, "x": 88, "width": 414, "skin": "ui/paper2.png", "sizeGrid": "70,97,37,108", "height": 168 } }, { "type": "Button", "props": { "y": 544, "x": 129, "width": 331, "var": "btn_ok", "stateNum": 1, "skin": "ui/btn_22.png", "sizeGrid": "36,46,76,68", "height": 150 } }, { "type": "Image", "props": { "y": 140, "x": 167, "skin": "ui/bfd-shine.png" } }, { "type": "Image", "props": { "y": 339, "x": 295, "width": 130, "var": "img_egg", "skin": "ui/egg_1.png", "pivotY": 143, "pivotX": 65, "height": 143 }, "compId": 4 }, { "type": "Image", "props": { "y": 55, "x": 210, "skin": "font/tip20.png" } }, { "type": "Image", "props": { "y": 584, "x": 193, "skin": "font/tip85.png", "scaleY": 1.5, "scaleX": 1.5, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 395, "x": 122, "skin": "font/tip23.png" } }], "animations": [{ "nodes": [{ "target": 4, "keyframes": { "scaleY": [{ "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 0 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 10 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 20 }], "scaleX": [{ "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 0 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 10 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 20 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 2 }] };
            return GlmmeNewEggDialogUI;
        }(Dialog));
        game.GlmmeNewEggDialogUI = GlmmeNewEggDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var HatchNowViewUI = /** @class */ (function (_super) {
            __extends(HatchNowViewUI, _super);
            function HatchNowViewUI() {
                return _super.call(this) || this;
            }
            HatchNowViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.HatchNowViewUI.uiView);
            };
            HatchNowViewUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 250, "height": 360 }, "child": [{ "type": "Box", "props": { "y": 155, "x": 115, "width": 240, "var": "box_1", "scaleY": 1, "scaleX": 1, "pivotY": 150, "pivotX": 110, "height": 350 }, "compId": 6, "child": [{ "type": "Image", "props": { "width": 210, "skin": "ui/bg3.png", "sizeGrid": "21,19,19,15", "height": 300, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 35, "width": 135, "skin": "font/tip37.png", "scaleY": 1, "scaleX": 1, "height": 46, "centerX": 0 } }, { "type": "Image", "props": { "y": 85, "width": 135, "skin": "font/tip38.png", "height": 46, "centerX": 0 } }, { "type": "Button", "props": { "y": 140, "width": 192, "visible": true, "var": "btn_open", "stateNum": 1, "skin": "ui/freeopen.png", "sizeGrid": "15,16,15,14", "height": 88, "centerX": 0 } }, { "type": "Button", "props": { "y": 230, "width": 192, "var": "btn_ok", "stateNum": 1, "skin": "ui/btn_2.png", "sizeGrid": "30,23,40,38", "height": 88, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 18, "x": 130, "width": 81, "var": "imgType", "skin": "ui/Atlas_1.png", "scaleY": 0.5, "scaleX": 0.5, "mouseEnabled": false, "height": 85 } }] }, { "type": "Button", "props": { "y": 0, "x": 188, "width": 52, "var": "btn_close", "stateNum": 1, "skin": "ui/btn_close2.png", "height": 54 } }] }], "animations": [{ "nodes": [{ "target": 6, "keyframes": { "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 6, "key": "scaleY", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 6, "key": "scaleY", "index": 5 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 6, "key": "scaleY", "index": 10 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 6, "key": "scaleX", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 6, "key": "scaleX", "index": 5 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 6, "key": "scaleX", "index": 10 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 6, "key": "scaleX", "index": 35 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }] };
            return HatchNowViewUI;
        }(View));
        game.HatchNowViewUI = HatchNowViewUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var IndexViewUI = /** @class */ (function (_super) {
            __extends(IndexViewUI, _super);
            function IndexViewUI() {
                return _super.call(this) || this;
            }
            IndexViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.IndexViewUI.uiView);
            };
            IndexViewUI.uiView = { "type": "View", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "child": [{ "type": "Image", "props": { "var": "bg", "top": 0, "skin": "gate/splash-screen-ipad.png", "right": 0, "pivotX": 384, "left": 0, "bottom": 0 } }, { "type": "Label", "props": { "y": 1281, "x": 105, "text": "抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。", "fontSize": 20, "color": "#ffffff", "bold": false } }, { "type": "Label", "props": { "y": 1305, "x": 105, "text": "适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。", "fontSize": 20, "color": "#ffffff", "bold": false } }] };
            return IndexViewUI;
        }(View));
        game.IndexViewUI = IndexViewUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var InvitationFriendDialogUI = /** @class */ (function (_super) {
            __extends(InvitationFriendDialogUI, _super);
            function InvitationFriendDialogUI() {
                return _super.call(this) || this;
            }
            InvitationFriendDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.InvitationFriendDialogUI.uiView);
            };
            InvitationFriendDialogUI.uiView = { "type": "Dialog", "props": { "width": 740, "height": 700 }, "child": [{ "type": "Image", "props": { "y": 1, "x": 6, "width": 740, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 700 } }, { "type": "Button", "props": { "y": -9, "x": 651, "var": "btn_close", "stateNum": 1, "skin": "ui/btn_close.png" } }, { "type": "Image", "props": { "y": -24, "x": 188, "width": 376, "skin": "ui/paper2.png", "sizeGrid": "24,23,22,65", "height": 114 } }, { "type": "Image", "props": { "y": 3, "x": 271, "skin": "font/tip7.png" } }, { "type": "Image", "props": { "y": 116, "x": 42, "width": 670, "skin": "ui/paper2.png", "sizeGrid": "93,70,22,65", "height": 369 } }, { "type": "Image", "props": { "y": 196, "x": 181, "skin": "font/tip8.png" } }, { "type": "Image", "props": { "y": 134, "x": 143, "skin": "font/tip9.png" } }, { "type": "Box", "props": { "y": 308, "x": 164, "var": "box_2" }, "child": [{ "type": "Image", "props": { "x": 0, "skin": "ui/yuan.png" } }, { "type": "Image", "props": { "y": 18, "x": 17, "skin": "ui/Atlas_0.png", "scaleY": 0.8, "scaleX": 0.8 } }, { "type": "Image", "props": { "y": 87, "x": 6, "var": "img_num_c_1", "skin": "ui/num_a_3.png", "scaleY": 0.8, "scaleX": 0.8 } }, { "type": "Image", "props": { "y": 87, "x": 30, "width": 47, "var": "img_num_c_2", "skin": "ui/num_a_0.png", "scaleY": 0.8, "scaleX": 0.8, "height": 42 } }, { "type": "Image", "props": { "y": 87, "x": 59, "var": "img_num_c_3", "skin": "ui/num_a_0.png", "scaleY": 0.8, "scaleX": 0.8 } }] }, { "type": "Box", "props": { "y": 308, "x": 272, "var": "box_3" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/yuan.png" } }, { "type": "Image", "props": { "y": 18, "x": 24, "skin": "ui/Atlas_1.png", "scaleY": 0.8, "scaleX": 0.8 } }, { "type": "Image", "props": { "y": 91, "x": 31, "width": 47, "var": "img_num_w_2", "skin": "ui/num_a_1.png", "scaleY": 0.8, "scaleX": 0.8, "height": 42 } }] }, { "type": "Box", "props": { "y": 506, "x": 217, "var": "box_share" }, "child": [{ "type": "Button", "props": { "var": "btn_invitation", "stateNum": 1, "skin": "ui/btn_11.png" } }, { "type": "Image", "props": { "y": 49, "x": 119, "skin": "ui/share.png", "mouseEnabled": false } }] }, { "type": "Box", "props": { "y": 506, "x": 218, "var": "box_get" }, "child": [{ "type": "Button", "props": { "width": 318, "var": "btn_get", "stateNum": 1, "skin": "ui/btn_22.png", "sizeGrid": "40,38,36,31", "height": 160 } }, { "type": "Image", "props": { "y": 50, "x": 73, "skin": "font/tip80.png" } }] }, { "type": "Box", "props": { "y": 308, "x": 55, "var": "box_1" }, "child": [{ "type": "Image", "props": { "x": 0, "skin": "ui/yuan.png" } }, { "type": "Image", "props": { "y": 18, "x": 17, "skin": "ui/Atlas_0.png", "scaleY": 0.8, "scaleX": 0.8 } }, { "type": "Image", "props": { "y": 87, "x": 4, "skin": "ui/num_a_1.png", "scaleY": 0.8, "scaleX": 0.8 } }, { "type": "Image", "props": { "y": 87, "x": 30, "width": 47, "skin": "ui/num_a_0.png", "scaleY": 0.8, "scaleX": 0.8, "height": 42 } }, { "type": "Image", "props": { "y": 87, "x": 59, "skin": "ui/num_a_0.png", "scaleY": 0.8, "scaleX": 0.8 } }] }, { "type": "Box", "props": { "y": 308, "x": 381, "var": "box_4" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/yuan.png" } }, { "type": "Image", "props": { "y": 18, "x": 24, "skin": "ui/Atlas_1.png", "scaleY": 0.8, "scaleX": 0.8 } }, { "type": "Image", "props": { "y": 91, "x": 31, "width": 47, "skin": "ui/num_a_4.png", "scaleY": 0.8, "scaleX": 0.8, "height": 42 } }] }, { "type": "Box", "props": { "y": 308, "x": 489, "var": "box_5" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/yuan.png" } }, { "type": "Image", "props": { "y": 18, "x": 24, "skin": "ui/Atlas_1.png", "scaleY": 0.8, "scaleX": 0.8 } }, { "type": "Image", "props": { "y": 91, "x": 31, "width": 47, "skin": "ui/num_a_6.png", "scaleY": 0.8, "scaleX": 0.8, "height": 42 } }] }, { "type": "Box", "props": { "y": 308, "x": 598, "var": "box_6" }, "child": [{ "type": "Image", "props": { "skin": "ui/yuan.png" } }, { "type": "Image", "props": { "y": 18, "x": 24, "skin": "ui/Atlas_1.png", "scaleY": 0.8, "scaleX": 0.8 } }, { "type": "Image", "props": { "y": 90, "x": 16, "skin": "ui/num_a_2.png", "scaleY": 0.8, "scaleX": 0.8 } }, { "type": "Image", "props": { "y": 91, "x": 45, "width": 47, "skin": "ui/num_a_0.png", "scaleY": 0.8, "scaleX": 0.8, "height": 42 } }] }] };
            return InvitationFriendDialogUI;
        }(Dialog));
        game.InvitationFriendDialogUI = InvitationFriendDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var LastGateViewUI = /** @class */ (function (_super) {
            __extends(LastGateViewUI, _super);
            function LastGateViewUI() {
                return _super.call(this) || this;
            }
            LastGateViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.LastGateViewUI.uiView);
            };
            LastGateViewUI.uiView = { "type": "View", "props": { "width": 75, "height": 75 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 75, "height": 75 }, "child": [{ "type": "Image", "props": { "width": 75, "var": "iconGrade", "skin": "gate/log_1.png", "height": 75 } }, { "type": "Image", "props": { "y": 18, "x": 21, "width": 32, "var": "luckImg", "skin": "gate/bg_2.png", "height": 38 } }, { "type": "Image", "props": { "y": 67, "x": -4, "skin": "gate/last_gade.png" } }] }] };
            return LastGateViewUI;
        }(View));
        game.LastGateViewUI = LastGateViewUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var LoginAwardDialogUI = /** @class */ (function (_super) {
            __extends(LoginAwardDialogUI, _super);
            function LoginAwardDialogUI() {
                return _super.call(this) || this;
            }
            LoginAwardDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.LoginAwardDialogUI.uiView);
            };
            LoginAwardDialogUI.uiView = { "type": "Dialog", "props": { "width": 650, "height": 850 }, "child": [{ "type": "Image", "props": { "y": 1, "x": 0, "width": 650, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 850 } }, { "type": "Button", "props": { "y": -8, "x": 554, "var": "btn_close", "stateNum": 1, "skin": "ui/btn_close.png" } }, { "type": "Image", "props": { "y": -24, "x": 137, "width": 376, "skin": "ui/paper2.png", "sizeGrid": "24,23,22,65", "height": 114 } }, { "type": "Image", "props": { "y": 3, "x": 151, "skin": "font/tip2.png" } }, { "type": "Image", "props": { "y": 116, "x": 45, "width": 560, "skin": "ui/paper2.png", "sizeGrid": "24,23,22,65", "height": 138 } }, { "type": "Clip", "props": { "y": 261, "x": 45, "width": 560, "var": "clip_c", "skin": "gate/clip_reward-pic.png", "index": 1, "clipY": 2, "clipX": 1 }, "compId": 10 }, { "type": "Image", "props": { "y": 529, "x": 45, "width": 560, "skin": "ui/paper2.png", "sizeGrid": "24,23,22,65", "height": 272 } }, { "type": "Image", "props": { "y": 546, "x": 152, "var": "img_tip", "skin": "font/tip3.png" } }, { "type": "Image", "props": { "y": 194, "x": 65, "skin": "ui/num_a_1.png" } }, { "type": "Image", "props": { "y": 194, "x": 127, "skin": "ui/num_a_2.png" } }, { "type": "Image", "props": { "y": 194, "x": 190, "skin": "ui/num_a_3.png" } }, { "type": "Image", "props": { "y": 194, "x": 252, "skin": "ui/num_a_4.png" } }, { "type": "Image", "props": { "y": 194, "x": 314, "skin": "ui/num_a_5.png" } }, { "type": "Image", "props": { "y": 194, "x": 377, "skin": "ui/num_a_6.png" } }, { "type": "Image", "props": { "y": 194, "x": 439, "skin": "ui/num_a_7.png" } }, { "type": "Image", "props": { "y": 138, "x": 494, "skin": "ui/yuan.png" } }, { "type": "Image", "props": { "y": 157, "x": 518, "width": 65, "skin": "ui/Atlas_1.png", "scaleY": 0.8, "scaleX": 0.8, "height": 81 } }, { "type": "Image", "props": { "y": 197, "x": 519, "skin": "ui/num_a_4.png" } }, { "type": "Image", "props": { "y": 137, "x": 116, "skin": "ui/line2.png" } }, { "type": "Image", "props": { "y": 137, "x": 179, "skin": "ui/line2.png" } }, { "type": "Image", "props": { "y": 137, "x": 241, "skin": "ui/line2.png" } }, { "type": "Image", "props": { "y": 137, "x": 304, "skin": "ui/line2.png" } }, { "type": "Image", "props": { "y": 137, "x": 366, "skin": "ui/line2.png" } }, { "type": "Image", "props": { "y": 137, "x": 429, "skin": "ui/line2.png" } }, { "type": "Image", "props": { "y": 162, "x": 60, "visible": false, "var": "img_get1", "skin": "ui/clear.png" } }, { "type": "Image", "props": { "y": 162, "x": 123, "visible": false, "var": "img_get2", "skin": "ui/clear.png" } }, { "type": "Image", "props": { "y": 162, "x": 186, "visible": false, "var": "img_get3", "skin": "ui/clear.png" } }, { "type": "Image", "props": { "y": 162, "x": 249, "visible": false, "var": "img_get4", "skin": "ui/clear.png" } }, { "type": "Image", "props": { "y": 162, "x": 312, "visible": false, "var": "img_get5", "skin": "ui/clear.png" } }, { "type": "Image", "props": { "y": 162, "x": 375, "visible": false, "var": "img_get6", "skin": "ui/clear.png" } }, { "type": "Image", "props": { "y": 162, "x": 438, "visible": false, "var": "img_get7", "skin": "ui/clear.png" } }, { "type": "Image", "props": { "y": 741, "x": 329, "var": "img_egg2", "skin": "ui/daily2.png", "scaleY": 1.2, "scaleX": 1.2, "pivotY": 88, "pivotX": 40 }, "compId": 39 }, { "type": "Image", "props": { "y": 738, "x": 163, "var": "img_egg1", "skin": "ui/daily3.png", "scaleY": 1.2, "scaleX": 1.2, "pivotY": 88, "pivotX": 40 }, "compId": 40 }, { "type": "Image", "props": { "y": 741, "x": 495, "var": "img_egg3", "skin": "ui/daily5.png", "scaleY": 1.2, "scaleX": 1.2, "rotation": 8, "pivotY": 88, "pivotX": 40 }, "compId": 41 }, { "type": "Box", "props": { "y": 641, "x": 194, "var": "box_look" }, "child": [{ "type": "Button", "props": { "width": 262, "var": "btn_look", "stateNum": 1, "skin": "ui/btn_cancel.png", "sizeGrid": "16,15,19,15", "height": 112 } }, { "type": "Image", "props": { "y": 16, "x": 75, "skin": "ui/ad.png", "scaleY": 2, "scaleX": 2, "mouseEnabled": false } }] }, { "type": "Image", "props": { "y": 548, "x": 150, "var": "img_tip2", "skin": "font/tip33.png" } }], "animations": [{ "nodes": [{ "target": 10, "keyframes": { "index": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 10, "key": "index", "index": 0 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 10, "key": "index", "index": 1 }] } }], "name": "ani1", "id": 1, "frameRate": 5, "action": 2 }, { "nodes": [{ "target": 40, "keyframes": { "rotation": [{ "value": -10, "tweenMethod": "linearNone", "tween": true, "target": 40, "key": "rotation", "index": 0 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 40, "key": "rotation", "index": 10 }, { "value": 10, "tweenMethod": "linearNone", "tween": true, "target": 40, "key": "rotation", "index": 20 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 40, "key": "rotation", "index": 30 }, { "value": -10, "tweenMethod": "linearNone", "tween": true, "target": 40, "key": "rotation", "index": 40 }] } }], "name": "ani2", "id": 2, "frameRate": 50, "action": 0 }, { "nodes": [{ "target": 39, "keyframes": { "rotation": [{ "value": -10, "tweenMethod": "linearNone", "tween": true, "target": 39, "key": "rotation", "index": 0 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 39, "key": "rotation", "index": 10 }, { "value": 10, "tweenMethod": "linearNone", "tween": true, "target": 39, "key": "rotation", "index": 20 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 39, "key": "rotation", "index": 30 }, { "value": -10, "tweenMethod": "linearNone", "tween": true, "target": 39, "key": "rotation", "index": 40 }] } }], "name": "ani3", "id": 3, "frameRate": 50, "action": 0 }, { "nodes": [{ "target": 41, "keyframes": { "rotation": [{ "value": -10, "tweenMethod": "linearNone", "tween": true, "target": 41, "key": "rotation", "index": 0 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 41, "key": "rotation", "index": 10 }, { "value": 10, "tweenMethod": "linearNone", "tween": true, "target": 41, "key": "rotation", "index": 20 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 41, "key": "rotation", "index": 30 }, { "value": -10, "tweenMethod": "linearNone", "tween": true, "target": 41, "key": "rotation", "index": 40 }] } }], "name": "ani4", "id": 4, "frameRate": 50, "action": 0 }] };
            return LoginAwardDialogUI;
        }(Dialog));
        game.LoginAwardDialogUI = LoginAwardDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var LoginView2UI = /** @class */ (function (_super) {
            __extends(LoginView2UI, _super);
            function LoginView2UI() {
                return _super.call(this) || this;
            }
            LoginView2UI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.LoginView2UI.uiView);
            };
            LoginView2UI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "gate/splash-screen-ipad.png" } }, { "type": "Image", "props": { "y": 685, "x": 128, "skin": "gate/login_img01.png" } }, { "type": "TextInput", "props": { "y": 880, "x": 272, "width": 288, "var": "passworld", "skin": "gate/login_img02.png", "prompt": "密码", "height": 64, "fontSize": 30 } }, { "type": "TextInput", "props": { "y": 796, "x": 272, "width": 288, "var": "account", "skin": "gate/login_img02.png", "prompt": "账号", "height": 64, "fontSize": 30 } }, { "type": "Button", "props": { "y": 970, "x": 279, "width": 191, "var": "loginBtn", "stateNum": 1, "skin": "gate/login_bg.png", "labelSize": 30, "labelColors": "#ffffff", "labelBold": true, "height": 73 } }, { "type": "Label", "props": { "y": 1273, "x": 95, "text": "抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。", "fontSize": 20, "color": "#ffffff", "bold": false } }, { "type": "Label", "props": { "y": 1297, "x": 95, "text": "适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。", "fontSize": 20, "color": "#ffffff", "bold": false } }] };
            return LoginView2UI;
        }(View));
        game.LoginView2UI = LoginView2UI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var LuckDialogUI = /** @class */ (function (_super) {
            __extends(LuckDialogUI, _super);
            function LuckDialogUI() {
                return _super.call(this) || this;
            }
            LuckDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.LuckDialogUI.uiView);
            };
            LuckDialogUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Box", "props": { "y": 10, "x": 10, "width": 500, "height": 500, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 449, "skin": "pngs/0319/bg_4.png", "height": 446, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 120, "width": 243, "skin": "pngs/0319/bg_6.png", "height": 103, "centerX": 0 } }, { "type": "Label", "props": { "y": 260, "width": 300, "text": "免费领取大量金币", "strokeColor": "#000000", "stroke": 4, "height": 30, "fontSize": 26, "color": "#FFFFFF", "centerX": 0, "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 5, "width": 275, "skin": "pngs/0319/bg_5.png", "height": 81, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 156, "skin": "pngs/0319/txt2.png", "height": 43, "centerY": 0, "centerX": 0 } }] }, { "type": "Image", "props": { "y": 5, "x": 420, "var": "closeBtn", "skin": "pngs/0319/close.png" } }, { "type": "Image", "props": { "y": 360, "x": 155, "width": 191, "var": "receiveBtn", "skin": "pngs/0319/receive.png", "height": 73, "centerX": 0 } }] }] };
            return LuckDialogUI;
        }(Dialog));
        game.LuckDialogUI = LuckDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var MealFoodViewUI = /** @class */ (function (_super) {
            __extends(MealFoodViewUI, _super);
            function MealFoodViewUI() {
                return _super.call(this) || this;
            }
            MealFoodViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.MealFoodViewUI.uiView);
            };
            MealFoodViewUI.uiView = { "type": "View", "props": { "width": 750, "right": 0, "left": 0, "height": 244 }, "child": [{ "type": "Image", "props": { "width": 750, "skin": "bg/tiao.png", "right": 0, "left": 0, "height": 140, "bottom": 0 } }, { "type": "Box", "props": { "y": 114, "x": 31, "var": "box_1" }, "child": [{ "type": "Image", "props": { "width": 220, "skin": "ui/bg1.png", "sizeGrid": "14,16,18,16", "height": 120 } }, { "type": "Image", "props": { "y": 12, "x": 15, "skin": "ui/feed-taco.png" } }, { "type": "Button", "props": { "y": 29, "x": 104, "width": 110, "var": "btn_buy_coin", "stateNum": 1, "skin": "ui/btn_ok2.png", "sizeGrid": "16,15,19,15", "height": 60 } }, { "type": "Image", "props": { "y": 75, "x": 60, "skin": "ui/num_a_0.png", "scaleY": 0.8, "scaleX": 0.8 } }, { "type": "Image", "props": { "y": 75, "x": 30, "skin": "ui/num_a_0.png", "scaleY": 0.8, "scaleX": 0.8 } }, { "type": "Image", "props": { "y": 75, "x": 4, "width": 47, "skin": "ui/num_a_1.png", "scaleY": 0.8, "scaleX": 0.8, "height": 42 } }, { "type": "Image", "props": { "y": 39, "x": 166, "skin": "ui/Atlas_0.png", "scaleY": 0.5, "scaleX": 0.5, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 47, "x": 140, "skin": "ui/num_a_0.png", "scaleY": 0.6, "scaleX": 0.6, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 47, "x": 117, "skin": "ui/num_a_5.png", "scaleY": 0.6, "scaleX": 0.6, "mouseEnabled": false } }] }, { "type": "Box", "props": { "y": 114, "x": 265, "var": "box_2" }, "child": [{ "type": "Image", "props": { "width": 220, "skin": "ui/bg1.png", "sizeGrid": "14,16,18,16", "height": 120 } }, { "type": "Image", "props": { "y": 12, "x": 15, "skin": "ui/feed-box.png" } }, { "type": "Button", "props": { "y": 29, "x": 104, "width": 110, "var": "btn_look", "stateNum": 1, "skin": "ui/btn_cancel.png", "sizeGrid": "16,15,19,15", "height": 60 } }, { "type": "Image", "props": { "y": 75, "x": 60, "skin": "ui/num_a_0.png", "scaleY": 0.8, "scaleX": 0.8 } }, { "type": "Image", "props": { "y": 75, "x": 30, "skin": "ui/num_a_0.png", "scaleY": 0.8, "scaleX": 0.8 } }, { "type": "Image", "props": { "y": 75, "x": 4, "width": 47, "skin": "ui/num_a_2.png", "scaleY": 0.8, "scaleX": 0.8, "height": 42 } }, { "type": "Image", "props": { "y": 40, "x": 130, "skin": "ui/ad.png", "mouseEnabled": false } }] }, { "type": "Box", "props": { "y": 114, "x": 499, "var": "box_3" }, "child": [{ "type": "Image", "props": { "width": 220, "skin": "ui/bg1.png", "sizeGrid": "14,16,18,16", "height": 120 } }, { "type": "Image", "props": { "y": 12, "x": 13, "skin": "ui/feed-bag.png" } }, { "type": "Image", "props": { "y": 75, "x": 47, "width": 47, "skin": "ui/num_a_0.png", "scaleY": 0.8, "scaleX": 0.8, "height": 42 } }, { "type": "Image", "props": { "y": 75, "x": 21, "skin": "ui/num_a_2.png", "scaleY": 0.8, "scaleX": 0.8 } }, { "type": "Image", "props": { "y": 75, "width": 47, "skin": "ui/num_a_1.png", "scaleY": 0.8, "scaleX": 0.8, "height": 42 } }, { "type": "Image", "props": { "y": 75, "x": 73, "skin": "ui/num_a_0.png", "scaleY": 0.8, "scaleX": 0.8 } }, { "type": "Button", "props": { "y": 29, "x": 104, "width": 110, "var": "btn_buy_wing", "stateNum": 1, "skin": "ui/btn_c2.png", "sizeGrid": "16,15,19,15", "height": 60 } }, { "type": "Image", "props": { "y": 38, "x": 166, "skin": "ui/Atlas_1.png", "scaleY": 0.5, "scaleX": 0.5, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 47, "x": 137, "width": 47, "skin": "ui/num_a_1.png", "scaleY": 0.6, "scaleX": 0.6, "mouseEnabled": false, "height": 42 } }] }, { "type": "Box", "props": { "y": 0, "var": "box", "centerX": 0 }, "child": [{ "type": "Button", "props": { "width": 244, "height": 102 } }, { "type": "Image", "props": { "y": 46, "x": 46, "skin": "ui/Atlas_2.png", "scaleY": 0.8, "scaleX": 0.8, "pivotY": 37, "pivotX": 32 } }] }] };
            return MealFoodViewUI;
        }(View));
        game.MealFoodViewUI = MealFoodViewUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var MealItemUI = /** @class */ (function (_super) {
            __extends(MealItemUI, _super);
            function MealItemUI() {
                return _super.call(this) || this;
            }
            MealItemUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.MealItemUI.uiView);
            };
            MealItemUI.uiView = { "type": "View", "props": { "y": 7, "x": 83, "width": 167, "pivotY": 7, "pivotX": 83, "height": 77 }, "child": [{ "type": "Image", "props": { "y": 30, "x": 47, "width": 120, "skin": "ui/img_11.png", "sizeGrid": "11,13,12,12", "height": 30 } }, { "type": "Image", "props": { "y": 30, "x": 47, "width": 120, "var": "img_exp2", "skin": "ui/img_22.png", "sizeGrid": "11,13,12,12", "height": 30 } }, { "type": "Image", "props": { "y": 2, "x": 0, "width": 65, "skin": "ui/Atlas_2.png", "height": 75 } }, { "type": "Label", "props": { "y": 0, "x": 64, "width": 93, "var": "txt_name", "text": "名字是", "strokeColor": "#0d0d0d", "stroke": 4, "leading": 10, "height": 31, "fontSize": 24, "font": "Microsoft YaHei", "color": "#f9f4f4", "align": "left" } }, { "type": "Image", "props": { "y": -4, "x": 12, "var": "img_star1", "skin": "ui/star.png", "scaleY": 0.6, "scaleX": 0.6 } }, { "type": "Image", "props": { "y": 10, "x": -14, "width": 50, "var": "img_star2", "skin": "ui/star.png", "scaleY": 0.6, "scaleX": 0.6, "height": 48 } }, { "type": "Image", "props": { "y": 41, "x": -18, "var": "img_star3", "skin": "ui/star.png", "scaleY": 0.6, "scaleX": 0.6 } }, { "type": "Animation", "props": { "y": -28, "x": 87, "visible": false, "var": "ani", "source": "ani/apple.ani" } }, { "type": "Animation", "props": { "y": -55, "x": 80, "visible": false, "var": "ani2", "source": "ani/shenji.ani" } }, { "type": "Image", "props": { "y": 36, "x": 75, "var": "img_max", "skin": "ui/MAX.png" } }] };
            return MealItemUI;
        }(View));
        game.MealItemUI = MealItemUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var MealTipViewUI = /** @class */ (function (_super) {
            __extends(MealTipViewUI, _super);
            function MealTipViewUI() {
                return _super.call(this) || this;
            }
            MealTipViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.MealTipViewUI.uiView);
            };
            MealTipViewUI.uiView = { "type": "View", "props": { "width": 530, "height": 224 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 530, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 224 } }, { "type": "Image", "props": { "y": 36, "x": 37, "width": 455, "skin": "ui/paper2.png", "sizeGrid": "90,97,21,101", "height": 156 } }, { "type": "Image", "props": { "y": 36, "x": 40, "skin": "font/bg_1.png" } }] };
            return MealTipViewUI;
        }(View));
        game.MealTipViewUI = MealTipViewUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var MyAtlasDialogUI = /** @class */ (function (_super) {
            __extends(MyAtlasDialogUI, _super);
            function MyAtlasDialogUI() {
                return _super.call(this) || this;
            }
            MyAtlasDialogUI.prototype.createChildren = function () {
                View.regComponent("module.MyAtlasItem", module.MyAtlasItem);
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.MyAtlasDialogUI.uiView);
            };
            MyAtlasDialogUI.uiView = { "type": "View", "props": { "width": 730, "height": 1178 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 730, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 1178 } }, { "type": "Button", "props": { "y": 16, "x": 615, "var": "btn_close", "stateNum": 1, "skin": "ui/btn_close.png" } }, { "type": "Box", "props": { "y": 50, "x": 50 }, "child": [{ "type": "Image", "props": { "skin": "gate/btn_chickens.png" } }, { "type": "Button", "props": { "y": 0, "x": 1, "width": 103, "var": "btn_shu", "skin": "ui/btn_touming.png", "height": 118 } }, { "type": "Label", "props": { "y": 87, "x": 7, "width": 91, "var": "num_pet", "text": "1/160", "strokeColor": "#000000", "stroke": 3, "height": 28, "fontSize": 24, "color": "#FFFFFF", "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 50, "x": 289, "var": "img_log", "skin": "gate/log_1.png" } }, { "type": "Image", "props": { "y": 164, "x": 192, "var": "img_left", "skin": "ui/jiantou.png", "mouseEnabled": true } }, { "type": "Image", "props": { "y": 164, "x": 531, "var": "img_right", "skin": "ui/jiantou.png", "scaleX": -1, "layoutEnabled": true } }, { "type": "Image", "props": { "y": 172, "x": 261, "var": "img_plant_name", "skin": "gate/logname_1.png" } }, { "type": "List", "props": { "y": 258, "x": 68, "width": 594, "var": "list", "vScrollBarSkin": "ui/vscroll_2.png", "spaceY": 30, "spaceX": 30, "repeatY": 5, "repeatX": 2, "height": 867 }, "child": [{ "type": "MyAtlasItem", "props": { "runtime": "module.MyAtlasItem", "renderType": "render" } }] }] };
            return MyAtlasDialogUI;
        }(View));
        game.MyAtlasDialogUI = MyAtlasDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var MyAtlasItemUI = /** @class */ (function (_super) {
            __extends(MyAtlasItemUI, _super);
            function MyAtlasItemUI() {
                return _super.call(this) || this;
            }
            MyAtlasItemUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.MyAtlasItemUI.uiView);
            };
            MyAtlasItemUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 280, "height": 150 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 280, "skin": "ui/paper2.png", "sizeGrid": "29,59,66,65", "height": 150 } }, { "type": "Image", "props": { "y": 18, "x": 61, "var": "img_no", "skin": "ui/unknown-chichen.png" } }, { "type": "Image", "props": { "y": 78, "x": 51, "var": "img_icon", "skin": "gate/01-01.png", "scaleY": 0.8, "scaleX": 0.8, "pivotY": 62, "pivotX": 50 } }, { "type": "Image", "props": { "y": 89, "x": 215, "var": "img_look", "skin": "ui/corner.png" } }, { "type": "Image", "props": { "y": 92, "x": 97, "var": "img_star1", "skin": "ui/star.png", "scaleY": 0.6, "scaleX": 0.6 } }, { "type": "Image", "props": { "y": 92, "x": 131, "width": 50, "var": "img_star2", "skin": "ui/star.png", "scaleY": 0.6, "scaleX": 0.6, "height": 48 } }, { "type": "Image", "props": { "y": 92, "x": 165, "var": "img_star3", "skin": "ui/star.png", "scaleY": 0.6, "scaleX": 0.6 } }, { "type": "Label", "props": { "y": 18, "x": 97, "width": 138, "var": "txt_name", "text": "名字", "strokeColor": "#0d0d0d", "stroke": 4, "leading": 10, "height": 38, "fontSize": 26, "font": "Microsoft YaHei", "color": "#f9f4f4", "align": "left" } }, { "type": "Image", "props": { "y": 11, "x": 219, "width": 50, "var": "img_hatbg", "skin": "ui/selector.png", "height": 50, "alpha": 0.6 } }, { "type": "Image", "props": { "y": 21, "x": 229, "width": 30, "var": "img_hat", "skin": "ui/hat_2.png", "height": 30 } }] };
            return MyAtlasItemUI;
        }(View));
        game.MyAtlasItemUI = MyAtlasItemUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var NextGateViewUI = /** @class */ (function (_super) {
            __extends(NextGateViewUI, _super);
            function NextGateViewUI() {
                return _super.call(this) || this;
            }
            NextGateViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.NextGateViewUI.uiView);
            };
            NextGateViewUI.uiView = { "type": "View", "props": { "width": 75, "height": 75 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 75, "height": 75 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 75, "var": "iconGrade", "skin": "gate/log_1.png", "height": 75 } }, { "type": "Image", "props": { "y": 18, "x": 21, "width": 32, "var": "luckImg", "skin": "gate/bg_2.png", "height": 38 } }, { "type": "Image", "props": { "y": 65, "x": -4, "skin": "gate/next_gade.png" } }] }] };
            return NextGateViewUI;
        }(View));
        game.NextGateViewUI = NextGateViewUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var NoSlotNewEggDialogUI = /** @class */ (function (_super) {
            __extends(NoSlotNewEggDialogUI, _super);
            function NoSlotNewEggDialogUI() {
                return _super.call(this) || this;
            }
            NoSlotNewEggDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.NoSlotNewEggDialogUI.uiView);
            };
            NoSlotNewEggDialogUI.uiView = { "type": "Dialog", "props": { "width": 590, "height": 1080 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 590, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 1080 } }, { "type": "Image", "props": { "y": 361, "x": 49, "width": 491, "skin": "ui/paper2.png", "sizeGrid": "70,97,37,108", "height": 168 } }, { "type": "Image", "props": { "y": 140, "x": 167, "skin": "ui/bfd-shine.png" } }, { "type": "Image", "props": { "y": 338, "x": 296, "width": 130, "var": "img_egg", "skin": "ui/egg_1.png", "pivotY": 143, "pivotX": 65, "height": 143 }, "compId": 11 }, { "type": "Button", "props": { "y": 562, "x": 130, "width": 330, "var": "btn_unlock", "stateNum": 1, "skin": "ui/btn_55.png", "sizeGrid": "36,46,76,68", "height": 150 } }, { "type": "Button", "props": { "y": 723, "x": 130, "width": 330, "var": "btn_hatch", "stateNum": 1, "skin": "ui/btn_44.png", "sizeGrid": "36,46,76,68", "height": 150 } }, { "type": "Button", "props": { "y": 884, "x": 130, "width": 330, "var": "btn_sell", "stateNum": 1, "skin": "ui/btn_33.png", "sizeGrid": "36,46,76,68", "height": 150 } }, { "type": "Image", "props": { "y": 583, "x": 168, "skin": "ui/no-egg.png", "scaleY": 0.7, "scaleX": 0.7, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 597, "x": 184, "skin": "ui/block.png", "mouseEnabled": false } }, { "type": "Image", "props": { "y": 752, "x": 154, "skin": "ui/broken-egg.png", "mouseEnabled": false } }, { "type": "Image", "props": { "y": 913, "x": 175, "skin": "ui/Atlas_0.png", "scaleY": 0.6, "scaleX": 0.6, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 943, "x": 154, "skin": "ui/Atlas_0.png", "scaleY": 0.6, "scaleX": 0.6, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 944, "x": 192, "skin": "ui/Atlas_0.png", "scaleY": 0.6, "scaleX": 0.6, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 963, "x": 359, "skin": "ui/Atlas_0.png", "scaleY": 0.6, "scaleX": 0.6, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 968, "x": 316, "skin": "ui/num_a_0.png", "mouseEnabled": false } }, { "type": "Image", "props": { "y": 968, "x": 282, "skin": "ui/num_a_1.png", "mouseEnabled": false } }, { "type": "Image", "props": { "y": 804, "x": 346, "skin": "ui/Atlas_1.png", "scaleY": 0.6, "scaleX": 0.6, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 806, "x": 300, "skin": "ui/num_a_1.png", "mouseEnabled": false } }, { "type": "Image", "props": { "y": 50, "x": 211, "skin": "font/tip20.png" } }, { "type": "Image", "props": { "y": 390, "x": 193, "skin": "font/tip73.png" } }, { "type": "Image", "props": { "y": 460, "x": 69, "skin": "font/tip74.png" } }, { "type": "Image", "props": { "y": 592, "x": 276, "skin": "font/tip75.png", "mouseEnabled": false } }, { "type": "Image", "props": { "y": 641, "x": 276, "skin": "font/tip76.png", "scaleY": 1.1, "scaleX": 1.1, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 751, "x": 245, "skin": "font/tip108.png", "mouseEnabled": false } }, { "type": "Image", "props": { "y": 908, "x": 273, "skin": "font/tip64.png", "mouseEnabled": false } }, { "type": "Image", "props": { "y": 652, "x": 149, "width": 47, "skin": "ui/num_a_3.png", "mouseEnabled": false, "height": 42 } }, { "type": "Image", "props": { "y": 652, "x": 179, "skin": "ui/num_a_0.png", "mouseEnabled": false } }, { "type": "Image", "props": { "y": 650, "x": 215, "skin": "ui/Atlas_1.png", "scaleY": 0.6, "scaleX": 0.6, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 821, "x": 273, "skin": "ui/num_a_j.png", "mouseEnabled": false } }], "animations": [{ "nodes": [{ "target": 11, "keyframes": { "scaleY": [{ "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 11, "key": "scaleY", "index": 0 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 11, "key": "scaleY", "index": 10 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 11, "key": "scaleY", "index": 20 }], "scaleX": [{ "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 11, "key": "scaleX", "index": 0 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 11, "key": "scaleX", "index": 10 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 11, "key": "scaleX", "index": 20 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 2 }] };
            return NoSlotNewEggDialogUI;
        }(Dialog));
        game.NoSlotNewEggDialogUI = NoSlotNewEggDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var OffLineRewardViewUI = /** @class */ (function (_super) {
            __extends(OffLineRewardViewUI, _super);
            function OffLineRewardViewUI() {
                return _super.call(this) || this;
            }
            OffLineRewardViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.OffLineRewardViewUI.uiView);
            };
            OffLineRewardViewUI.uiView = { "type": "View", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "ui/mask.png", "sizeGrid": "9,9,11,7", "right": 0, "left": 0, "bottom": 0, "alpha": 0.4 } }, { "type": "Box", "props": { "var": "box", "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 730, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 490 } }, { "type": "Image", "props": { "y": 43, "x": 39, "width": 650, "skin": "ui/paper2.png", "sizeGrid": "88,97,37,108", "height": 413 } }, { "type": "Button", "props": { "y": 320, "width": 300, "var": "btn_double", "stateNum": 1, "skin": "ui/btn_11.png", "sizeGrid": "45,34,50,50", "height": 110, "centerX": 0 } }, { "type": "Button", "props": { "y": -19, "x": 639, "width": 100, "var": "btn_ok", "stateNum": 1, "skin": "ui/btn_close.png", "sizeGrid": "22,27,36,38", "height": 100 } }, { "type": "Image", "props": { "y": 351, "skin": "font/tip110.png", "mouseEnabled": false, "centerX": 0 } }, { "type": "Image", "props": { "y": 134, "x": 86, "skin": "font/tip111.png", "scaleY": 1.5, "scaleX": 1.5 } }] }] };
            return OffLineRewardViewUI;
        }(View));
        game.OffLineRewardViewUI = OffLineRewardViewUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var OpenChichenDialogUI = /** @class */ (function (_super) {
            __extends(OpenChichenDialogUI, _super);
            function OpenChichenDialogUI() {
                return _super.call(this) || this;
            }
            OpenChichenDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.OpenChichenDialogUI.uiView);
            };
            OpenChichenDialogUI.uiView = { "type": "Dialog", "props": { "width": 700, "height": 580 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 700, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 532 } }, { "type": "Button", "props": { "y": -2, "x": 604, "var": "btn_close", "stateNum": 1, "skin": "ui/btn_close.png" } }, { "type": "Image", "props": { "y": -119, "x": 94, "width": 500, "var": "img_logo", "skin": "view/logo.png", "height": 284 } }, { "type": "Image", "props": { "y": 154, "x": 71, "width": 558, "skin": "ui/paper2.png", "sizeGrid": "92,97,37,108", "height": 220 } }, { "type": "Image", "props": { "y": 72, "x": -21, "skin": "run/cross-shine.png", "scaleY": 1.5, "scaleX": 1.5 } }, { "type": "Image", "props": { "y": 202, "x": 125, "var": "img_chichen", "skin": "gate/01-01.png" } }, { "type": "Image", "props": { "y": 252, "x": 502, "var": "img_plant", "skin": "gate/corner_1.png" } }, { "type": "Button", "props": { "y": 418, "x": 191, "var": "btn_share", "stateNum": 1, "skin": "ui/btn_11.png" } }, { "type": "Image", "props": { "y": 472, "x": 430, "var": "lose5", "skin": "ui/Atlas_0.png", "scaleY": 0.6, "scaleX": 0.6, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 477, "x": 357, "width": 47, "var": "lose4", "skin": "ui/num_a_3.png", "mouseEnabled": false, "height": 42 } }, { "type": "Image", "props": { "y": 477, "x": 388, "var": "lose3", "skin": "ui/num_a_0.png", "mouseEnabled": false } }, { "type": "Image", "props": { "y": 478, "x": 229, "var": "lose2", "skin": "ui/ad.png", "mouseEnabled": false } }, { "type": "Image", "props": { "y": 472, "x": 296, "var": "lose1", "skin": "ui/arrow-yellow.png", "mouseEnabled": false } }, { "type": "Label", "props": { "y": 174, "x": 355, "width": 180, "var": "txt_name", "text": "名字", "styleSkin": "comp/label.png", "strokeColor": "#0d0d0d", "stroke": 4, "leading": 10, "height": 68, "fontSize": 50, "font": "Microsoft YaHei", "color": "#f9f4f4", "align": "left" } }, { "type": "Button", "props": { "y": 171, "x": 534, "var": "btn_changename", "stateNum": 1, "skin": "ui/btn_xie.png", "scaleY": 2, "scaleX": 2 } }] };
            return OpenChichenDialogUI;
        }(Dialog));
        game.OpenChichenDialogUI = OpenChichenDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var OpenJiaShuDialogUI = /** @class */ (function (_super) {
            __extends(OpenJiaShuDialogUI, _super);
            function OpenJiaShuDialogUI() {
                return _super.call(this) || this;
            }
            OpenJiaShuDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.OpenJiaShuDialogUI.uiView);
            };
            OpenJiaShuDialogUI.uiView = { "type": "Dialog", "props": { "width": 635, "height": 530 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 635, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 530 } }, { "type": "Image", "props": { "y": 43, "x": 43, "width": 550, "skin": "ui/paper2.png", "sizeGrid": "88,97,37,108", "height": 456 } }, { "type": "Button", "props": { "y": 345, "x": 159, "width": 318, "var": "btn_ok", "stateNum": 1, "skin": "ui/btn_11.png", "sizeGrid": "43,53,33,55", "height": 136 } }, { "type": "Image", "props": { "y": 390, "x": 183, "skin": "font/tip116.png", "mouseEnabled": false } }, { "type": "Image", "props": { "y": 63, "x": -33, "width": 467, "skin": "font/tip114.png", "scaleY": 1.5, "scaleX": 1.5, "height": 87 }, "child": [{ "type": "Image", "props": { "y": 13, "x": 201, "width": 27, "var": "shiwei", "skin": "ui/num_f_3.png", "height": 30 } }, { "type": "Image", "props": { "y": 13, "x": 225, "width": 27, "var": "gewei", "skin": "ui/num_f_0.png", "height": 30 } }, { "type": "Image", "props": { "y": 13, "x": 211, "width": 27, "var": "yiwei", "skin": "ui/num_f_3.png", "height": 30 } }] }, { "type": "Button", "props": { "y": -14, "x": 548, "var": "btn_close", "stateNum": 1, "skin": "ui/btn_close.png" } }, { "type": "Image", "props": { "y": 250, "x": 289, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 228, "x": 294, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 251, "x": 342, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 252, "x": 251, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 253, "x": 368, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 255, "x": 207, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 222, "x": 337, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 226, "x": 381, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 209, "x": 295, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 218, "x": 234, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 223, "x": 194, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 265, "x": 422, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 266, "x": 151, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 226, "x": 144, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 261, "x": 282, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 268, "x": 334, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 267, "x": 235, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 191, "x": 272, "skin": "ui/coin.png" } }] };
            return OpenJiaShuDialogUI;
        }(Dialog));
        game.OpenJiaShuDialogUI = OpenJiaShuDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var PlantAltasItemUI = /** @class */ (function (_super) {
            __extends(PlantAltasItemUI, _super);
            function PlantAltasItemUI() {
                return _super.call(this) || this;
            }
            PlantAltasItemUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.PlantAltasItemUI.uiView);
            };
            PlantAltasItemUI.uiView = { "type": "View", "props": { "width": 157, "height": 170 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 157, "skin": "ui/paper2.png", "sizeGrid": "29,59,66,65", "height": 170 } }, { "type": "Image", "props": { "y": 29, "x": 12, "width": 128, "var": "img_no", "skin": "ui/unknown-chichen.png", "height": 114 } }, { "type": "Animation", "props": { "y": 92, "x": 77, "width": 0, "var": "ani", "source": "ani/xuanzhuan.ani", "scaleY": 1.5, "scaleX": 1.5, "height": 0 } }, { "type": "Image", "props": { "y": 90, "x": 79, "var": "img_icon", "skin": "gate/01-01.png", "scaleY": 0.8, "scaleX": 0.8, "pivotY": 62, "pivotX": 50 } }] };
            return PlantAltasItemUI;
        }(View));
        game.PlantAltasItemUI = PlantAltasItemUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var PlantAtlasDialogUI = /** @class */ (function (_super) {
            __extends(PlantAtlasDialogUI, _super);
            function PlantAtlasDialogUI() {
                return _super.call(this) || this;
            }
            PlantAtlasDialogUI.prototype.createChildren = function () {
                View.regComponent("module.PlantAltasItem", module.PlantAltasItem);
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.PlantAtlasDialogUI.uiView);
            };
            PlantAtlasDialogUI.uiView = { "type": "View", "props": { "width": 730, "height": 1178 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 730, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 1178 } }, { "type": "Button", "props": { "y": 16, "x": 615, "var": "btn_close", "stateNum": 1, "skin": "ui/btn_close.png" } }, { "type": "Image", "props": { "y": 50, "x": 289, "var": "img_log", "skin": "gate/log_1.png" } }, { "type": "Image", "props": { "y": 164, "x": 192, "var": "img_left", "skin": "ui/jiantou.png" } }, { "type": "Image", "props": { "y": 164, "x": 531, "var": "img_right", "skin": "ui/jiantou.png", "scaleX": -1 } }, { "type": "PlantAltasItem", "props": { "y": 271, "x": 47, "var": "item1", "runtime": "module.PlantAltasItem" } }, { "type": "PlantAltasItem", "props": { "y": 271, "x": 207, "var": "item2", "runtime": "module.PlantAltasItem" } }, { "type": "PlantAltasItem", "props": { "y": 271, "x": 367, "var": "item3", "runtime": "module.PlantAltasItem" } }, { "type": "PlantAltasItem", "props": { "y": 271, "x": 527, "var": "item4", "runtime": "module.PlantAltasItem" } }, { "type": "PlantAltasItem", "props": { "y": 447, "x": 47, "var": "item5", "runtime": "module.PlantAltasItem" } }, { "type": "PlantAltasItem", "props": { "y": 447, "x": 207, "var": "item6", "runtime": "module.PlantAltasItem" } }, { "type": "PlantAltasItem", "props": { "y": 447, "x": 367, "var": "item7", "runtime": "module.PlantAltasItem" } }, { "type": "PlantAltasItem", "props": { "y": 447, "x": 527, "var": "item8", "runtime": "module.PlantAltasItem" } }, { "type": "PlantAltasItem", "props": { "y": 620, "x": 47, "var": "item9", "runtime": "module.PlantAltasItem" } }, { "type": "PlantAltasItem", "props": { "y": 620, "x": 207, "var": "item10", "runtime": "module.PlantAltasItem" } }, { "type": "PlantAltasItem", "props": { "y": 620, "x": 367, "var": "item11", "runtime": "module.PlantAltasItem" } }, { "type": "PlantAltasItem", "props": { "y": 620, "x": 527, "var": "item12", "runtime": "module.PlantAltasItem" } }, { "type": "PlantAltasItem", "props": { "y": 790, "x": 47, "var": "item13", "runtime": "module.PlantAltasItem" } }, { "type": "PlantAltasItem", "props": { "y": 790, "x": 207, "var": "item14", "runtime": "module.PlantAltasItem" } }, { "type": "PlantAltasItem", "props": { "y": 790, "x": 367, "var": "item15", "runtime": "module.PlantAltasItem" } }, { "type": "PlantAltasItem", "props": { "y": 790, "x": 527, "var": "item16", "runtime": "module.PlantAltasItem" } }, { "type": "PlantAltasItem", "props": { "y": 964, "x": 47, "var": "item17", "runtime": "module.PlantAltasItem" } }, { "type": "PlantAltasItem", "props": { "y": 964, "x": 207, "var": "item18", "runtime": "module.PlantAltasItem" } }, { "type": "PlantAltasItem", "props": { "y": 964, "x": 367, "var": "item19", "runtime": "module.PlantAltasItem" } }, { "type": "PlantAltasItem", "props": { "y": 964, "x": 527, "var": "item20", "runtime": "module.PlantAltasItem" } }, { "type": "Box", "props": { "y": 50, "x": 50 }, "child": [{ "type": "Image", "props": { "skin": "gate/btn_first.png" } }, { "type": "Button", "props": { "width": 100, "var": "btn_chichen", "skin": "ui/btn_touming.png", "height": 100 } }] }, { "type": "Image", "props": { "y": 172, "x": 261, "var": "img_plant_name", "skin": "gate/logname_1.png" } }] };
            return PlantAtlasDialogUI;
        }(View));
        game.PlantAtlasDialogUI = PlantAtlasDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var PlantViewUI = /** @class */ (function (_super) {
            __extends(PlantViewUI, _super);
            function PlantViewUI() {
                return _super.call(this) || this;
            }
            PlantViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.PlantViewUI.uiView);
            };
            PlantViewUI.uiView = { "type": "View", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "child": [{ "type": "Image", "props": { "var": "bg", "top": 0, "skin": "tupian/sky-texture.png", "right": 0, "left": 0, "bottom": 0 } }] };
            return PlantViewUI;
        }(View));
        game.PlantViewUI = PlantViewUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var PlayGameViewUI = /** @class */ (function (_super) {
            __extends(PlayGameViewUI, _super);
            function PlayGameViewUI() {
                return _super.call(this) || this;
            }
            PlayGameViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.PlayGameViewUI.uiView);
            };
            PlayGameViewUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 130, "height": 130 }, "child": [{ "type": "Image", "props": { "width": 130, "skin": "gate/btn_2.png", "height": 130, "centerY": 0, "centerX": 0 } }, { "type": "Button", "props": { "width": 130, "var": "btn_run", "skin": "ui/btn_touming.png", "height": 130, "centerY": 0, "centerX": 0 } }] };
            return PlayGameViewUI;
        }(View));
        game.PlayGameViewUI = PlayGameViewUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var RaceViewUI = /** @class */ (function (_super) {
            __extends(RaceViewUI, _super);
            function RaceViewUI() {
                return _super.call(this) || this;
            }
            RaceViewUI.prototype.createChildren = function () {
                View.regComponent("module.PlantView", module.PlantView);
                View.regComponent("module.RightBtnsDialog", module.RightBtnsDialog);
                View.regComponent("module.GetChickenView", module.GetChickenView);
                View.regComponent("module.EatApple", module.EatApple);
                View.regComponent("module.LastGateView", module.LastGateView);
                View.regComponent("module.NextGateView", module.NextGateView);
                View.regComponent("module.PlayGameView", module.PlayGameView);
                View.regComponent("module.RightToolView", module.RightToolView);
                View.regComponent("module.UnlockGateView", module.UnlockGateView);
                View.regComponent("module.ToolView", module.ToolView);
                View.regComponent("module.PromotionView", module.PromotionView);
                View.regComponent("module.HatchNowView", module.HatchNowView);
                View.regComponent("module.BottomView", module.BottomView);
                View.regComponent("module.TopView", module.TopView);
                View.regComponent("module.MealFoodView", module.MealFoodView);
                View.regComponent("ui.game.MealTipViewUI", ui.game.MealTipViewUI);
                View.regComponent("module.RaceButtomView", module.RaceButtomView);
                View.regComponent("module.LeftBtnsDialog", module.LeftBtnsDialog);
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.RaceViewUI.uiView);
            };
            RaceViewUI.uiView = { "type": "View", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "child": [{ "type": "PlantView", "props": { "var": "plantView", "top": 0, "runtime": "module.PlantView", "right": 0, "left": 0, "bottom": 0 } }, { "type": "ToolView", "props": { "y": 104, "var": "toolView", "runtime": "module.ToolView", "left": 2 } }, { "type": "GetChickenView", "props": { "y": 803, "x": 0, "visible": false, "var": "getChickenView", "runtime": "module.GetChickenView" } }, { "type": "EatApple", "props": { "width": 130, "var": "eatApple", "runtime": "module.EatApple", "height": 130, "bottom": 140 } }, { "type": "LastGateView", "props": { "var": "lastGate", "runtime": "module.LastGateView", "left": 25, "bottom": 290 } }, { "type": "NextGateView", "props": { "var": "nextGate", "runtime": "module.NextGateView", "right": 25, "bottom": 290 } }, { "type": "PlayGameView", "props": { "x": 622, "width": 130, "var": "playGame", "runtime": "module.PlayGameView", "height": 130, "bottom": 140 } }, { "type": "RightToolView", "props": { "y": 104, "var": "rightToolView", "runtime": "module.RightToolView", "right": 2 } }, { "type": "UnlockGateView", "props": { "visible": false, "var": "unlockGateView", "runtime": "module.UnlockGateView" } }, { "type": "leftBtnsView", "props": { "y": 705, "x": 0, "visible": false, "var": "leftBtnsView", "runtime": "module.LeftBtnsDialog" } }, { "type": "PromotionView", "props": { "y": 760, "x": 648, "var": "promotionView", "runtime": "module.PromotionView", "right": 2 } }, { "type": "HatchNowView", "props": { "x": 43, "visible": false, "var": "hatchNowView", "runtime": "module.HatchNowView", "bottom": 130 } }, { "type": "BottomView", "props": { "var": "bottomView", "runtime": "module.BottomView", "right": 0, "left": 0, "bottom": 0 } }, { "type": "TopView", "props": { "y": 0, "x": 253, "var": "topView", "runtime": "module.TopView" } }, { "type": "MealFoodView", "props": { "visible": false, "var": "mealFoodView", "runtime": "module.MealFoodView", "right": 0, "left": 0, "bottom": 0 } }, { "type": "MealTipView", "props": { "y": 103, "visible": false, "var": "mealTipView", "centerX": 0, "runtime": "ui.game.MealTipViewUI" } }, { "type": "RaceButtomView", "props": { "visible": false, "var": "raceBottomView", "runtime": "module.RaceButtomView", "right": 0, "left": 0, "bottom": 0 } }, { "type": "rightBtnsView", "props": { "y": 600, "x": 650, "visible": false, "var": "rightBtnsView", "runtime": "module.RightBtnsDialog" } }] };
            return RaceViewUI;
        }(View));
        game.RaceViewUI = RaceViewUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var RightToolViewUI = /** @class */ (function (_super) {
            __extends(RightToolViewUI, _super);
            function RightToolViewUI() {
                return _super.call(this) || this;
            }
            RightToolViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.RightToolViewUI.uiView);
            };
            RightToolViewUI.uiView = { "type": "View", "props": { "width": 100, "height": 516 }, "child": [{ "type": "Button", "props": { "y": 0, "x": 0, "width": 100, "var": "btn_task", "stateNum": 1, "skin": "ui/btn_task.png", "height": 100 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 76, "skin": "view/point_red.png" } }] }, { "type": "Button", "props": { "y": 154, "x": 50, "width": 100, "var": "btn_shar", "stateNum": 1, "skin": "ui/btn_share_haoli.png", "height": 100, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Button", "props": { "y": 208, "x": 0, "width": 100, "var": "btn_buy", "stateNum": 1, "skin": "ui/btn_meiri.png", "height": 100 } }, { "type": "Button", "props": { "y": 415, "x": 0, "width": 100, "visible": false, "var": "btn_rank", "stateNum": 1, "skin": "ui/rankBtn.png", "height": 100 } }, { "type": "Button", "props": { "y": 311, "x": 1, "width": 100, "var": "btn_timereward", "stateNum": 1, "skin": "ui/gold-icon.png", "height": 100 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 76, "var": "redPoint", "skin": "view/point_red.png" } }] }] };
            return RightToolViewUI;
        }(View));
        game.RightToolViewUI = RightToolViewUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var SelectGateDialogUI = /** @class */ (function (_super) {
            __extends(SelectGateDialogUI, _super);
            function SelectGateDialogUI() {
                return _super.call(this) || this;
            }
            SelectGateDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.SelectGateDialogUI.uiView);
            };
            SelectGateDialogUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 970 }, "child": [{ "type": "Image", "props": { "y": 35, "x": 25, "width": 700, "skin": "bg/GameOverMessage.png", "sizeGrid": "97,73,80,76", "height": 780 }, "child": [{ "type": "Image", "props": { "y": 50, "width": 500, "skin": "font/tip10.png", "height": 43, "centerX": 0 } }, { "type": "Image", "props": { "y": 130, "width": 150, "var": "img_log1", "skin": "gate/log_1.png", "left": 60, "height": 150 }, "child": [{ "type": "Image", "props": { "y": 98, "var": "img_name1", "skin": "gate/log1.png", "mouseEnabled": false, "centerX": 0 } }, { "type": "Box", "props": { "y": 0, "x": 109, "var": "img_lock1" }, "child": [{ "type": "Image", "props": { "visible": false } }] }] }, { "type": "Image", "props": { "y": 130, "width": 150, "var": "img_log2", "skin": "gate/log_2.png", "height": 150, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 98, "var": "img_name2", "skin": "gate/log2.png", "mouseEnabled": false, "centerX": 0 } }, { "type": "Box", "props": { "y": 0, "x": 109, "var": "img_lock2" }, "child": [{ "type": "Image", "props": { "y": 160, "x": -82, "skin": "gate/bg_text_4.png" } }, { "type": "Image", "props": { "skin": "gate/bg_2.png" } }, { "type": "Image", "props": { "y": 155, "x": -80, "skin": "gate/bg_1.png" } }, { "type": "Image", "props": { "y": 164, "x": -40, "skin": "gate/12.png" } }] }] }, { "type": "Image", "props": { "y": 130, "width": 150, "var": "img_log3", "skin": "gate/log_3.png", "right": 60, "height": 150 }, "child": [{ "type": "Image", "props": { "y": 98, "var": "img_name3", "skin": "gate/log3.png", "mouseEnabled": false, "centerX": 0 } }, { "type": "Box", "props": { "y": 0, "x": 109, "var": "img_lock3" }, "child": [{ "type": "Image", "props": { "y": 160, "x": -82, "skin": "gate/bg_text_4.png" } }, { "type": "Image", "props": { "skin": "gate/bg_2.png" } }, { "type": "Image", "props": { "y": 155, "x": -80, "skin": "gate/bg_1.png" } }, { "type": "Image", "props": { "y": 164, "x": -40, "skin": "gate/30.png" } }] }] }, { "type": "Image", "props": { "y": 330, "width": 150, "var": "img_log4", "skin": "gate/log_4.png", "left": 60, "height": 150 }, "child": [{ "type": "Image", "props": { "y": 98, "var": "img_name4", "skin": "gate/log4.png", "mouseEnabled": false, "centerX": 0 } }, { "type": "Box", "props": { "y": 0, "x": 109, "var": "img_lock4" }, "child": [{ "type": "Image", "props": { "y": 160, "x": -82, "skin": "gate/bg_text_4.png" } }, { "type": "Image", "props": { "skin": "gate/bg_2.png" } }, { "type": "Image", "props": { "y": 155, "x": -80, "skin": "gate/bg_1.png" } }, { "type": "Image", "props": { "y": 162, "x": -40, "skin": "gate/40.png" } }] }] }, { "type": "Image", "props": { "y": 330, "width": 150, "var": "img_log5", "skin": "gate/log_5.png", "height": 150, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 98, "var": "img_name5", "skin": "gate/log5.png", "mouseEnabled": false, "centerX": 0 } }, { "type": "Box", "props": { "y": 0, "x": 109, "var": "img_lock5" }, "child": [{ "type": "Image", "props": { "y": 160, "x": -82, "skin": "gate/bg_text_4.png" } }, { "type": "Image", "props": { "skin": "gate/bg_2.png" } }, { "type": "Image", "props": { "y": 155, "x": -80, "skin": "gate/bg_1.png" } }, { "type": "Image", "props": { "y": 162, "x": -40, "skin": "gate/50.png" } }] }] }, { "type": "Image", "props": { "y": 330, "width": 150, "var": "img_log6", "skin": "gate/log_6.png", "right": 60, "height": 150 }, "child": [{ "type": "Image", "props": { "y": 98, "var": "img_name6", "skin": "gate/log6.png", "mouseEnabled": false, "centerX": 0 } }, { "type": "Box", "props": { "y": 0, "x": 109, "var": "img_lock6" }, "child": [{ "type": "Image", "props": { "y": 160, "x": -82, "skin": "gate/bg_text_4.png" } }, { "type": "Image", "props": { "skin": "gate/bg_2.png" } }, { "type": "Image", "props": { "y": 155, "x": -80, "skin": "gate/bg_1.png" } }, { "type": "Image", "props": { "y": 162, "x": -40, "skin": "gate/50.png" } }] }] }, { "type": "Image", "props": { "y": 530, "width": 150, "var": "img_log7", "skin": "gate/log_7.png", "left": 167.5, "height": 150 }, "child": [{ "type": "Image", "props": { "y": 98, "var": "img_name7", "skin": "gate/log7.png", "mouseEnabled": false, "centerX": 0 } }, { "type": "Box", "props": { "y": 0, "x": 109, "var": "img_lock7" }, "child": [{ "type": "Image", "props": { "y": 160, "x": -82, "skin": "gate/bg_text_4.png" } }, { "type": "Image", "props": { "skin": "gate/bg_2.png" } }, { "type": "Image", "props": { "y": 155, "x": -80, "skin": "gate/bg_1.png" } }, { "type": "Image", "props": { "y": 162, "x": -40, "skin": "gate/50.png" } }] }] }, { "type": "Image", "props": { "y": 530, "width": 150, "var": "img_log8", "skin": "gate/log_8.png", "right": 167.5, "height": 150 }, "child": [{ "type": "Image", "props": { "y": 98, "var": "img_name8", "skin": "gate/log8.png", "mouseEnabled": false, "centerX": 0 } }, { "type": "Box", "props": { "y": 0, "x": 109, "var": "img_lock8" }, "child": [{ "type": "Image", "props": { "y": 160, "x": -82, "skin": "gate/bg_text_4.png" } }, { "type": "Image", "props": { "skin": "gate/bg_2.png" } }, { "type": "Image", "props": { "y": 155, "x": -80, "skin": "gate/bg_1.png" } }, { "type": "Image", "props": { "y": 162, "x": -40, "skin": "gate/50.png" } }] }] }, { "type": "Image", "props": { "y": 681, "x": 28, "visible": false, "skin": "gate/bg_3.png" } }, { "type": "Image", "props": { "y": 681, "x": 568, "visible": false, "skin": "gate/bg_4.png" } }, { "type": "Label", "props": { "y": 714, "x": 33, "width": 92, "visible": false, "var": "num_garden", "text": "1/8", "height": 30, "fontSize": 26, "color": "#F5FD7D", "bold": true, "align": "center" } }, { "type": "Label", "props": { "y": 713, "x": 575, "width": 92, "visible": false, "var": "num_pet", "text": "0/100", "height": 30, "fontSize": 26, "color": "#F5FD7D", "bold": true, "align": "center" } }] }, { "type": "Button", "props": { "y": 0, "x": 650, "var": "btn_close", "stateNum": 1, "skin": "ui/btn_close.png" } }, { "type": "Box", "props": { "y": 638, "x": 586, "width": 110, "var": "btnOpen", "height": 154 }, "child": [{ "type": "Image", "props": { "y": 8, "x": 7, "skin": "gate/gift_1.png" } }, { "type": "Image", "props": { "y": 106, "x": 16, "skin": "gate/gift_2.png" } }, { "type": "Image", "props": { "x": -48, "skin": "gate/gift_5.png" } }] }] };
            return SelectGateDialogUI;
        }(Dialog));
        game.SelectGateDialogUI = SelectGateDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var SellChichenDialogUI = /** @class */ (function (_super) {
            __extends(SellChichenDialogUI, _super);
            function SellChichenDialogUI() {
                return _super.call(this) || this;
            }
            SellChichenDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.SellChichenDialogUI.uiView);
            };
            SellChichenDialogUI.uiView = { "type": "Dialog", "props": { "width": 700, "height": 535 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 700, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 499 } }, { "type": "Button", "props": { "y": -6, "x": 609, "var": "btn_close", "stateNum": 1, "skin": "ui/btn_close.png" } }, { "type": "Image", "props": { "y": -111, "x": 95, "width": 500, "var": "img_logo", "skin": "view/logo.png", "height": 284 } }, { "type": "Image", "props": { "y": 154, "x": 71, "width": 558, "skin": "ui/paper2.png", "sizeGrid": "91,97,37,108", "height": 220 } }, { "type": "Image", "props": { "y": 202, "x": 125, "var": "img_chichen" } }, { "type": "Image", "props": { "y": 252, "x": 502, "var": "img_plant" } }, { "type": "Image", "props": { "y": 281, "x": 285, "visible": false, "var": "img_star1", "skin": "ui/star.png", "scaleY": 0.8, "scaleX": 0.8 } }, { "type": "Image", "props": { "y": 281, "x": 336, "visible": false, "var": "img_star2", "skin": "ui/star.png", "scaleY": 0.8, "scaleX": 0.8 } }, { "type": "Image", "props": { "y": 281, "x": 386, "visible": false, "var": "img_star3", "skin": "ui/star.png", "scaleY": 0.8, "scaleX": 0.8 } }, { "type": "Box", "props": { "y": 403, "x": 383, "var": "box_sell" }, "child": [{ "type": "Button", "props": { "width": 254, "var": "btn_sell", "stateNum": 1, "skin": "ui/btn_22.png", "height": 128 } }, { "type": "Image", "props": { "y": 59, "x": 143, "skin": "ui/Atlas_0.png", "scaleY": 0.6, "scaleX": 0.6, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 20, "x": 75, "skin": "font/tip64.png", "scaleY": 0.8, "scaleX": 0.8 } }] }, { "type": "Box", "props": { "y": 400, "x": 66, "var": "box_share" }, "child": [{ "type": "Button", "props": { "var": "btn_share", "stateNum": 1, "skin": "ui/btn_11.png", "scaleY": 0.8, "scaleX": 0.8 } }, { "type": "Image", "props": { "y": 31, "x": 77, "skin": "ui/share.png", "mouseEnabled": false } }] }, { "type": "Label", "props": { "y": 170, "x": 285, "width": 245, "var": "txt_name", "text": "名字", "strokeColor": "#0d0d0d", "stroke": 4, "leading": 10, "height": 65, "fontSize": 50, "font": "Microsoft YaHei", "color": "#f9f4f4", "align": "left" } }, { "type": "Button", "props": { "y": 166, "x": 541, "var": "btn_changename", "stateNum": 1, "skin": "ui/btn_xie.png", "scaleY": 2, "scaleX": 2 } }] };
            return SellChichenDialogUI;
        }(Dialog));
        game.SellChichenDialogUI = SellChichenDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var SellChichenItemUI = /** @class */ (function (_super) {
            __extends(SellChichenItemUI, _super);
            function SellChichenItemUI() {
                return _super.call(this) || this;
            }
            SellChichenItemUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.SellChichenItemUI.uiView);
            };
            SellChichenItemUI.uiView = { "type": "View", "props": { "width": 550, "height": 83 }, "child": [{ "type": "Image", "props": { "y": 49, "x": 31, "var": "img_chichen", "skin": "ui/01-01.png", "scaleY": 0.5, "scaleX": 0.5, "pivotY": 62, "pivotX": 50 } }, { "type": "Image", "props": { "y": 3, "x": 2, "skin": "ui/line1.png" } }, { "type": "Button", "props": { "y": 22, "x": 422, "width": 124, "var": "btn_sell", "stateNum": 1, "skin": "ui/btn_ok2.png", "sizeGrid": "16,15,19,15", "height": 60 } }, { "type": "Image", "props": { "y": 55, "x": 64, "visible": false, "var": "img_star1", "skin": "ui/star.png", "scaleY": 0.5, "scaleX": 0.5 } }, { "type": "Image", "props": { "y": 55, "x": 94, "visible": false, "var": "img_star2", "skin": "ui/star.png", "scaleY": 0.5, "scaleX": 0.5 } }, { "type": "Image", "props": { "y": 55, "x": 124, "visible": false, "var": "img_star3", "skin": "ui/star.png", "scaleY": 0.5, "scaleX": 0.5 } }, { "type": "Image", "props": { "y": 35, "x": 506, "skin": "ui/Atlas_0.png", "scaleY": 0.4, "scaleX": 0.4, "mouseEnabled": false } }, { "type": "Label", "props": { "y": 21, "x": 64, "width": 138, "var": "txt_name", "text": "名字", "strokeColor": "#0d0d0d", "stroke": 4, "leading": 10, "height": 34, "fontSize": 24, "font": "Microsoft YaHei", "color": "#f9f4f4", "align": "left" } }] };
            return SellChichenItemUI;
        }(View));
        game.SellChichenItemUI = SellChichenItemUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var SellChichenItem2UI = /** @class */ (function (_super) {
            __extends(SellChichenItem2UI, _super);
            function SellChichenItem2UI() {
                return _super.call(this) || this;
            }
            SellChichenItem2UI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.SellChichenItem2UI.uiView);
            };
            SellChichenItem2UI.uiView = { "type": "View", "props": { "width": 270, "height": 120 }, "child": [{ "type": "Box", "props": { "y": 3, "x": 4, "var": "box_sell" }, "child": [{ "type": "Image", "props": { "y": 31, "x": 27, "var": "img_chichen", "skin": "ui/01-01.png", "scaleY": 0.5, "scaleX": 0.5, "pivotY": 62, "pivotX": 50 } }, { "type": "Button", "props": { "y": 38, "x": 159, "width": 106, "var": "btn_sell", "stateNum": 1, "skin": "ui/btn_ok2.png", "sizeGrid": "16,15,19,15", "height": 60 } }, { "type": "Image", "props": { "y": 37, "x": 63, "visible": false, "var": "img_star1", "skin": "ui/star.png", "scaleY": 0.5, "scaleX": 0.5 } }, { "type": "Image", "props": { "y": 37, "x": 93, "visible": false, "var": "img_star2", "skin": "ui/star.png", "scaleY": 0.5, "scaleX": 0.5 } }, { "type": "Image", "props": { "y": 37, "x": 123, "visible": false, "var": "img_star3", "skin": "ui/star.png", "scaleY": 0.5, "scaleX": 0.5 } }, { "type": "Image", "props": { "y": 51, "x": 227, "skin": "ui/Atlas_0.png", "scaleY": 0.4, "scaleX": 0.4, "mouseEnabled": false } }, { "type": "Label", "props": { "x": 63, "width": 138, "var": "txt_name", "text": "名字", "strokeColor": "#0d0d0d", "stroke": 4, "leading": 10, "height": 34, "fontSize": 24, "font": "Microsoft YaHei", "color": "#f9f4f4", "align": "left" } }] }, { "type": "Box", "props": { "y": 5, "x": 46, "var": "box_add" }, "child": [{ "type": "Image", "props": { "skin": "font/tip95.png" } }, { "type": "Button", "props": { "y": 40, "x": 29, "width": 120, "var": "btn_add", "stateNum": 1, "skin": "ui/btn_c2.png", "sizeGrid": "16,15,19,15", "height": 60 } }, { "type": "Image", "props": { "y": 56, "x": 46, "skin": "font/tip96.png", "mouseEnabled": false } }] }, { "type": "Image", "props": { "y": 108, "x": 12, "skin": "ui/line3.png" } }] };
            return SellChichenItem2UI;
        }(View));
        game.SellChichenItem2UI = SellChichenItem2UI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var SellConfirmChichenDialogUI = /** @class */ (function (_super) {
            __extends(SellConfirmChichenDialogUI, _super);
            function SellConfirmChichenDialogUI() {
                return _super.call(this) || this;
            }
            SellConfirmChichenDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.SellConfirmChichenDialogUI.uiView);
            };
            SellConfirmChichenDialogUI.uiView = { "type": "Dialog", "props": { "width": 635, "height": 490 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 635, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 490 } }, { "type": "Image", "props": { "y": 43, "x": 43, "width": 550, "skin": "ui/paper2.png", "sizeGrid": "88,97,37,108", "height": 413 } }, { "type": "Button", "props": { "y": 336, "x": 82, "width": 200, "var": "btn_cancel", "stateNum": 1, "skin": "ui/btn_cancel.png", "sizeGrid": "16,15,19,15", "height": 95 } }, { "type": "Button", "props": { "y": 336, "x": 350, "width": 200, "var": "btn_ok", "stateNum": 1, "skin": "ui/btn_ok2.png", "sizeGrid": "16,15,19,15", "height": 95 } }, { "type": "Image", "props": { "y": 354, "x": 364, "skin": "font/tip82.png" } }, { "type": "Image", "props": { "y": 354, "x": 96, "skin": "font/tip83.png" } }, { "type": "Image", "props": { "y": 103, "x": 58, "skin": "font/tip100.png" } }, { "type": "Image", "props": { "y": 173, "x": 183, "skin": "font/tip102.png" } }, { "type": "Image", "props": { "y": 244, "x": 233, "skin": "ui/Atlas_0.png", "scaleY": 0.7, "scaleX": 0.7 } }] };
            return SellConfirmChichenDialogUI;
        }(Dialog));
        game.SellConfirmChichenDialogUI = SellConfirmChichenDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var SellOnPlantFullDialogUI = /** @class */ (function (_super) {
            __extends(SellOnPlantFullDialogUI, _super);
            function SellOnPlantFullDialogUI() {
                return _super.call(this) || this;
            }
            SellOnPlantFullDialogUI.prototype.createChildren = function () {
                View.regComponent("module.SellChichenItem", module.SellChichenItem);
                View.regComponent("module.SellChichenItem2", module.SellChichenItem2);
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.SellOnPlantFullDialogUI.uiView);
            };
            SellOnPlantFullDialogUI.uiView = { "type": "Dialog", "props": { "width": 700, "height": 1218 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 700, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 1174 } }, { "type": "Image", "props": { "y": 442, "x": 50, "width": 600, "skin": "ui/paper2.png", "sizeGrid": "138,97,37,108", "height": 630 } }, { "type": "Image", "props": { "y": 312, "x": 50, "width": 600, "skin": "ui/paper2.png", "sizeGrid": "37,97,29,108", "height": 127 } }, { "type": "Image", "props": { "y": 114, "x": 255, "width": 190, "skin": "ui/egg-circle.png", "height": 190 } }, { "type": "Image", "props": { "y": 81, "x": 222, "skin": "ui/bfd-shine.png" } }, { "type": "Image", "props": { "y": 148, "x": 299, "var": "img_chichen", "skin": "gate/01-01.png" } }, { "type": "Image", "props": { "y": 56, "x": 60, "skin": "font/tip65.png" } }, { "type": "Image", "props": { "y": 362, "x": 90, "skin": "font/tip66.png" } }, { "type": "Image", "props": { "y": 468, "x": 250, "skin": "font/tip70.png" } }, { "type": "Box", "props": { "y": 1082, "x": 368, "var": "box_keep" }, "child": [{ "type": "Button", "props": { "y": 0, "x": 0, "width": 300, "var": "btn_keep", "stateNum": 1, "skin": "ui/btn_44.png", "sizeGrid": "16,25,23,21", "height": 141 } }, { "type": "Image", "props": { "y": 47, "x": 22, "skin": "font/tip71.png", "scaleY": 0.75, "scaleX": 0.75, "mouseEnabled": false } }] }, { "type": "Box", "props": { "y": 1082, "x": 35, "var": "box_build" }, "child": [{ "type": "Button", "props": { "width": 300, "var": "btn_build", "stateNum": 1, "skin": "ui/btn_55.png", "sizeGrid": "24,38,47,33", "height": 140 } }, { "type": "Image", "props": { "y": 46, "x": 30, "skin": "font/tip88.png", "scaleY": 0.7, "scaleX": 0.7, "mouseEnabled": false } }] }, { "type": "Box", "props": { "y": 524, "x": 73, "var": "box_list1" }, "child": [{ "type": "Image", "props": { "y": 502, "x": 258, "skin": "ui/sanjiao.png" } }, { "type": "List", "props": { "y": 47, "width": 560, "var": "sellList", "vScrollBarSkin": "ui/vscroll_2.png", "spaceY": 3, "repeatY": 5, "repeatX": 1, "height": 449 }, "child": [{ "type": "SellChichenItem", "props": { "runtime": "module.SellChichenItem", "renderType": "render" } }] }, { "type": "Image", "props": { "x": 439, "skin": "font/tip67.png" } }, { "type": "Image", "props": { "x": 234, "skin": "font/tip68.png" } }, { "type": "Image", "props": { "x": 41, "skin": "font/tip69.png" } }] }, { "type": "Box", "props": { "y": 516, "x": 66, "var": "box_list2" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 12, "skin": "ui/line1.png" } }, { "type": "Image", "props": { "y": 55, "x": 291, "width": 488, "skin": "ui/line1.png", "rotation": 90, "pivotY": -2, "height": 10 } }, { "type": "Image", "props": { "y": -5, "x": 79, "skin": "font/tip93.png" } }, { "type": "Image", "props": { "y": -5, "x": 371, "skin": "font/tip93.png" } }, { "type": "Image", "props": { "y": -2, "x": 181, "skin": "font/tip97.png" } }, { "type": "Image", "props": { "y": -2, "x": 470, "skin": "font/tip94.png" } }, { "type": "List", "props": { "y": 45, "x": 0, "width": 270, "var": "list1", "vScrollBarSkin": "ui/vscroll_2.png", "height": 465 }, "child": [{ "type": "SellChichenItem2", "props": { "runtime": "module.SellChichenItem2", "renderType": "render" } }] }, { "type": "List", "props": { "y": 45, "x": 298, "width": 270, "var": "list2", "vScrollBarSkin": "ui/vscroll_2.png", "height": 465 }, "child": [{ "type": "SellChichenItem2", "props": { "runtime": "module.SellChichenItem2", "renderType": "render" } }] }, { "type": "Image", "props": { "y": 517, "x": 112, "skin": "ui/sanjiao.png" } }, { "type": "Image", "props": { "y": 517, "x": 412, "skin": "ui/sanjiao.png" } }] }] };
            return SellOnPlantFullDialogUI;
        }(Dialog));
        game.SellOnPlantFullDialogUI = SellOnPlantFullDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var ShopDialogUI = /** @class */ (function (_super) {
            __extends(ShopDialogUI, _super);
            function ShopDialogUI() {
                return _super.call(this) || this;
            }
            ShopDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.ShopDialogUI.uiView);
            };
            ShopDialogUI.uiView = { "type": "Dialog", "props": { "width": 650, "height": 985 }, "child": [{ "type": "Image", "props": { "y": 1, "x": 0, "width": 650, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 985 }, "child": [{ "type": "Image", "props": { "y": 40, "skin": "font/tip1.png", "centerX": 0 } }, { "type": "Image", "props": { "y": 0, "x": 550, "var": "btn_close", "skin": "ui/btn_close.png" } }, { "type": "Box", "props": { "y": 105, "left": 50 }, "child": [{ "type": "Image", "props": { "width": 270, "var": "img_bg1", "skin": "ui/paperwhite2.png", "sizeGrid": "72,52,20,50", "height": 170 } }, { "type": "Image", "props": { "y": 8, "x": 23, "width": 58, "skin": "ui/exchange-coins.png", "height": 58 } }, { "type": "Image", "props": { "y": 8, "x": 195, "width": 46, "skin": "ui/exchange-feather.png", "height": 60 } }, { "type": "Image", "props": { "y": 19, "x": 120, "width": 48, "skin": "ui/arrow-yellow.png", "height": 38 } }, { "type": "Image", "props": { "y": 69, "x": 109, "width": 34, "skin": "ui/Atlas_0.png", "height": 36 } }, { "type": "Image", "props": { "y": 69, "x": 220, "width": 34, "skin": "ui/Atlas_1.png", "height": 36 } }, { "type": "Image", "props": { "y": 73, "x": 28, "width": 30, "skin": "ui/num_a_6.png", "height": 30 } }, { "type": "Image", "props": { "y": 73, "x": 53, "width": 30, "skin": "ui/num_a_0.png", "height": 30 } }, { "type": "Image", "props": { "y": 73, "x": 79, "width": 30, "skin": "ui/num_a_0.png", "height": 30 } }, { "type": "Image", "props": { "y": 73, "x": 191, "width": 30, "skin": "ui/num_a_1.png", "height": 30 } }, { "type": "Button", "props": { "y": 0, "x": 0, "width": 270, "var": "btn_to_coin", "skin": "ui/btn_touming.png", "height": 170 } }, { "type": "Image", "props": { "y": 109, "x": 64, "skin": "gate/btn-change.png" } }] }, { "type": "Box", "props": { "y": 105, "right": 50 }, "child": [{ "type": "Image", "props": { "width": 270, "var": "img_bg2", "skin": "ui/paperwhite2.png", "sizeGrid": "72,52,20,50", "height": 170 } }, { "type": "Image", "props": { "y": 10, "x": 25, "width": 46, "skin": "ui/exchange-feather.png", "height": 60 } }, { "type": "Image", "props": { "y": 10, "x": 171, "width": 58, "skin": "ui/exchange-coins.png", "height": 58 } }, { "type": "Image", "props": { "y": 24, "x": 97, "width": 48, "skin": "ui/arrow-yellow.png", "height": 38 } }, { "type": "Image", "props": { "y": 73, "x": 217, "width": 34, "skin": "ui/Atlas_0.png", "height": 36 } }, { "type": "Image", "props": { "y": 71, "x": 50, "width": 34, "skin": "ui/Atlas_1.png", "height": 36 } }, { "type": "Image", "props": { "y": 76, "x": 133, "width": 30, "skin": "ui/num_a_3.png", "height": 30 } }, { "type": "Image", "props": { "y": 76, "x": 157, "width": 30, "skin": "ui/num_a_0.png", "height": 30 } }, { "type": "Image", "props": { "y": 76, "x": 186, "width": 30, "skin": "ui/num_a_0.png", "height": 30 } }, { "type": "Image", "props": { "y": 74, "x": 19, "width": 30, "skin": "ui/num_a_1.png", "height": 30 } }, { "type": "Button", "props": { "y": 0, "x": 0, "width": 270, "var": "btn_to_wing", "skin": "ui/btn_touming.png", "height": 170 } }, { "type": "Image", "props": { "y": 109, "x": 64, "skin": "gate/btn-change.png" } }] }, { "type": "Image", "props": { "y": 280, "width": 545, "var": "img_1", "skin": "gate/shop-banners_0.png", "height": 130, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 100, "skin": "ui/yuan.png", "height": 100, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 65, "var": "Test", "skin": "ui/Atlas_1.png", "scaleY": 0.8, "scaleX": 0.8, "height": 81, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 10, "width": 47, "skin": "ui/num_a_1.png", "height": 42, "centerX": -15, "bottom": 0 } }, { "type": "Image", "props": { "y": 58, "width": 47, "skin": "ui/num_a_2.png", "height": 42, "centerX": 15, "bottom": 0 } }] }, { "type": "Image", "props": { "x": 365, "width": 154, "var": "yuanbtn6", "skin": "pngs/shop/btn_1.png", "height": 86, "centerY": 0 }, "child": [{ "type": "Image", "props": { "width": 36, "skin": "ui/num_d_6.png", "height": 36, "centerY": 0, "centerX": 0 } }] }] }, { "type": "Image", "props": { "y": 415, "width": 545, "var": "img_2", "skin": "gate/shop-banners_1.png", "height": 130, "centerX": 0 }, "child": [{ "type": "Image", "props": { "skin": "pngs/shop/bg_1.png" } }, { "type": "Image", "props": { "width": 100, "skin": "ui/yuan.png", "height": 100, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 65, "skin": "ui/Atlas_1.png", "scaleY": 0.8, "scaleX": 0.8, "height": 81, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "width": 47, "skin": "ui/num_a_6.png", "left": 8, "height": 42, "bottom": 0 } }, { "type": "Image", "props": { "width": 47, "skin": "ui/num_a_0.png", "right": 8, "height": 42, "bottom": 0 } }] }, { "type": "Image", "props": { "x": 365, "width": 154, "var": "yuanbtn30", "skin": "pngs/shop/btn_1.png", "height": 86, "centerY": 0 }, "child": [{ "type": "Image", "props": { "width": 36, "skin": "ui/num_d_3.png", "left": 42, "height": 36, "centerY": 0 } }, { "type": "Image", "props": { "width": 36, "skin": "ui/num_d_0.png", "right": 42, "height": 36, "centerY": 0 } }] }] }, { "type": "Image", "props": { "y": 550, "width": 545, "var": "img_3", "skin": "gate/shop-banners_2.png", "height": 130, "centerX": 0 }, "child": [{ "type": "Image", "props": { "skin": "pngs/shop/bg_2.png" } }, { "type": "Image", "props": { "width": 100, "skin": "ui/yuan.png", "height": 100, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 65, "skin": "ui/Atlas_1.png", "scaleY": 0.8, "scaleX": 0.8, "height": 81, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "width": 47, "skin": "ui/num_a_1.png", "left": -5, "height": 42, "bottom": 0 } }, { "type": "Image", "props": { "y": 58, "width": 47, "skin": "ui/num_a_3.png", "height": 42, "centerX": 0, "bottom": 0 } }, { "type": "Image", "props": { "y": 58, "width": 47, "skin": "ui/num_a_6.png", "right": -5, "height": 42, "bottom": 0 } }] }, { "type": "Image", "props": { "x": 365, "width": 154, "var": "yuanbtn118", "skin": "pngs/shop/btn_1.png", "height": 86, "centerY": 0 }, "child": [{ "type": "Image", "props": { "width": 36, "skin": "ui/num_d_6.png", "left": 40, "height": 36, "centerY": 0 } }, { "type": "Image", "props": { "width": 36, "skin": "ui/num_d_8.png", "right": 40, "height": 36, "centerY": 0 } }] }] }, { "type": "Image", "props": { "y": 685, "width": 545, "var": "img_4", "skin": "gate/shop-banners_3.png", "height": 130, "centerX": 0 }, "child": [{ "type": "Image", "props": { "skin": "pngs/shop/bg_3.png" } }, { "type": "Image", "props": { "width": 100, "skin": "ui/yuan.png", "height": 100, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 65, "skin": "ui/Atlas_1.png", "scaleY": 0.8, "scaleX": 0.8, "height": 81, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "width": 47, "skin": "ui/num_a_2.png", "left": -5, "height": 42, "bottom": 0 } }, { "type": "Image", "props": { "width": 47, "skin": "ui/num_a_3.png", "height": 42, "centerX": 0, "bottom": 0 } }, { "type": "Image", "props": { "width": 47, "skin": "ui/num_a_6.png", "right": -5, "height": 42, "bottom": 0 } }] }, { "type": "Image", "props": { "x": 365, "width": 154, "var": "yuanbtn328", "skin": "pngs/shop/btn_1.png", "height": 86, "centerY": 0 }, "child": [{ "type": "Image", "props": { "width": 36, "skin": "ui/num_d_1.png", "left": 25, "height": 36, "centerY": 0 } }, { "type": "Image", "props": { "width": 36, "skin": "ui/num_d_1.png", "height": 36, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "width": 36, "skin": "ui/num_d_8.png", "right": 25, "height": 36, "centerY": 0 } }] }] }, { "type": "Image", "props": { "y": 820, "width": 545, "var": "img_5", "skin": "gate/shop-banners_3.png", "height": 130, "centerX": 0 }, "child": [{ "type": "Image", "props": { "skin": "pngs/shop/bg_4.png" } }, { "type": "Image", "props": { "width": 100, "skin": "ui/yuan.png", "height": 100, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 65, "skin": "ui/Atlas_1.png", "scaleY": 0.8, "scaleX": 0.8, "height": 81, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "width": 47, "skin": "ui/num_a_6.png", "left": -5, "height": 42, "bottom": 0 } }, { "type": "Image", "props": { "width": 47, "skin": "ui/num_a_5.png", "height": 42, "centerX": 0, "bottom": 0 } }, { "type": "Image", "props": { "width": 47, "skin": "ui/num_a_6.png", "right": -5, "height": 42, "bottom": 0 } }] }, { "type": "Image", "props": { "x": 365, "width": 154, "var": "yuanbtn648", "skin": "pngs/shop/btn_1.png", "height": 86, "centerY": 0 }, "child": [{ "type": "Image", "props": { "width": 36, "skin": "ui/num_d_3.png", "left": 25, "height": 36, "centerY": 0 } }, { "type": "Image", "props": { "width": 36, "skin": "ui/num_d_2.png", "height": 36, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "width": 36, "skin": "ui/num_d_8.png", "right": 25, "height": 36, "centerY": 0 } }] }] }] }] };
            return ShopDialogUI;
        }(Dialog));
        game.ShopDialogUI = ShopDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var TaskDialogUI = /** @class */ (function (_super) {
            __extends(TaskDialogUI, _super);
            function TaskDialogUI() {
                return _super.call(this) || this;
            }
            TaskDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.TaskDialogUI.uiView);
            };
            TaskDialogUI.uiView = { "type": "Dialog", "props": { "width": 650, "height": 810 }, "child": [{ "type": "Image", "props": { "y": 1, "x": 6, "width": 650, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 810 } }, { "type": "Button", "props": { "y": -8, "x": 556, "var": "btn_close", "stateNum": 1, "skin": "ui/btn_close.png" } }, { "type": "Image", "props": { "y": -24, "x": 143, "width": 376, "skin": "ui/paper2.png", "sizeGrid": "24,23,22,65", "height": 114 } }, { "type": "Image", "props": { "y": 4, "x": 157, "skin": "font/tip4.png" } }, { "type": "Box", "props": { "y": 116, "x": 51, "disabled": false }, "child": [{ "type": "Image", "props": { "width": 560, "skin": "ui/paper2.png", "sizeGrid": "24,23,22,65", "height": 160 } }, { "type": "Label", "props": { "y": 59, "x": 22, "width": 367, "text": "孵化宠物两次", "strokeColor": "#0d0d0d", "stroke": 3, "leading": 10, "height": 51, "fontSize": 30, "font": "Microsoft YaHei", "color": "#f9f4f4", "align": "left" } }, { "type": "Label", "props": { "y": 59, "x": 217, "width": 154, "var": "txt_count1", "text": "(0/2)", "strokeColor": "#0d0d0d", "stroke": 3, "leading": 10, "height": 43, "fontSize": 30, "font": "Microsoft YaHei", "color": "#e77e1d", "align": "left" } }, { "type": "Box", "props": { "y": 38, "x": 378, "var": "box_get1" }, "child": [{ "type": "Button", "props": { "width": 158, "var": "btn_get1", "stateNum": 1, "skin": "ui/btn_ok2.png", "sizeGrid": "15,15,16,12", "height": 85, "disabled": false } }, { "type": "Image", "props": { "y": 19, "x": 95, "skin": "ui/Atlas_0.png", "scaleY": 0.6, "scaleX": 0.6, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 24, "x": 15, "width": 47, "skin": "ui/num_a_5.png", "scaleY": 1, "scaleX": 1, "mouseEnabled": false, "height": 42 } }, { "type": "Image", "props": { "y": 24, "x": 51, "skin": "ui/num_a_0.png", "scaleY": 1, "scaleX": 1, "mouseEnabled": false } }] }] }, { "type": "Box", "props": { "y": 279, "x": 51 }, "child": [{ "type": "Image", "props": { "width": 560, "skin": "ui/paper2.png", "sizeGrid": "24,23,22,65", "height": 160 } }, { "type": "Label", "props": { "y": 59, "x": 22, "width": 367, "text": "宠物比赛三次", "strokeColor": "#0d0d0d", "stroke": 3, "leading": 10, "height": 51, "fontSize": 30, "font": "Microsoft YaHei", "color": "#f9f4f4", "align": "left" } }, { "type": "Label", "props": { "y": 59, "x": 217, "width": 154, "var": "txt_count2", "text": "(0/2)", "strokeColor": "#0d0d0d", "stroke": 3, "leading": 10, "height": 43, "fontSize": 30, "font": "Microsoft YaHei", "color": "#e77e1d", "align": "left" } }, { "type": "Box", "props": { "y": 38, "x": 378, "var": "box_get2" }, "child": [{ "type": "Button", "props": { "width": 158, "var": "btn_get2", "stateNum": 1, "skin": "ui/btn_ok2.png", "sizeGrid": "15,15,16,12", "height": 85 } }, { "type": "Image", "props": { "y": 19, "x": 95, "skin": "ui/Atlas_0.png", "scaleY": 0.6, "scaleX": 0.6, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 24, "x": 15, "width": 47, "skin": "ui/num_a_5.png", "scaleY": 1, "scaleX": 1, "mouseEnabled": false, "height": 42 } }, { "type": "Image", "props": { "y": 24, "x": 51, "skin": "ui/num_a_0.png", "scaleY": 1, "scaleX": 1, "mouseEnabled": false } }] }] }, { "type": "Box", "props": { "y": 443, "x": 51 }, "child": [{ "type": "Image", "props": { "width": 560, "skin": "ui/paper2.png", "sizeGrid": "24,23,22,65", "height": 160 } }, { "type": "Label", "props": { "y": 59, "x": 22, "width": 367, "text": "分享到群三次", "strokeColor": "#0d0d0d", "stroke": 3, "leading": 10, "height": 51, "fontSize": 30, "font": "Microsoft YaHei", "color": "#f9f4f4", "align": "left" } }, { "type": "Label", "props": { "y": 59, "x": 217, "width": 154, "var": "txt_count3", "text": "(0/2)", "strokeColor": "#0d0d0d", "stroke": 3, "leading": 10, "height": 43, "fontSize": 30, "font": "Microsoft YaHei", "color": "#e77e1d", "align": "left" } }, { "type": "Box", "props": { "y": 38, "x": 378, "var": "box_get3" }, "child": [{ "type": "Button", "props": { "width": 158, "var": "btn_get3", "stateNum": 1, "skin": "ui/btn_ok2.png", "sizeGrid": "15,15,16,12", "height": 85 } }, { "type": "Image", "props": { "y": 19, "x": 95, "skin": "ui/Atlas_0.png", "scaleY": 0.6, "scaleX": 0.6, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 24, "x": 15, "width": 47, "skin": "ui/num_a_5.png", "scaleY": 1, "scaleX": 1, "mouseEnabled": false, "height": 42 } }, { "type": "Image", "props": { "y": 24, "x": 51, "skin": "ui/num_a_0.png", "scaleY": 1, "scaleX": 1, "mouseEnabled": false } }] }] }, { "type": "Box", "props": { "y": 606, "x": 51 }, "child": [{ "type": "Image", "props": { "width": 560, "skin": "ui/paper2.png", "sizeGrid": "24,23,22,65", "height": 160 } }, { "type": "Label", "props": { "y": 59, "x": 22, "width": 367, "text": "喂养宠物10次", "strokeColor": "#0d0d0d", "stroke": 3, "leading": 10, "height": 51, "fontSize": 30, "font": "Microsoft YaHei", "color": "#f9f4f4", "align": "left" } }, { "type": "Label", "props": { "y": 59, "x": 217, "width": 154, "var": "txt_count4", "text": "(0/2)", "strokeColor": "#0d0d0d", "stroke": 3, "leading": 10, "height": 43, "fontSize": 30, "font": "Microsoft YaHei", "color": "#e77e1d", "align": "left" } }, { "type": "Box", "props": { "y": 38, "x": 378, "var": "box_get4" }, "child": [{ "type": "Button", "props": { "width": 158, "var": "btn_get4", "stateNum": 1, "skin": "ui/btn_ok2.png", "sizeGrid": "15,15,16,12", "height": 85 } }, { "type": "Image", "props": { "y": 19, "x": 95, "skin": "ui/Atlas_0.png", "scaleY": 0.6, "scaleX": 0.6, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 24, "x": 15, "width": 47, "skin": "ui/num_a_5.png", "scaleY": 1, "scaleX": 1, "mouseEnabled": false, "height": 42 } }, { "type": "Image", "props": { "y": 24, "x": 51, "skin": "ui/num_a_0.png", "scaleY": 1, "scaleX": 1, "mouseEnabled": false } }] }] }] };
            return TaskDialogUI;
        }(Dialog));
        game.TaskDialogUI = TaskDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var TimeRewardDialogUI = /** @class */ (function (_super) {
            __extends(TimeRewardDialogUI, _super);
            function TimeRewardDialogUI() {
                return _super.call(this) || this;
            }
            TimeRewardDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.TimeRewardDialogUI.uiView);
            };
            TimeRewardDialogUI.uiView = { "type": "View", "props": { "width": 650, "height": 520 }, "child": [{ "type": "Image", "props": { "y": 1, "x": 6, "width": 650, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 520 } }, { "type": "Button", "props": { "y": -8, "x": 560, "var": "btn_close", "stateNum": 1, "skin": "ui/btn_close.png" } }, { "type": "Image", "props": { "y": -24, "x": 143, "width": 376, "skin": "ui/paper2.png", "sizeGrid": "24,23,22,65", "height": 114 } }, { "type": "Image", "props": { "y": 3, "x": 157, "skin": "font/tip99.png" } }, { "type": "Image", "props": { "y": 116, "x": 51, "width": 560, "skin": "ui/paper2.png", "sizeGrid": "24,23,22,65", "height": 237 } }, { "type": "Button", "props": { "y": 363, "x": 199, "width": 263, "var": "btn_get", "stateNum": 1, "skin": "ui/btn_22.png", "sizeGrid": "40,38,36,31", "height": 116 } }, { "type": "Label", "props": { "y": 138, "x": 73, "wordWrap": true, "width": 511, "var": "txt_tip", "text": "每日11点-17点，17点-22点", "strokeColor": "#9C5C23", "stroke": 2, "leading": 10, "height": 85, "fontSize": 30, "font": "SimSun", "color": "#9C5C23", "align": "center" }, "child": [{ "type": "Label", "props": { "y": 38, "x": -4, "width": 511, "text": "分别可领取50金币", "strokeColor": "#9C5C23", "stroke": 2, "height": 85, "fontSize": 30, "font": "SimSun", "color": "#9C5C23", "align": "center" } }] }, { "type": "Image", "props": { "y": 282, "x": 300, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 260, "x": 305, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 283, "x": 353, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 284, "x": 262, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 285, "x": 379, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 287, "x": 218, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 254, "x": 348, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 258, "x": 392, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 241, "x": 306, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 250, "x": 245, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 255, "x": 205, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 297, "x": 433, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 298, "x": 162, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 258, "x": 155, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 293, "x": 293, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 300, "x": 345, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 299, "x": 246, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 223, "x": 283, "skin": "ui/coin.png" } }, { "type": "Image", "props": { "y": 395, "x": 244, "skin": "font/tip84.png", "mouseEnabled": false } }] };
            return TimeRewardDialogUI;
        }(View));
        game.TimeRewardDialogUI = TimeRewardDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var ToolViewUI = /** @class */ (function (_super) {
            __extends(ToolViewUI, _super);
            function ToolViewUI() {
                return _super.call(this) || this;
            }
            ToolViewUI.prototype.createChildren = function () {
                View.regComponent("module.GetChickenView", module.GetChickenView);
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.ToolViewUI.uiView);
            };
            ToolViewUI.uiView = { "type": "View", "props": { "width": 100, "height": 420 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 100, "var": "box_shu", "height": 100 }, "child": [{ "type": "Image", "props": { "width": 100, "skin": "gate/btn_chickens.png", "height": 105, "centerX": 0 } }, { "type": "Button", "props": { "width": 100, "var": "btn_shu", "skin": "ui/btn_touming.png", "height": 110, "centerY": 0, "centerX": 0 } }, { "type": "Label", "props": { "y": 75, "x": 5, "width": 91, "var": "num_pet", "text": "1/160", "strokeColor": "#000000", "stroke": 3, "height": 28, "fontSize": 22, "color": "#FFFFFF", "bold": true, "align": "center" } }] }, { "type": "Box", "props": { "y": 104, "x": 0, "width": 100, "visible": false, "var": "box_carden", "height": 100 }, "child": [{ "type": "Image", "props": { "width": 100, "var": "img_carden", "skin": "gate/log_1.png", "height": 100, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 62, "width": 100, "skin": "ui/party-bar.png", "height": 38 }, "child": [{ "type": "Image", "props": { "width": 95, "var": "img_name", "skin": "font/tip120.png", "scaleY": 0.6, "scaleX": 0.6, "height": 32, "centerY": 0, "centerX": 0 } }] }] }, { "type": "Box", "props": { "y": 312, "x": 0, "width": 100, "visible": false, "var": "box_chichen", "height": 100 }, "child": [{ "type": "Image", "props": { "width": 100, "skin": "ui/yuan.png", "height": 100, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 123, "skin": "ui/party-icon.png", "scaleY": 0.5, "scaleX": 0.5, "height": 121, "centerY": 0, "centerX": 0 } }] }, { "type": "Image", "props": { "y": 62, "width": 100, "skin": "ui/party-bar.png", "height": 38 } }, { "type": "Button", "props": { "width": 100, "var": "btn_chichen", "skin": "ui/btn_touming.png", "height": 100, "centerY": 0, "centerX": 0 } }] }, { "type": "Box", "props": { "y": 104, "x": 0, "width": 100, "var": "box_jiashu", "height": 100 }, "child": [{ "type": "Image", "props": { "width": 100, "skin": "ui/yuan.png", "height": 100, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 81, "skin": "ui/Atlas_0.png", "scaleY": 0.8, "scaleX": 0.8, "height": 85, "centerY": 0, "centerX": 0 } }] }, { "type": "Image", "props": { "y": 62, "width": 100, "skin": "ui/party-bar.png", "height": 38 }, "child": [{ "type": "Image", "props": { "width": 91, "var": "img_jiashu", "skin": "font/tip113.png", "scaleY": 0.8, "scaleX": 0.8, "height": 25, "centerY": 0, "centerX": 0 } }] }, { "type": "Button", "props": { "width": 100, "var": "btn_jiashu", "skin": "ui/btn_touming.png", "height": 100, "centerY": 0, "centerX": 0 } }] }, { "type": "Box", "props": { "y": 258, "x": 50, "width": 100, "var": "box_reward", "height": 100, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 100, "skin": "pngs/0319/bg_0.png", "height": 100 } }, { "type": "Label", "props": { "y": 74, "x": 0, "width": 100, "var": "featherNum", "text": "1个羽毛", "strokeColor": "#000000", "stroke": 3, "height": 20, "fontSize": 18, "color": "#FFFFFF", "bold": true, "align": "center" } }, { "type": "Image", "props": { "y": 0, "x": 76, "skin": "view/point_red.png" } }] }, { "type": "GetChickenView", "props": { "y": 312, "var": "box_free", "runtime": "module.GetChickenView" } }, { "type": "Button", "props": { "y": 520, "x": 0, "width": 100, "visible": false, "var": "btn_dailyreward", "stateNum": 1, "skin": "ui/btn_dailyreward.png", "height": 100 } }, { "type": "Button", "props": { "y": 0, "x": 0, "width": 100, "visible": false, "var": "btn_close_meal", "stateNum": 1, "skin": "ui/btn_close.png", "height": 100 } }] };
            return ToolViewUI;
        }(View));
        game.ToolViewUI = ToolViewUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var TopViewUI = /** @class */ (function (_super) {
            __extends(TopViewUI, _super);
            function TopViewUI() {
                return _super.call(this) || this;
            }
            TopViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.TopViewUI.uiView);
            };
            TopViewUI.uiView = { "type": "View", "props": { "width": 750, "right": 0, "left": 0, "height": 100 }, "child": [{ "type": "Image", "props": { "y": -80, "skin": "ui/bg1.png", "sizeGrid": "14,16,18,16", "right": 2, "left": 2, "height": 80 } }, { "type": "Image", "props": { "top": 0, "skin": "bg/tiao.png", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Image", "props": { "y": 10, "x": 3, "width": 80, "var": "img_bg1", "skin": "ui/bg1.png", "sizeGrid": "14,16,18,16", "height": 80 }, "child": [{ "type": "Image", "props": { "y": 41, "x": 39, "var": "img_menu", "skin": "ui/img_m.png", "pivotY": 30, "pivotX": 29 }, "compId": 10 }, { "type": "Button", "props": { "var": "btn_menu", "top": 0, "skin": "ui/btn_touming.png", "right": 0, "left": 0, "bottom": 0 } }] }, { "type": "Box", "props": { "y": 10, "x": 86, "width": 190, "var": "box_coin", "height": 80 }, "child": [{ "type": "Image", "props": { "var": "img_bg3", "top": 0, "skin": "ui/bg1.png", "sizeGrid": "14,16,18,16", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Image", "props": { "y": 18, "x": 140, "var": "img_coin", "skin": "ui/Atlas_0.png", "scaleY": 0.5, "scaleX": 0.5 } }, { "type": "Button", "props": { "width": 180, "var": "btn_addCoin", "skin": "ui/btn_touming.png", "height": 70, "centerY": 0, "centerX": 0 } }] }, { "type": "Box", "props": { "y": 10, "x": 279, "width": 170, "var": "box_wing", "height": 80 }, "child": [{ "type": "Image", "props": { "width": 170, "var": "img_bg4", "skin": "ui/bg1.png", "sizeGrid": "14,16,18,16", "height": 80 } }, { "type": "Image", "props": { "y": 19, "x": 120, "var": "img_gem", "skin": "ui/Atlas_1.png", "scaleY": 0.5, "scaleX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 44, "x": 36, "skin": "ui/plus.png" } }] }, { "type": "Button", "props": { "y": 5, "x": 5, "width": 160, "var": "btn_addWing", "skin": "ui/btn_touming.png", "height": 70 } }] }, { "type": "Box", "props": { "y": 10, "x": 452, "width": 295, "var": "box_exp", "height": 80 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 295, "var": "img_bg2", "skin": "ui/bg1.png", "sizeGrid": "14,16,18,16", "height": 80 } }, { "type": "Image", "props": { "y": 40, "x": 40, "width": 80, "visible": true, "skin": "ui/egg-glow.png", "pivotY": 40, "pivotX": 40, "height": 80, "alpha": 0 }, "compId": 37 }, { "type": "Image", "props": { "y": 40, "x": 40, "width": 60, "var": "img_egg", "skin": "ui/egg_1.png", "pivotY": 33, "pivotX": 30, "height": 66 }, "compId": 11 }, { "type": "Image", "props": { "y": 18, "x": 80, "width": 205, "var": "img_exp1", "skin": "ui/exp1.png", "sizeGrid": "13,18,15,21", "height": 44 } }, { "type": "Image", "props": { "y": 18, "x": 80, "width": 130, "var": "img_exp2", "skin": "ui/exp2.png", "sizeGrid": "13,18,15,21", "height": 44 } }, { "type": "Image", "props": { "width": 223, "visible": false, "var": "img_weal", "skin": "font/tip_1.png", "height": 40, "centerY": 0, "centerX": 0 } }] }, { "type": "Box", "props": { "y": 10, "x": 452, "width": 295, "visible": false, "var": "box_race", "height": 80 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 295, "var": "img_bg5", "skin": "ui/bg1.png", "sizeGrid": "24,23,22,65", "height": 80 } }, { "type": "Image", "props": { "width": 52, "skin": "ui/Atlas_2.png", "height": 60, "centerY": 0, "centerX": -26 } }] }, { "type": "Image", "props": { "y": -65, "x": 565, "visible": false, "var": "TestWings", "skin": "ui/Atlas_1.png" } }], "animations": [{ "nodes": [{ "target": 10, "keyframes": { "scaleY": [{ "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 10, "key": "scaleY", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 10, "key": "scaleY", "index": 5 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 10, "key": "scaleY", "index": 10 }], "scaleX": [{ "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 10, "key": "scaleX", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 10, "key": "scaleX", "index": 5 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 10, "key": "scaleX", "index": 10 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }, { "nodes": [{ "target": 37, "keyframes": { "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 37, "key": "scaleY", "index": 0 }, { "value": 1.2, "tweenMethod": "linearNone", "tween": true, "target": 37, "key": "scaleY", "index": 5 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 37, "key": "scaleY", "index": 10 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 37, "key": "scaleX", "index": 0 }, { "value": 1.2, "tweenMethod": "linearNone", "tween": true, "target": 37, "key": "scaleX", "index": 5 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 37, "key": "scaleX", "index": 10 }], "alpha": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 37, "key": "alpha", "index": 0 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 37, "key": "alpha", "index": 10 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 37, "key": "alpha", "index": 11 }] } }, { "target": 11, "keyframes": { "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 11, "key": "scaleY", "index": 0 }, { "value": 1.2, "tweenMethod": "linearNone", "tween": true, "target": 11, "key": "scaleY", "index": 5 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 11, "key": "scaleY", "index": 10 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 11, "key": "scaleX", "index": 0 }, { "value": 1.2, "tweenMethod": "linearNone", "tween": true, "target": 11, "key": "scaleX", "index": 5 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 11, "key": "scaleX", "index": 10 }], "alpha": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 11, "key": "alpha", "index": 0 }] } }], "name": "ani2", "id": 2, "frameRate": 50, "action": 0 }] };
            return TopViewUI;
        }(View));
        game.TopViewUI = TopViewUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var TransitionchViewUI = /** @class */ (function (_super) {
            __extends(TransitionchViewUI, _super);
            function TransitionchViewUI() {
                return _super.call(this) || this;
            }
            TransitionchViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.TransitionchViewUI.uiView);
            };
            TransitionchViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "top": -10, "skin": "ui/mask.png", "sizeGrid": "9,9,11,7", "right": -10, "left": -10, "bottom": -10, "alpha": 0 } }, { "type": "Box", "props": { "x": 1547, "var": "box1", "pivotX": 2411, "centerY": 0 }, "child": [{ "type": "Image", "props": { "y": 1712, "x": 1678, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 970, "x": 1696, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1333, "x": 1658, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1339, "x": 2027, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2128, "x": 1676, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 533, "x": 1655, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1069, "x": 21, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1474, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 676, "x": 285, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1287, "x": 324, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1907, "x": 286, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 106, "x": 632, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 103, "x": 827, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 3, "x": 1020, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "x": 1215, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 225, "x": 1021, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 222, "x": 1216, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 348, "x": 628, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 345, "x": 823, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 371, "x": 1131, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 368, "x": 1326, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 116, "x": 1381, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 113, "x": 1576, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 551, "x": 706, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 548, "x": 901, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 794, "x": 627, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 791, "x": 822, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 576, "x": 1112, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 573, "x": 1307, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 751, "x": 1044, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 748, "x": 1239, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 868, "x": 1151, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 865, "x": 1346, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 943, "x": 671, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 940, "x": 866, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1074, "x": 1052, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1071, "x": 1247, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1140, "x": 628, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1137, "x": 823, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1143, "x": 1219, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1140, "x": 1414, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1288, "x": 902, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1285, "x": 1097, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1391, "x": 646, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1388, "x": 841, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1404, "x": 1147, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1401, "x": 1342, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1586, "x": 544, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1583, "x": 739, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1602, "x": 942, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1599, "x": 1137, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1629, "x": 1143, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1626, "x": 1338, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1801, "x": 511, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1798, "x": 706, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1833, "x": 909, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1830, "x": 1104, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1895, "x": 697, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1892, "x": 892, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1857, "x": 1162, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 1854, "x": 1357, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2020, "x": 522, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2017, "x": 717, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2077, "x": 911, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2074, "x": 1106, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2234, "x": 753, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2231, "x": 948, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2168, "x": 518, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2165, "x": 713, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2155, "x": 1169, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2152, "x": 1364, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2368, "x": 525, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2365, "x": 720, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2361, "x": 967, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2358, "x": 1162, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2361, "x": 1189, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2358, "x": 1384, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2553, "x": 513, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2550, "x": 708, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2522, "x": 924, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2519, "x": 1119, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2526, "x": 1245, "skin": "tupian/transition-ch-2.png", "scaleY": 3, "scaleX": 3 } }, { "type": "Image", "props": { "y": 2523, "x": 1440, "skin": "tupian/transition-ch-1.png", "scaleY": 3, "scaleX": 3 } }] }] };
            return TransitionchViewUI;
        }(View));
        game.TransitionchViewUI = TransitionchViewUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var UnlockEggSlotDialogUI = /** @class */ (function (_super) {
            __extends(UnlockEggSlotDialogUI, _super);
            function UnlockEggSlotDialogUI() {
                return _super.call(this) || this;
            }
            UnlockEggSlotDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.UnlockEggSlotDialogUI.uiView);
            };
            UnlockEggSlotDialogUI.uiView = { "type": "Dialog", "props": { "width": 513, "height": 650 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 513, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 650 } }, { "type": "Button", "props": { "y": 452, "x": 91, "width": 331, "var": "btn_unlock", "stateNum": 1, "skin": "ui/btn_2.png", "sizeGrid": "36,24,51,40", "height": 150 } }, { "type": "Button", "props": { "y": -11, "x": 423, "var": "btn_close", "stateNum": 1, "skin": "ui/btn_close.png" } }, { "type": "Image", "props": { "y": 148, "x": 182, "skin": "ui/egg-circle.png" } }, { "type": "Image", "props": { "y": 183, "x": 222, "skin": "ui/no-egg.png", "scaleY": 0.7, "scaleX": 0.7 } }, { "type": "Image", "props": { "y": 197, "x": 238, "skin": "ui/block.png" } }, { "type": "Image", "props": { "y": 524, "x": 272, "skin": "ui/Atlas_1.png", "scaleY": 0.5, "scaleX": 0.5 } }, { "type": "Image", "props": { "y": 77, "x": 106, "skin": "font/tip28.png" } }, { "type": "Image", "props": { "y": 478, "x": 197, "skin": "font/tip29.png" } }, { "type": "Image", "props": { "y": 323, "x": 75, "skin": "font/tip30.png" } }, { "type": "Image", "props": { "y": 368, "x": 130, "skin": "font/tip31.png" } }] };
            return UnlockEggSlotDialogUI;
        }(Dialog));
        game.UnlockEggSlotDialogUI = UnlockEggSlotDialogUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var UnlockGateViewUI = /** @class */ (function (_super) {
            __extends(UnlockGateViewUI, _super);
            function UnlockGateViewUI() {
                return _super.call(this) || this;
            }
            UnlockGateViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.UnlockGateViewUI.uiView);
            };
            UnlockGateViewUI.uiView = { "type": "View", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "child": [{ "type": "Image", "props": { "y": 10, "x": 10, "top": -10, "skin": "ui/mask.png", "sizeGrid": "9,9,11,7", "right": -10, "left": -10, "bottom": -10, "alpha": 0.4 } }, { "type": "Box", "props": { "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 513, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 751 } }, { "type": "Image", "props": { "y": 72, "x": 128, "skin": "ui/bfd-shine.png" } }, { "type": "Image", "props": { "y": 133, "x": 181, "var": "img_log", "skin": "gate/log_1.png" } }, { "type": "Image", "props": { "y": 241, "x": 228, "skin": "ui/block.png", "scaleY": 1.5, "scaleX": 1.5 } }, { "type": "Image", "props": { "y": 333, "x": 73, "width": 366, "skin": "ui/paper2.png", "sizeGrid": "29,59,66,65", "height": 192 } }, { "type": "Image", "props": { "y": 51, "x": 102, "var": "img_plant_name", "skin": "gate/logname_1.png", "scaleY": 1.5, "scaleX": 1.5 } }, { "type": "Image", "props": { "y": 358, "x": 70, "skin": "font/tip26.png" } }, { "type": "Box", "props": { "y": 556, "x": 91, "var": "box" }, "child": [{ "type": "Button", "props": { "width": 331, "var": "btn_unlock", "stateNum": 1, "skin": "ui/btn_55.png", "sizeGrid": "36,46,76,68", "height": 150 } }, { "type": "Image", "props": { "y": 61, "x": 219, "skin": "ui/Atlas_1.png", "scaleY": 0.8, "scaleX": 0.8, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 26, "x": 22, "skin": "ui/unlock.png", "scaleY": 1.4, "scaleX": 1.4, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 29, "x": 104, "skin": "font/tip24.png", "mouseEnabled": false } }] }, { "type": "Button", "props": { "y": -20, "x": 421, "var": "btn_close", "stateNum": 1, "skin": "ui/btn_close.png" } }] }] };
            return UnlockGateViewUI;
        }(View));
        game.UnlockGateViewUI = UnlockGateViewUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var guid;
    (function (guid) {
        var GuidTipViewUI = /** @class */ (function (_super) {
            __extends(GuidTipViewUI, _super);
            function GuidTipViewUI() {
                return _super.call(this) || this;
            }
            GuidTipViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.guid.GuidTipViewUI.uiView);
            };
            GuidTipViewUI.uiView = { "type": "View", "props": { "y": 225, "x": 250, "width": 500, "scaleY": 1, "scaleX": 1, "pivotY": 225, "pivotX": 250, "height": 450 }, "compId": 1, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 500, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 450 } }, { "type": "Image", "props": { "y": 47, "x": 50, "width": 399, "skin": "ui/paper2.png", "sizeGrid": "94,97,37,108", "height": 358 } }, { "type": "Image", "props": { "y": 377, "x": 200, "skin": "ui/yuan.png" } }, { "type": "Image", "props": { "y": 383, "x": 220, "skin": "ui/Atlas_4.png" } }, { "type": "Box", "props": { "y": 73, "x": 87, "var": "box1" }, "child": [{ "type": "Image", "props": { "x": 76, "skin": "font/tip39.png" } }, { "type": "Image", "props": { "y": 106, "x": 9, "skin": "font/tip41.png" } }, { "type": "Image", "props": { "y": 169, "skin": "font/tip42.png" } }, { "type": "Image", "props": { "y": 231, "x": 67, "skin": "font/tip40.png" } }] }, { "type": "Box", "props": { "y": 148, "x": 81, "var": "box2" }, "child": [{ "type": "Image", "props": { "skin": "font/tip43.png" } }, { "type": "Image", "props": { "y": 90, "x": 18, "skin": "font/tip44.png" } }] }, { "type": "Box", "props": { "y": 147, "x": 92, "var": "box3" }, "child": [{ "type": "Image", "props": { "x": 37, "skin": "font/tip45.png" } }, { "type": "Image", "props": { "y": 95, "skin": "font/tip46.png" } }] }, { "type": "Box", "props": { "y": 139, "x": 97, "var": "box4" }, "child": [{ "type": "Image", "props": { "skin": "font/tip47.png" } }, { "type": "Image", "props": { "y": 127, "x": 29, "skin": "font/tip48.png", "scaleY": 1.2, "scaleX": 1.2 } }, { "type": "Image", "props": { "y": 62, "x": 73, "skin": "font/tip49.png" } }] }, { "type": "Box", "props": { "y": 140, "x": 81, "var": "box5" }, "child": [{ "type": "Image", "props": { "y": 2, "x": 7, "skin": "font/tip57.png" } }] }, { "type": "Box", "props": { "y": 123, "x": 93, "var": "box6" }, "child": [{ "type": "Image", "props": { "y": 29, "x": -46, "skin": "font/tip59.png" } }] }], "animations": [{ "nodes": [{ "target": 1, "keyframes": { "scaleY": [{ "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleY", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleY", "index": 5 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleY", "index": 10 }], "scaleX": [{ "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleX", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleX", "index": 5 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleX", "index": 10 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }] };
            return GuidTipViewUI;
        }(View));
        guid.GuidTipViewUI = GuidTipViewUI;
    })(guid = ui.guid || (ui.guid = {}));
})(ui || (ui = {}));
(function (ui) {
    var guid;
    (function (guid) {
        var GuidTipView2UI = /** @class */ (function (_super) {
            __extends(GuidTipView2UI, _super);
            function GuidTipView2UI() {
                return _super.call(this) || this;
            }
            GuidTipView2UI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.guid.GuidTipView2UI.uiView);
            };
            GuidTipView2UI.uiView = { "type": "View", "props": { "y": 130, "x": 200, "width": 400, "pivotY": 130, "pivotX": 200, "height": 259 }, "compId": 1, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 400, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 251 } }, { "type": "Image", "props": { "y": 51, "x": 50, "width": 300, "skin": "ui/paper2.png", "sizeGrid": "29,97,26,108", "height": 150 } }, { "type": "Image", "props": { "y": 204, "x": 150, "skin": "ui/ready.png" } }, { "type": "Box", "props": { "y": 82, "x": 80, "var": "img_1" }, "child": [{ "type": "Image", "props": { "y": -17, "x": -50, "skin": "font/tip50.png", "scaleY": 1.2, "scaleX": 1.2 } }] }, { "type": "Box", "props": { "y": 83, "x": 69, "var": "img_2" }, "child": [{ "type": "Image", "props": { "y": -12, "x": -61, "skin": "font/tip118.png" } }] }], "animations": [{ "nodes": [{ "target": 1, "keyframes": { "scaleY": [{ "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleY", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleY", "index": 5 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleY", "index": 10 }], "scaleX": [{ "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleX", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleX", "index": 5 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleX", "index": 10 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }] };
            return GuidTipView2UI;
        }(View));
        guid.GuidTipView2UI = GuidTipView2UI;
    })(guid = ui.guid || (ui.guid = {}));
})(ui || (ui = {}));
(function (ui) {
    var guid;
    (function (guid) {
        var GuidTipView3UI = /** @class */ (function (_super) {
            __extends(GuidTipView3UI, _super);
            function GuidTipView3UI() {
                return _super.call(this) || this;
            }
            GuidTipView3UI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.guid.GuidTipView3UI.uiView);
            };
            GuidTipView3UI.uiView = { "type": "View", "props": { "y": 10, "x": 85, "width": 400, "pivotY": 10, "pivotX": 85, "height": 290 }, "compId": 1, "child": [{ "type": "Image", "props": { "y": 29, "x": -122, "width": 409, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 260 } }, { "type": "Image", "props": { "y": 78, "x": -77, "width": 320, "skin": "ui/paper2.png", "sizeGrid": "29,97,26,108", "height": 173 } }, { "type": "Image", "props": { "y": 53, "x": 35, "skin": "ui/ready.png", "scaleY": -1 } }, { "type": "Image", "props": { "y": 115, "x": -121, "skin": "font/tip62.png" } }], "animations": [{ "nodes": [{ "target": 1, "keyframes": { "scaleY": [{ "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleY", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleY", "index": 5 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleY", "index": 10 }], "scaleX": [{ "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleX", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleX", "index": 5 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleX", "index": 10 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }] };
            return GuidTipView3UI;
        }(View));
        guid.GuidTipView3UI = GuidTipView3UI;
    })(guid = ui.guid || (ui.guid = {}));
})(ui || (ui = {}));
(function (ui) {
    var guid;
    (function (guid) {
        var GuidTipView4UI = /** @class */ (function (_super) {
            __extends(GuidTipView4UI, _super);
            function GuidTipView4UI() {
                return _super.call(this) || this;
            }
            GuidTipView4UI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.guid.GuidTipView4UI.uiView);
            };
            GuidTipView4UI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 210, "height": 160 }, "compId": 1, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 228, "skin": "ui/sanjiao2.png", "sizeGrid": "24,24,46,60", "height": 160 } }, { "type": "Box", "props": { "y": 14, "x": 12, "var": "box1" }, "child": [{ "type": "Image", "props": { "y": -9, "x": -37, "skin": "font/tip52.png" } }] }, { "type": "Box", "props": { "y": 12, "x": 7, "var": "box2" }, "child": [{ "type": "Image", "props": { "y": 6, "x": -42, "skin": "font/tip55.png" } }] }], "animations": [{ "nodes": [{ "target": 1, "keyframes": { "scaleY": [{ "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleY", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleY", "index": 5 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleY", "index": 10 }], "scaleX": [{ "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleX", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleX", "index": 5 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleX", "index": 10 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }] };
            return GuidTipView4UI;
        }(View));
        guid.GuidTipView4UI = GuidTipView4UI;
    })(guid = ui.guid || (ui.guid = {}));
})(ui || (ui = {}));
(function (ui) {
    var guid;
    (function (guid) {
        var GuidTipView5UI = /** @class */ (function (_super) {
            __extends(GuidTipView5UI, _super);
            function GuidTipView5UI() {
                return _super.call(this) || this;
            }
            GuidTipView5UI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.guid.GuidTipView5UI.uiView);
            };
            GuidTipView5UI.uiView = { "type": "View", "props": { "y": 130, "x": 250, "width": 500, "pivotY": 130, "pivotX": 250, "height": 260 }, "compId": 1, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 500, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 260 } }, { "type": "Image", "props": { "y": 40, "x": 39, "width": 425, "skin": "ui/paper2.png", "sizeGrid": "29,97,26,108", "height": 182 } }, { "type": "Box", "props": { "y": 66, "x": 54, "var": "box_1" }, "child": [{ "type": "Image", "props": { "y": -26, "x": -10, "skin": "font/tip122.png" } }] }, { "type": "Box", "props": { "y": 0, "x": 17, "visible": false, "var": "box_2" }, "child": [{ "type": "Image", "props": { "y": 59, "x": -12, "skin": "font/tip125.png" } }, { "type": "Image", "props": { "var": "img_jiantou", "skin": "ui/ready.png", "rotation": 90 } }] }], "animations": [{ "nodes": [{ "target": 1, "keyframes": { "scaleY": [{ "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleY", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleY", "index": 5 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleY", "index": 10 }], "scaleX": [{ "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleX", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleX", "index": 5 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 1, "key": "scaleX", "index": 10 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }] };
            return GuidTipView5UI;
        }(View));
        guid.GuidTipView5UI = GuidTipView5UI;
    })(guid = ui.guid || (ui.guid = {}));
})(ui || (ui = {}));
(function (ui) {
    var load;
    (function (load) {
        var CompanyIconUI = /** @class */ (function (_super) {
            __extends(CompanyIconUI, _super);
            function CompanyIconUI() {
                return _super.call(this) || this;
            }
            CompanyIconUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.load.CompanyIconUI.uiView);
            };
            CompanyIconUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "smallload/blackbg.png", "sizeGrid": "5,5,5,5", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Label", "props": { "y": 504, "width": 520, "var": "txt_firist", "text": "首次打开，需解压游戏，请稍等.....", "height": 48, "fontSize": 30, "color": "#fbfbf6", "centerX": 0, "bold": false, "align": "center" } }] };
            return CompanyIconUI;
        }(View));
        load.CompanyIconUI = CompanyIconUI;
    })(load = ui.load || (ui.load = {}));
})(ui || (ui = {}));
(function (ui) {
    var load;
    (function (load) {
        var TestViewUI = /** @class */ (function (_super) {
            __extends(TestViewUI, _super);
            function TestViewUI() {
                return _super.call(this) || this;
            }
            TestViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.load.TestViewUI.uiView);
            };
            TestViewUI.uiView = { "type": "View", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "top": 0, "skin": "gate/bg1.png", "sizeGrid": "14,15,12,14", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Button", "props": { "y": 5, "x": 583, "width": 150, "var": "btn_next", "stateNum": 1, "skin": "ui/btn_c2.png", "sizeGrid": "15,15,18,16", "labelSize": 30, "label": "Next", "height": 70 } }, { "type": "Button", "props": { "y": 5, "x": 15, "width": 150, "var": "btn_prev", "stateNum": 1, "skin": "ui/btn_c2.png", "sizeGrid": "15,15,18,16", "labelSize": 30, "label": "Prev", "height": 70 } }, { "type": "Button", "props": { "y": 90, "x": 6, "width": 120, "var": "btn_hat1", "stateNum": 1, "skin": "ui/btn_ok2.png", "sizeGrid": "15,15,18,16", "name": 1, "labelSize": 30, "labelColors": "#ffffff", "label": 1, "height": 60 } }, { "type": "Button", "props": { "y": 91, "x": 130, "width": 120, "var": "btn_hat2", "stateNum": 1, "skin": "ui/btn_ok2.png", "sizeGrid": "15,15,18,16", "name": 2, "labelSize": 30, "labelColors": "#ffffff", "label": 2, "height": 60 } }, { "type": "Button", "props": { "y": 90, "x": 253, "width": 120, "var": "btn_hat3", "stateNum": 1, "skin": "ui/btn_ok2.png", "sizeGrid": "15,15,18,16", "name": 3, "labelSize": 30, "labelColors": "#ffffff", "label": 3, "height": 60 } }, { "type": "Button", "props": { "y": 90, "x": 377, "width": 120, "var": "btn_hat4", "stateNum": 1, "skin": "ui/btn_ok2.png", "sizeGrid": "15,15,18,16", "name": 4, "labelSize": 30, "labelColors": "#ffffff", "label": 4, "height": 60 } }, { "type": "Button", "props": { "y": 91, "x": 500, "width": 120, "var": "btn_hat5", "stateNum": 1, "skin": "ui/btn_ok2.png", "sizeGrid": "15,15,18,16", "name": 5, "labelSize": 30, "labelColors": "#ffffff", "label": 5, "height": 60 } }, { "type": "Button", "props": { "y": 90, "x": 624, "width": 120, "var": "btn_hat6", "stateNum": 1, "skin": "ui/btn_ok2.png", "sizeGrid": "15,15,18,16", "name": 6, "labelSize": 30, "labelColors": "#ffffff", "label": 6, "height": 60 } }, { "type": "Button", "props": { "y": 157, "x": 7, "width": 120, "var": "btn_hat7", "stateNum": 1, "skin": "ui/btn_ok2.png", "sizeGrid": "15,15,18,16", "name": 7, "labelSize": 30, "labelColors": "#ffffff", "label": 7, "height": 60 } }, { "type": "Button", "props": { "y": 158, "x": 130, "width": 120, "var": "btn_hat8", "stateNum": 1, "skin": "ui/btn_ok2.png", "sizeGrid": "15,15,18,16", "name": 8, "labelSize": 30, "labelColors": "#ffffff", "label": 8, "height": 60 } }, { "type": "Button", "props": { "y": 157, "x": 254, "width": 120, "var": "btn_hat9", "stateNum": 1, "skin": "ui/btn_ok2.png", "sizeGrid": "15,15,18,16", "name": 9, "labelSize": 30, "labelColors": "#ffffff", "label": 9, "height": 60 } }, { "type": "Button", "props": { "y": 156, "x": 377, "width": 120, "var": "btn_hat10", "stateNum": 1, "skin": "ui/btn_ok2.png", "sizeGrid": "15,15,18,16", "name": 10, "labelSize": 30, "labelColors": "#ffffff", "label": 10, "height": 60 } }, { "type": "Button", "props": { "y": 157, "x": 500, "width": 120, "var": "btn_hat11", "stateNum": 1, "skin": "ui/btn_ok2.png", "sizeGrid": "15,15,18,16", "name": 11, "labelSize": 30, "labelColors": "#ffffff", "label": 11, "height": 60 } }, { "type": "Label", "props": { "y": 17, "x": 291, "width": 167, "var": "txt_id", "text": "0", "strokeColor": "#0d0d0d", "stroke": 4, "leading": 10, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "color": "#f9f4f4", "align": "center" } }, { "type": "Button", "props": { "y": 157, "x": 624, "width": 120, "var": "btn_save", "stateNum": 1, "skin": "ui/btn_cancel.png", "sizeGrid": "15,15,18,16", "labelSize": 30, "labelColors": "#ffffff", "label": "save", "height": 60 } }] };
            return TestViewUI;
        }(View));
        load.TestViewUI = TestViewUI;
    })(load = ui.load || (ui.load = {}));
})(ui || (ui = {}));
(function (ui) {
    var race;
    (function (race) {
        var RaceButtomViewUI = /** @class */ (function (_super) {
            __extends(RaceButtomViewUI, _super);
            function RaceButtomViewUI() {
                return _super.call(this) || this;
            }
            RaceButtomViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.race.RaceButtomViewUI.uiView);
            };
            RaceButtomViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 130 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "bg/tiao.png", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Image", "props": { "y": 10, "width": 700, "skin": "ui/bg1.png", "sizeGrid": "14,16,18,16", "height": 110, "centerX": 0 } }, { "type": "Box", "props": { "y": 26, "centerX": -230 }, "child": [{ "type": "Image", "props": { "y": 2, "width": 190, "skin": "ui/paper2.png", "sizeGrid": "24,23,22,65", "height": 80 } }, { "type": "Image", "props": { "x": 128, "skin": "ui/Atlas_2.png" } }, { "type": "Image", "props": { "y": 29, "x": 10, "skin": "ui/rank_3.png", "scaleY": 0.5, "scaleX": 0.5 } }] }, { "type": "Box", "props": { "y": 28, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 190, "skin": "ui/paper2.png", "sizeGrid": "24,23,22,65", "height": 80 } }, { "type": "Image", "props": { "y": 23, "x": 159, "skin": "ui/Atlas_2.png", "scaleY": 0.7, "scaleX": 0.7 } }, { "type": "Image", "props": { "y": 27, "x": 10, "skin": "ui/rank_2.png", "scaleY": 0.5, "scaleX": 0.5 } }, { "type": "Image", "props": { "y": 20, "x": 131, "skin": "ui/Atlas_2.png", "scaleY": 0.7, "scaleX": 0.7 } }, { "type": "Image", "props": { "y": -4, "x": 146, "skin": "ui/Atlas_2.png", "scaleY": 0.7, "scaleX": 0.7 } }] }, { "type": "Box", "props": { "y": 28, "centerX": 230 }, "child": [{ "type": "Image", "props": { "width": 190, "skin": "ui/paper2.png", "sizeGrid": "24,23,22,65", "height": 80 } }, { "type": "Image", "props": { "y": 4, "x": 124, "var": "img_hat", "skin": "ui/hat_2.png", "scaleY": 0.8, "scaleX": 0.8 } }, { "type": "Image", "props": { "y": 27, "x": 8, "skin": "ui/rank_1.png", "scaleY": 0.5, "scaleX": 0.5 } }] }] };
            return RaceButtomViewUI;
        }(View));
        race.RaceButtomViewUI = RaceButtomViewUI;
    })(race = ui.race || (ui.race = {}));
})(ui || (ui = {}));
(function (ui) {
    var race;
    (function (race) {
        var RaceReadyViewUI = /** @class */ (function (_super) {
            __extends(RaceReadyViewUI, _super);
            function RaceReadyViewUI() {
                return _super.call(this) || this;
            }
            RaceReadyViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.race.RaceReadyViewUI.uiView);
            };
            RaceReadyViewUI.uiView = { "type": "View", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "child": [{ "type": "Image", "props": { "y": 169, "var": "img_time", "skin": "ui/num_e_3.png", "scaleY": 2, "scaleX": 2, "centerX": 0 } }, { "type": "Box", "props": { "y": 620, "x": 13, "var": "box_name" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 260, "skin": "ui/paper2.png", "sizeGrid": "24,23,22,65", "height": 114 } }, { "type": "Image", "props": { "y": 30, "x": 45, "skin": "font/tip106.png" } }] }, { "type": "Image", "props": { "skin": "font/tip12.png", "centerX": 0, "bottom": 220 } }] };
            return RaceReadyViewUI;
        }(View));
        race.RaceReadyViewUI = RaceReadyViewUI;
    })(race = ui.race || (ui.race = {}));
})(ui || (ui = {}));
(function (ui) {
    var race;
    (function (race) {
        var RaceReportViewUI = /** @class */ (function (_super) {
            __extends(RaceReportViewUI, _super);
            function RaceReportViewUI() {
                return _super.call(this) || this;
            }
            RaceReportViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.race.RaceReportViewUI.uiView);
            };
            RaceReportViewUI.uiView = { "type": "View", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "child": [{ "type": "Button", "props": { "y": 180, "x": 644, "var": "btn_close", "stateNum": 1, "skin": "ui/btn_close.png" } }, { "type": "Image", "props": { "y": 178, "width": 400, "skin": "ui/paper2.png", "sizeGrid": "24,23,22,65", "height": 150, "centerX": 0 } }, { "type": "Image", "props": { "y": 222, "var": "img_rank", "skin": "ui/rank_1.png", "centerX": 0 } }, { "type": "Box", "props": { "centerX": 0, "bottom": 300 }, "child": [{ "type": "Button", "props": { "width": 445, "var": "btn_play", "stateNum": 1, "skin": "ui/btn_22.png", "sizeGrid": "28,44,48,43", "height": 156 } }, { "type": "Image", "props": { "y": 81, "x": 236, "skin": "ui/Atlas_0.png", "scaleY": 0.6, "scaleX": 0.6, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 86, "x": 160, "width": 47, "skin": "ui/num_a_2.png", "mouseEnabled": false, "height": 42 } }, { "type": "Image", "props": { "y": 86, "x": 194, "skin": "ui/num_a_0.png", "mouseEnabled": false } }, { "type": "Image", "props": { "y": 31, "x": 72, "skin": "font/tip13.png", "mouseEnabled": false } }] }, { "type": "Box", "props": { "y": 545, "x": 433, "var": "box_reward", "pivotY": 128, "pivotX": 128 }, "child": [{ "type": "Image", "props": { "skin": "ui/bfd-shine.png" } }, { "type": "Image", "props": { "y": 129, "x": 126, "var": "img_reward", "skin": "ui/Atlas_2.png", "pivotY": 37.5, "pivotX": 32.5 } }] }, { "type": "Box", "props": { "var": "btn_shareall", "centerX": 0, "bottom": 140 }, "child": [{ "type": "Button", "props": { "y": 0, "x": 0, "width": 445, "var": "btn_share", "stateNum": 1, "skin": "ui/btn_11.png", "sizeGrid": "46,46,49,49", "height": 156 } }, { "type": "Image", "props": { "y": 46, "x": 174, "width": 96, "skin": "ui/ad.png", "mouseEnabled": false, "height": 63 } }] }] };
            return RaceReportViewUI;
        }(View));
        race.RaceReportViewUI = RaceReportViewUI;
    })(race = ui.race || (ui.race = {}));
})(ui || (ui = {}));
(function (ui) {
    var race;
    (function (race) {
        var RunViewUI = /** @class */ (function (_super) {
            __extends(RunViewUI, _super);
            function RunViewUI() {
                return _super.call(this) || this;
            }
            RunViewUI.prototype.createChildren = function () {
                View.regComponent("module.RaceReportView", module.RaceReportView);
                View.regComponent("module.SelectRaceChichenView", module.SelectRaceChichenView);
                View.regComponent("module.RaceReadyView", module.RaceReadyView);
                _super.prototype.createChildren.call(this);
                this.createView(ui.race.RunViewUI.uiView);
            };
            RunViewUI.uiView = { "type": "View", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "tupian/sky-texture.png", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Box", "props": { "y": 1, "x": 71 }, "child": [{ "type": "Image", "props": { "x": 1, "skin": "tupian/cloud.png" } }, { "type": "Image", "props": { "y": 21, "x": 497, "skin": "tupian/cloud2.png" } }, { "type": "Image", "props": { "y": 133, "x": 378, "skin": "tupian/cloud.png" } }, { "type": "Image", "props": { "y": 115, "x": 135, "skin": "tupian/cloud.png" } }, { "type": "Image", "props": { "y": 225, "skin": "tupian/cloud2.png" } }, { "type": "Image", "props": { "y": 16, "x": 255, "skin": "tupian/cloud2.png" } }, { "type": "Image", "props": { "y": 236, "x": 498, "skin": "tupian/cloud2.png" } }, { "type": "Image", "props": { "y": 262, "x": 238, "skin": "tupian/cloud2.png" } }] }, { "type": "Button", "props": { "var": "btn_click", "top": 0, "skin": "ui/btn_touming.png", "right": 0, "left": 0, "bottom": 0 } }, { "type": "RaceReportView", "props": { "y": 357, "x": 98, "visible": false, "var": "reportView", "runtime": "module.RaceReportView" } }, { "type": "SelectRaceChichenView", "props": { "y": 368, "x": 310, "visible": false, "var": "selectView", "runtime": "module.SelectRaceChichenView" } }, { "type": "RaceReadyView", "props": { "y": 0, "x": 0, "visible": false, "var": "readyView", "runtime": "module.RaceReadyView" } }] };
            return RunViewUI;
        }(View));
        race.RunViewUI = RunViewUI;
    })(race = ui.race || (ui.race = {}));
})(ui || (ui = {}));
(function (ui) {
    var race;
    (function (race) {
        var SelectChichenItemUI = /** @class */ (function (_super) {
            __extends(SelectChichenItemUI, _super);
            function SelectChichenItemUI() {
                return _super.call(this) || this;
            }
            SelectChichenItemUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.race.SelectChichenItemUI.uiView);
            };
            SelectChichenItemUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 250, "height": 150 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 250, "skin": "ui/paper2.png", "sizeGrid": "29,59,66,65", "height": 150 } }, { "type": "Image", "props": { "y": 18, "x": 61, "var": "img_no", "skin": "ui/unknown-chichen.png" } }, { "type": "Image", "props": { "y": 78, "x": 51, "var": "img_icon", "skin": "ui/01-01.png", "scaleY": 0.8, "scaleX": 0.8, "pivotY": 62, "pivotX": 50 } }, { "type": "Image", "props": { "y": 103, "x": 97, "var": "img_star1", "skin": "ui/star.png", "scaleY": 0.6, "scaleX": 0.6 } }, { "type": "Image", "props": { "y": 103, "x": 131, "width": 50, "var": "img_star2", "skin": "ui/star.png", "scaleY": 0.6, "scaleX": 0.6, "height": 48 } }, { "type": "Image", "props": { "y": 103, "x": 165, "var": "img_star3", "skin": "ui/star.png", "scaleY": 0.6, "scaleX": 0.6 } }, { "type": "Label", "props": { "y": 18, "x": 97, "width": 138, "var": "txt_name", "text": "名字", "strokeColor": "#0d0d0d", "stroke": 4, "leading": 10, "height": 38, "fontSize": 26, "font": "Microsoft YaHei", "color": "#f9f4f4", "align": "left" } }, { "type": "Image", "props": { "y": 58, "x": 97, "var": "img_food", "skin": "ui/Atlas_2.png", "scaleY": 0.5, "scaleX": 0.5 } }, { "type": "Label", "props": { "y": 58, "x": 146, "width": 59, "var": "txt_level", "text": "1", "strokeColor": "#5a4444", "stroke": 4, "leading": 10, "height": 38, "fontSize": 30, "font": "Microsoft YaHei", "color": "#f4f411", "align": "left" } }, { "type": "Image", "props": { "y": 9, "x": 191, "width": 50, "var": "img_hatbg", "skin": "ui/selector.png", "height": 50, "alpha": 0.6 } }, { "type": "Image", "props": { "y": 19, "x": 201, "width": 30, "var": "img_hat", "skin": "ui/hat_2.png", "height": 30 } }] };
            return SelectChichenItemUI;
        }(View));
        race.SelectChichenItemUI = SelectChichenItemUI;
    })(race = ui.race || (ui.race = {}));
})(ui || (ui = {}));
(function (ui) {
    var race;
    (function (race) {
        var SelectRaceChichenViewUI = /** @class */ (function (_super) {
            __extends(SelectRaceChichenViewUI, _super);
            function SelectRaceChichenViewUI() {
                return _super.call(this) || this;
            }
            SelectRaceChichenViewUI.prototype.createChildren = function () {
                View.regComponent("module.SelectChichenItem", module.SelectChichenItem);
                _super.prototype.createChildren.call(this);
                this.createView(ui.race.SelectRaceChichenViewUI.uiView);
            };
            SelectRaceChichenViewUI.uiView = { "type": "View", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "child": [{ "type": "Image", "props": { "top": -10, "skin": "ui/mask.png", "sizeGrid": "9,9,11,7", "right": -10, "left": -10, "bottom": -10, "alpha": 0 } }, { "type": "Box", "props": { "var": "box", "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 6, "width": 600, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 1000 } }, { "type": "Button", "props": { "y": -3, "x": 503, "var": "btn_close", "stateNum": 1, "skin": "ui/btn_close.png" } }, { "type": "Image", "props": { "y": 63, "x": 100, "skin": "font/tip11.png" } }, { "type": "SelectChichenItem", "props": { "y": 126, "x": 44, "var": "item1", "runtime": "module.SelectChichenItem" } }, { "type": "SelectChichenItem", "props": { "y": 126, "x": 309, "var": "item2", "runtime": "module.SelectChichenItem" } }, { "type": "SelectChichenItem", "props": { "y": 296, "x": 44, "var": "item3", "runtime": "module.SelectChichenItem" } }, { "type": "SelectChichenItem", "props": { "y": 296, "x": 309, "var": "item4", "runtime": "module.SelectChichenItem" } }, { "type": "SelectChichenItem", "props": { "y": 465, "x": 44, "var": "item5", "runtime": "module.SelectChichenItem" } }, { "type": "SelectChichenItem", "props": { "y": 465, "x": 309, "var": "item6", "runtime": "module.SelectChichenItem" } }, { "type": "SelectChichenItem", "props": { "y": 635, "x": 44, "var": "item7", "runtime": "module.SelectChichenItem" } }, { "type": "SelectChichenItem", "props": { "y": 635, "x": 309, "var": "item8", "runtime": "module.SelectChichenItem" } }, { "type": "SelectChichenItem", "props": { "y": 804, "x": 44, "var": "item9", "runtime": "module.SelectChichenItem" } }, { "type": "SelectChichenItem", "props": { "y": 804, "x": 309, "var": "item10", "runtime": "module.SelectChichenItem" } }] }] };
            return SelectRaceChichenViewUI;
        }(View));
        race.SelectRaceChichenViewUI = SelectRaceChichenViewUI;
    })(race = ui.race || (ui.race = {}));
})(ui || (ui = {}));
(function (ui) {
    var race;
    (function (race) {
        var StartRaceDialogUI = /** @class */ (function (_super) {
            __extends(StartRaceDialogUI, _super);
            function StartRaceDialogUI() {
                return _super.call(this) || this;
            }
            StartRaceDialogUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.race.StartRaceDialogUI.uiView);
            };
            StartRaceDialogUI.uiView = { "type": "Dialog", "props": { "width": 650, "height": 835 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 650, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 835 } }, { "type": "Button", "props": { "y": -6, "x": 555, "var": "btn_close", "stateNum": 1, "skin": "ui/btn_close.png" } }, { "type": "Image", "props": { "y": 660, "x": 175, "skin": "gate/img_2.png" } }, { "type": "Image", "props": { "y": 88, "x": 133, "skin": "ui/bfd-shine.png", "scaleY": 1.5, "scaleX": 1.5 } }, { "type": "Image", "props": { "y": 205, "x": 250, "skin": "ui/egg-circle.png" } }, { "type": "Image", "props": { "y": 220, "x": 261, "skin": "ui/game-image.png" } }, { "type": "Image", "props": { "y": -21, "x": 150, "width": 349, "skin": "ui/paper2.png", "sizeGrid": "24,97,22,108", "height": 99 } }, { "type": "Image", "props": { "y": 388, "x": 55, "width": 539, "skin": "ui/paper2.png", "sizeGrid": "24,97,22,108", "height": 256 } }, { "type": "Image", "props": { "y": 725, "x": 342, "skin": "ui/Atlas_0.png", "scaleY": 0.6, "scaleX": 0.6, "mouseEnabled": false } }, { "type": "Image", "props": { "y": 730, "x": 266, "width": 47, "skin": "ui/num_a_2.png", "mouseEnabled": false, "height": 42 } }, { "type": "Image", "props": { "y": 730, "x": 300, "skin": "ui/num_a_0.png", "mouseEnabled": false } }, { "type": "Image", "props": { "y": 411, "x": 133, "skin": "ui/hat-strip.png", "scaleY": 1.5, "scaleX": 1.5 } }, { "type": "Image", "props": { "y": 668, "x": 265, "skin": "gate/img_1.png", "layoutEnabled": false } }, { "type": "Image", "props": { "y": 477, "x": 90, "skin": "font/bg_3.png" } }, { "type": "Image", "props": { "y": -1, "x": 204, "skin": "gate/img_race.png" } }, { "type": "Button", "props": { "y": 660, "x": 186, "width": 278, "var": "btn_play", "height": 126 } }] };
            return StartRaceDialogUI;
        }(Dialog));
        race.StartRaceDialogUI = StartRaceDialogUI;
    })(race = ui.race || (ui.race = {}));
})(ui || (ui = {}));
(function (ui) {
    var smallload;
    (function (smallload) {
        var SmallLoadingViewUI = /** @class */ (function (_super) {
            __extends(SmallLoadingViewUI, _super);
            function SmallLoadingViewUI() {
                return _super.call(this) || this;
            }
            SmallLoadingViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.smallload.SmallLoadingViewUI.uiView);
            };
            SmallLoadingViewUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "child": [{ "type": "Image", "props": { "var": "bg", "top": 0, "skin": "smallload/blackbg.png", "sizeGrid": "5,5,5,5", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Label", "props": { "y": 604, "width": 651, "visible": false, "var": "txt_wifiTip", "text": "断线了，正在拼命连接中....", "height": 93, "fontSize": 40, "color": "#f6f3f3", "centerX": 0, "bold": true, "align": "center" } }] };
            return SmallLoadingViewUI;
        }(View));
        smallload.SmallLoadingViewUI = SmallLoadingViewUI;
    })(smallload = ui.smallload || (ui.smallload = {}));
})(ui || (ui = {}));
(function (ui) {
    var view;
    (function (view) {
        var inviteViewUI = /** @class */ (function (_super) {
            __extends(inviteViewUI, _super);
            function inviteViewUI() {
                return _super.call(this) || this;
            }
            inviteViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.view.inviteViewUI.uiView);
            };
            inviteViewUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 157, "x": 48, "skin": "view/bg_2.png" }, "child": [{ "type": "Button", "props": { "y": 20, "x": 606, "var": "btn_close", "stateNum": 1, "skin": "ui/btn_close.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 54, "x": 220, "skin": "view/inviteTitle.png" } }, { "type": "Box", "props": { "y": 120, "x": 56 }, "child": [{ "type": "Image", "props": { "width": 270, "var": "bkg1", "skin": "ui/paperwhite2.png", "sizeGrid": "72,52,20,50", "height": 170 } }, { "type": "Image", "props": { "y": 8, "x": 23, "width": 58, "skin": "ui/exchange-coins.png", "height": 58 } }, { "type": "Image", "props": { "y": 8, "x": 195, "width": 46, "skin": "ui/exchange-feather.png", "height": 60 } }, { "type": "Image", "props": { "y": 19, "x": 120, "width": 48, "skin": "ui/arrow-yellow.png", "height": 38 } }, { "type": "Image", "props": { "y": 69, "x": 109, "width": 34, "skin": "ui/Atlas_0.png", "height": 36 } }, { "type": "Image", "props": { "y": 69, "x": 220, "width": 34, "skin": "ui/Atlas_1.png", "height": 36 } }, { "type": "Image", "props": { "y": 73, "x": 28, "width": 30, "skin": "ui/num_a_6.png", "height": 30 } }, { "type": "Image", "props": { "y": 73, "x": 53, "width": 30, "skin": "ui/num_a_0.png", "height": 30 } }, { "type": "Image", "props": { "y": 73, "x": 79, "width": 30, "skin": "ui/num_a_0.png", "height": 30 } }, { "type": "Image", "props": { "y": 73, "x": 191, "width": 30, "skin": "ui/num_a_1.png", "height": 30 } }, { "type": "Button", "props": { "y": 0, "x": 0, "width": 270, "var": "btn_Wings2Coin", "skin": "ui/btn_touming.png", "height": 170 } }, { "type": "Image", "props": { "y": 109, "x": 64, "skin": "gate/btn-change.png" } }] }, { "type": "Box", "props": { "y": 120, "x": 330 }, "child": [{ "type": "Image", "props": { "width": 270, "var": "bkg2", "skin": "ui/paperwhite2.png", "sizeGrid": "72,52,20,50", "height": 170 } }, { "type": "Image", "props": { "y": 10, "x": 25, "width": 46, "skin": "ui/exchange-feather.png", "height": 60 } }, { "type": "Image", "props": { "y": 10, "x": 171, "width": 58, "skin": "ui/exchange-coins.png", "height": 58 } }, { "type": "Image", "props": { "y": 24, "x": 97, "width": 48, "skin": "ui/arrow-yellow.png", "height": 38 } }, { "type": "Image", "props": { "y": 73, "x": 217, "width": 34, "skin": "ui/Atlas_0.png", "height": 36 } }, { "type": "Image", "props": { "y": 71, "x": 50, "width": 34, "skin": "ui/Atlas_1.png", "height": 36 } }, { "type": "Image", "props": { "y": 76, "x": 133, "width": 30, "skin": "ui/num_a_3.png", "height": 30 } }, { "type": "Image", "props": { "y": 76, "x": 157, "width": 30, "skin": "ui/num_a_0.png", "height": 30 } }, { "type": "Image", "props": { "y": 76, "x": 186, "width": 30, "skin": "ui/num_a_0.png", "height": 30 } }, { "type": "Image", "props": { "y": 74, "x": 19, "width": 30, "skin": "ui/num_a_1.png", "height": 30 } }, { "type": "Button", "props": { "y": 0, "x": 0, "width": 270, "var": "btn_Coin2Wings", "skin": "ui/btn_touming.png", "height": 170 } }, { "type": "Image", "props": { "y": 109, "x": 64, "skin": "gate/btn-change.png" } }] }, { "type": "Image", "props": { "y": 306, "x": 54, "skin": "view/inviteImg.png" } }, { "type": "List", "props": { "y": 477, "x": 35, "width": 590, "var": "m_list", "spaceY": 0, "spaceX": 0, "selectEnable": true, "repeatY": 4, "repeatX": 1, "height": 420 }, "child": [{ "type": "Box", "props": { "y": -4, "x": -3, "width": 581, "renderType": "render", "height": 153 }, "child": [{ "type": "Image", "props": { "y": 5, "x": 20, "width": 556, "skin": "view/rankBg2.png", "name": "name", "height": 140 }, "child": [{ "type": "Image", "props": { "y": 32, "x": 104, "skin": "view/faceMask.png", "name": "yuanquan" } }, { "type": "Image", "props": { "y": 54, "x": 236, "skin": "ui/num_a_1.png", "name": "numImg" } }, { "type": "Image", "props": { "y": 46, "x": 286, "width": 46, "skin": "ui/Atlas_1.png", "height": 58 } }, { "type": "Image", "props": { "y": 44, "x": 378, "var": "InviteBtn", "skin": "view/taskBtn_4.png", "name": "invitebtn" } }, { "type": "Image", "props": { "y": 45, "x": 110, "var": "itembox", "skin": "view/boxclose.png", "name": "Giftbox" } }, { "type": "Label", "props": { "y": 53, "x": 35, "width": 54, "text": "1", "strokeColor": "#A05A26", "stroke": 7, "name": "Number", "height": 43, "fontSize": 40, "color": "#A05A26" } }] }] }] }] }] };
            return inviteViewUI;
        }(Dialog));
        view.inviteViewUI = inviteViewUI;
    })(view = ui.view || (ui.view = {}));
})(ui || (ui = {}));
(function (ui) {
    var view;
    (function (view) {
        var leftBtnsViewUI = /** @class */ (function (_super) {
            __extends(leftBtnsViewUI, _super);
            function leftBtnsViewUI() {
                return _super.call(this) || this;
            }
            leftBtnsViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.view.leftBtnsViewUI.uiView);
            };
            leftBtnsViewUI.uiView = { "type": "View", "props": { "width": 96, "visible": true, "mouseThrough": true, "height": 124 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "sfBtn", "skin": "view/bg_37.png", "mouseThrough": false, "mouseEnabled": true }, "child": [{ "type": "Image", "props": { "y": 10, "x": 70, "skin": "view/point_red.png" } }] }] };
            return leftBtnsViewUI;
        }(View));
        view.leftBtnsViewUI = leftBtnsViewUI;
    })(view = ui.view || (ui.view = {}));
})(ui || (ui = {}));
(function (ui) {
    var view;
    (function (view) {
        var LoginviewUI = /** @class */ (function (_super) {
            __extends(LoginviewUI, _super);
            function LoginviewUI() {
                return _super.call(this) || this;
            }
            LoginviewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.view.LoginviewUI.uiView);
            };
            LoginviewUI.uiView = { "type": "View", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "child": [{ "type": "Image", "props": { "var": "bg", "top": 0, "skin": "gate/splash-screen-ipad.png", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Label", "props": { "y": 1267, "x": 105, "text": "适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。", "fontSize": 20, "color": "#ffffff", "bold": false } }, { "type": "Label", "props": { "y": 868, "x": 131, "text": "抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。", "fontSize": 20, "color": "#ffffff", "bold": false } }] };
            return LoginviewUI;
        }(View));
        view.LoginviewUI = LoginviewUI;
    })(view = ui.view || (ui.view = {}));
})(ui || (ui = {}));
(function (ui) {
    var view;
    (function (view) {
        var ProgressViewUI = /** @class */ (function (_super) {
            __extends(ProgressViewUI, _super);
            function ProgressViewUI() {
                return _super.call(this) || this;
            }
            ProgressViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.view.ProgressViewUI.uiView);
            };
            ProgressViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 120 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 750, "skin": "pngs/progress/progress_bg.png", "height": 120 } }, { "type": "Image", "props": { "width": 640, "skin": "pngs/progress/progress1.png", "height": 40, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 10, "var": "progress", "skin": "pngs/progress/progress2.png", "height": 40 } }] }] };
            return ProgressViewUI;
        }(View));
        view.ProgressViewUI = ProgressViewUI;
    })(view = ui.view || (ui.view = {}));
})(ui || (ui = {}));
(function (ui) {
    var view;
    (function (view) {
        var PromotionViewUI = /** @class */ (function (_super) {
            __extends(PromotionViewUI, _super);
            function PromotionViewUI() {
                return _super.call(this) || this;
            }
            PromotionViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.view.PromotionViewUI.uiView);
            };
            PromotionViewUI.uiView = { "type": "View", "props": { "width": 100, "height": 200 }, "child": [{ "type": "Image", "props": { "y": 30, "x": 0, "width": 100, "skin": "pngs/promotion/bkg1.png", "height": 100 }, "child": [{ "type": "Image", "props": { "width": 72, "skin": "pngs/promotion/chicken.png", "height": 62, "centerY": 10, "centerX": 0 } }, { "type": "Image", "props": { "y": 54, "x": 48, "width": 64, "skin": "pngs/promotion/feather.png", "rotation": 10, "pivotY": 64, "pivotX": 32, "height": 64 }, "compId": 9 }] }, { "type": "Image", "props": { "y": 110, "x": 0, "width": 100, "skin": "pngs/promotion/bkg2.png", "height": 63 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 7, "width": 86, "var": "txt1", "skin": "pngs/promotion/txt1.png", "height": 36, "centerX": 0 } }, { "type": "Label", "props": { "y": 37, "width": 100, "visible": false, "var": "txt0", "text": "1000羽毛", "strokeColor": "#000000", "stroke": 4, "height": 25, "fontSize": 22, "color": "#FFFFFF", "centerX": 0, "align": "center" } }, { "type": "Box", "props": { "y": 37, "width": 100, "visible": false, "var": "box1", "height": 25, "centerX": 0 }, "child": [{ "type": "Image", "props": { "x": 31.5, "width": 15, "var": "first1", "skin": "pngs/promotion/1.png", "height": 23, "centerY": 0 } }, { "type": "Image", "props": { "x": 46.5, "width": 22, "skin": "pngs/promotion/bkg3.png", "height": 27, "centerY": 0 } }] }, { "type": "Box", "props": { "y": 37, "width": 100, "visible": false, "var": "box2", "height": 25, "centerX": 0 }, "child": [{ "type": "Image", "props": { "x": 24, "width": 15, "var": "first2", "skin": "pngs/promotion/1.png", "height": 23, "centerY": 0 } }, { "type": "Image", "props": { "x": 39, "width": 15, "var": "second2", "skin": "pngs/promotion/1.png", "height": 23, "centerY": 0 } }, { "type": "Image", "props": { "x": 54, "width": 22, "skin": "pngs/promotion/bkg3.png", "height": 27, "centerY": 0 } }] }, { "type": "Box", "props": { "y": 37, "width": 100, "visible": false, "var": "box3", "height": 25, "centerX": 0 }, "child": [{ "type": "Image", "props": { "x": 16.5, "width": 15, "var": "first3", "skin": "pngs/promotion/1.png", "height": 23, "centerY": 0 } }, { "type": "Image", "props": { "y": 1, "x": 31.5, "width": 15, "var": "second3", "skin": "pngs/promotion/1.png", "height": 23 } }, { "type": "Image", "props": { "y": 1, "x": 46.5, "width": 15, "var": "third3", "skin": "pngs/promotion/1.png", "height": 23 } }, { "type": "Image", "props": { "x": 61.5, "width": 22, "skin": "pngs/promotion/bkg3.png", "height": 27, "centerY": 0 } }] }, { "type": "Box", "props": { "y": 37, "width": 100, "visible": false, "var": "box4", "height": 25, "centerX": 0 }, "child": [{ "type": "Image", "props": { "x": 13, "width": 15, "var": "first4", "skin": "pngs/promotion/1.png", "height": 23, "centerY": 0 } }, { "type": "Image", "props": { "x": 28, "width": 22, "skin": "pngs/promotion/txt2.png", "height": 21, "centerY": 0 } }, { "type": "Image", "props": { "x": 50, "width": 15, "var": "second4", "skin": "pngs/promotion/1.png", "height": 23, "centerY": 0 } }, { "type": "Image", "props": { "x": 65, "width": 22, "skin": "pngs/promotion/bkg3.png", "height": 27, "centerY": 0 } }] }] }], "animations": [{ "nodes": [{ "target": 9, "keyframes": { "x": [{ "value": 48, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "x", "index": 0 }], "rotation": [{ "value": 10, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "rotation", "index": 0 }, { "value": 20, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "rotation", "index": 4 }, { "value": 10, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "rotation", "index": 8 }, { "value": -5, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "rotation", "index": 12 }, { "value": 10, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "rotation", "index": 16 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }] };
            return PromotionViewUI;
        }(View));
        view.PromotionViewUI = PromotionViewUI;
    })(view = ui.view || (ui.view = {}));
})(ui || (ui = {}));
(function (ui) {
    var view;
    (function (view) {
        var rankViewUI = /** @class */ (function (_super) {
            __extends(rankViewUI, _super);
            function rankViewUI() {
                return _super.call(this) || this;
            }
            rankViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.view.rankViewUI.uiView);
            };
            rankViewUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Sprite", "props": { "y": 0, "x": 0, "var": "ranksprite" } }, { "type": "Image", "props": { "y": 140, "x": 48, "visible": false, "skin": "view/bg_1.png" }, "child": [{ "type": "Image", "props": { "y": 54, "x": 220, "visible": false, "skin": "view/rankTitle.png" } }, { "type": "List", "props": { "y": 128, "x": 48, "width": 556, "visible": false, "spaceY": 12, "repeatY": 4, "repeatX": 1, "height": 614 }, "child": [{ "type": "Image", "props": { "width": 556, "skin": "view/rankBg2.png", "renderType": "render", "height": 140 }, "child": [{ "type": "Image", "props": { "y": 28, "x": 372, "skin": "view/rankInfoBg.png" }, "child": [{ "type": "Label", "props": { "y": 15, "x": 15, "wordWrap": true, "width": 137, "text": "已解锁\\n100个宠物", "height": 62, "fontSize": 28, "color": "#5D3111" } }] }, { "type": "Image", "props": { "y": 32, "x": 38, "skin": "view/faceMask.png" } }, { "type": "Image", "props": { "y": 12, "x": -12, "skin": "view/rankNumber.png" }, "child": [{ "type": "Label", "props": { "y": 0, "x": 0, "width": 68, "valign": "middle", "text": 123, "height": 30, "fontSize": 24, "color": "#FFECC2", "align": "center" } }] }, { "type": "Label", "props": { "y": 60, "x": 132, "width": 160, "valign": "middle", "text": "大苏打", "height": 28, "fontSize": 28, "color": "#5D3111", "align": "left" } }] }] }, { "type": "Image", "props": { "y": 736, "x": 48, "width": 556, "visible": false, "skin": "view/rankBg.png", "renderType": "render", "height": 140 }, "child": [{ "type": "Image", "props": { "y": 32, "x": 38, "skin": "view/faceMask2.png" } }, { "type": "Image", "props": { "y": 28, "x": 372, "skin": "view/rankInfoBg2.png" }, "child": [{ "type": "Label", "props": { "y": 15, "x": 16, "wordWrap": true, "width": 137, "text": "已解锁\\n100个宠物", "height": 62, "fontSize": 28, "color": "#5D3111" } }] }, { "type": "Image", "props": { "y": 12, "x": -12, "skin": "view/rankNumber.png" }, "child": [{ "type": "Label", "props": { "y": 0, "x": 0, "width": 68, "valign": "middle", "text": 123, "height": 30, "fontSize": 24, "color": "#FFECC2", "align": "center" } }] }, { "type": "Label", "props": { "y": 60, "x": 132, "width": 160, "valign": "middle", "text": "大苏打", "height": 28, "fontSize": 28, "color": "#5D3111", "align": "left" } }] }] }, { "type": "Button", "props": { "y": 160, "x": 654, "var": "RankClose", "stateNum": 1, "skin": "ui/btn_close.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 1100, "x": 86, "var": "LastPage", "skin": "view/LastPage.png" } }, { "type": "Image", "props": { "y": 1100, "x": 414, "var": "NextPage", "skin": "view/NestPage.png" } }] }] };
            return rankViewUI;
        }(Dialog));
        view.rankViewUI = rankViewUI;
    })(view = ui.view || (ui.view = {}));
})(ui || (ui = {}));
(function (ui) {
    var view;
    (function (view) {
        var rightBtnsViewUI = /** @class */ (function (_super) {
            __extends(rightBtnsViewUI, _super);
            function rightBtnsViewUI() {
                return _super.call(this) || this;
            }
            rightBtnsViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.view.rightBtnsViewUI.uiView);
            };
            rightBtnsViewUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 100, "height": 120 }, "child": [{ "type": "Image", "props": { "y": 60, "x": 50, "width": 100, "visible": false, "var": "moreGame", "height": 120, "anchorY": 0.5, "anchorX": 0.5 } }] };
            return rightBtnsViewUI;
        }(View));
        view.rightBtnsViewUI = rightBtnsViewUI;
    })(view = ui.view || (ui.view = {}));
})(ui || (ui = {}));
(function (ui) {
    var view;
    (function (view) {
        var taskViewUI = /** @class */ (function (_super) {
            __extends(taskViewUI, _super);
            function taskViewUI() {
                return _super.call(this) || this;
            }
            taskViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.view.taskViewUI.uiView);
            };
            taskViewUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "List", "props": { "y": 288, "x": 82, "width": 588, "visible": false, "spaceY": 24, "spaceX": 0, "repeatY": 4, "repeatX": 1, "height": 656 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 18, "width": 556, "skin": "view/rankBg2.png", "renderType": "render", "height": 140 }, "child": [{ "type": "Image", "props": { "y": 19, "x": 28, "skin": "view/coins.png" }, "child": [{ "type": "Box", "props": { "y": 54, "x": 0, "width": 75, "height": 40 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 40, "skin": "ui/num_a_5.png", "height": 40 } }, { "type": "Image", "props": { "x": 36, "width": 40, "skin": "ui/num_a_0.png", "height": 40 } }] }] }, { "type": "Label", "props": { "y": 54, "x": 142, "width": 226, "text": "媒体任务大师傅", "height": 40, "fontSize": 32, "color": "#9C5C23" } }, { "type": "Image", "props": { "y": 42, "x": 388, "width": 148, "skin": "view/taskBtn_2.png", "height": 60 } }] }] }, { "type": "Image", "props": { "y": 170, "x": 50, "width": 650, "skin": "ui/General-Purpose-Panel-9-patch.png", "sizeGrid": "80,50,80,76", "height": 919 }, "child": [{ "type": "Button", "props": { "y": -9, "x": 550, "var": "btn_close", "stateNum": 1, "skin": "ui/btn_close.png" } }, { "type": "Image", "props": { "y": -12, "x": 152, "skin": "view/titleBg.png" }, "child": [{ "type": "Image", "props": { "y": 26, "x": 80, "skin": "view/taskTitle.png" } }] }, { "type": "Sprite", "props": {}, "child": [{ "type": "Image", "props": { "y": 109, "x": 51, "width": 556, "var": "renwu1", "skin": "view/rankBg2.png", "renderType": "render", "height": 140 }, "child": [{ "type": "Image", "props": { "y": 19, "x": 28, "skin": "view/coins.png" }, "child": [{ "type": "Box", "props": { "y": 54, "x": 0, "width": 75, "height": 40 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 40, "skin": "ui/num_a_5.png", "height": 40 } }, { "type": "Image", "props": { "x": 36, "width": 40, "skin": "ui/num_a_0.png", "height": 40 } }] }] }, { "type": "Label", "props": { "y": 54, "x": 142, "width": 226, "text": "孵化宠物   /2次", "height": 40, "fontSize": 32, "color": "#9C5C23" } }, { "type": "Image", "props": { "y": 42, "x": 388, "width": 148, "var": "TaskProgress1", "skin": "view/taskBtn_2.png", "height": 60 } }, { "type": "Label", "props": { "y": 54, "x": 275, "var": "TaskTimes1", "text": "0", "fontSize": 32, "color": "#9C5C23" } }] }, { "type": "Image", "props": { "y": 265, "x": 49, "width": 556, "var": "renwu2", "skin": "view/rankBg2.png", "renderType": "render", "height": 140 }, "child": [{ "type": "Image", "props": { "y": 19, "x": 28, "skin": "view/coins.png" }, "child": [{ "type": "Box", "props": { "y": 54, "x": 0, "width": 75, "height": 40 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 40, "skin": "ui/num_a_5.png", "height": 40 } }, { "type": "Image", "props": { "x": 36, "width": 40, "skin": "ui/num_a_0.png", "height": 40 } }] }] }, { "type": "Label", "props": { "y": 54, "x": 142, "width": 226, "text": "宠物比赛   /3次", "height": 40, "fontSize": 32, "color": "#9C5C23" } }, { "type": "Image", "props": { "y": 42, "x": 388, "width": 148, "var": "TaskProgress2", "skin": "view/taskBtn_2.png", "height": 60 } }, { "type": "Label", "props": { "y": 54, "x": 275, "var": "TaskTimes2", "text": "0", "fontSize": 32, "color": "#9C5C23" } }] }, { "type": "Image", "props": { "y": 419, "x": 50, "width": 556, "var": "renwu3", "skin": "view/rankBg2.png", "renderType": "render", "height": 140 }, "child": [{ "type": "Image", "props": { "y": 19, "x": 28, "skin": "view/coins.png" }, "child": [{ "type": "Box", "props": { "y": 54, "x": 0, "width": 75, "height": 40 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 40, "skin": "ui/num_a_5.png", "height": 40 } }, { "type": "Image", "props": { "x": 36, "width": 40, "skin": "ui/num_a_0.png", "height": 40 } }] }] }, { "type": "Label", "props": { "y": 54, "x": 142, "width": 226, "text": "升级宠物   /1次", "height": 40, "fontSize": 32, "color": "#9C5C23" } }, { "type": "Image", "props": { "y": 42, "x": 388, "width": 148, "var": "TaskProgress3", "skin": "view/taskBtn_2.png", "height": 60 } }, { "type": "Label", "props": { "y": 54, "x": 275, "var": "TaskTimes3", "text": "0", "fontSize": 32, "color": "#9C5C23" } }] }, { "type": "Image", "props": { "y": 576, "x": 49, "width": 556, "var": "renwu4", "skin": "view/rankBg2.png", "renderType": "render", "height": 140 }, "child": [{ "type": "Image", "props": { "y": 19, "x": 28, "skin": "view/coins.png" }, "child": [{ "type": "Box", "props": { "y": 54, "width": 75, "height": 40 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 49, "width": 40, "skin": "ui/num_a_0.png", "height": 40 } }, { "type": "Image", "props": { "y": 0, "x": -11, "width": 40, "skin": "ui/num_a_1.png", "height": 40 } }, { "type": "Image", "props": { "y": 0, "x": 17, "width": 40, "skin": "ui/num_a_0.png", "height": 40 } }] }] }, { "type": "Label", "props": { "y": 54, "x": 142, "width": 226, "text": "分享到群   /2次", "height": 40, "fontSize": 32, "color": "#9C5C23" } }, { "type": "Image", "props": { "y": 42, "x": 388, "width": 148, "var": "TaskProgress4", "skin": "view/taskBtn_4.png", "height": 60 } }, { "type": "Label", "props": { "y": 54, "x": 275, "var": "TaskTimes4", "text": "0", "fontSize": 32, "color": "#9C5C23" } }] }, { "type": "Image", "props": { "y": 727, "x": 49, "width": 556, "var": "renwu5", "skin": "view/rankBg2.png", "renderType": "render", "height": 140 }, "child": [{ "type": "Image", "props": { "y": 19, "x": 28, "skin": "view/coins.png" }, "child": [{ "type": "Box", "props": { "y": 54, "x": 0, "width": 75, "height": 40 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 49, "width": 40, "skin": "ui/num_a_0.png", "height": 40 } }, { "type": "Image", "props": { "y": 0, "x": -11, "width": 40, "skin": "ui/num_a_1.png", "height": 40 } }, { "type": "Image", "props": { "y": 0, "x": 17, "width": 40, "skin": "ui/num_a_0.png", "height": 40 } }] }] }, { "type": "Label", "props": { "y": 54, "x": 142, "width": 226, "text": "观看视频   /1次", "height": 40, "fontSize": 32, "color": "#9C5C23" } }, { "type": "Image", "props": { "y": 42, "x": 388, "width": 148, "var": "TaskProgress5", "skin": "gate/img_video.png", "height": 60 } }, { "type": "Label", "props": { "y": 54, "x": 275, "var": "TaskTimes5", "text": "0", "fontSize": 32, "color": "#9C5C23" } }] }] }] }] };
            return taskViewUI;
        }(Dialog));
        view.taskViewUI = taskViewUI;
    })(view = ui.view || (ui.view = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map
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
 * 排行榜界面
 */
var module;
(function (module) {
    var RankDialog = /** @class */ (function (_super) {
        __extends(RankDialog, _super);
        function RankDialog() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        RankDialog.prototype.init = function () {
            this.ShowFriendRank();
            this.InitEvents();
        };
        RankDialog.prototype.InitEvents = function () {
            this.RankClose.on(Laya.Event.MOUSE_DOWN, this, this.ClosePage);
            this.LastPage.on(Laya.Event.MOUSE_DOWN, this, this.onChangePage, ["previous"]);
            this.NextPage.on(Laya.Event.MOUSE_DOWN, this, this.onChangePage, ["next"]);
        };
        RankDialog.prototype.ShowFriendRank = function () {
            wx.postMessage({
                type: "rank", show: 1, level: 0, info: Main.app.mwx.mUser, dir: "none"
            });
            var rankTexture = new Laya.Texture(Laya.Browser.window.sharedCanvas);
            rankTexture.bitmap.alwaysChange = true; // 小游戏使用，非常费，每帧刷新
            this.ranksprite.graphics.drawTexture(rankTexture, 0, 0, rankTexture.width, rankTexture.height);
        };
        RankDialog.prototype.onChangePage = function (dir) {
            wx.postMessage({
                type: "rank", show: 1, level: 0, info: Main.app.mwx.mUser, dir: dir
            });
        };
        RankDialog.prototype.ClosePage = function () {
            wx.postMessage({
                type: "rank", show: 0
            });
            this.visible = false;
            this.destroy();
        };
        return RankDialog;
    }(ui.view.rankViewUI));
    module.RankDialog = RankDialog;
})(module || (module = {}));
//# sourceMappingURL=RankDialog.js.map
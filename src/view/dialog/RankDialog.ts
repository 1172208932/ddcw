/**
 * 排行榜界面
 */
module module {
    export class RankDialog extends ui.view.rankViewUI {
        constructor() {
            super();
            this.init();
        }

        private init() {
            

            this.ShowFriendRank();
            this.InitEvents();
        }

        private InitEvents() {
            this.RankClose.on(Laya.Event.MOUSE_DOWN, this, this.ClosePage);
            this.LastPage.on(Laya.Event.MOUSE_DOWN, this, this.onChangePage, ["previous"]);
            this.NextPage.on(Laya.Event.MOUSE_DOWN, this, this.onChangePage, ["next"]);
        }

        private ShowFriendRank() {
            wx.postMessage({
                type:"rank", show:1, level:0, info:Main.app.mwx.mUser, dir:"none"
            });
            var rankTexture = new Laya.Texture(Laya.Browser.window.sharedCanvas);
            rankTexture.bitmap.alwaysChange = true; // 小游戏使用，非常费，每帧刷新
            this.ranksprite.graphics.drawTexture(rankTexture, 0, 0, rankTexture.width, rankTexture.height);
        }
        
        private onChangePage(dir:string):void {
             wx.postMessage({
                 type:"rank", show:1, level:0, info:Main.app.mwx.mUser, dir:dir
            });
        }

        private ClosePage() {
            wx.postMessage({
                type:"rank", show:0
            });
            this.visible = false;
            this.destroy();
        }
    }
}
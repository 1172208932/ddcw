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
// module module {
// 	export class InvitationFriendDialog extends ui.view.inviteViewUI {
// 		constructor() {
// 			super()
// 		}
// 	}
// }
/**
* name
*/
var module;
(function (module) {
    var Point = laya.maths.Point;
    var InvitationFriendDialog = /** @class */ (function (_super) {
        __extends(InvitationFriendDialog, _super);
        function InvitationFriendDialog() {
            var _this = _super.call(this) || this;
            _this.txt_invitaCount = null;
            _this.counts = [0, 1, 3, 5, 10, 20, 40];
            _this.featherNum = 1;
            _this.rewards = [
                { type: 3, count: 1 },
                { type: 3, count: 1 },
                { type: 3, count: 1 },
                { type: 3, count: 1 },
                { type: 3, count: 1 },
                { type: 3, count: 1 },
                { type: 3, count: 1 },
            ];
            _this.m_list.vScrollBarSkin = "";
            _this.m_list.selectEnable = false;
            Main.app.mwx.showBanner();
            Main.app.mwx.NewGetMyShare();
            _this.txt_invitaCount = new module.FontClip("ui/bigf", 400, 195, 200, 45, "left");
            _this.addChild(_this.txt_invitaCount);
            _this.btn_close.on(laya.events.Event.CLICK, _this, _this.onBtnClose);
            _this.btn_Coin2Wings.on(laya.events.Event.CLICK, _this, _this.onBtnToWing);
            _this.btn_Wings2Coin.on(laya.events.Event.CLICK, _this, _this.onBtnToCoin);
            // 邀请好友的数量
            var invitationCount = module.RaceManager.instance.userInfo.invitationCount;
            var invitationRewardCount = module.RaceManager.instance.userInfo.invitationRewardCount;
            if (invitationRewardCount > invitationCount) {
                module.RaceManager.instance.userInfo.invitationRewardCount = module.RaceManager.instance.userInfo.invitationCount;
            }
            var source = [];
            for (var index = 1; index < 51; index++) {
                var obj = 0;
                if (index <= invitationCount) {
                    if (index <= invitationRewardCount) {
                        obj = 1;
                    }
                    else {
                        obj = 2;
                    }
                }
                else {
                    obj = 3;
                }
                source.push(obj);
            }
            _this.m_list.repeatX = 1;
            _this.m_list.repeatY = source.length;
            _this.m_list.renderHandler = Laya.Handler.create(_this, _this.tabRenderHandler, null, false);
            _this.m_list.array = source;
            _this.onChangeCoin();
            _this.onChangeWing();
            module.RaceManager.instance.on(module.RaceManager.CHANGE_COIN, _this, _this.onChangeCoin);
            module.RaceManager.instance.on(module.RaceManager.CHANGE_WING, _this, _this.onChangeWing);
            return _this;
        }
        InvitationFriendDialog.prototype.onChangeCoin = function () {
            if (module.RaceManager.instance.userInfo.coin >= 600) {
                this.bkg1.skin = "ui/paperwhite2.png";
            }
            else {
                this.bkg1.skin = "ui/paperwhite3.png";
            }
        };
        InvitationFriendDialog.prototype.onChangeWing = function () {
            if (module.RaceManager.instance.userInfo.wing >= 1) {
                this.bkg2.skin = "ui/paperwhite2.png";
            }
            else {
                this.bkg2.skin = "ui/paperwhite3.png";
            }
        };
        InvitationFriendDialog.prototype.tabRenderHandler = function (cell, index) {
            this.showDialog(cell, index);
        };
        // 列表类：
        InvitationFriendDialog.prototype.showDialog = function (item, index) {
            var btn = item.getChildByName("name").getChildByName("invitebtn");
            var boxImg = item.getChildByName("name").getChildByName("Giftbox");
            var number = item.getChildByName("name").getChildByName("Number");
            var yuanquan = item.getChildByName("name").getChildByName("yuanquan");
            var numImg = item.getChildByName("name").getChildByName("numImg");
            if ((index + 1) % 3 === 0 && index != 0) {
                numImg.skin = 'ui/num_a_3.png';
                this.featherNum = 3;
            }
            else {
                this.featherNum = 1;
            }
            number.text = (index + 1).toString();
            btn.disabled = true;
            var cell = item.dataSource;
            switch (cell) {
                case 1:
                    {
                        btn.skin = "view/taskBtn_3.png";
                        btn.disabled = true;
                        boxImg.visible = true;
                        boxImg.skin = "view/boxopen.png";
                        yuanquan.visible = false;
                    }
                    break;
                case 2:
                    {
                        btn.disabled = false;
                        btn.skin = "view/taskBtn_5.png";
                        btn.on(laya.events.Event.CLICK, this, this.onBtnget, [item, index, this.featherNum]);
                        boxImg.visible = true;
                        boxImg.skin = "view/boxclose.png";
                        yuanquan.visible = false;
                    }
                    break;
                case 3:
                    {
                        btn.disabled = false;
                        btn.skin = "view/inviteBtn.png";
                        btn.on(laya.events.Event.CLICK, this, this.onShare, [index]);
                        boxImg.visible = false;
                    }
                    break;
                default:
                    break;
            }
        };
        InvitationFriendDialog.prototype.onBtnget = function (item, index, featherNum) {
            if (featherNum === void 0) { featherNum = 1; }
            manager.SoundPlayMgr.instance.playButtonClick();
            // 邀请好友的数量
            var invitationCount = module.RaceManager.instance.userInfo.invitationCount;
            var invitationRewardCount = module.RaceManager.instance.userInfo.invitationRewardCount;
            if (invitationRewardCount < 50) {
                // 埋点统计
                Main.app.mwx.dataLog(dtLogConfig.FeatherInviteFriend, { "type": 1 });
                manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [this.localToGlobal(new laya.maths.Point(0, 0)), 3, featherNum]);
                if (invitationRewardCount > invitationCount) {
                    module.RaceManager.instance.userInfo.invitationRewardCount = module.RaceManager.instance.userInfo.invitationCount;
                }
                module.RaceManager.instance.userInfo.addinvitationRewardCount(1);
                var btn = item.getChildByName("name").getChildByName("invitebtn");
                btn.skin = "view/taskBtn_3.png";
                btn.disabled = true;
                var boxImg = item.getChildByName("name").getChildByName("Giftbox");
                boxImg.skin = "view/boxopen.png";
                this.m_list.array[index] = 1;
            }
        };
        InvitationFriendDialog.prototype.onbtnInvitation = function () {
            module.RaceManager.instance.userInfo.addInvitationCount(1);
        };
        InvitationFriendDialog.prototype.onBtnClose = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            this.destroy();
        };
        /* 金币换羽毛 */
        InvitationFriendDialog.prototype.onBtnToCoin = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            if (module.RaceManager.instance.userInfo.coin >= 600) {
                module.RaceManager.instance.addCoin(-600);
                manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [this.localToGlobal(new Point(270, 195)), 3, 1]);
            }
            else {
                Main.app.showMessage("您的金币不足");
                Main.app.showCoinsLackingView();
            }
        };
        /* 羽毛换金币 */
        InvitationFriendDialog.prototype.onBtnToWing = function () {
            manager.SoundPlayMgr.instance.playButtonClick();
            if (module.RaceManager.instance.userInfo.wing >= 1) {
                module.RaceManager.instance.addWing(-1);
                manager.EventManager.instance.event(module.RaceView.FLY_MONEY, [this.localToGlobal(new Point(525, 195)), 2, 300]);
            }
            else {
                Main.app.showMessage("您的羽毛不足");
                Main.app.showFeatherLackingView();
            }
        };
        /* 分享 邀请好友 */
        InvitationFriendDialog.prototype.onShare = function (taskid) {
            if (Main.app.shareIndex > 0) {
                return;
            }
            Main.app.shareIndex = 11;
            Main.app.shareTimestamp = new Date().getTime();
            var title, imageUrl, shjson;
            Main.app.mwx.shareurl.forEach(function (item) {
                if (item.id == Main.app.shareIndex) {
                    shjson = item;
                    title = item.title;
                    imageUrl = item.url;
                }
            });
            wx.shareAppMessage({
                title: title,
                imageUrl: imageUrl,
                query: "uid=" + Main.app.mwx.mUID + "&Invite=GetWing" + "&taskid=10" + taskid + ("&surl=" + Main.app.shareIndex)
            });
        };
        InvitationFriendDialog.prototype.destroy = function () {
            Main.app.mwx.closeBanner();
            module.RaceManager.instance.off(module.RaceManager.CHANGE_COIN, this, this.onChangeCoin);
            module.RaceManager.instance.off(module.RaceManager.CHANGE_WING, this, this.onChangeWing);
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        return InvitationFriendDialog;
    }(ui.view.inviteViewUI));
    module.InvitationFriendDialog = InvitationFriendDialog;
})(module || (module = {}));
//# sourceMappingURL=InvitationFriendDialog.js.map
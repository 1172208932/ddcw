/**
 * 埋点统计 keyname
 */
var dtLogConfig = /** @class */ (function () {
    function dtLogConfig() {
    }
    dtLogConfig.EnterGame = "DDCW_EnterGame"; // 进入游戏 load参数 0表示开始进入游戏 1表示自愿加载完成正式进入游戏
    dtLogConfig.FlyBoxClick = "DDCW_FlyBoxClick"; // 首页悬浮的宝箱 type参数 0表示点击 大于0表示领取成功
    dtLogConfig.MeatPatClick = "DDCW_MeatPatClick"; // 首页点击喂宠物按钮的次数统计
    dtLogConfig.GetFoodsFree = "DDCW_GetFoodsFree"; // 喂食中食物不足点击领取食物 type参数 0表示点击 >0表示领取成功
    dtLogConfig.GetNewEggShare = "DDCW_GetNewEggShare"; // 获得新蛋之后的分享 success参数 0表示点击分享 1表示分享成功
    dtLogConfig.OpenEggFree = "DDCW_OpenEggFree"; // 免费开蛋 type参数 0表示点击 1表示开蛋成功
    dtLogConfig.FeatherInviteFriend = "DDCW_FeatherInviteFriend"; // 邀请好友获得羽毛 type参数 0表示邀请 1表示邀请成功
    dtLogConfig.OpenSBXiaoLv = "DDCW_OpenSBXiaoLv"; // 双倍效率的点击 type参数 0表示点击 >0表示成功
    dtLogConfig.GetDailyReward = "DDCW_GetDailyReward"; // 每日奖励 type参数 0表示点击 >0表示成功
    dtLogConfig.RaceClick = "DDCW_RaceClick"; // 点击比赛按钮 success参数 0点击 1是开始比赛
    dtLogConfig.RaceResultShare = "DDCW_RaceResultShare"; // 比赛结束页面的分享 success参数 0表示点击分享 1表示分享成功
    dtLogConfig.DailyTaskShare = "DDCW_DailyTaskShare"; // 每日任务中的分享 success参数 0表示点击 1表示成功
    dtLogConfig.FeatherLacking = "DDCW_FeatherLacking"; // 羽毛不足的领取 type参数 0表示点击 >0表示成功
    dtLogConfig.CoinsLacking = "DDCW_CoinsLacking"; // 金币不足的领取 type参数 0表示点击 >0表示成功
    dtLogConfig.DaoLiuIcon = "DDCW_DaoLiuIcon"; // 点击倒流icon 0表示点击 具体游戏的名字表示跳转成功
    dtLogConfig.ChouTiIcon = "DDCW_ChouTiIcon"; // 抽屉icon 0表示点击 具体游戏的名字表示跳转成功
    dtLogConfig.LuckyReward = "DDCW_LuckyReward"; // 领取幸运弹窗奖励 type参数 0表示点击 >0表示成功
    return dtLogConfig;
}());
//# sourceMappingURL=dtLogConfig.js.map
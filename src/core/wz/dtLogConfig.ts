/**
 * 埋点统计 keyname
 */
class dtLogConfig {
    public static EnterGame:string = "DDCW_EnterGame";                      // 进入游戏 load参数 0表示开始进入游戏 1表示自愿加载完成正式进入游戏
    public static FlyBoxClick:string = "DDCW_FlyBoxClick";                  // 首页悬浮的宝箱 type参数 0表示点击 大于0表示领取成功
    public static MeatPatClick = "DDCW_MeatPatClick";                       // 首页点击喂宠物按钮的次数统计
    public static GetFoodsFree = "DDCW_GetFoodsFree";                       // 喂食中食物不足点击领取食物 type参数 0表示点击 >0表示领取成功
    public static GetNewEggShare = "DDCW_GetNewEggShare";                   // 获得新蛋之后的分享 success参数 0表示点击分享 1表示分享成功
    public static OpenEggFree = "DDCW_OpenEggFree";                         // 免费开蛋 type参数 0表示点击 1表示开蛋成功
    public static FeatherInviteFriend = "DDCW_FeatherInviteFriend";         // 邀请好友获得羽毛 type参数 0表示邀请 1表示邀请成功
    public static OpenSBXiaoLv = "DDCW_OpenSBXiaoLv";                       // 双倍效率的点击 type参数 0表示点击 >0表示成功
    public static GetDailyReward = "DDCW_GetDailyReward";                   // 每日奖励 type参数 0表示点击 >0表示成功
    public static RaceClick = "DDCW_RaceClick";                             // 点击比赛按钮 success参数 0点击 1是开始比赛
    public static RaceResultShare = "DDCW_RaceResultShare";                 // 比赛结束页面的分享 success参数 0表示点击分享 1表示分享成功
    public static DailyTaskShare = "DDCW_DailyTaskShare";                   // 每日任务中的分享 success参数 0表示点击 1表示成功
    public static FeatherLacking = "DDCW_FeatherLacking";                   // 羽毛不足的领取 type参数 0表示点击 >0表示成功
    public static CoinsLacking = "DDCW_CoinsLacking";                       // 金币不足的领取 type参数 0表示点击 >0表示成功
    public static DaoLiuIcon = "DDCW_DaoLiuIcon";                           // 点击倒流icon 0表示点击 具体游戏的名字表示跳转成功
    public static ChouTiIcon = "DDCW_ChouTiIcon";                           // 抽屉icon 0表示点击 具体游戏的名字表示跳转成功
    public static LuckyReward = "DDCW_LuckyReward";                         // 领取幸运弹窗奖励 type参数 0表示点击 >0表示成功

    constructor() {

    }
}
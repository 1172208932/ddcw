/**
 * 游戏盒子
 */
class gameBox {
    constructor() {}

    /**
     * 所有广告入口都需要换（摇摆广告和抽屉广告需要根据审核版本开关关闭和打开）
     * @param appid 对应游戏的appid，没有可以传空字符串
     * @param groupList 已经获取到的游戏列表 lauch 中返回的 games_box 列表
     * @param gname 游戏名称 如： 神鲲
     */
    static showBoxPage(appid:string, groupList:any[], gname:string, zroder = 1001):void {
        if (!gameBox.showBefore()) return;
        // 显示盒子页面
        MoreGame.ShowList(groupList, gname, WriteBoxList.mWriteBox, appid, new Laya.Handler(this, gameBox.CloseBox), zroder, new Laya.Handler(this , gameBox.JumpInfo));
        return;
    }

    /* 显示游戏盒子之前 */ 
    private static showBefore(): boolean {
        return true;
    }

    /* 关闭游戏盒子 */ 
    private static CloseBox(): void {
        
    }

    /**
     * 调用跳转情况
     * @param type 0 跳转失败（执行失败）， 1 跳转成功  2 用户放弃  3 打开二维码图片
     * @param id groupList 中id
     * @param firstbox 是否首先跳转神手盒子的appid，然后通过神手盒子中转跳转游戏的appid
     * @param openboxjump 是否是打开游戏中的盒子页面后的跳转，true - 打开 ， false 不打开gameBox，直接跳转
     */
    private static JumpInfo(type:number, id:number, firstbox:boolean, openboxjump:boolean):void {
        console.log("跳转结果：", type, id, firstbox, openboxjump);
        var gamename = Main.app.getGameName(id);
        if (Main.app.TiaoZhuanIndex == 1) {
            // 埋点统计 抽屉icon
            Main.app.mwx.dataLog(dtLogConfig.ChouTiIcon, {"success":gamename});
        } else if (Main.app.TiaoZhuanIndex == 2) {
            // 埋点统计 导流icon
            Main.app.mwx.dataLog(dtLogConfig.DaoLiuIcon, {"success":gamename});
        } else {
            // 没有该类型
        }
    }
}
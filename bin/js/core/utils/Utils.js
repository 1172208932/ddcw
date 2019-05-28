/**
* name
*/
var core;
(function (core) {
    var Point = laya.maths.Point;
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        /**三次贝塞尔曲线
        cp 在此是四个元素的数组:
        cp[0] 为起点
        cp[1] 为第一控制点
        cp[2] 为第二控制点
        cp[3] 为结束点
        t 为参数值，0 <= t <= 1
        out tPos 为 t 所在的位置*/
        Utils.PointOnCubicBezier3 = function (cp, t) {
            var tPos = new Point();
            var ax, bx, cx;
            var ay, by, cy;
            var tSquared, tCubed;
            //计算多项式系数 
            cx = 3.0 * (cp[1].x - cp[0].x);
            bx = 3.0 * (cp[2].x - cp[1].x) - cx;
            ax = cp[3].x - cp[0].x - cx - bx;
            cy = 3.0 * (cp[1].y - cp[0].y);
            by = 3.0 * (cp[2].y - cp[1].y) - cy;
            ay = cp[3].y - cp[0].y - cy - by;
            //计算t位置的点值 
            tSquared = t * t;
            tCubed = tSquared * t;
            tPos.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
            tPos.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
            return tPos;
        };
        /**二次贝塞尔曲线
        cp 在此是三个元素的数组:
        cp[0] 为起点
        cp[1] 为第一控制点
        cp[2] 为结束点
        t 为参数值，0 <= t <= 1
        out tPos 为 t 所在的位置*/
        Utils.PointOnCubicBezier2 = function (cp, t) {
            var tPos = new Point();
            tPos.x = Math.pow((1 - t), 2) * cp[0].x + 2 * t * (1 - t) * cp[1].x + Math.pow(t, 2) * cp[2].x;
            tPos.y = Math.pow((1 - t), 2) * cp[0].y + 2 * t * (1 - t) * cp[1].y + Math.pow(t, 2) * cp[2].y;
            return tPos;
        };
        /**一次贝塞尔曲线
        cp 在此是三个元素的数组:
        cp[0] 为起点
        cp[1] 为结束点
        t 为参数值，0 <= t <= 1
        out tPos 为 t 所在的位置*/
        Utils.PointOnCubicBezier1 = function (cp, t) {
            var tPos = new Point();
            tPos.x = (1 - t) * cp[0].x + t * cp[1].x;
            tPos.y = (1 - t) * cp[0].y + t * cp[1].y;
            return tPos;
        };
        /**一次贝塞尔曲线
        cp0 为起点
        cp1 为结束点
        t 为参数值，0 <= t <= 1
        out tPos 为 t 所在的位置*/
        Utils.PointOnCubicBezier1_2 = function (cp0, cp1, t) {
            var tPos = new Point();
            tPos.x = (1 - t) * cp0.x + t * cp1.x;
            tPos.y = (1 - t) * cp0.y + t * cp1.y;
            return tPos;
        };
        /**获取一个发光滤镜 */
        Utils.getGlowFilter = function (color, blur, offx, offy) {
            if (color === void 0) { color = "#ffff00"; }
            if (blur === void 0) { blur = 20; }
            if (offx === void 0) { offx = 0; }
            if (offy === void 0) { offy = 0; }
            //创建一个发光滤镜
            return new Laya.GlowFilter(color, blur, offx, offy);
        };
        /**获取一个灰度滤镜 */
        Utils.getGrayscaleMat = function () {
            //由 20 个项目（排列成 4 x 5 矩阵）组成的数组，灰图
            var grayscaleMat = [0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0, 0, 0, 1, 0];
            //创建一个颜色滤镜对象，灰图
            return new Laya.ColorFilter(grayscaleMat);
        };
        /**获取一个高亮滤镜 */
        Utils.getHighlightFilter = function (blur) {
            //由 20 个项目（排列成 4 x 5 矩阵）组成的数组，高亮
            var redMat = [1, 0, 0, 0, blur, 0, 1, 0, 0, blur, 0, 0, 1, 0, blur, 0, 0, 0, 1, 0];
            //创建一个颜色滤镜对象,高亮
            return new Laya.ColorFilter(redMat);
        };
        /**获取一个模糊滤镜 */
        Utils.getBlurFilter = function (strength) {
            return new Laya.BlurFilter(strength);
        };
        /**获取 二次贝塞尔曲线 第一个控制点 */
        Utils.getBezier2TP = function (spos, ePos, length, sc) {
            if (length === void 0) { length = 200; }
            if (sc === void 0) { sc = 0.5; }
            var tp = Utils.PointOnCubicBezier1([spos, ePos], sc);
            var atan2 = Math.atan2((ePos.y - spos.y), (ePos.x - spos.x));
            var sin = Math.sin(Math.PI / 2 + atan2);
            var cos = Math.cos(Math.PI / 2 + atan2);
            return new Point(tp.x - length * cos, tp.y - length * sin);
        };
        /**epos-spos长度为length， 此线段为 顺时针 旋转 rotate度 */
        Utils.getPointByRotate = function (spos, rotate, length) {
            if (length === void 0) { length = 100; }
            var epos = new Point();
            epos.x = spos.x + Math.cos(rotate / 180 * Math.PI - Math.PI / 2) * length;
            epos.y = spos.y + Math.sin(rotate / 180 * Math.PI - Math.PI / 2) * length;
            return epos;
        };
        /**获取等级颜色值 */
        Utils.getColorByLv = function (lv) {
            if (lv - 1 < Utils.colors.length) {
                return Utils.colors[lv - 1];
            }
            else {
                return Utils.colors[Utils.colors.length - 1];
            }
        };
        /**2.20  2.00  2.01 */
        Utils.Format2 = function (n) {
            if (n == 0)
                return "0.00";
            n = Math.floor(n * 100);
            var s = n.toString();
            return s.substr(0, s.length - 2) + "." + s.substr(s.length - 2, 2);
        };
        Utils.colors = ["#EEE9E9", "#83D4A0", "#83D4D3", "#E526CE", "#F2A34E", "#FF5B5B"];
        return Utils;
    }());
    core.Utils = Utils;
})(core || (core = {}));
//# sourceMappingURL=Utils.js.map
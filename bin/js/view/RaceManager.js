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
* name
*/
var module;
(function (module) {
    var Dictionary = laya.utils.Dictionary;
    var Point = laya.maths.Point;
    var RaceManager = /** @class */ (function (_super) {
        __extends(RaceManager, _super);
        /**分享获得大量金币的次数 */
        // public ShareGetCountGold :number = 0; 
        function RaceManager() {
            var _this = _super.call(this) || this;
            _this.soltMoneys = [0, 0, Main.app.mwx.ofItemCost, Main.app.mwx.ofItemCost, Main.app.mwx.ofItemCost, Main.app.mwx.ofItemCost, Main.app.mwx.ofItemCost];
            _this.PLANT_CONFIG = [
                { id: 1, chichens: "1,16,37,8,4,49,55,5,47,56,62,77,76,72,73,44,63,59,66,79", money: 0 },
                // { id: 1, chichens: "1,16,37,8,4,49,55,5,47,56,62,77,76,72,73,44,63", money: 0 },
                { id: 2, chichens: "1,17,9,46,36,24,23,82,81,80,70,64,78,57,88,96,101,87,89,48", money: 12 },
                { id: 3, chichens: "1,34,11,39,29,7,50,84,83,71,91,95,92,93,94,105,100,99,98,97", money: 30 },
                { id: 4, chichens: "1,103,52,33,20,45,12,114,75,86,102,90,112,104,110,109,108,106,107,111", money: 40 },
                { id: 5, chichens: "1,35,60,28,54,85,41,40,113,74,69,115,118,120,119,121,117,116,122,124", money: 50 },
                { id: 6, chichens: "1,51,2,21,38,10,68,136,135,134,133,132,131,130,129,128,127,126,125,123", money: 50 },
                { id: 7, chichens: "137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156", money: 50 },
                { id: 8, chichens: "157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176", money: 50 },
            ];
            _this.SPECIFIC_CONFIG = [59, 66, 79]; // 自己加的
            /**喂一次需要的food数量 */
            _this.MEALS = [0, 1, 2, 3, 4, 6, 8, 10, 12, 14];
            /**鸡的名字 */
            _this.chichenNames = [];
            /**动物的配置 */
            _this.chichenConfigDic = new Dictionary();
            /**自动加金币和经验的时间间隔 */
            _this.addCoinExpMaxTime = 10;
            /**离线时间多长时间得到一次奖励 */
            _this.offLineStep = 60 * 1000;
            /**离线时间中一次可以获得的金币数量 */
            _this.offLineCoin = 2;
            /**当前显示的场地ID */
            _this.selectPlantId = 1;
            /**显示秘密花园 */
            _this.selectCarden = 0;
            /**玩家数据 */
            _this.userInfo = null;
            /**喂食是，鸡的位置 */
            _this.mealPoss = [];
            _this.guidRun = 0;
            _this.prevGateId = 1;
            _this.isShowTip = false;
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            _this.mapSize = "decal1,512,242|decal2,128,83|decal4,64,48|decal3,63,43|3grass,46,42|1grass,18,35|2grass,37,34|top,256,249|bottom03070,254,249|decal-106030,512,216|decal-3,64,36|decal-8,64,41|decal-541277,64,42|decal-11,64,17|decal-6,64,18|decal-441795,51,31|top02610,256,254|bottomleft,256,138|bottomright,230,150|decal-106970,512,288|decal-206940,256,193|decal-341638,128,127|decal-4,64,57|decal-641055,64,43|decal-541152,61,30|top08000,193,256|bottom-left,256,198|bottom-right,248,256|decal-107810,512,321|decal-541137,512,401|decal-241873,102,68|decal-441129,64,52|top02130,223,256|bottom11800,256,238|decal_1,512,334|decal-5,64,61|decal-441001,64,41|decal-341366,47,64|decal-640903,46,34|top06020,225,256|bottom,256,199|top41175,247,256|decal-141646,512,414|decal-2,100,33|decal-341255,62,155|decal-7,43,64|decal-641758,43,42|decal-841895,61,61|decal-541812,55,31|decal-9,63,64|bottom40796,256,247|top41589,256,251|decal-B141345,300,205|decal-240864,255,222|decal-541693,123,93|decal-441452,106,93|bottom-a,358,256|top41446,246,256|decal-141265,350,285|decal-341206,55,31|decal-441189,37,22|decal-541880,23,19|bottom2,239,256";
            _this.decalConfig = [
                [
                    { ca: 0, U: "bckg03630", P: "0" },
                    { ca: 0, U: "decal1", P: "1,1,1.5,1.5", y: 185, CX: 0 },
                    { U: "decal2", P: "1,1,1,1", y: 1000, CX: 0 },
                    { U: "decal4", P: "1,1,1,1", y: 510, CX: -120 },
                    { U: "decal4", P: "1,1,1,1", y: 756, CX: -80 },
                    { U: "decal4", P: "1,1,1,1", y: 895, CX: 200 },
                    { U: "decal3", P: "1,1,1,1", y: 560, CX: 180 },
                    { U: "decal3", P: "1,1,1,1", y: 850, CX: -250 },
                    { U: "decal3", P: "1,1,1,1", y: 850, CX: -250 },
                    { U: "3grass", P: "1,1,1,1", y: 520, CX: 60 },
                    { U: "3grass", P: "1,1,1,1", y: 592, CX: 399 },
                    { U: "3grass", P: "1,1,1,1", y: 692, CX: -28 },
                    { U: "3grass", P: "1,1,1,1", y: 597, CX: -337 },
                    { U: "3grass", P: "1,1,1,1", y: 809, CX: 130 },
                    { U: "3grass", P: "1,1,1,1", y: 830, CX: 147 },
                    { U: "3grass", P: "1,1,1,1", y: 720, CX: 277 },
                    { U: "3grass", P: "1,1,1,1", y: 975, CX: -159 },
                    { U: "3grass", P: "1,1,1,1", y: 722, CX: -432 },
                    { U: "3grass", P: "1,1,1,1", y: 863, CX: -430 },
                    { U: "3grass", P: "1,1,1,1", y: 843, CX: 470 },
                    { U: "1grass", P: "1,1,1,1", y: 599, CX: -46 },
                    { U: "1grass", P: "1,1,1,1", y: 724, CX: -129 },
                    { U: "1grass", P: "1,1,1,1", y: 763, CX: -419 },
                    { U: "1grass", P: "1,1,1,1", y: 967, CX: -238 },
                    { U: "1grass", P: "1,1,1,1", y: 1010, CX: -45 },
                    { U: "1grass", P: "1,1,1,1", y: 904, CX: 147 },
                    { U: "1grass", P: "1,1,1,1", y: 742, CX: 453 },
                    { U: "1grass", P: "1,1,1,1", y: 908, CX: 356 },
                    { U: "2grass", P: "1,1,1,1", y: 536, CX: 228 },
                    { U: "2grass", P: "1,1,1,1", y: 675, CX: 146 },
                    { U: "2grass", P: "1,1,1,1", y: 708, CX: -344 },
                    { U: "2grass", P: "1,1,1,1", y: 904, CX: 4 },
                    { U: "2grass", P: "1,1,1,1", y: 783, CX: 391 },
                    { U: "ani/flowerAni.ani", P: "2,2,0.8,0.8", y: 608, CX: 1 },
                    { U: "ani/flowerAni.ani", P: "2,2,0.8,0.8", y: 660, CX: -93 },
                    { U: "ani/flowerAni.ani", P: "2,2,0.8,0.8", y: 726, CX: -230 },
                    { U: "ani/flowerAni.ani", P: "2,2,0.8,0.8", y: 816, CX: -492 },
                    { U: "ani/flowerAni.ani", P: "2,2,0.8,0.8", y: 939, CX: -332 },
                    { U: "ani/flowerAni.ani", P: "2,2,0.8,0.8", y: 905, CX: -120 },
                    { U: "ani/flowerAni.ani", P: "2,2,0.8,0.8", y: 987, CX: 97 },
                    { U: "ani/flowerAni.ani", P: "2,2,0.8,0.8", y: 972, CX: 276 },
                    { U: "ani/flowerAni.ani", P: "2,2,0.8,0.8", y: 742, CX: 399 },
                    { U: "ani/flowerAni.ani", P: "2,2,0.8,0.8", y: 962, CX: 433 },
                    { ca: 0, U: "top", P: "1,3,-1.5,1.5", L: -10, T: -10 },
                    { ca: 0, U: "top", P: "1,3,1.5,1.5", R: -10, T: -10 },
                    { ca: 0, U: "bottom03070", P: "1,3,-1.5,1.5", L: -10, B: -10 },
                    { ca: 0, U: "bottom03070", P: "1,3,1.5,1.5", R: -10, B: -10 },
                ],
                [
                    { ca: 0, U: "bckg05380", P: "0" },
                    { ca: 0, U: "decal-106030", P: "1,1,1.8,1.8", y: 197, CX: 0 },
                    { U: "decal-3", P: "1,1,1,1", y: 638, CX: 328 },
                    { U: "decal-3", P: "1,1,1,1", y: 682, CX: 126 },
                    { U: "decal-3", P: "1,1,1,1", y: 1014, CX: -238 },
                    { U: "decal-8", P: "1,1,1,1", y: 706, CX: 277 },
                    { U: "decal-8", P: "1,1,1,1", y: 1072, CX: 16 },
                    { U: "decal-8", P: "1,1,1,1", y: 1117, CX: -32 },
                    { U: "decal-8", P: "1,1,1,1", y: 811, CX: -340 },
                    { U: "decal-8", P: "1,1,0.5,0.5", y: 736, CX: -170 },
                    { U: "decal-8", P: "1,1,0.5,0.5", y: 639, CX: -12 },
                    { U: "decal-8", P: "1,1,0.5,0.5", y: 945, CX: 234 },
                    { U: "decal-541277", P: "1,1,1,1", y: 596, CX: 245 },
                    { U: "decal-541277", P: "1,1,1,1", y: 1071, CX: -169 },
                    { U: "decal-11", P: "1,1,1,1", y: 658, CX: 220 },
                    { U: "decal-11", P: "1,1,1,1", y: 1030, CX: -132 },
                    { U: "decal-6", P: "1,1,1,1", y: 661, CX: -169 },
                    { U: "decal-6", P: "1,1,1,1", y: 911, CX: -132 },
                    { U: "decal-6", P: "1,1,-1,1", y: 849, CX: -228 },
                    { U: "decal-6", P: "1,1,-1,1", y: 618, CX: -294 },
                    { U: "decal-6", P: "1,1,-1,1", y: 1066, CX: -49 },
                    { U: "decal-441795", P: "1,1,1,1", y: 603, CX: -179 },
                    { U: "decal-441795", P: "1,1,1,1", y: 807, CX: -54 },
                    { U: "decal-441795", P: "1,1,1,1", y: 1009, CX: 199 },
                    { U: "ani/decalAni2.ani", P: "2,2,1,1", y: 600, CX: -3 },
                    { U: "ani/decalAni2.ani", P: "2,2,1,1", y: 753, CX: -265 },
                    { U: "ani/decalAni2.ani", P: "2,2,1,1", y: 870, CX: 279 },
                    { U: "ani/decalAni2.ani", P: "2,2,1,1", y: 956, CX: -18 },
                    { U: "ani/decalAni2.ani", P: "2,2,1,1", y: 1177, CX: 36 },
                    { U: "ani/decalAni2.ani", P: "2,2,0.6,0.6", y: 1134, CX: 92 },
                    { ca: 0, U: "top02610", P: "1,3,-2,2", L: -130, T: -10 },
                    { ca: 0, U: "top02610", P: "1,3,2,2", R: -130, T: -10 },
                    { ca: 0, U: "bottomleft", P: "1,3,2,2", L: -160, B: -10 },
                    { ca: 0, U: "bottomright", P: "1,3,2,2", R: -105, B: -10 },
                ],
                [
                    { ca: 0, U: "bckg09760", P: "0" },
                    { ca: 0, U: "decal-106970", P: "1,1,1.3,1.3", y: 140, CX: 0 },
                    { U: "decal-206940", P: "1,1,1,1", y: 720, CX: 0 },
                    { U: "decal-341638", P: "1,1,1,1", y: 742, CX: 245 },
                    { U: "decal-341638", P: "1,1,1,1", y: 948, CX: 73 },
                    { U: "decal-341638", P: "1,1,-1,1", y: 842, CX: -258 },
                    { U: "decal-4", P: "1,1,1,1", y: 560, CX: -269 },
                    { U: "decal-4", P: "1,1,1,1", y: 558, CX: 94 },
                    { U: "decal-4", P: "1,1,1,1", y: 584, CX: 355 },
                    { U: "decal-4", P: "1,1,-1,1", y: 652, CX: 190 },
                    { U: "decal-4", P: "1,1,-1,1", y: 873, CX: 155 },
                    { U: "decal-4", P: "1,1,-1,1", y: 1071, CX: -102 },
                    { U: "decal-4", P: "1,1,-1,1", y: 719, CX: -327 },
                    { U: "decal-641055", P: "1,1,-1,1", y: 645, CX: 10 },
                    { U: "decal-641055", P: "1,1,-1,1", y: 543, CX: 229 },
                    { U: "decal-641055", P: "1,1,-1,1", y: 918, CX: -90 },
                    { U: "decal-641055", P: "1,1,-1,1", y: 698, CX: -207 },
                    { U: "decal-641055", P: "1,1,-1,1", y: 1131, CX: 43 },
                    { U: "decal-541152", P: "1,1,1,1", y: 690, CX: 300 },
                    { U: "decal-541152", P: "1,1,1,1", y: 615, CX: -110 },
                    { ca: 0, U: "top08000", P: "1,3,-2,2", L: -95, T: -10 },
                    { ca: 0, U: "top08000", P: "1,3,2,2", R: -95, T: -10 },
                    { ca: 0, U: "bottom-left", P: "1,3,1.5,1.5", L: -130, B: -10 },
                    { ca: 0, U: "bottom-right", P: "1,3,1.5,1.5", R: -110, B: -10 },
                ],
                [
                    { ca: 0, U: "bckg", P: "0" },
                    { ca: 0, U: "decal-107810", P: "1,1,1.3,1.3", y: 56, CX: 0 },
                    { ca: 0, U: "decal-541137", P: "1,1,1.3,1.3", y: 456, CX: 0 },
                    { U: "decal-241873", P: "1,1,0.6,0.6", y: 468, CX: -66 },
                    { U: "decal-241873", P: "1,1,0.6,0.6", y: 568, CX: 350 },
                    { U: "decal-241873", P: "1,1,0.6,0.6", y: 878, CX: 330 },
                    { U: "decal-241873", P: "1,1,0.6,0.6", y: 1078, CX: 51 },
                    { U: "decal-241873", P: "1,1,0.6,0.6", y: 999, CX: -46 },
                    { U: "decal-241873", P: "1,1,0.6,0.6", y: 903, CX: -331 },
                    { U: "decal-241873", P: "1,1,0.6,0.6", y: 454, CX: -341 },
                    { U: "decal-441129", P: "1,1,0.8,0.8", y: 556, CX: 38 },
                    { U: "decal-441129", P: "1,1,0.8,0.8", y: 590, CX: 303 },
                    { U: "decal-441129", P: "1,1,-0.8,0.8", y: 970, CX: 264 },
                    { U: "decal-441129", P: "1,1,-0.8,0.8", y: 982, CX: -145 },
                    { U: "decal-441129", P: "1,1,-0.8,0.8", y: 811, CX: -60 },
                    { U: "decal-441129", P: "1,1,-0.8,0.8", y: 958, CX: -296 },
                    { U: "decal-441129", P: "1,1,-0.8,0.8", y: 586, CX: -322 },
                    { ca: 0, U: "top02130", P: "1,3,-1.5,1.5", L: -100, T: 25 },
                    { ca: 0, U: "top02130", P: "1,3,1.5,1.5", R: -100, T: 25 },
                    { ca: 0, U: "bottom11800", P: "1,3,-1.5,1.5", L: -110, B: -10 },
                    { ca: 0, U: "bottom11800", P: "1,3,1.5,1.5", R: -110, B: -10 },
                ],
                [
                    { ca: 0, U: "bckg11080", P: "0" },
                    { ca: 0, U: "decal_1", P: "1,1,1.2,1.2", y: 105, CX: 0 },
                    { U: "decal-5", P: "1,1,0.6,0.6", y: 557, CX: 123 },
                    { U: "decal-5", P: "1,1,0.6,0.6", y: 663, CX: 257 },
                    { U: "decal-5", P: "1,1,0.6,0.6", y: 874, CX: 229 },
                    { U: "decal-5", P: "1,1,0.6,0.6", y: 739, CX: 61 },
                    { U: "decal-5", P: "1,1,0.6,0.6", y: 662, CX: -167 },
                    { U: "decal-5", P: "1,1,0.6,0.6", y: 886, CX: -283 },
                    { U: "decal-5", P: "1,1,0.6,0.6", y: 1026, CX: -70 },
                    { U: "decal-441001", P: "1,1,0.6,0.6", y: 598, CX: 10 },
                    { U: "decal-441001", P: "1,1,0.6,0.6", y: 551, CX: 331 },
                    { U: "decal-441001", P: "1,1,0.6,0.6", y: 737, CX: 284 },
                    { U: "decal-441001", P: "1,1,0.6,0.6", y: 950, CX: 302 },
                    { U: "decal-441001", P: "1,1,0.6,0.6", y: 853, CX: -42 },
                    { U: "decal-441001", P: "1,1,0.6,0.6", y: 1115, CX: -40 },
                    { U: "decal-441001", P: "1,1,0.6,0.6", y: 598, CX: -282 },
                    { U: "decal-341366", P: "1,1,0.5,0.5", y: 583, CX: -129 },
                    { U: "decal-341366", P: "1,1,0.5,0.5", y: 746, CX: -290 },
                    { U: "decal-341366", P: "1,1,0.5,0.5", y: 798, CX: -142 },
                    { U: "decal-341366", P: "1,1,0.5,0.5", y: 1028, CX: 42 },
                    { U: "decal-341366", P: "1,1,0.5,0.5", y: 937, CX: 141 },
                    { U: "decal-341366", P: "1,1,0.5,0.5", y: 820, CX: 290 },
                    { U: "decal-341366", P: "1,1,0.5,0.5", y: 723, CX: 175 },
                    { U: "decal-640903", P: "1,1,0.5,0.5", y: 542, CX: -262 },
                    { U: "decal-640903", P: "1,1,0.5,0.5", y: 532, CX: -198 },
                    { U: "decal-640903", P: "1,1,0.5,0.5", y: 680, CX: -243 },
                    { U: "decal-640903", P: "1,1,0.5,0.5", y: 886, CX: -140 },
                    { U: "decal-640903", P: "1,1,0.5,0.5", y: 923, CX: -24 },
                    { U: "decal-640903", P: "1,1,0.5,0.5", y: 972, CX: 87 },
                    { U: "decal-640903", P: "1,1,0.5,0.5", y: 816, CX: 202 },
                    { U: "decal-640903", P: "1,1,0.5,0.5", y: 702, CX: 90 },
                    { U: "decal-640903", P: "1,1,0.5,0.5", y: 557, CX: 233 },
                    { U: "ani/yanJingAni.ani", P: "2,2,0.7,0.7", y: 634, CX: -186 },
                    { U: "ani/yanJingAni.ani", P: "2,2,0.7,0.7", y: 756, CX: -55 },
                    { U: "ani/yanJingAni.ani", P: "2,2,0.7,0.7", y: 886, CX: 91 },
                    { U: "ani/yanJingAni.ani", P: "2,2,0.7,0.7", y: 994, CX: -147 },
                    { ca: 0, U: "top06020", P: "1,3,-2,2", L: -130, T: -10 },
                    { ca: 0, U: "top06020", P: "1,3,2,2", R: -130, T: -10 },
                    { ca: 0, U: "bottom", P: "1,3,-2,2", L: -200, B: -10 },
                    { ca: 0, U: "bottom", P: "1,3,2,2", R: -200, B: -10 },
                ],
                [
                    { ca: 0, U: "bckg41058", P: "0" },
                    { ca: 0, U: "top41175", P: "1,1,-2,2", CX: 240, T: -10 },
                    { ca: 0, U: "top41175", P: "1,1,2,2", CX: 240, T: -10 },
                    { ca: 0, U: "decal-141646", P: "1,1,1,1", y: 55, CX: 0 },
                    { U: "decal-2", P: "1,1,-1,1", y: 558, CX: 204 },
                    { U: "decal-2", P: "1,1,1,1", y: 819, CX: -202 },
                    { U: "decal-341255", P: "1,1,1.5,1.5", y: 1005, CX: 0 },
                    { U: "decal-7", P: "1,1,0.8,0.8", y: 454, CX: -180 },
                    { U: "decal-7", P: "1,1,0.8,0.8", y: 455, CX: 280 },
                    { U: "decal-7", P: "1,1,0.8,0.8", y: 759, CX: 230 },
                    { U: "decal-7", P: "1,1,0.8,0.8", y: 840, CX: -48 },
                    { U: "decal-7", P: "1,1,0.8,0.8", y: 904, CX: -290 },
                    { U: "decal-7", P: "1,1,0.8,0.8", y: 997, CX: 218 },
                    { U: "decal-641758", P: "1,1,0.8,0.8", y: 583, CX: 8 },
                    { U: "decal-641758", P: "1,1,0.8,0.8", y: 660, CX: -223 },
                    { U: "decal-641758", P: "1,1,0.8,0.8", y: 909, CX: -125 },
                    { U: "decal-641758", P: "1,1,0.8,0.8", y: 1036, CX: -100 },
                    { U: "decal-641758", P: "1,1,0.8,0.8", y: 765, CX: 54 },
                    { U: "decal-641758", P: "1,1,0.8,0.8", y: 660, CX: 225 },
                    { U: "decal-641758", P: "1,1,0.8,0.8", y: 904, CX: 109 },
                    { U: "decal-841895", P: "1,1,0.6,0.6", y: 567, CX: 200 },
                    { U: "decal-841895", P: "1,1,0.6,0.6", y: 972, CX: -160 },
                    { U: "decal-541812", P: "1,1,0.7,0.7", y: 706, CX: 55 },
                    { U: "decal-541812", P: "1,1,0.7,0.7", y: 501, CX: -305 },
                    { U: "decal-541812", P: "1,1,0.7,0.7", y: 595, CX: 320 },
                    { U: "decal-9", P: "1,1,0.8,0.8", y: 474, CX: 190 },
                    { U: "decal-9", P: "1,1,0.8,0.8", y: 579, CX: -142 },
                    { U: "decal-9", P: "1,1,0.8,0.8", y: 868, CX: 238 },
                    { U: "decal-9", P: "1,1,0.8,0.8", y: 1022, CX: -197 },
                    { ca: 0, U: "bottom40796", P: "1,3,-1.5,1.5", L: -100, B: -10 },
                    { ca: 0, U: "bottom40796", P: "1,3,1.5,1.5", R: -100, B: -10 },
                ],
                [
                    { ca: 0, U: "bckgee", P: "0" },
                    { ca: 0, U: "top41589", P: "1,1,-1.7,1.7", L: -95, T: -20 },
                    { ca: 0, U: "top41589", P: "1,1,1.7,1.7", R: -95, T: -20 },
                    { ca: 0, U: "decal-B141345", P: "1,1,1.3,1.3", y: 125, CX: 0 },
                    { ca: 0, U: "decal-240864", P: "1,1,2.3,2.3", y: 535, CX: 0 },
                    { U: "decal-541693", P: "1,1,1,1", y: 409, CX: -212 },
                    { U: "decal-541693", P: "1,1,1,1", y: 575, CX: -350 },
                    { U: "decal-541693", P: "1,1,1,1", y: 593, CX: 369 },
                    { U: "decal-541693", P: "1,1,-1,1", y: 419, CX: 400 },
                    { U: "decal-541693", P: "1,1,-1,1", y: 800, CX: 480 },
                    { U: "decal-541693", P: "1,1,-1,1", y: 1064, CX: 205 },
                    { U: "decal-441452", P: "1,1,1,1", y: 408, CX: -60 },
                    { U: "decal-441452", P: "1,1,1,1", y: 800, CX: -360 },
                    { U: "decal-441452", P: "1,1,1,1", y: 1050, CX: -167 },
                    { U: "decal-441452", P: "1,1,1,1", y: 404, CX: 93 },
                    { U: "decal-441452", P: "1,1,-1,1", y: 880, CX: -340 },
                    { U: "decal-441452", P: "1,1,-1,1", y: 922, CX: 447 },
                    { ca: 0, U: "bottom-a", P: "1,3,-1,1", L: -70, B: 40 },
                    { ca: 0, U: "bottom-a", P: "1,3,1,1", R: -70, B: 40 },
                ],
                [
                    { ca: 0, U: "bckg41600", P: "0" },
                    { ca: 0, U: "top41446", P: "1,1,-1.5,1.5", L: -10, T: -10 },
                    { ca: 0, U: "top41446", P: "1,1,1.5,1.5", R: -10, T: -10 },
                    { ca: 0, U: "decal-141265", P: "1,1,1,1", y: 110, CX: 0 },
                    { U: "decal-341206", P: "1,1,1,1", y: 500, CX: 290 },
                    { U: "decal-341206", P: "1,1,1,1", y: 612, CX: 9 },
                    { U: "decal-341206", P: "1,1,1,1", y: 899, CX: 210 },
                    { U: "decal-341206", P: "1,1,1,1", y: 968, CX: -58 },
                    { U: "decal-341206", P: "1,1,1,1", y: 1112, CX: 6 },
                    { U: "decal-341206", P: "1,1,-1,1", y: 460, CX: -180 },
                    { U: "decal-341206", P: "1,1,-1,1", y: 726, CX: -198 },
                    { U: "decal-341206", P: "1,1,-1,1", y: 776, CX: 160 },
                    { U: "decal-441189", P: "1,1,1,1", y: 458, CX: 57 },
                    { U: "decal-441189", P: "1,1,-1,1", y: 619, CX: -310 },
                    { U: "decal-441189", P: "1,1,1,1", y: 588, CX: -197 },
                    { U: "decal-441189", P: "1,1,-1,1", y: 580, CX: 125 },
                    { U: "decal-441189", P: "1,1,1,1", y: 644, CX: 279 },
                    { U: "decal-441189", P: "1,1,-1,1", y: 705, CX: -34 },
                    { U: "decal-441189", P: "1,1,1,1", y: 845, CX: -39 },
                    { U: "decal-441189", P: "1,1,-1,1", y: 815, CX: 320 },
                    { U: "decal-441189", P: "1,1,1,1", y: 900, CX: -205 },
                    { U: "decal-441189", P: "1,1,-1,1", y: 890, CX: -300 },
                    { U: "decal-441189", P: "1,1,1,1", y: 1053, CX: -145 },
                    { U: "decal-441189", P: "1,1,-1,1", y: 1041, CX: 167 },
                    { U: "decal-541880", P: "1,1,1,1", y: 460, CX: -297 },
                    { U: "decal-541880", P: "1,1,-1,1", y: 453, CX: -50 },
                    { U: "decal-541880", P: "1,1,1,1", y: 400, CX: 120 },
                    { U: "decal-541880", P: "1,1,-1,1", y: 479, CX: 202 },
                    { U: "decal-541880", P: "1,1,1,1", y: 556, CX: -85 },
                    { U: "decal-541880", P: "1,1,-1,1", y: 749, CX: -300 },
                    { U: "decal-541880", P: "1,1,1,1", y: 740, CX: 64 },
                    { U: "decal-541880", P: "1,1,-1,1", y: 674, CX: 185 },
                    { U: "decal-541880", P: "1,1,1,1", y: 873, CX: -140 },
                    { U: "decal-541880", P: "1,1,-1,1", y: 923, CX: 87 },
                    { U: "decal-541880", P: "1,1,1,1", y: 995, CX: 62 },
                    { U: "decal-541880", P: "1,1,-1,1", y: 1140, CX: -75 },
                    { ca: 0, U: "bottom2", P: "1,3,-1,1", L: -20, B: 100 },
                    { ca: 0, U: "bottom2", P: "1,3,1,1", R: -20, B: 100 },
                ]
            ];
            _this.mapImgDic = new Dictionary();
            return _this;
            // var info = wx.getSystemInfoSync();
            // if (Number(info['screenHeight']) > 667) {
            // 	this.eatApple.y = (GameMain.app.mScreenHeight - 667) / 2;
            // 	this.eatApple.y = (GameMain.app.mScreenHeight - 667) / 2;
            // }
        }
        RaceManager.prototype.setup = function () {
            this.initMapSize();
            this.initDecalConfig();
            this.chichenNames = module.ChichenConfig.NAMES.split(",");
            var configs = module.ChichenConfig.CWHS;
            for (var i = 0; i < 176; i++) {
                var info = new module.ChichenConfig();
                info.configId = i + 1;
                info.initWHS(configs.slice(i * 12, i * 12 + 12));
                this.chichenConfigDic.set(info.configId, info);
            }
            this.userInfo = new module.UserInfo();
            for (var i = 0; i < this.PLANT_CONFIG.length; i++) {
                var plantInfo = new module.PlantInfo(this.PLANT_CONFIG[i].id);
                plantInfo.money = this.PLANT_CONFIG[i].money;
                plantInfo.chichenIds = this.PLANT_CONFIG[i].chichens;
                plantInfo.rect = new laya.maths.Rectangle(50, 550, Laya.stage.width - 100, Laya.stage.height - 550 - 250);
                this.userInfo.plantInfoDic.set(plantInfo.plantId, plantInfo);
                if (this.PLANT_CONFIG[i].id == 1) {
                    var cardenInfo = new module.PlantInfo(this.PLANT_CONFIG[i].id + 100);
                    cardenInfo.money = 0;
                    cardenInfo.chichenIds = this.PLANT_CONFIG[i].chichens;
                    cardenInfo.rect = new laya.maths.Rectangle(50, 550, Laya.stage.width - 100, Laya.stage.height - 550 - 250);
                    this.userInfo.plantInfoDic.set(cardenInfo.plantId, cardenInfo);
                }
            }
            var b = Laya.stage.height - 390;
            this.mealPoss.push(new Point(Laya.stage.width / 2 - 200, b - 400));
            this.mealPoss.push(new Point(Laya.stage.width / 2, b - 400));
            this.mealPoss.push(new Point(Laya.stage.width / 2 + 200, b - 400));
            this.mealPoss.push(new Point(Laya.stage.width / 2 - 300, b - 200));
            this.mealPoss.push(new Point(Laya.stage.width / 2 - 100, b - 200));
            this.mealPoss.push(new Point(Laya.stage.width / 2 + 100, b - 200));
            this.mealPoss.push(new Point(Laya.stage.width / 2 + 300, b - 200));
            this.mealPoss.push(new Point(Laya.stage.width / 2 - 200, b));
            this.mealPoss.push(new Point(Laya.stage.width / 2, b));
            this.mealPoss.push(new Point(Laya.stage.width / 2 + 200, b));
        };
        /**解析用户数据 */
        RaceManager.prototype.decalUserData = function (data) {
            this.userInfo.decodeUserData(data);
            Laya.timer.loop(30 * 1000, this, this.saveOffLineTime);
        };
        RaceManager.prototype.getLocalStorage = function () {
            this.userInfo.getLocalStorage();
            Laya.timer.loop(30 * 1000, this, this.saveOffLineTime);
        };
        RaceManager.prototype.saveOffLineTime = function () {
            this.userInfo.saveOffLineTime();
        };
        /**进入场地 */
        RaceManager.prototype.gotoGate = function (id) {
            if (this.selectPlantId != id) {
                if (this.userInfo.openGateIds.indexOf(this.selectPlantId) >= 0) {
                    this.prevGateId = this.selectPlantId;
                }
                this.selectPlantId = id;
                var plantInfo = this.getPlantInfo();
                this.event(RaceManager.GOTO_PLANT);
                manager.EventManager.instance.event(module.BottomView.UNLOCK);
            }
        };
        /**场地是否开启 */
        RaceManager.prototype.isOpenGate = function (id) {
            return this.userInfo.openGateIds.indexOf(id) >= 0;
        };
        /*免费开启场地*/
        RaceManager.prototype.unLockPlantFree = function (id) {
            this.userInfo.openGateIds.push(id);
            var plantInfo = this.getPlantInfoById(id);
            if (plantInfo != null) {
                var chichenInfo = plantInfo.createChichenByEgg(this.getChichenConfigId(plantInfo.plantId));
                this.addChichenToPlant(chichenInfo);
            }
        };
        /**开启场地 */
        RaceManager.prototype.unLockPlant = function (id) {
            this.userInfo.openGateIds.push(id);
            var plantInfo = this.getPlantInfoById(id);
            if (plantInfo != null) {
                var chichenInfo = plantInfo.createChichenByEgg(this.getChichenConfigId(plantInfo.plantId));
                this.addChichenToPlant(chichenInfo);
                this.addWing(plantInfo.money * -1);
            }
        };
        /**获取当前场地数据 */
        RaceManager.prototype.getPlantInfo = function () {
            return this.userInfo.plantInfoDic.get(this.selectPlantId);
        };
        RaceManager.prototype.getAllPetNum = function () {
            var count = 0;
            for (var i = 0; i < this.userInfo.plantInfoDic.values.length; i++) {
                var plantInfo = this.userInfo.plantInfoDic.values[i];
                count += plantInfo.getChichenCount();
            }
            return count;
        };
        /* 获取场地数据 */
        RaceManager.prototype.getPlantInfoById = function (plantId) {
            return this.userInfo.plantInfoDic.get(plantId);
        };
        /**获取当前场地中动物可以出现的一个位置 */
        RaceManager.prototype.getNextPos = function () {
            return new Point(this.getPlantInfo().getX(), this.getPlantInfo().getY());
        };
        /**创建一个动物到当前场地中 */
        RaceManager.prototype.createChichen = function (configId) {
            var info = new module.ChichenInfo(this.chichenConfigDic.get(configId), this.selectPlantId);
            return info;
        };
        /**加场地经验 */
        RaceManager.prototype.addExp = function (score, data) {
            var info = this.getPlantInfoById(data[0]);
            if (info != null && info.isNewEgg == false) {
                info.addExp(score);
                this.addCardenExp(info.plantId, score);
                if (info.isAddEgg()) { //可以产蛋了
                    var slotIndex = this.userInfo.findNullSlot();
                    if (slotIndex == 0) { //没空格子
                        var dialog = new module.NoSlotNewEggDialog(info.plantId);
                        manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0.6);
                    }
                    else {
                        manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_New_egg");
                        var dialog2 = new module.GlmmeNewEggDialog(info.plantId);
                        manager.LayerManager.instace.addToLayer(dialog2, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0.6);
                    }
                    if (this.userInfo.guidStep == 3) {
                        this.event(RaceManager.CLOSE_GUID_TIP3);
                    }
                }
                this.event(RaceManager.CHANGE_PLANT_EXP, [info.plantId, info.exp]);
                this.userInfo.addLocalUserInfo();
            }
        };
        /**随时间增加的金币 */
        RaceManager.prototype.addExpByTime = function (score, data) {
            var info = this.getPlantInfoById(data[0]);
            if (info != null && info.isNewEgg == false) {
                if (info.exp + score < info.maxExp) {
                    info.addExp(score);
                    this.addCardenExp(info.plantId, score);
                    this.event(RaceManager.CHANGE_PLANT_EXP, [info.plantId, info.exp]);
                }
            }
        };
        RaceManager.prototype.addCardenExp = function (plantId, score) {
            plantId = plantId > 100 ? plantId - 100 : plantId + 100;
            var info = this.getPlantInfoById(plantId);
            if (info != null) {
                info.addExp(score);
            }
        };
        /**加金币 */
        RaceManager.prototype.addCoin = function (value) {
            this.userInfo.changeCoin(value);
            this.event(RaceManager.CHANGE_COIN);
        };
        /**加羽毛 */
        RaceManager.prototype.addWing = function (value) {
            this.userInfo.changeWing(value);
            this.event(RaceManager.CHANGE_WING);
        };
        /**加食物 */
        RaceManager.prototype.changeFood = function (value) {
            this.userInfo.changeApple(value);
            this.event(RaceManager.CHANGE_FOOD);
        };
        /**充值经验 */
        RaceManager.prototype.resetPlantExp = function (plantId) {
            var info = this.getPlantInfoById(plantId);
            if (info != null) {
                info.resetExp();
                this.reseCardenExp(info.plantId);
                this.event(RaceManager.CHANGE_PLANT_EXP, [info.plantId, info.exp]);
                this.userInfo.addLocalUserInfo();
            }
        };
        RaceManager.prototype.reseCardenExp = function (plantId) {
            plantId = plantId > 100 ? plantId - 100 : plantId + 100;
            var info = this.getPlantInfoById(plantId);
            if (info != null) {
                info.resetExp();
            }
        };
        /**为这个场地添加一个蛋 */
        RaceManager.prototype.addEgg = function (plantId) {
            var eggInfo = this.userInfo.addEgg(plantId);
            this.event(RaceManager.ADD_EGG);
            if (this.userInfo.guidStep == 3) {
                this.gotoGuidStep(4);
            }
        };
        /**开蛋 */
        RaceManager.prototype.openEgg = function (eggInfo) {
            this.userInfo.removeEgg(eggInfo);
            this.event(RaceManager.ADD_EGG); // 更新蛋的显示
            var plantInfo = this.getPlantInfoById(eggInfo.plantId);
            if (plantInfo != null) {
                var chichenInfo = plantInfo.createChichenByEgg(this.getChichenConfigId(plantInfo.plantId));
                manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_New_Chichen");
                var dialog = new module.OpenChichenDialog(chichenInfo);
                manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
                if (this.userInfo.guidStep == 4) {
                    this.gotoGuidStep(5);
                    this.event(RaceManager.CLOSE_GUID_TIP4);
                }
                this.userInfo.addTaskCount(1);
            }
        };
        /**为场地创建一个鸡 */
        RaceManager.prototype.getChichenConfigId = function (plantId) {
            plantId = plantId > 100 ? plantId - 100 : plantId;
            var list = [];
            var plantInfo = this.getPlantInfoById(plantId);
            console.log("*****> ", plantInfo);
            var cardenInfo = this.userInfo.openGateIds.indexOf(plantId + 100) >= 0 ? this.getPlantInfoById(plantId + 100) : null;
            for (var i = 0; i < plantInfo.chichenIdList.length; i++) {
                var isNo = true;
                for (var j = 0; j < plantInfo.chichenInfoList.length; j++) {
                    if (plantInfo.chichenInfoList[j].configId == plantInfo.chichenIdList[i]) {
                        isNo = false;
                        break;
                    }
                    if (plantInfo.chichenIdList[i] == 49 || plantInfo.chichenIdList[i] == 47 || plantInfo.chichenIdList[i] == 77) { // zxx 开不出的宠物
                        isNo = false;
                        break;
                    }
                }
                for (var j = 0; cardenInfo != null && j < cardenInfo.chichenInfoList.length; j++) {
                    if (cardenInfo.chichenInfoList[j].configId == cardenInfo.chichenIdList[i]) {
                        isNo = false;
                        break;
                    }
                }
                if (isNo) {
                    list.push(plantInfo.chichenIdList[i]);
                }
            }
            if (list.length == 0) {
                return plantInfo.chichenIdList[Math.floor(Math.random() * plantInfo.chichenIdList.length)];
            }
            else {
                return list[Math.floor(Math.random() * list.length)];
            }
        };
        /*获取指定鸡的info*/
        RaceManager.prototype.getFirstChichenInfo = function (id) {
            var plantInfo = this.getPlantInfoById(1);
            var chichenInfo = plantInfo.createChichenByEgg(id);
            manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_New_Chichen");
            var dialog = new module.OpenChichenDialog(chichenInfo);
            manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
        };
        /**将一个动物加到场地中 */
        RaceManager.prototype.addChichenToPlant = function (chichenInfo) {
            var plantInfo = this.getPlantInfoById(chichenInfo.plantId);
            if (plantInfo != null) {
                var haveChichenIds = this.getHaveChichenIds(plantInfo.plantId);
                if (haveChichenIds.indexOf(chichenInfo.configId) < 0) {
                    this.showNewChichenInAtlas(plantInfo.plantId, chichenInfo.configId);
                    haveChichenIds.push(chichenInfo.configId);
                }
                plantInfo.addChichen(chichenInfo);
                this.event(RaceManager.ADD_CHICHEN_TO_PLANT, [chichenInfo]);
                this.event(RaceManager.CHICHEN_COUNT_CHANGE);
                this.userInfo.addLocalUserInfo();
                if (plantInfo.plantId == 1 && plantInfo.getChichenCount() >= 3 && this.userInfo.guid_run == 0) {
                    this.guidRun = 1;
                    this.event(RaceManager.CHANGE_GUID_RUN);
                }
                if (plantInfo.plantId == this.selectPlantId && plantInfo.getChichenCount() >= 10) {
                    this.event(RaceManager.SHOW_SELECTPLANT_GUID);
                }
            }
            manager.EventManager.instance.event(module.BottomView.UNLOCK);
            manager.EventManager.instance.event(module.ToolView.PET_NUM);
        };
        /**获取场地已拥有ConfigID数组 */
        RaceManager.prototype.getHaveChichenIds = function (plantId) {
            if (plantId < 100) {
                return this.getPlantInfoById(plantId).haveChichenIds;
            }
            else {
                return this.getPlantInfoById(plantId - 100).haveChichenIds;
            }
        };
        /**显示获取新鸡的展示 */
        RaceManager.prototype.showNewChichenInAtlas = function (plantId, configId) {
            plantId = plantId > 100 ? plantId - 100 : plantId;
            var dialog = new module.PlantAtlasDialog(plantId, configId);
            manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
        };
        /**使用羽毛直接开一个蛋到场地中 */
        RaceManager.prototype.fastOpenNewEgg = function (plantId) {
            var plantInfo = this.getPlantInfoById(plantId);
            if (plantInfo != null) {
                var chichenInfo = plantInfo.createChichenByEgg(this.getChichenConfigId(plantInfo.plantId));
                manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_New_Chichen");
                var dialog = new module.OpenChichenDialog(chichenInfo);
                manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
                this.userInfo.changeWing(-1);
                this.event(RaceManager.CHANGE_WING);
                this.userInfo.addTaskCount(1);
            }
        };
        /**在场地中添加一个金币 */
        RaceManager.prototype.addCoinInPlant = function (plantId, pos) {
            var info = this.getPlantInfoById(plantId);
            if (info != null) {
                var coin = info.addCoin(pos);
                this.event(RaceManager.ADD_COIN_IN_PLANT, [coin]);
                this.userInfo.addLocalUserInfo();
            }
        };
        /**移除场地中的一个金币 */
        RaceManager.prototype.removeCoinFromPlant = function (coinInfo) {
            var info = this.getPlantInfoById(coinInfo.plantId);
            if (info != null) {
                info.removeCoin(coinInfo);
                this.event(RaceManager.REMOVE_COIN_FROM_PLANT, [coinInfo]);
                this.userInfo.addLocalUserInfo();
            }
        };
        /**买掉一次鸡 */
        RaceManager.prototype.sellChichen = function (chichenInfo) {
            var info = this.getPlantInfoById(chichenInfo.plantId);
            if (info != null) {
                info.removeChichen(chichenInfo);
                this.flyCoin(chichenInfo.money);
                this.event(RaceManager.REMOVE_CHICHEN_FROM_PLANT, [chichenInfo]);
                this.event(RaceManager.CHICHEN_COUNT_CHANGE);
                this.userInfo.addLocalUserInfo();
            }
        };
        /**直接卖出一个新蛋 */
        RaceManager.prototype.sellNewEgg = function () {
            this.flyCoin(10);
        };
        /**飞金币 */
        RaceManager.prototype.flyCoin = function (score) {
            var list = [];
            var one = Math.floor(score / 20);
            var b = score % 20;
            for (var i = 0; i < 20 && i < score; i++) {
                if (i < b) {
                    list.push(one + 1);
                }
                else {
                    list.push(one);
                }
            }
            for (var i = 0; i < list.length; i++) {
                var pos = new Point(200 + Math.floor(Math.random() * 300), Laya.stage.height + 20);
                manager.EventManager.instance.event(module.RaceView.FLY_WATER, [pos, 2, list[i], [list[i]]]);
            }
        };
        /**给鸡喂食物 */
        RaceManager.prototype.wealFood = function (chichenInfo) {
            if (chichenInfo.star == 3 && chichenInfo.level == 10) {
            }
            else {
                var count = this.MEALS[chichenInfo.level];
                if (count <= this.userInfo.apple) { //食物数量足够
                    if (chichenInfo.star < 3 && chichenInfo.level == 9 && chichenInfo.mealExp >= 9) {
                        var dialog = new module.ConfirmDialog(3, null, Laya.Handler.create(this, this.onUpdateChichen, [chichenInfo, count]));
                        manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
                    }
                    else {
                        this.onUpdateChichen(chichenInfo, count);
                    }
                }
                else {
                    Main.app.showMessage("您的食物不足，请点击下方购买食物。");
                }
            }
        };
        /**升级鸡 */
        RaceManager.prototype.onUpdateChichen = function (chichenInfo, count) {
            chichenInfo.mealExp += 1;
            if (chichenInfo.mealExp >= 10) {
                chichenInfo.mealExp = 0;
                chichenInfo.level += 1; //升级
                if (chichenInfo.level >= 10) {
                    if (chichenInfo.star < 3) {
                        chichenInfo.star += 1;
                        chichenInfo.level = 1;
                    }
                    else {
                        chichenInfo.level = 10;
                        chichenInfo.mealExp = 10;
                    }
                }
            }
            this.event(RaceManager.UPGRADE_CHICHEN, [chichenInfo]);
            this.userInfo.changeApple(count * -1);
            this.event(RaceManager.CHANGE_FOOD);
            this.userInfo.addTaskCount(3);
        };
        /**进入新手引导步数 */
        RaceManager.prototype.gotoGuidStep = function (step) {
            this.userInfo.guidStep = step;
            if (step == 2) {
                var plantInfo = this.getPlantInfo();
                if (plantInfo != null) {
                    // 设置初始羽毛
                    if (Main.app.is_wx) {
                        this.userInfo.wing = Number(Main.app.mwx.ofStartFeaStartNumther['start']);
                        this.userInfo.coin = Main.app.mwx.startCoins;
                    }
                    // else {
                    // this.userInfo.wing = LoginInfoUserData[Main.app.account]['win']
                    // this.userInfo.coin = LoginInfoUserData[Main.app.account]['coin']
                    // }
                    this.userInfo.addLocalUserInfo();
                    this.event(RaceManager.CHANGE_WING);
                    this.event(RaceManager.CHANGE_COIN);
                    var chichenInfo = this.createChichen(1);
                    chichenInfo.level = 10; // zxx
                    chichenInfo.mealExp = 10;
                    chichenInfo.star = 3;
                    this.event(RaceManager.UPGRADE_CHICHEN, [chichenInfo]);
                    chichenInfo.plantId = this.selectPlantId;
                    var haveChichenIds = this.getHaveChichenIds(plantInfo.plantId);
                    if (haveChichenIds.indexOf(chichenInfo.configId) < 0) {
                        haveChichenIds.push(chichenInfo.configId);
                    }
                    plantInfo.addChichen(chichenInfo);
                    chichenInfo.xx = Laya.stage.width / 2;
                    chichenInfo.yy = plantInfo.rect.y + 50;
                    this.event(RaceManager.ADD_CHICHEN_TO_PLANT, [chichenInfo]);
                    this.event(RaceManager.CHICHEN_COUNT_CHANGE);
                }
            }
            this.event(RaceManager.CHANGE_GUID_STEP);
            this.userInfo.addLocalUserInfo();
        };
        /* 打开商店 */
        RaceManager.prototype.showShop = function () {
            manager.SoundPlayMgr.instance.playGSound("Chichens_SFXv3_Enter_shop");
            // if (wxCore.uo.mPhone["platform"] == "ios") {
            // 	// 苹果客户端打开邀请好友界面
            // 	var dialogipx: InvitationFriendDialog = new InvitationFriendDialog();
            // 	manager.LayerManager.instace.addToLayer(dialogipx, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
            // } else {
            // 安卓客户端打开商店界面
            var dialog = new module.ShopDialog();
            manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
            // }
            // var dialogipx:InvitationFriendDialog = new InvitationFriendDialog();
            // manager.LayerManager.instace.addToLayer(dialogipx, manager.LayerManager.STAGE_DIALOG_LAYER, true, true, false, 0);
        };
        /**开启一个鸡蛋槽 */
        RaceManager.prototype.unlockEggSlot = function (index, money) {
            this.userInfo.openEggSlot(index);
            this.event(RaceManager.ADD_EGG); //更新蛋的显示
            this.addWing(money * -1);
        };
        /**观看视频后 */
        RaceManager.prototype.lookVideoComplete = function (coins) {
            if (coins > 0) {
                this.addCoinToPlant(this.selectPlantId, coins, 2);
            }
        };
        /**先场地中加count个金币 */
        RaceManager.prototype.addCoinToPlant = function (plantId, count, score) {
            var info = this.getPlantInfoById(plantId);
            if (info != null) {
                for (var i = 0; i < count; i++) {
                    var coin = info.addCoin(new Point(info.getX(), info.getY()));
                    coin.score = score;
                    this.event(RaceManager.ADD_COIN_IN_PLANT, [coin]);
                }
                this.userInfo.addLocalUserInfo();
            }
        };
        /**改名 */
        RaceManager.prototype.changeName = function (chichenInfo, name) {
            chichenInfo.name = name;
            this.event(RaceManager.UPGRADE_CHICHEN, [chichenInfo]);
            this.userInfo.addLocalUserInfo();
        };
        /**建造秘密花园 */
        RaceManager.prototype.buildCarden = function (plantId, chichenInfo) {
            var plantInfo = this.userInfo.buildCarden(plantId, chichenInfo);
            this.isShowTip = true;
            this.gotoGate(plantInfo.plantId);
            this.event(RaceManager.BULID_CARDEN_COMPLETE);
            this.addWing(-20);
        };
        /**是否开启了密码花园 */
        RaceManager.prototype.isHaveCarden = function (plantId) {
            plantId = plantId < 100 ? plantId + 100 : plantId;
            return this.userInfo.openGateIds.indexOf(plantId) >= 0;
        };
        RaceManager.prototype.changeHatForChichen = function (chichenInfo, hatId) {
            chichenInfo.hatId = hatId;
            RaceManager.instance.userInfo.addLocalUserInfo();
            this.event(RaceManager.CHANGE_CHICHEN_HAT, [chichenInfo]);
        };
        //离线效益
        RaceManager.prototype.getOffLineCoin = function () {
            if (this.userInfo.offLineTime > 0) {
                //获得一个整数分钟数
                var nd = Math.round((new Date().getTime() - this.userInfo.offLineTime) / 60000), time = nd > Main.app.mwx.nOffLineTimes * 60 ? Main.app.mwx.nOffLineTimes * 60 : nd;
                console.log(nd);
                // return time * 2
                return time * Main.app.mwx.nOffLineCoins;
            }
            else {
                return 0;
            }
        };
        RaceManager.prototype.openJiaShu = function () {
            this.userInfo.jiaShuTime = new Date().getTime();
            this.userInfo.addLocalUserInfo();
            this.event(RaceManager.CHANGE_JIASHU);
        };
        RaceManager.prototype.getHatx = function (chichenID, hatID, index) {
            var arr = module.ChichenConfig.HAT[chichenID - 1];
            var i = (hatID - 1) * 14 + (index - 1) * 2;
            return arr[i];
        };
        RaceManager.prototype.getHaty = function (chichenID, hatID, index) {
            var arr = module.ChichenConfig.HAT[chichenID - 1];
            var i = (hatID - 1) * 14 + (index - 1) * 2 + 1;
            return arr[i];
        };
        RaceManager.prototype.setGuidRunComplete = function () {
            this.guidRun = 0;
            this.userInfo.guid_run = 1;
            this.userInfo.addLocalUserInfo();
            this.changeFood(100);
            this.event(RaceManager.CHANGE_GUID_APPLE);
        };
        RaceManager.prototype.initDecalConfig = function () {
            for (var i = 0; i < this.decalConfig.length; i++) {
                var list = this.decalConfig[i];
                var maxY = 0;
                var minY = 10000;
                for (var j = 0; j < list.length; j++) {
                    if (list[j].ca == undefined || list[j].ca == 1) {
                        if (list[j].y > maxY) {
                            maxY = list[j].y;
                        }
                        if (list[j].y < minY) {
                            minY = list[j].y;
                        }
                    }
                }
                var as = [];
                for (var j = 0; j < list.length; j++) {
                    if (list[j].ca == undefined || list[j].ca == 1) {
                        var by = list[j].y - minY + maxY;
                        if (by < Laya.stage.height - 200) {
                            as.push({ U: list[j].U, P: list[j].P, y: by, CX: list[j].CX });
                        }
                    }
                }
                this.decalConfig[i] = list.concat(as);
            }
        };
        /**获取场地地图配置数据 */
        RaceManager.prototype.getMapData = function () {
            var plantId = this.selectPlantId > 100 ? this.selectPlantId - 100 : this.selectPlantId;
            return this.decalConfig[plantId - 1];
        };
        RaceManager.prototype.initMapSize = function () {
            var arr = this.mapSize.split("|");
            for (var i = 0; i < arr.length; i++) {
                var ss = arr[i].split(",");
                this.mapImgDic.set(ss[0], [Number(ss[1]), Number(ss[2])]);
            }
        };
        RaceManager.prototype.getMapImageSize = function (url) {
            url = url.slice(0, url.length - 4);
            if (this.mapImgDic.get(url) != null) {
                return this.mapImgDic.get(url);
            }
            else {
                return [1, 1];
            }
        };
        RaceManager.prototype.getCornerimg = function (plantId) {
            plantId = plantId > 100 ? plantId - 100 : plantId;
            return manager.configManager.instance.CDN_BOOT + "map/corner_" + plantId + ".png";
        };
        RaceManager.prototype.getHatImg = function (hatId) {
            return "ui/hat_" + hatId + ".png";
        };
        RaceManager.prototype.getLogimg = function (plantId) {
            plantId = plantId > 100 ? plantId - 100 : plantId;
            return manager.configManager.instance.CDN_BOOT + "map/log_" + plantId + ".png";
        };
        RaceManager.prototype.getLogNameimg = function (plantId) {
            plantId = plantId > 100 ? plantId - 100 : plantId;
            return manager.configManager.instance.CDN_BOOT + "map/logname_" + plantId + ".png";
        };
        Object.defineProperty(RaceManager, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new RaceManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        RaceManager._instance = null;
        RaceManager.CHANGE_PLANT_EXP = "RaceManager_" + "CHANGE_PLANT_EXP";
        RaceManager.ADD_EGG = "RaceManager_" + "ADD_EGG";
        RaceManager.ADD_COIN_IN_PLANT = "RaceManager_" + "ADD_COIN_IN_PLANT";
        RaceManager.REMOVE_COIN_FROM_PLANT = "RaceManager_" + "REMOVE_COIN_FROM_PLANT";
        RaceManager.CHANGE_COIN = "RaceManager_" + "CHANGE_COIN";
        RaceManager.CHANGE_WING = "RaceManager_" + "CHANGE_WING";
        RaceManager.ADD_CHICHEN_TO_PLANT = "RaceManager_" + "ADD_CHICHEN_TO_PLANT";
        RaceManager.CHICHEN_COUNT_CHANGE = "RaceManager_" + "CHICHEN_COUNT_CHANGE";
        RaceManager.REMOVE_CHICHEN_FROM_PLANT = "RaceManager_" + "REMOVE_CHICHEN_FROM_PLANT";
        RaceManager.CHANGE_FOOD = "RaceManager_" + "CHANGE_FOOD";
        RaceManager.UPGRADE_CHICHEN = "RaceManager_" + "UPGRADE_CHICHEN";
        RaceManager.GOTO_PLANT = "RaceManager_" + "GOTO_PLANT";
        RaceManager.CHANGE_GUID_STEP = "RaceManager_" + "CHANGE_GUID_STEP";
        RaceManager.CLOSE_GUID_TIP3 = "RaceManager_" + "CLOSE_GUID_TIP3";
        RaceManager.CLOSE_GUID_TIP4 = "RaceManager_" + "CLOSE_GUID_TIP4";
        RaceManager.CHANGE_USER_DATA = "RaceManager_" + "CHANGE_USER_DATA";
        RaceManager.BULID_CARDEN_COMPLETE = "RaceManager_" + "BULID_CARDEN_COMPLETE";
        RaceManager.CHANGE_JIASHU = "RaceManager_" + "CHANGE_JIASHU";
        RaceManager.CHANGE_CHICHEN_HAT = "RaceManager_" + "CHANGE_CHICHEN_HAT";
        RaceManager.CHANGE_GUID_RUN = "RaceManager_" + "CHANGE_GUID_RUN";
        RaceManager.CHANGE_GUID_RUN_COMPLETE = "RaceManager_" + "CHANGE_GUID_RUN_COMPLETE";
        RaceManager.CHANGE_GUID_APPLE = "RaceManager_" + "CHANGE_GUID_APPLE";
        RaceManager.SHOW_SELECTPLANT_GUID = "RaceManager_" + "SHOW_SELECTPLANT_GUID";
        RaceManager.GET_DAILY_REWARD = "RaceManager_GET_DAILY_REWARD"; // 获取每日登陆奖励的通知
        RaceManager.GTE_CHICKEN = "RaceManager_GTE_CHICKEN"; //获取领取宠物的通知
        RaceManager.LOOKTOMEALAPPLE = "RaceManager_" + "LOOK_TO_MEALAPPLE";
        RaceManager.LOOKTOSECONDGIFE = "RaceManager_" + "LOOK_TO_SECONDGIFE";
        RaceManager.LOOKTOCOUNTGOLD = "RaceManager_" + "LOOK_TO_COUNTGOLD";
        RaceManager.LOOKTODOUBLEOFFAWARD = "RaceManager_" + "LOOK_TO_DOUBLEOFFAWARD";
        RaceManager.LOOKTOOPENEGG = "RaceManager_" + "LOOK_TO_OPENEGG";
        RaceManager.SHARETOOPENJIASU = "RaceManager_" + "SHARETOOPENJIASU";
        RaceManager.RightButtonVisiable = "RaceManager_" + "RIGHT_BUTTON_VISIABLE";
        RaceManager.OPENEGGFREE = "RaceManager_" + "OPENEGGFREE";
        RaceManager.OPENDOUBLEDISABLED = "RaceManager_" + "OPENDOUBLEDISABLED";
        RaceManager.CLOSEEGGOPENING = "RaceManager_" + "OPENDOUBLEDISABLED";
        RaceManager.CLOSEFLYVIDOEITEM = "RaceManager_" + "FLYVIDOEITEM";
        RaceManager.ADDCOINEXPTIME = "RaceManager_" + "ADDCOINEXPTIME";
        return RaceManager;
    }(laya.events.EventDispatcher));
    module.RaceManager = RaceManager;
})(module || (module = {}));
//# sourceMappingURL=RaceManager.js.map
/**
* name 
*/
module core{
	import Point = laya.maths.Point;

	export class Utils{
		constructor(){
		}

		/**三次贝塞尔曲线 
		cp 在此是四个元素的数组: 
		cp[0] 为起点
		cp[1] 为第一控制点
		cp[2] 为第二控制点
		cp[3] 为结束点
		t 为参数值，0 <= t <= 1 
		out tPos 为 t 所在的位置*/
		public static PointOnCubicBezier3(cp:Array<Point> , t:number):Point 
		{ 
			var tPos:Point = new Point();
			var ax:number, bx:number, cx:number; 
			var ay:number, by:number, cy:number; 
			var tSquared:number, tCubed:number; 
			
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
		} 
		
		/**二次贝塞尔曲线 
		cp 在此是三个元素的数组: 
		cp[0] 为起点
		cp[1] 为第一控制点
		cp[2] 为结束点
		t 为参数值，0 <= t <= 1 
		out tPos 为 t 所在的位置*/
		public static PointOnCubicBezier2(cp:Array<Point> , t:number):Point 
		{ 
			var tPos:Point = new Point();
			tPos.x = Math.pow((1-t),2)*cp[0].x+2*t*(1-t)*cp[1].x + Math.pow(t,2)*cp[2].x;
			tPos.y = Math.pow((1-t),2)*cp[0].y+2*t*(1-t)*cp[1].y + Math.pow(t,2)*cp[2].y;
			return tPos;
		}

		/**一次贝塞尔曲线 
		cp 在此是三个元素的数组: 
		cp[0] 为起点
		cp[1] 为结束点
		t 为参数值，0 <= t <= 1 
		out tPos 为 t 所在的位置*/
		public static PointOnCubicBezier1(cp:Array<Point> , t:number):Point 
		{
			var tPos:Point = new Point();
			tPos.x = (1 - t)*cp[0].x + t*cp[1].x;
			tPos.y = (1 - t)*cp[0].y + t*cp[1].y;
			return tPos;
		}

		/**一次贝塞尔曲线 
		cp0 为起点
		cp1 为结束点
		t 为参数值，0 <= t <= 1 
		out tPos 为 t 所在的位置*/
		public static PointOnCubicBezier1_2(cp0:Point , cp1:Point , t:number):Point 
		{
			var tPos:Point = new Point();
			tPos.x = (1 - t)*cp0.x + t*cp1.x;
			tPos.y = (1 - t)*cp0.y + t*cp1.y;
			return tPos;
		}


		/**获取一个发光滤镜 */
		public static getGlowFilter(color:string="#ffff00" , blur:number = 20 , offx:number = 0 , offy:number = 0):Laya.GlowFilter{
			//创建一个发光滤镜
			return new Laya.GlowFilter(color, blur	, offx, offy);
		}


		/**获取一个灰度滤镜 */
		public static getGrayscaleMat():Laya.ColorFilter{
			//由 20 个项目（排列成 4 x 5 矩阵）组成的数组，灰图
            var grayscaleMat: Array<number> = [0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0, 0, 0, 1, 0];
            //创建一个颜色滤镜对象，灰图
            return new Laya.ColorFilter(grayscaleMat);
		}

		/**获取一个高亮滤镜 */
		public static getHighlightFilter(blur:number):Laya.ColorFilter {
            //由 20 个项目（排列成 4 x 5 矩阵）组成的数组，高亮
            var redMat: Array<number> =[1 , 0 , 0 , 0 , blur,   0 , 1 , 0 , 0 , blur,   0 , 0 , 1 , 0 , blur,  0 , 0 , 0 , 1 , 0 ];
            //创建一个颜色滤镜对象,高亮
            return new Laya.ColorFilter(redMat);
		}

		/**获取一个模糊滤镜 */
		public static getBlurFilter(strength:number):Laya.BlurFilter{
			return new Laya.BlurFilter(strength);
		}

		/**获取 二次贝塞尔曲线 第一个控制点 */
		public static getBezier2TP(spos:Point , ePos:Point , length:number = 200 , sc:number = 0.5):Point{
			var tp:Point = Utils.PointOnCubicBezier1([spos , ePos] , sc);

			var atan2 = Math.atan2( (ePos.y - spos.y ) , (ePos.x - spos.x));
			var sin:number = Math.sin(Math.PI/2 + atan2);
			var cos:number = Math.cos(Math.PI/2 + atan2);

			return new Point( tp.x - length * cos , tp.y - length * sin);
		}

		/**epos-spos长度为length， 此线段为 顺时针 旋转 rotate度 */
		public static getPointByRotate(spos:Point , rotate:number , length:number = 100):Point{
			var epos:Point = new Point();
			epos.x = spos.x + Math.cos(rotate/180 * Math.PI - Math.PI/2) * length;
			epos.y = spos.y + Math.sin(rotate/180 * Math.PI - Math.PI/2) * length;

			return epos;
		}

		public static colors:Array<string> = ["#EEE9E9","#83D4A0","#83D4D3","#E526CE","#F2A34E","#FF5B5B"]
		/**获取等级颜色值 */
		public static getColorByLv(lv:number):string{
			if(lv-1 < Utils.colors.length){
				return Utils.colors[lv -1];
			}else{
				return Utils.colors[Utils.colors.length - 1];
			}
		}

		/**2.20  2.00  2.01 */
		public static Format2(n:number):string{
			if(n == 0) return "0.00";
			
			n = Math.floor( n * 100);
			var s:string = n.toString();
			return s.substr(0 , s.length -2) + "." + s.substr(s.length - 2 , 2);
		}
	}
}
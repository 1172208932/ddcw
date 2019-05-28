/**
 * 图片文字
* name 
*/
module module{
	import Image = laya.ui.Image;

	export class FontClip extends laya.ui.Component{
		private imgname:string = "";
		private sw:number = 0;
		private bw:number = 0;
		private align:string = "";
		private restrict:string = "";

		private _text:string = "";
		private imgList:Array<Image> = new Array<Image>();

		constructor(imgname:string , xx:number , yy:number , sw:number , bw:number , align:string="center" ){
			super();
			this.imgname = imgname;
			this.sw = sw;
			this.bw = bw;
			this.align = align;
			this.x = xx;
			this.y = yy;
		}

		public set text(value:string){
			this._text = value;
			this.showText2();
		}

		public get text():string{
			return this._text;
		}

		public changeImg(imgname:string):void{
			this.imgname = imgname;
			this.showText();
		}

		private showText():void{
			var bx:number = 0;
			if(this.align == "center") bx = (this.sw - (this._text.length * this.bw))/2;
			if(this.align == "right") bx = this.sw - (this._text.length * this.bw);

			var i:number = 0
			for( ; i < this._text.length ; i++){
				var char:string = this._text.charAt(i);
				var img:Image = null;
				if(i < this.imgList.length){
					img = this.imgList[i]
				}else{
					img = new Image();
					this.imgList.push(img);
				}
				this.addChild(img);
				img.skin = this.imgname + char + ".png";
				img.x = bx + i * this.bw;
			}

			for( ; i < this.imgList.length ; i++){
				this.removeChild(this.imgList[i]);
			}
		}

		private showText2():void{
			var i:number = 0;
			var w:number = 0;
			var bx:number = 0;
			for( ; i < this._text.length ; i++){
				var char:string = this._text.charAt(i);
				var img:Image = null;
				if(i < this.imgList.length){
					img = this.imgList[i];
					img.skin = this.imgname + char + ".png";
				}else{
					img = new Image(this.imgname + char + ".png");
					this.imgList.push(img);
				}
				this.addChild(img);
				w += img.width > this.bw ? this.bw : img.width;
			}

			if(this.align == "center") bx = (this.sw - w)/2;
			if(this.align == "right") bx = this.sw - w;

			for(var j:number = 0 ; j < this._text.length ; j++){
				this.imgList[j].x = bx;
				bx += (this.imgList[j].width > this.bw ? this.bw : this.imgList[j].width);
			}

			for( ; i < this.imgList.length ; i++){
				this.removeChild(this.imgList[i]);
			}
		}
	}
}
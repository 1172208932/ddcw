/*
* name;
*/
module module {
	export class ProgressView extends ui.view.ProgressViewUI {
		constructor() {
			super();
            this.bottom = 70;
		}

        public startProgress():void {
            console.log("开始读条");
            let __this = this;
            Laya.timer.once(500, this, ()=> {
                Laya.timer.frameLoop(1, __this, __this.onProgress);
            });
        }
        
        /* 读条中 */ 
        public onProgress():void {
            console.log("读条中...");
            var w:number = this.progress.width;
            w = w + 10;
            if (w >= 600) {
                w = 600;
                Laya.timer.clear(this, this.onProgress);
            }
            this.progress.width = w;
        }

        public overProgress():void {
            console.log("读条结束");
            Laya.timer.clear(this, this.onProgress);
            this.progress.width = 640;
            Laya.timer.once(500, this, () => {
                this.visible = false;
            });
        }
    }
}
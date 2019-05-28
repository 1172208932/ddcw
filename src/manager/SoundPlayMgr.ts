/**
 * 音频管理类
 */
module manager {
	import SoundManager = Laya.SoundManager;
	import SoundChannel = laya.media.SoundChannel;
	import LocalStorage = laya.net.LocalStorage;

	/* laya 已有一个SoundManger, 避免重名。 */
	export class SoundPlayMgr {
		private static _instance:SoundPlayMgr = null;
		private _soundDic:Laya.Dictionary = new Laya.Dictionary();
		public resUrl:string = "res/music/";
		public soundUrl:string = "res/music/sound/";
		public mp3:string = ".wav";
		public bgmIndex:number = 1;

		constructor() {

		}

		/* 播放背景音乐 id：1、2 */
		public playBgMusic(bgmIndex):void {
			this.bgmIndex = bgmIndex;
			if (this.bgmIndex > 0) {
				SoundManager.playMusic(this.getUrl(this.resUrl + "Chichens_BG" + this.bgmIndex + ".mp3"), 0);
			}
		}

		/* 播放音效 */
		public playGSound(url:string) {
			this.playSound(this.soundUrl + url + this.mp3);
		}

		/* 播放按钮点击音效 */
		public playButtonClick():void {
			this.playSound(this.soundUrl + "Chichens_SFXv3_Tap_menu3" + this.mp3);
		}

		private getUrl(url:string):string {
			return manager.configManager.instance.CDN_BOOT + url;
		}

		public playSound(url:string):void {
            url = Laya.URL.formatURL(this.getUrl(url));
            if (Laya.Browser.onMiniGame) {
                let audio = this._soundDic.get(url);
                if (null == audio) {
                    audio = wx.createInnerAudioContext();
                    audio.src = url;
                    audio.volume = 1;
                    audio.play();
                    this._soundDic.set(url, audio);
                } else {
                    if (Laya.Browser.onIOS) {
                        audio.seek(0);
                    } else {
                        audio.stop();
                    }
                    audio.play();
                }
            } else {
                Laya.SoundManager.playSound(url, 1);
            }
        }

		public static get instance():SoundPlayMgr {
			if (this._instance == null) {
				this._instance = new SoundPlayMgr();
			}
			return this._instance;
		}
	}
}
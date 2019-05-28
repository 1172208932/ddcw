/**
 * 音频管理类
 */
var manager;
(function (manager) {
    var SoundManager = Laya.SoundManager;
    /* laya 已有一个SoundManger, 避免重名。 */
    var SoundPlayMgr = /** @class */ (function () {
        function SoundPlayMgr() {
            this._soundDic = new Laya.Dictionary();
            this.resUrl = "res/music/";
            this.soundUrl = "res/music/sound/";
            this.mp3 = ".wav";
            this.bgmIndex = 1;
        }
        /* 播放背景音乐 id：1、2 */
        SoundPlayMgr.prototype.playBgMusic = function (bgmIndex) {
            this.bgmIndex = bgmIndex;
            if (this.bgmIndex > 0) {
                SoundManager.playMusic(this.getUrl(this.resUrl + "Chichens_BG" + this.bgmIndex + ".mp3"), 0);
            }
        };
        /* 播放音效 */
        SoundPlayMgr.prototype.playGSound = function (url) {
            this.playSound(this.soundUrl + url + this.mp3);
        };
        /* 播放按钮点击音效 */
        SoundPlayMgr.prototype.playButtonClick = function () {
            this.playSound(this.soundUrl + "Chichens_SFXv3_Tap_menu3" + this.mp3);
        };
        SoundPlayMgr.prototype.getUrl = function (url) {
            return manager.configManager.instance.CDN_BOOT + url;
        };
        SoundPlayMgr.prototype.playSound = function (url) {
            url = Laya.URL.formatURL(this.getUrl(url));
            if (Laya.Browser.onMiniGame) {
                var audio = this._soundDic.get(url);
                if (null == audio) {
                    audio = wx.createInnerAudioContext();
                    audio.src = url;
                    audio.volume = 1;
                    audio.play();
                    this._soundDic.set(url, audio);
                }
                else {
                    if (Laya.Browser.onIOS) {
                        audio.seek(0);
                    }
                    else {
                        audio.stop();
                    }
                    audio.play();
                }
            }
            else {
                Laya.SoundManager.playSound(url, 1);
            }
        };
        Object.defineProperty(SoundPlayMgr, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new SoundPlayMgr();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        SoundPlayMgr._instance = null;
        return SoundPlayMgr;
    }());
    manager.SoundPlayMgr = SoundPlayMgr;
})(manager || (manager = {}));
//# sourceMappingURL=SoundPlayMgr.js.map
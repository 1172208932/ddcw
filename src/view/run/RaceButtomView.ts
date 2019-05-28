/**
* name 
*/
module module {
	export class RaceButtomView extends ui.race.RaceButtomViewUI {
		constructor() {
			super();
			this.img_hat.skin = RaceManager.instance.getHatImg(2);
		}
	}
}
const Y_STEP_MAX = 80;
const Y_STEP_MIN = 10;
const CENTERED_HEIGHT = 550; //This position seemed about right. It can change.

/*
The component class represent a material and gives the functionality to move it around.
*/
class Component {
	constructor(material, x, y = CENTERED_HEIGHT) {
		this.material = material;
		this.x = x;
		this.y = y;
    /*
    Type: boolean (true|flase)
    Used to indicate if this component should be moving or not. It changes when the change()
    method of this component is called. In this context, that happens when there is a mouse
    click in the column of this component.
    */
		this.changing = false;
		this.yStep = (Y_STEP_MAX+Y_STEP_MIN)/2;
	}

	draw() {
    //The images are scaled down to be 80% of the width of a column. Each column is a third
    //of the width of the canvas (because there are 3 columns...).
		let imageWidth = 0.75 * width / TOTAL_COLUMNS;
		let imageHeight = this.material.image.height * (imageWidth / this.material.image.width)
		if (this.changing) {
			this.calculateY(imageHeight);
		}
		push()
		textAlign(CENTER, CENTER);
		textSize(15);
		noStroke();
		text(this.material.name, this.x, this.y - 20);
		imageMode(CENTER);
		image(this.material.image, this.x, this.y + imageHeight / 2, imageWidth, imageHeight);
		pop();
	}

	change() {
		this.changing = true;
	}

	isOutOfCanvas(){
		return this.y + this.yStep > height + 100;
	}

	get type(){
		return this.material.type
	}

	calculateY(imageHeight){
		let correctionFactor = Math.abs(this.y-height/2)/(height/2);
		if(correctionFactor > 1){
			correctionFactor = 1;
		}
		this.yStep = floor(Y_STEP_MIN + correctionFactor * (Y_STEP_MAX-Y_STEP_MIN));
		this.y += this.yStep;
		if (this.y > height + 100) {
			this.y = -1.5 * imageHeight;
		}
		//If the current y position is less than one Y_STEP away, stop moving this component
		//and place it in the center.
		if (Math.abs(this.y - CENTERED_HEIGHT) < this.yStep) {
			this.changing = false;
			this.y = CENTERED_HEIGHT;
		}
	}
}

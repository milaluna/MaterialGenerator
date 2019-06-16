let images;
let componentManager;
const width = 1080;
const height = window.innerHeight + 200;

Array.prototype.swap = function(i, j) {
	const t = this[i];
	this[i] = this[j];
	this[j] = t;
}

async function preload() {
	images = (await jQuery.getJSON('images.json')).images;
	componentManager = new ComponentManager();
	for (var i = 0; i < images.length; i++) {
		let material = new Material(images[i].name, loadImage(images[i].image), images[i].type);
		componentManager.add(new Component(material));
	}
	componentManager.initComponents();
}

function setup() {
	frameRate(60);
	const c = createCanvas(width, height);
	c.parent(document.getElementById('canvasContainer'));
}

function draw() {
	background(255)
	if (componentManager) {
		componentManager.draw();
	}
}

function mousePressed() {
	if (componentManager) {
		componentManager.mousePressed();
	}
}

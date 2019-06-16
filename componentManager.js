/*
The ComponentManager class is the one responsible to show only 3 materials. The materials
are represented with the Material class (material.js), which are part of the Component class
(component.js).
The trick chosen to 'swap' materials is to swap the material from one component for the material
in another component.
*/
const TOTAL_COLUMNS = 6;

class ComponentManager {
  constructor() {
    //The components are the materials that we will display
    this.components = [];
    //The backupComponents are the materials that we are not displaying. When one is swapped,
    //we need to make sure we are not resuing one of the materials that is currently displayed.
    this.backupComponents = [];

    this.columns = TOTAL_COLUMNS;
    this.positions = [];
    for (var i = 0; i < this.columns * 2; i++) {
      this.positions.push(((i * 2 + 1) * width) / (this.columns * 2));
    }
  }

  add(component) {
    //If there are less than 3 materials, add this one to the materials that have to be
    //displayed. Otherwise, it is a backup.
    // if (this.components.length < this.columns) {
    //   this.components.push(component);
    // } else {
    this.backupComponents.push(component);
		console.log(`Adding component with type ${component.material.type}`);
    // }
  }

  draw() {
    for (var i = 0; i < this.components.length; i++) {
      //If this component is outside of the canvas, then swap the material.
      if (this.components[i].isOutOfCanvas()) {
        this.swapComponents(i);
      }
      //Make sure that the first element is at the left, the second one in the middle,
      //and the last one at the right side of the canvas.
      this.components[i].x = this.positions[i];
      this.components[i].draw();
    }
  }

  initComponents() {
    this.components.push(this.getComponentByType('material'));
    this.components.push(this.getComponentByType('material'));
    this.components.push(this.getComponentByType('technique'));
    this.components.push(this.getComponentByType('technique'));
    this.components.push(this.getComponentByType('surface'));
    this.components.push(this.getComponentByType('surface'));
  }

  getComponentByType(type) {
		console.log(`Looking for ${type}...`)
    let component
    do {
      let index = floor(random(this.backupComponents.length));
      component = this.backupComponents[index];
      if (!component.material.type) {
        console.log(component)
				console.log('Type found: ' + component.material.type)
      } else {
        console.log(`Type found: ${component.material.type}`);
      }
      if (component.material.type === type) {
        return this.backupComponents.splice(index, 1)[0];
      }
    } while (component.material.type !== type)
  }

  mousePressed() {
    if (this.components) {
      for (var i = TOTAL_COLUMNS; i >= 0; i--) {
        if (mouseX > i * width / TOTAL_COLUMNS) {
          console.log(`Changing ${this.components[i].material.name} (column ${i})`);
          this.components[i].change();
          break;
        }
      }
    }
  }

  swapComponents(i) {
    let newComponent = this.getComponentByType(this.components[i].material.type);
    newComponent.changing = true;
    newComponent.y = this.components[i].y;
    let oldComponent = this.components.splice(i, 1, newComponent)[0];
    this.backupComponents.push(oldComponent);
  }

}

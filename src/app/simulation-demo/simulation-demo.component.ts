import {Component, ElementRef, ViewChild} from '@angular/core';
import {Cube} from '../cube-demo/cube-demo';

@Component({
  selector: 'app-algorithm-demo',
  templateUrl: './simulation-demo.component.html',
  styleUrls: ['./simulation-demo.component.css']
})
export class SimulationDemoComponent {
  cube: Cube = null;
  @ViewChild('simulationDemo') canvasCube: ElementRef;


  constructor() {

  }

  createCube(params) {
    this.cube = new Cube(params.sequences, this.canvasCube.nativeElement.getContext('2d'));
  }

  putCellValue(eventStep) {
    if (eventStep.pathElement.endIdx[2] === 0) {
      this.cube.putCellValue(eventStep.pathElement.endIdx[0], eventStep.pathElement.endIdx[1],
        eventStep.pathElement.endIdx[2], eventStep.pathElement.endCellVal);
    }
  }

}

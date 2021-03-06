import {Graphic} from './graphic';

/**
 * Class responsible for demonstration of the cube
 */
export class CubeWall {

  private diagonalFactor = 1.36;
  private cubeWallGraphic;
  private cellSize;
  private cellDiagonalSize;
  private startX;
  private startY;
  private height = 350;
  private width = 800;

  private lengthX;
  private lengthY;

  constructor(private sequences: string[], ctx: CanvasRenderingContext2D) {
    this.calculateParameters();
    this.cubeWallGraphic = new Graphic(this.height, this.width, this.cellSize, this.diagonalFactor, ctx);
    this.clearCanvas();
    this.addInterruptedEdges();
    this.addEdges();
    this.addSequenceElements();
  }

  /**
   * Clear canvas in which cube wall is being demonstrated
   */
  public clearCanvas() {
    this.cubeWallGraphic.clearCanvas();
  }

  /**
   * Calculate parameters involved in the cube wall demonstration
   */
  private calculateParameters() {
    const factorOffsetY = (this.sequences[1].length + 1) * Math.sin(Math.PI * 15 / 180);
    this.cellSize = this.height / (this.diagonalFactor * factorOffsetY + (this.sequences[0].length + 1));
    this.cellDiagonalSize = this.diagonalFactor * this.cellSize;
    this.lengthX = this.sequences[0].length + 1;
    this.lengthY = this.sequences[1].length + 1;
    this.startX = (this.width - this.cellDiagonalSize * (this.sequences[1].length + 1) * Math.cos(Math.PI * 15 / 180)) / 2;
    this.startY = this.cellDiagonalSize * factorOffsetY;
  }

  /**
   * Add interrupted edges of cube
   */
  private addInterruptedEdges() {
    this.cubeWallGraphic.addLine(this.startX, this.startY, this.lengthX, 90, true);
    this.cubeWallGraphic.addLine(this.startX, this.startY, this.lengthY, 345, true);
  }

  /**
   * Add all edges of cube
   */
  public addEdges() {
    for (let i = 0; i < this.lengthX; ++i) {
      const y = this.startY + this.cellSize * (i + 1);
      this.cubeWallGraphic.addLine(this.startX, y, this.lengthY, 345, false);
    }
    for (let i = 0; i < this.lengthY; ++i) {
      const r = this.cellDiagonalSize * (i + 1);
      const angle = Math.PI * 345 / 180;
      const x = this.startX + r * Math.cos(angle);
      const y = this.startY + r * Math.sin(angle);
      this.cubeWallGraphic.addLine(x, y, this.lengthX, 90, false);
    }
  }

  /**
   * Add symbols of sequences
   */
  public addSequenceElements() {
    this.addElementsBySequence(90, 0);
    this.addElementsBySequence(345, 1);
  }

  /**
   * Add value to indicated cell on the wall
   * @param {number} angle Angle of cube edge
   * @param {number} seqNo Sequence number
   */
  private addElementsBySequence(angle: number, seqNo: number) {
    const angleRadian = Math.PI * angle / 180;
    for (let i = 0; i < this.sequences[seqNo].length; ++i) {
      let r;
      if (angle !== 90) {
        r = this.cellDiagonalSize * (i + 1);
      } else {
        r = this.cellSize * (i + 1);
      }
      const x = this.startX + r * Math.cos(angleRadian);
      const y = this.startY + r * Math.sin(angleRadian);
      this.cubeWallGraphic.addTextSequence(x, y, this.sequences[seqNo][i]);
    }
  }

  /**
   * Add value to indicated cell on the wall
   * @param {number} x index of cell in X dimension
   * @param {number} y index of cell in Y dimension
   * @param {number} value Value of cell to add
   */
  public addCellValue(x: number, y: number, value: number) {
    const angle = Math.PI * 345 / 180;
    const point2_R = this.cellDiagonalSize * (y + 1);
    const point1_R = this.cellDiagonalSize * y;
    const point2_X = this.startX + point2_R * Math.cos(angle);
    const point2_Y = this.startY + this.cellSize * (x + 1) + point2_R * Math.sin(angle);
    const point1_X = this.startX + point1_R * Math.cos(angle);
    const point1_Y = this.startY + this.cellSize * x + point1_R * Math.sin(angle);
    this.cubeWallGraphic.addTextValue(point1_X + (point2_X - point1_X) / 2, point1_Y + (point2_Y - point1_Y), value);
  }

  /**
   * Backlight indicated cell on the wall
   * @param {number} x index of cell in X dimension
   * @param {number} y index of cell in Y dimension
   */
  public backlightCell(x: number, y: number) {
    const angle = Math.PI * 345 / 180;
    this.cubeWallGraphic.backlightCell(this.startX + y * this.cellDiagonalSize * Math.cos(angle), this.startY + y * this.cellDiagonalSize * Math.sin(angle) + x * this.cellSize);
  }
}


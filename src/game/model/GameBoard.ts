import { PointData } from 'pixi.js';
import { TileType } from './TileType';

export type BoardEnumerateAction = (position: PointData) => void;
export type BoardFillAction = (position: PointData) => TileType | undefined;

export class GameBoard {
  private _cols = 10;
  private _rows = 10;
  private _clearThreshold = 2;
  private _blastThreshold = 4;
  private _tiles: (TileType | undefined)[][] = [];

  public get cols(): number {
    return this._cols;
  }

  public get rows(): number {
    return this._rows;
  }

  public get clearThreshold(): number {
    return this._clearThreshold;
  }

  public get blastThreshold(): number {
    return this._blastThreshold;
  }

  public getRow(index: number): (TileType | undefined)[] {
    return this._tiles[index] || [];
  }

  public getCol(index: number): (TileType | undefined)[] {
    const col: (TileType | undefined)[] = [];

    for (let y = 0; y < this._rows; y++) {
      col.push(this._tiles[y][index]);
    }

    return col;
  }

  public getTile(position: PointData): TileType | undefined {
    return this._tiles[position.y][position.x];
  }

  public hasTile(position: PointData): boolean {
    return !!this.getTile(position);
  }

  public checkTile(position: PointData, tile: TileType | undefined): boolean {
    return this.getTile(position) === tile;
  }

  public setTile(position: PointData, tile: TileType | undefined): TileType | undefined {
    this._tiles[position.y][position.x] = tile;
    return tile;
  }

  public swapTiles(fromPosition: PointData, toPosition: PointData): void {
    [this._tiles[fromPosition.y][fromPosition.x], this._tiles[toPosition.y][toPosition.x]] = [
      this._tiles[toPosition.y][toPosition.x],
      this._tiles[fromPosition.y][fromPosition.x],
    ];
  }

  public enumerate(action: BoardEnumerateAction): void {
    for (let y = 0; y < this._rows; y++) {
      for (let x = 0; x < this._cols; x++) {
        const position = { x, y };
        action(position);
      }
    }
  }

  public fill(action: BoardFillAction): void {
    this._tiles = [];

    for (let y = 0; y < this._rows; y++) {
      this._tiles.push([]);

      for (let x = 0; x < this._cols; x++) {
        const position = { x, y };
        const tile = action(position);
        this._tiles[y].push(tile);
      }
    }
  }
}

import { PointData } from 'pixi.js';
import { ItemColor } from './ItemColor';

export class Item {
  private readonly _id: number;
  private readonly _color: ItemColor;
  private readonly _point: PointData;

  constructor(id: number, color: ItemColor, point: PointData) {
    this._id = id;
    this._color = color;
    this._point = point;
  }

  public get id(): number {
    return this._id;
  }

  public get color(): ItemColor {
    return this._color;
  }

  public get point(): PointData {
    return this._point;
  }
}

import { GeneratorUtils } from '@laksby/pixi-mvp';
import { Item } from './Item';
import { ItemColor } from './ItemColor';

export class GameBoard {
  private readonly _boardMinPoint = { x: 0.2, y: 0.2 };
  private readonly _boardMaxPoint = { x: 0.8, y: 0.8 };
  private readonly _items = new Set<Item>();
  private _lastItemId = 0;

  public get items(): Item[] {
    return Array.from(this._items);
  }

  public generate(size: number): void {
    this._items.clear();

    GeneratorUtils.array(size).forEach(() => this.addNewItem());
  }

  public addNewItem(): void {
    const color = GeneratorUtils.randomEnum(ItemColor);
    const point = GeneratorUtils.randomPoint2D(this._boardMinPoint, this._boardMaxPoint);

    this._lastItemId++;
    this._items.add(new Item(this._lastItemId, color, point));
  }

  public deleteItem(item: Item): void {
    this._items.delete(item);
  }
}

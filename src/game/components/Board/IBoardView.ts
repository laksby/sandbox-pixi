import { IView } from '@laksby/pixi-mvp';
import { Item } from '../../model';

export interface IBoardView extends IView {
  clearItems(): void;
  addItem(item: Item): Promise<void>;
  deleteItem(id: number): Promise<void>;
  setScore(score: number): void;
  soundClick(): Promise<void>;
}

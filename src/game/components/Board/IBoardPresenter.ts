import { IPresenter } from '@laksby/pixi-mvp';
import { Item } from '../../model';

export interface IBoardPresenter extends IPresenter {
  click(item: Item): Promise<void>;
}

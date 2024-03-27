import { IPresenter } from '@laksby/pixi-mvp';
import { PointData } from 'pixi.js';

export interface IBoardPresenter extends IPresenter {
  click(position: PointData): Promise<void>;
}

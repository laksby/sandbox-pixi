import { IPresenter } from '@laksby/pixi-mvp';

export interface IShufflePresenter extends IPresenter {
  shuffle(): Promise<void>;
}

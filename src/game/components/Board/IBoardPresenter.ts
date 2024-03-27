import { IPresenter } from '@laksby/pixi-mvp';

export interface IBoardPresenter extends IPresenter {
  click(): Promise<void>;
}

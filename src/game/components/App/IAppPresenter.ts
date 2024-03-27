import { IPresenter } from '@laksby/pixi-mvp';

export interface IAppPresenter extends IPresenter {
  continue(): Promise<void>;
}

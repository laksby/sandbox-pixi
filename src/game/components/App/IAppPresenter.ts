import { IPresenter } from '@laksby/pixi-mvp';

export interface IAppPresenter extends IPresenter {
  start(): Promise<void>;
  continue(): Promise<void>;
}

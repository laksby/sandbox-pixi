import { BasePresenter } from '@laksby/pixi-mvp';
import { GameModel } from '../../model';
import { IAppPresenter } from './IAppPresenter';
import { IAppView } from './IAppView';

export class AppPresenter extends BasePresenter<IAppView, GameModel> implements IAppPresenter {
  protected async onPrepare(): Promise<void> {
    this.model.events.on('levelEnd', level => this.onLevelEnd(level));

    await this.model.startLevel();
  }

  public async continue(): Promise<void> {
    this.view.hideOverlay();
    this.model.startLevel();
  }

  private onLevelEnd(level: number): void {
    this.view.showOverlay(level);
  }
}

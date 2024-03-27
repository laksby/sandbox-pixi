import { BasePresenter } from '@laksby/pixi-mvp';
import { GameModel } from '../../model';
import { IAppPresenter } from './IAppPresenter';
import { IAppView } from './IAppView';

export class AppPresenter extends BasePresenter<IAppView, GameModel> implements IAppPresenter {
  protected onPrepare(): void {
    this.model.events.on('scoreReachedLevel', () => this.onScoreReachedLevel());
  }

  public async continue(): Promise<void> {
    this.view.hideOverlay();
  }

  private onScoreReachedLevel(): void {
    this.view.showOverlay();
  }
}

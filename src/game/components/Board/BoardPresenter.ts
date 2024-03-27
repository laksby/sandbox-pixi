import { BasePresenter } from '@laksby/pixi-mvp';
import { GameModel } from '../../model';
import { IBoardPresenter } from './IBoardPresenter';
import { IBoardView } from './IBoardView';

export class BoardPresenter extends BasePresenter<IBoardView, GameModel> implements IBoardPresenter {
  public async click(): Promise<void> {
    this.view.soundClick();

    await this.model.updateScore();
    await this.refreshView();
  }

  protected onRefresh(): void {
    this.view.setScore(this.model.stats.score);
  }
}

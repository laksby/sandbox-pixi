import { BasePresenter } from '@laksby/pixi-mvp';
import { GameModel, Item } from '../../model';
import { IBoardPresenter } from './IBoardPresenter';
import { IBoardView } from './IBoardView';

export class BoardPresenter extends BasePresenter<IBoardView, GameModel> implements IBoardPresenter {
  protected onPrepare(): void {
    this.model.events.on('levelStart', () => this.refreshView());
  }

  public async click(item: Item): Promise<void> {
    this.view.soundClick();

    await this.model.clickItem(item);
    await this.view.deleteItem(item.id);
    this.view.setScore(this.model.stats.score);
  }

  protected async onRefresh(): Promise<void> {
    this.view.setScore(this.model.stats.score);
    this.view.clearItems();

    for (const item of this.model.board.items) {
      await this.view.addItem(item);
    }
  }
}

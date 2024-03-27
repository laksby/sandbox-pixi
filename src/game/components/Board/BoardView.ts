import { BaseView } from '@laksby/pixi-mvp';
import { sound } from '@pixi/sound';
import { Text } from 'pixi.js';
import { BoardPresenter } from './BoardPresenter';
import { IBoardPresenter } from './IBoardPresenter';
import { IBoardView } from './IBoardView';

export interface BoardViewOptions {
  fontSize: number;
}

export class BoardView extends BaseView<IBoardPresenter> implements IBoardView {
  protected readonly _options: BoardViewOptions;

  constructor(options: BoardViewOptions) {
    super(BoardPresenter);
    this._options = options;
  }

  public score = this.component(Text, score =>
    score
      .textAnchor(0.5)
      .textStyle(this.textStyle('default'))
      .layout('center-screen')
      .interactive()
      .on('pointerdown', () => this.presenter.click()),
  );

  public setScore(score: number): void {
    this.score.set('text', `Score: ${score}`);
  }

  public async soundClick(): Promise<void> {
    await sound.play('click', { volume: 0.25 });
  }
}

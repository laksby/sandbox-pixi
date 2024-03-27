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

  public get score(): Text {
    return this.ensureChild<Text>('score');
  }

  protected async onLoad(): Promise<void> {
    await this.loadScore();
    this.score.on('pointerdown', () => this.presenter.click());
  }

  public setScore(score: number): void {
    this.score.text = `Score: ${score}`;
  }

  public async soundClick(): Promise<void> {
    await sound.play('click', { volume: 0.25 });
  }

  private async loadScore(): Promise<void> {
    this.use(
      new Text({
        label: 'score',
        eventMode: 'static',
        cursor: 'pointer',
        anchor: { x: 0.5, y: 0.5 },
        position: {
          x: this.app.screen.width / 2,
          y: this.app.screen.height / 5,
        },
        style: {
          fontFamily: 'KnightWarrior',
          fontSize: this._options.fontSize,
          fill: 0xffffff,
          letterSpacing: 2,
        },
      }),
    );
  }
}

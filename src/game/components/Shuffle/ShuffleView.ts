import { BaseView, FilterUtils, MathUtils } from '@laksby/pixi-mvp';
import { sound } from '@pixi/sound';
import { Assets, Sprite, Text, Texture } from 'pixi.js';
import { IShufflePresenter } from './IShufflePresenter';
import { IShuffleView } from './IShuffleView';
import { ShufflePresenter } from './ShufflePresenter';

export interface ShuffleViewOptions {
  topBound: number;
}

export class ShuffleView extends BaseView<IShufflePresenter> implements IShuffleView {
  protected readonly _options: ShuffleViewOptions;

  constructor(options: ShuffleViewOptions) {
    super(ShufflePresenter);
    this._options = options;
  }

  public get content(): Text {
    return this.ensureChild<Text>('content');
  }

  protected async onLoad(): Promise<void> {
    await this.loadButton();
  }

  public updateShuffles(shuffles: number): void {
    this.content.text = shuffles > 0 ? `Shuffle - ${shuffles} remaining` : 'No more shuffles!';
  }

  public async soundShuffle(): Promise<void> {
    await sound.play('shuffle');
  }

  public async soundShuffleError(): Promise<void> {
    await sound.play('error');
  }

  private async loadButton(): Promise<void> {
    const texture: Texture = await Assets.load('button');

    const minimalHeight = 80;

    const { width, height } = MathUtils.sizeFitWidth(
      this.app.screen.width,
      MathUtils.sizeProportional(texture, { height: minimalHeight }),
    );

    const button = this.use(
      new Sprite({
        texture,
        eventMode: 'static',
        cursor: 'pointer',
        width,
        height,
        position: {
          x: (this.app.screen.width - width) / 2,
          y:
            this.app.screen.height - this._options.topBound < minimalHeight
              ? this._options.topBound - height / 2
              : this._options.topBound,
        },
        zIndex: 1,
      }),
      [
        new Text({
          label: 'content',
          anchor: { x: 0.5, y: 0.6 },
          zIndex: 2,
          position: { x: texture.width / 2, y: texture.height / 2 },
          style: {
            fontFamily: 'Super Squad',
            fontSize: 72,
            fill: 0xffffff,
            letterSpacing: 2,
          },
        }),
      ],
    );

    FilterUtils.hover(button);
    button.on('pointerdown', () => this.presenter.shuffle());
  }
}

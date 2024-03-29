import { BaseView } from '@laksby/pixi-mvp';
import { sound } from '@pixi/sound';
import { DropShadowFilter } from 'pixi-filters';
import { PointData, Sprite, Text } from 'pixi.js';
import { Item } from '../../model';
import { BoardPresenter } from './BoardPresenter';
import { IBoardPresenter } from './IBoardPresenter';
import { IBoardView } from './IBoardView';

export class BoardView extends BaseView<IBoardPresenter> implements IBoardView {
  constructor() {
    super(BoardPresenter);
  }

  public items = this.pool(Sprite);

  public score = this.component(Sprite, score =>
    score
      .spriteTexture('panel')
      .spriteAnchor(0.5)
      .layout('top-screen')
      .shift('down', '50%')
      .shift('down', 10)
      .scale(0.5)
      .filter(
        new DropShadowFilter({
          blur: 2,
          quality: 3,
          alpha: 0.5,
          offset: { x: 1, y: 1 },
        }),
      )
      .zIndex(2)
      .child(Text, text =>
        text
          .label('scoreText')
          .textStyle(this.textStyle('default', { fontSize: 80 }))
          .textAnchor(0.5)
          .layout('center-parent'),
      ),
  );

  public clearItems(): void {
    this.items.clear();
  }

  public async addItem(item: Item): Promise<void> {
    const component = await this.items.add(item.id, child =>
      child
        .spriteTexture(`hex-${item.color}`)
        .spriteAnchor(0.5)
        .position(this.itemPointToPosition(item.point))
        .interactive()
        .hover()
        .on('pointerdown', () => this.presenter.click(item)),
    );

    await this.animator.appear(component, 100);
  }

  public async deleteItem(id: number): Promise<void> {
    const component = this.items.get(id);

    if (component) {
      await this.animator.hide(component, 100);
      this.items.delete(id);
    }
  }

  public setScore(score: number): void {
    this.score.setForInnerText('scoreText', 'text', `Score: ${score}`);
  }

  public async soundClick(): Promise<void> {
    await sound.play('click', { volume: 0.25 });
  }

  private itemPointToPosition(point: PointData): PointData {
    return {
      x: point.x * this.app.screen.width,
      y: point.y * this.app.screen.height,
    };
  }
}

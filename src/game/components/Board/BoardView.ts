import { AnimationHandle, BaseView, FilterUtils, MathUtils } from '@laksby/pixi-mvp';
import { sound } from '@pixi/sound';
import { Assets, PointData, Sprite, Texture } from 'pixi.js';
import { TileType } from '../../model';
import { BoardPresenter } from './BoardPresenter';
import { IBoardPresenter } from './IBoardPresenter';
import { IBoardView } from './IBoardView';

export interface BoardViewOptions {
  cols: number;
  rows: number;
  tileTextures: Map<TileType, Texture>;
  tileVerticalProportion: number;
}

export class BoardView extends BaseView<IBoardPresenter> implements IBoardView {
  protected readonly _options: BoardViewOptions;

  private _tileWidth = 0;
  private _tileHeight = 0;
  private _paddingX = 0;
  private _paddingY = 0;
  private _tilePositions = new Map<Sprite, PointData>();
  private _specialAnimationHandle = new AnimationHandle();

  constructor(options: BoardViewOptions) {
    super(BoardPresenter);
    this._options = options;
  }

  public get background(): Sprite {
    return this.ensureChild<Sprite>('background');
  }

  protected async onLoad(): Promise<void> {
    await this.loadBackground();

    const paddingScale = 0.9;

    this._tileWidth = (this.background.width * paddingScale) / this._options.cols;
    this._tileHeight = (this.background.height - paddingScale) / this._options.rows;

    this._paddingX = (this.background.width * (1 - paddingScale)) / 2;
    this._paddingY = (this.background.height * (1 - paddingScale)) / 2;
  }

  public reset(): void {
    this._specialAnimationHandle.stop();
    this._specialAnimationHandle.clear();
  }

  public async setTile(position: PointData, type: TileType | undefined): Promise<void> {
    const tile = this.findTile(position);

    // Update tile
    if (tile && type) {
      tile.texture = this._options.tileTextures.get(type)!;
    }
    // Delete tile
    else if (tile && !type) {
      await this.animator.hide(tile, 100);
      tile.destroy();
      this._tilePositions.delete(tile);
    }
    // Create tile
    else if (!tile && type) {
      const newTile = this.createTile(position, this._options.tileTextures.get(type)!);
      await this.animator.appear(newTile, 100);

      this._tilePositions.set(newTile, position);
    }
    // Error
    else {
      throw new Error('Cannot create tile without type');
    }
  }

  public async setBlastTile(position: PointData): Promise<void> {
    const tile = this.findTile(position);

    // Update tile (make blast tile)
    if (tile) {
      this.animator.glowStart(tile, 1000, this._specialAnimationHandle);
    }
    // Error
    else {
      throw new Error('Cannot set blast tile at empty position');
    }
  }

  public async moveTile(from: PointData, to: PointData): Promise<void> {
    const tile = this.findTile(from);

    if (tile) {
      this._tilePositions.set(tile, to);

      await this.animator.move(tile, this.getTileCoordinates(to), 300);
      tile.zIndex = 2 + this._options.rows - to.y;
    }
  }

  public async switchTiles(from: PointData, to: PointData): Promise<void> {
    const tileFrom = this.findTile(from);
    const tileTo = this.findTile(to);

    if (tileFrom && tileTo) {
      this._tilePositions.set(tileFrom, to);
      this._tilePositions.set(tileTo, from);

      await Promise.all([
        this.animator.move(tileFrom, this.getTileCoordinates(to), 300),
        this.animator.move(tileTo, this.getTileCoordinates(from), 300),
      ]);

      tileFrom.zIndex = 2 + this._options.rows - to.y;
      tileTo.zIndex = 2 + this._options.rows - to.y;
    }
  }

  public async soundClear(): Promise<void> {
    await sound.play('clear', { volume: 0.25 });
  }

  public async soundBlast(): Promise<void> {
    await sound.play('blast', { volume: 0.25 });
  }

  public getTileCoordinates(position: PointData): PointData {
    return {
      x: this.background.position.x + this._paddingX + position.x * this._tileWidth + this._tileWidth / 2,
      y:
        this.background.position.y +
        this._paddingY +
        position.y * this._tileHeight * this._options.tileVerticalProportion +
        this._tileHeight / 2,
    };
  }

  private async loadBackground(): Promise<void> {
    const texture: Texture = await Assets.load('board');

    const offsetTop = 40;
    const offsetBottom = 64;

    const { width, height } = MathUtils.sizeFitWidth(
      this.app.screen.width,
      MathUtils.sizeProportional(texture, {
        height: this.app.screen.height - offsetTop - offsetBottom,
      }),
    );

    this.use(
      new Sprite({
        label: 'background',
        texture,
        width,
        height,
        position: {
          x: (this.app.screen.width - width) / 2,
          y: (this.app.screen.height - height) / 2,
        },
        zIndex: 1,
      }),
    );
  }

  private findTile(position: PointData): Sprite | undefined {
    for (const [tile, tilePosition] of this._tilePositions) {
      if (tilePosition.x === position.x && tilePosition.y === position.y) {
        return tile;
      }
    }

    return undefined;
  }

  private createTile(position: PointData, texture: Texture): Sprite {
    const coordinates = this.getTileCoordinates(position);

    const tile = this.use(
      new Sprite({
        texture,
        anchor: 0.5,
        width: this._tileWidth,
        height: this._tileHeight,
        eventMode: 'static',
        cursor: 'pointer',
        position: coordinates,
        zIndex: 2 + this._options.rows - position.y,
      }),
    );

    FilterUtils.hover(tile);
    tile.on('pointerdown', () => this.presenter.click(this._tilePositions.get(tile)!));

    return tile;
  }
}

import { BaseView } from '@laksby/pixi-mvp';
import { Color, Container, Graphics, Text } from 'pixi.js';
import { BoardView } from '../Board/BoardView';
import { IAppPresenter } from './IAppPresenter';
import { IAppView } from './IAppView';
import { AppPresenter } from './AppPresenter';

export class AppView extends BaseView<IAppPresenter> implements IAppView {
  constructor() {
    super(AppPresenter);
  }

  public get overlay(): Container {
    return this.ensureChild<Container>('overlay');
  }

  protected async onLoad(): Promise<void> {
    await this.useChild(
      new BoardView({
        fontSize: 48,
      }),
    );

    await this.loadOverlay();
    this.overlay.on('pointerdown', () => this.presenter.continue());
  }

  public showOverlay(): void {
    this.overlay.visible = true;
  }

  public hideOverlay(): void {
    this.overlay.visible = false;
  }

  private async loadOverlay(): Promise<void> {
    const overlayColor = new Color(0x20366f);
    overlayColor.setAlpha(0.8);

    this.use(
      new Container({
        label: 'overlay',
        eventMode: 'static',
        cursor: 'pointer',
        zIndex: 100,
        visible: false,
      }),
      [
        new Graphics().rect(0, 0, this.app.screen.width, this.app.screen.height).fill(overlayColor),
        new Text({
          text: 'You reached next level!',
          anchor: { x: 0.5, y: 0.5 },
          position: {
            x: this.app.screen.width / 2,
            y: this.app.screen.height / 2,
          },
          style: {
            fontFamily: 'KnightWarrior',
            fontSize: 72,
            fill: 0xffffff,
            letterSpacing: 2,
          },
        }),
        new Text({
          text: 'Click anywhere to continue...',
          anchor: { x: 0.5, y: 0 },
          position: {
            x: this.app.screen.width / 2,
            y: this.app.screen.height / 2 + 60,
          },
          style: {
            fontFamily: 'KnightWarrior',
            fontSize: 24,
            fill: 0xffffff,
            letterSpacing: 2,
            wordWrap: true,
            wordWrapWidth: this.app.screen.width - 20,
          },
        }),
      ],
    );
  }
}

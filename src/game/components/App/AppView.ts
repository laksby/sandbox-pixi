import { BaseView } from '@laksby/pixi-mvp';
import { Color, Container, Graphics, Text, TilingSprite } from 'pixi.js';
import { BoardView } from '../Board/BoardView';
import { AppPresenter } from './AppPresenter';
import { IAppPresenter } from './IAppPresenter';
import { IAppView } from './IAppView';

export class AppView extends BaseView<IAppPresenter> implements IAppView {
  constructor() {
    super(AppPresenter);
  }

  public boardView = this.view(new BoardView(), view => view.zIndex(2));

  public background = this.element(TilingSprite, background =>
    background
      .spriteTexture('tile-background')
      .spriteWidth(this.app.screen.width)
      .spriteHeight(this.app.screen.height)
      .zIndex(1),
  );

  public overlay = this.element(Container, overlay =>
    overlay
      .zIndex(100)
      .hidden(true)
      .interactive()
      .on('pointerdown', () => this.presenter.continue())
      .child(Graphics, background =>
        background
          .draw(gfx => gfx.rect(0, 0, this.app.screen.width, this.app.screen.height).fill(new Color(0x20366f)))
          .child(Text, title =>
            title
              .label('title')
              .textAnchor(0.5)
              .textStyle(this.textStyle('title'))
              .layout('center-screen')
              .shift('up', 60),
          )
          .child(Text, subtitle =>
            subtitle
              .text('Click anywhere to continue...')
              .textAnchor(0.5)
              .textStyle(this.textStyle('small'))
              .layout('center-screen')
              .shift('down', 60),
          ),
      ),
  );

  public showOverlay(level: number): void {
    this.overlay.object<Text>('title').text = `You reached level ${level}!`;
    this.overlay.object().visible = true;
  }

  public hideOverlay(): void {
    this.overlay.object().visible = false;
  }
}

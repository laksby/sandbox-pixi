import { BaseView } from '@laksby/pixi-mvp';
import { Color, Container, Graphics, Text } from 'pixi.js';
import { BoardView } from '../Board/BoardView';
import { AppPresenter } from './AppPresenter';
import { IAppPresenter } from './IAppPresenter';
import { IAppView } from './IAppView';

export class AppView extends BaseView<IAppPresenter> implements IAppView {
  constructor() {
    super(AppPresenter);
  }

  public boardView = this.view(
    new BoardView({
      fontSize: 48,
    }),
  );

  public overlay = this.component(Container, overlay =>
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
              .text('You reached next level!')
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

  public showOverlay(): void {
    this.overlay.set('visible', true);
  }

  public hideOverlay(): void {
    this.overlay.set('visible', false);
  }
}

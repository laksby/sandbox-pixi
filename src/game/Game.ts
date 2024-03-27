import { BaseGame, GameApplicationOptions, IView } from '@laksby/pixi-mvp';
import { SoundSourceMap } from '@pixi/sound';
import { TextStyleOptions, UnresolvedAsset } from 'pixi.js';
import { AppView } from './components/App/AppView';
import { GameModel } from './model';

export class Game extends BaseGame<GameModel> {
  protected createOptions(): GameApplicationOptions {
    return {
      background: 0xa3a3a3,
      antialias: true,
      width: 1920,
      height: 1080,
    };
  }

  protected createModel(): GameModel {
    return new GameModel();
  }

  protected createRootView(): IView {
    return new AppView();
  }

  protected getAssets(): UnresolvedAsset[] {
    return [
      { alias: 'board', src: 'img/board.png' },
      { alias: 'button', src: 'img/button.png' },
      { alias: 'score', src: 'img/score.png' },
      { alias: 'turn', src: 'img/turn.png' },
      { alias: 'tile-blue', src: 'img/tile-blue.png' },
      { alias: 'tile-pink', src: 'img/tile-pink.png' },
      { alias: 'tile-red', src: 'img/tile-red.png' },
      { alias: 'tile-yellow', src: 'img/tile-yellow.png' },
      { alias: 'tile-green', src: 'img/tile-green.png' },
    ];
  }

  protected getSounds(): SoundSourceMap {
    return {
      click: 'sounds/click.mp3',
    };
  }

  protected getFonts(): string[] {
    return ['KnightWarrior'];
  }

  protected getTextStyles(): Record<string, TextStyleOptions> {
    return {
      default: {
        fontFamily: 'KnightWarrior',
        fontSize: 48,
        fill: 0xffffff,
        letterSpacing: 2,
      },
      title: {
        fontFamily: 'KnightWarrior',
        fontSize: 72,
        fill: 0xffffff,
        letterSpacing: 2,
      },
      small: {
        fontFamily: 'KnightWarrior',
        fontSize: 24,
        fill: 0xffffff,
        letterSpacing: 2,
      },
    };
  }
}

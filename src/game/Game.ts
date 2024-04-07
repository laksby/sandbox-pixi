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

  protected createSceneView(): IView {
    return new AppView();
  }

  protected getAssets(): UnresolvedAsset[] {
    return [
      { alias: 'panel', src: 'img/panel.png' },
      { alias: 'hex-blue', src: 'img/hex-blue.png' },
      { alias: 'hex-green', src: 'img/hex-green.png' },
      { alias: 'hex-purple', src: 'img/hex-purple.png' },
      { alias: 'hex-red', src: 'img/hex-red.png' },
      { alias: 'hex-yellow', src: 'img/hex-yellow.png' },
      { alias: 'tile-background', src: 'img/tile-background.png' },
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
        fill: 0x211010,
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

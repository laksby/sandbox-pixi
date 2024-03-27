import { BaseGame, GameApplicationOptions, IView } from '@laksby/pixi-mvp';
import { SoundSourceMap } from '@pixi/sound';
import { UnresolvedAsset } from 'pixi.js';
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

  protected createRootView(model: GameModel): IView {
    return new AppView({
      cols: model.board.cols,
      rows: model.board.rows,
      allTileTypes: model.level.allTileTypes,
    });
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
      intro: 'sounds/intro.mp3',
      clear: 'sounds/clear.mp3',
      blast: 'sounds/blast.mp3',
      shuffle: 'sounds/shuffle.mp3',
      levelUp: 'sounds/level-up.mp3',
      defeat: 'sounds/defeat.mp3',
      error: 'sounds/error.mp3',
    };
  }

  protected getFonts(): string[] {
    return ['Super Squad'];
  }
}

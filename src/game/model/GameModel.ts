import { EventEmitter } from '@laksby/pixi-mvp';
import { GameBoard } from './GameBoard';
import { GameStats } from './GameStats';
import { Item } from './Item';

export interface Events {
  levelStart: unknown;
  levelEnd: number;
}

export class GameModel {
  public readonly events = new EventEmitter<Events>();
  public readonly stats = new GameStats();
  public readonly board = new GameBoard();

  public async startLevel(): Promise<void> {
    this.board.generate(this.stats.levelSize);
    await this.events.emit('levelStart');
  }

  public async clickItem(item: Item): Promise<void> {
    this.board.deleteItem(item);
    this.stats.addScore(1);

    if (this.board.items.length <= 0) {
      this.stats.increaseLevel();
      await this.events.emit('levelEnd', this.stats.level);
    }
  }
}

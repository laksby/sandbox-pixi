import { GameEvents } from './GameEvents';
import { GameStats } from './GameStats';

export class GameModel {
  private readonly _events = new GameEvents();
  private readonly _stats = new GameStats();

  public get events(): GameEvents {
    return this._events;
  }

  public get stats(): GameStats {
    return this._stats;
  }

  public async updateScore(): Promise<void> {
    this.stats.addScore(1);

    if (this.stats.isReachedNextLevel) {
      await this.events.emit('scoreReachedLevel', []);
    }
  }
}

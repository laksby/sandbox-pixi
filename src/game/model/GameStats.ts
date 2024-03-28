export class GameStats {
  private _score = 0;
  private _level = 1;
  private _levelSize = 10;

  public get score(): number {
    return this._score;
  }

  public get level(): number {
    return this._level;
  }

  public get levelSize(): number {
    return this._levelSize;
  }

  public addScore(score: number): void {
    this._score += score;
  }

  public increaseLevel(): void {
    this._level++;
    this._levelSize += 2;
  }
}

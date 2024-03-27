export class GameStats {
  private _score = 0;
  private _scoreToNextLevel = 10;

  public get score(): number {
    return this._score;
  }

  public get scoreToNextLevel(): number {
    return this._scoreToNextLevel;
  }

  public get isReachedNextLevel(): boolean {
    return this._score >= this._scoreToNextLevel;
  }

  public addScore(score: number): void {
    this._score += score;
  }
}

import { TileType } from './TileType';

export const MAX_TURN = 30;
export const MAX_SCORE = 200;
export const MAX_SHUFFLES = 3;

export class GameLevel {
  private _number = 0;
  private _shuffles = 0;
  private _score = 0;
  private _turn = 0;
  private _maxScore = MAX_SCORE;
  private _maxTurn = MAX_TURN;
  private _defeatReason = '';
  private _allTileTypes = Object.values(TileType).filter(type => !type.startsWith('special-'));

  public get number(): number {
    return this._number;
  }

  public get shuffles(): number {
    return this._shuffles;
  }

  public get score(): number {
    return this._score;
  }

  public get turn(): number {
    return this._turn;
  }

  public get maxScore(): number {
    return this._maxScore;
  }

  public get maxTurn(): number {
    return this._maxTurn;
  }

  public get isDefeat(): boolean {
    return !!this._defeatReason;
  }

  public get allTileTypes(): TileType[] {
    return this._allTileTypes;
  }

  public get isScoreVictory(): boolean {
    return this._score >= this._maxScore;
  }

  public get isTurnDefeat(): boolean {
    return this._turn === this._maxTurn && this._score < this._maxScore;
  }

  public decreaseShuffles(): void {
    this._shuffles--;
  }

  public increaseScore(tile: TileType, cleared: number): void {
    switch (tile) {
      case TileType.SpecialBlast:
        this._score += cleared;
        break;
      default:
        this._score += 2 ** (cleared - 1);
        break;
    }
  }

  public increaseLevel(): void {
    this._number++;
    this._shuffles = MAX_SHUFFLES;
    this._score = 0;
    this._turn = 0;
    this._defeatReason = '';
  }

  public increaseDifficulty(): void {
    this._maxTurn -= 2;
  }

  public increaseTurn(): void {
    this._turn++;
  }

  public defeat(reason: string): void {
    this._defeatReason = reason;
  }

  public reset(): void {
    this._number = 0;
    this._maxTurn = MAX_TURN;
  }

  public generateTile(): TileType {
    const random = Math.floor(Math.random() * this._allTileTypes.length);
    return this._allTileTypes[random];
  }
}

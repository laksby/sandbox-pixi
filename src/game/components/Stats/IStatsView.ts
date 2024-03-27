import { IView } from '@laksby/pixi-mvp';

export interface IStatsView extends IView {
  updateScore(score: number, maxScore: number): void;
  updateTurn(turn: number, maxTurn: number): void;
  updateLevel(level: number): void;
}

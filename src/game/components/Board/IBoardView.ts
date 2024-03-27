import { IView } from '@laksby/pixi-mvp';

export interface IBoardView extends IView {
  setScore(score: number): void;
  soundClick(): Promise<void>;
}

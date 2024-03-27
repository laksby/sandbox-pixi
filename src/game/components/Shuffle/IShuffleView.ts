import { IView } from '@laksby/pixi-mvp';

export interface IShuffleView extends IView {
  updateShuffles(shuffles: number): void;
  soundShuffle(): Promise<void>;
  soundShuffleError(): Promise<void>;
}

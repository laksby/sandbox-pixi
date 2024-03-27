import { IView } from '@laksby/pixi-mvp';
import { PointData } from 'pixi.js';

export interface IAppView extends IView {
  shockWave(position: PointData): Promise<void>;
  hideOverlay(): void;
  showStart(): void;
  showVictory(level: number): void;
  showDefeat(reason: string): void;
  soundIntro(): Promise<void>;
  soundLevelUp(): Promise<void>;
  soundDefeat(): Promise<void>;
}

import { IView } from '@laksby/pixi-mvp';

export interface IAppView extends IView {
  showOverlay(level: number): void;
  hideOverlay(): void;
}

import { IView } from '@laksby/pixi-mvp';

export interface IAppView extends IView {
  showOverlay(): void;
  hideOverlay(): void;
}

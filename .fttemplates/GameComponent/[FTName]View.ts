import { BaseView } from '@laksby/pixi-mvp';
import { [FTName]Presenter } from './[FTName]Presenter';
import { I[FTName]Presenter } from './I[FTName]Presenter';
import { I[FTName]View } from './I[FTName]View';

export class [FTName]View extends BaseView<I[FTName]Presenter> implements I[FTName]View {
  constructor() {
    super([FTName]Presenter);
  }
}

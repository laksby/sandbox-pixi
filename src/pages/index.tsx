import { pixiMvp } from '@laksby/pixi-mvp';
import { FC } from 'react';

export const IndexPage: FC = () => {
  pixiMvp();

  return <main className="tw-p-4 tw-min-h-screen">Home Page</main>;
};

export default IndexPage;

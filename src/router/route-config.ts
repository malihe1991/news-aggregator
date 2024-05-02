import { FC } from 'react';
import paths from './paths';
import FeedPanel from '@/pages/feed-panel';
import Home from '@/pages/home';

export type TRoute = {
  path: string;
  component: FC;
  children?: TRoute[];
};

const routeConfig: TRoute[] = [
  {
    path: paths.home,
    component: Home,
  },
  {
    path: paths.panel,
    component: FeedPanel,
  },
];

export default routeConfig;

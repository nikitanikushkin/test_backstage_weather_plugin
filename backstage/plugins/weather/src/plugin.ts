import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const weatherPlugin = createPlugin({
  id: 'weather',
  routes: {
    root: rootRouteRef,
  },
});

export const WeatherPage = weatherPlugin.provide(
  createRoutableExtension({
    name: 'WeatherPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);

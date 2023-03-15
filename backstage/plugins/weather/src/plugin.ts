import { createPlugin, createRoutableExtension, createComponentExtension } from '@backstage/core-plugin-api';

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
      import('./components/WeatherComponent').then(m => m.WeatherComponent),
    mountPoint: rootRouteRef,
  }),
);

export const WeatherCard = weatherPlugin.provide(
  createComponentExtension({
    name: 'WeatherCard',
    component: {
      lazy: () =>
        import('./components/WeatherCard').then(m => m.WeatherCard),
    },
  }),
);

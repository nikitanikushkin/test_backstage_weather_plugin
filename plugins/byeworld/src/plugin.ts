import { createPlugin, createRoutableExtension, createComponentExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const byeworldPlugin = createPlugin({
  id: 'byeworld',
  routes: {
    root: rootRouteRef,
  },
});

export const ByeworldPage = byeworldPlugin.provide(
  createRoutableExtension({
    name: 'ByeworldPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);

export const WeatherCard = byeworldPlugin.provide(
  createComponentExtension({
    name: 'WeatherCard',
    component: {
      lazy: () =>
        import('./components/WeatherCard').then(m => m.WeatherCard),
    },
  }),
);

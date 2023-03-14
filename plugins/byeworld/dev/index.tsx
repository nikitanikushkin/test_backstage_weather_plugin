import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { byeworldPlugin, ByeworldPage } from '../src/plugin';

createDevApp()
  .registerPlugin(byeworldPlugin)
  .addPage({
    element: <ByeworldPage />,
    title: 'Root Page',
    path: '/byeworld'
  })
  .render();

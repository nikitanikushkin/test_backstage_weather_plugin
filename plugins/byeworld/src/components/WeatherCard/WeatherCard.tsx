import React from 'react';
import { Grid } from '@material-ui/core';
import { Page, Content } from '@backstage/core-components';
import { ExampleFetchComponent } from '../ExampleFetchComponent';

export const WeatherCard = () => (
  <Grid container style={{ margin: '20px' }} direction="column">
        <Grid item>
          <ExampleFetchComponent />
        </Grid>
      </Grid>,
);

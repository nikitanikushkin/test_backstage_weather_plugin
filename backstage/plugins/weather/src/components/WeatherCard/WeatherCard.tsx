import React from 'react';
import { Grid } from '@material-ui/core';
import { Page, Content } from '@backstage/core-components';
import { WeatherFetchComponent } from '../WeatherFetchComponent';

export const WeatherCard = () => (
  <Grid container style={{ margin: '20px' }} direction="column">
    <Grid item>
      <WeatherFetchComponent />
    </Grid>
  </Grid>
);

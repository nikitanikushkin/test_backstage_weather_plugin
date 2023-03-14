import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableColumn, Progress } from '@backstage/core-components';
import Alert from '@material-ui/lab/Alert';
import useAsync from 'react-use/lib/useAsync';

const appid = "17cbc29989ccaf30a9af09eb65ea1e09"
const units = "metric"

export const ExampleFetchComponent = () => {
  const { value, loading, error } = useAsync(fetchData);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  console.log(value)

  if ( value === "unknown" ) {
    return(<div><p>Unknown location</p></div>)
  } else {
    const icon_url = `http://openweathermap.org/img/wn/${value.weather[0].icon}.png`;
    return (
    <div>
      <h3>{value.name}</h3>
      <p>{value.main.temp}°C <img src={icon_url}/> {value.main.humidity}%</p>
    </div>
  )
  }

  return (
    <div>
<p>saddsad</p>
    </div>
  )
};

function getUrl(): Promise<{url: string}> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${appid}&units=${units}`;
        resolve(url);
      }, (error) => {
        reject(new Error(`Something went wrong: ${error.message}`));
      });
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
}


async function fetchData(): Promise<any> {
    try {
	    const url = await getUrl();
        const response = await fetch(url);
		const data = await response.json();
		return data;
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
      return "unknown"
    }
}


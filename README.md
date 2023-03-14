# Introduction

This is a standard Backstage application with a custom plugin that displays current weather in the user's location

The plugin page `https://<hostname>/weather` displays the current weather, as well as the weather is included to the upper left corner on all website pages

The displayed data:

* Current temperature
* Icon of the weather (cloudy, sunny, rainy, etc)
* Humidity

The user location is detected by using [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API): the user has to agree with location detection, otherwise, the plugin will return `Unknown location` instead of weather

Backstage also requires PostgreSQL database that may be deployed via `docker-compose.yaml` file

# How to start the application?

1. Go to [OpenWeather website](https://home.openweathermap.org/users/sign_up) and create an account to receive an API key

1. Update `.env` file:

    > Note: `BACKSTAGE_HOSTNAME`, `POSTGRES_HOSTNAME` and `WEATHER_API_KEY` usually have to be updated, while the left vars maybe by left default

| Environment Variable | Description |
| --- | --- |
| `BACKSTAGE_HOSTNAME` | Has to be set either to `localhost` or specific IP address depending on the network machine configuration where the application is launched. For example, for VM in `Oracle VM VirtualBox` with `Bridged Adapter`, it has to set to IPv4 of the default adapter, e.g. `enp0s3` |
| `POSTGRES_HOSTNAME` | Has to be set either to `localhost` or specific IP address depending on the network machine configuration where the application is launched. Backstage application has to be able to connect to PostgreSQL by using this hostname or IP. For example, for VM in `Oracle VM VirtualBox` with `Bridged Adapter`, it has to set to IPv4 of the defaul adapter, e.g. `enp0s3` |
| `POSTGRES_CONTAINER_NAME` | Is a name of PostgreSQL docker container |
| `POSTGRES_IMAGE_PATH` | Is PostgreSQL image path |
| `POSTGRES_IMAGE_TAG` | Is PostgreSQL image tag |
| `POSTGRES_USER` | Is a root account for PostgreSQL |
| `POSTGRES_PASSWORD` | Is a root password for PostgreSQL |
| `POSTGRES_PORT` | Is PostgreSQL port |
| `WEATHER_API_KEY` | Is generated API key on [OpenWeather website](https://home.openweathermap.org/api_keys) |


1. Start PostgreSQL database server via Docker Compose:

    ```
    docker-compose up -d
    ```

1. Update Backstage configuration file `./backstage/app-config.yaml`, generate required HTTPS certs and set the required weather API key by executing `backstage_prepare.sh` script:

    ```
    ./backstage_prepare.sh
    ```
    
1. Navigate to `backstage` folder and start Backstage:

    ```
    cd backstage && yarn dev
    ```

1. In the command output find the URL under which one Backstage may be accessed:

    ```
    yarn run v1.22.19
    $ concurrently "yarn start" "yarn start-backend"
    $ yarn workspace backend start
    $ yarn workspace app start
    $ backstage-cli package start
    $ backstage-cli package start
    [1] Build succeeded
    [0] Loaded config from app-config.yaml
    [0] (node:66760) [DEP_WEBPACK_DEV_SERVER_HTTPS] DeprecationWarning: 'https' option is deprecated. Please use the 'server' option.
    [0] (Use `node --trace-deprecation ...` to show where the warning was created)
    [0] <i> [webpack-dev-server] Project is running at:
    [0] <i> [webpack-dev-server] On Your Network (IPv4): https://192.168.178.104:3000/
    ```
    
1. Open the browser, navigate under URL received at the previous step, e.g. `https://192.168.178.104:3000/`, allow location detection and find the weather in the upper left corner

1. Navigate to `http://<hostname>:3000/weather` page to open weather plugin page

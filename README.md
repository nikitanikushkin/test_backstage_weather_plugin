## Introduction

This is a standard Backstage application with a custom plugin that displays the current weather in the user's location. 

The plugin page, located at `https://<hostname>/weather`, displays the current weather. 

Additionally, the weather is displayed in the upper left corner of all website pages.

The displayed data includes:

- Current temperature
- Weather icon (cloudy, sunny, rainy, etc.)
- Humidity

# Prerequirements

Ports `7007` and `3000` have to be opened in the firewall.

# How does plugin work?

1. When the user accesses the Backstage website, they are asked to allow geolocation.

    [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) is used to detect the user's location.
    
    This Geolocation API requires Backstage to work via HTTPS as it does not work via HTTP.
    
1. The Geolocation API returns the user's latitude and longitude.
1. An API call is sent to the OpenWeather website, specifying the received latitude and longitude.

    This API requires an API key that can be generated on the [OpenWeather website](https://openweathermap.org/).
    
1. The response is parsed to extract the temperature, weather description (cloudy, sunny, rainy, etc.), and humidity.
1. The weather description is used to fetch the corresponding icon from `http://openweathermap.org/img/wn/*.png`.
1. The final data is displayed in the browser:

    * In the upper left corner of all website pages.
    * On the plugin page at `https://<hostname>/weather`.

## How to start the application?

1. Clone this repository locally to some folder and navigate to it:

    ```
    git clone https://github.com/nikitanikushkin/test_backstage_weather_plugin.git test_backstage_weather_plugin && cd $_
    ```

1. Go to [OpenWeather website](https://home.openweathermap.org/users/sign_up) and create an account to receive an API key

1. Update `.env` file:

    > :warning: `BACKSTAGE_HOSTNAME`**,** `POSTGRES_HOSTNAME` **and** `WEATHER_API_KEY` **usually have to be updated, while the left vars maybe by left default**

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


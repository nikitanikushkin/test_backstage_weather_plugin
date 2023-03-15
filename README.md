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

1. Copy `.env.example` to `.env` file, open `.env` one and update it accordingly:


    > :warning: `BACKSTAGE_HOSTNAME`**,** `POSTGRES_HOSTNAME` **and** `WEATHER_API_KEY` **only are usually have to be updated, while the left envs vars maybe by kept as is**

    | Environment Variable | Description |
    | --- | --- |
    | `BACKSTAGE_HOSTNAME` | The hostname has to be set either to domain name or`localhost` or a specific IP address, depending on the network configuration of the machine where the application is launched. For example, if running on a virtual machine in `Oracle VM VirtualBox` with `Bridged Adapter` option, the hostname should be set to the IPv4 address of the default adapter, such as `enp0s3`.
    | `POSTGRES_HOSTNAME` | The hostname has to be set either to domain name or `localhost` or a specific IP address, depending on the network configuration of the machine where the application is launched. The Backstage application must be able to connect to PostgreSQL using this hostname or IP address. For example, if running on a virtual machine in `Oracle VM VirtualBox` with `Bridged Adapter` option, the hostname should be set to the IPv4 address of the default adapter, such as `enp0s3`.
    | `POSTGRES_CONTAINER_NAME` | Name of the PostgreSQL Docker container |
    | `POSTGRES_IMAGE_PATH` | Path of the PostgreSQL Docker image |
    | `POSTGRES_IMAGE_TAG` | Tag of the PostgreSQL Docker image |
    | `POSTGRES_USER` | Root account for PostgreSQL |
    | `POSTGRES_PASSWORD` | Root password for PostgreSQL |
    | `POSTGRES_PORT` | PostgreSQL port |
    | `WEATHER_API_KEY` | API key generated on [OpenWeather website](https://home.openweathermap.org/api_keys) |

1. Execute `backstage_prepare.sh` script, to update Backstage configuration file `./backstage/app-config.yaml`, generate required self-signed HTTPS certs and set the required weather API key using data from `.env` file:

    ```
    ./backstage_prepare.sh
    ```

    If you made a mistake in `.env` file but realized it only after running this script, do not worry, update `.env` and run the script again.

1. Start PostgreSQL database server via Docker Compose:

    ```
    docker-compose up -d
    ```
    
1. Navigate to `backstage` folder:

    ```
    cd backstage
    ```

1. Install Backstage dependencies:

    ```
    yarn install --frozen-lockfile
    ```

1. Start Backstage application:

    ```
    yarn dev
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
    
1. Open the browser, navigate under URL received at the previous step, e.g. `https://192.168.178.104:3000/`, allow location detection and find the weather in the upper left corner.

1. Navigate to `http://<hostname>:3000/weather` page to open weather plugin page.

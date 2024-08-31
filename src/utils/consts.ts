type WeatherConditionElement = {
    key: string;
    title: string;
    scale: string;
}

export const MAIN_WEATHER_HOURLY_ELEMENTS: WeatherConditionElement[] = [
    {
        key: 'tempC',
        title: 'Temperature in celsius',
        scale: 'C'
    },
    {
        key: 'windspeedKmph',
        title: 'Wind speed',
        scale: 'Km/h'
    },
    {
        key: 'pressure',
        title: 'Pressure',
        scale: 'mb'
    },
    {
        key: 'chanceofrain',
        title: 'Rain chance',
        scale: '%'
    },
    {
        key: 'uvIndex',
        title: 'Uv index',
        scale: '%'
    },

]

export const SECONDARY_WEATHER_HOURLY_ELEMENTS: WeatherConditionElement[] = [
    {
        key: 'tempF',
        title: 'Temperature in Fahrenheit',
        scale: 'F'
    }, 
    {
        key: 'cloudcover',
        title: 'Cloud cover',
        scale: '%'
    },
    {
        key: 'humidity',
        title: 'Humidity',
        scale: '%'
    }, 
]

export const HOURLY_SAMPLES__STEP = 100;
import {faTemperatureThreeQuarters, faBolt, faSnowflake, faCloud, faWind, faEye, faCloudRain, faWater, faSun, faCloudSun, faDroplet, IconDefinition} from '@fortawesome/free-solid-svg-icons'

type WeatherConditionElement = {
    key: string;
    title: string;
    scale: string;
    icon: {
        src: IconDefinition;
        tailwindClasses?: string;
    };
}

export const MAIN_WEATHER_HOURLY_ELEMENTS: WeatherConditionElement[] = [
    {
        key: 'tempC',
        title: 'Temperature in celsius',
        scale: 'C',
        icon: {
            src: faTemperatureThreeQuarters,
            tailwindClasses: 'text-red-400' 
        }
    },
    {
        key: 'windspeedKmph',
        title: 'Wind speed',
        scale: 'Km/h',
        icon: {
            src: faWind,
            tailwindClasses: 'text-blue-400' 
        }
    },
    {
        key: 'pressure',
        title: 'Pressure',
        scale: 'mb',
        icon: {
            src: faWater,
            tailwindClasses: 'text-blue-400' 
        }
        
    },
    {
        key: 'chanceofrain',
        title: 'Rain chance',
        scale: '%',
        icon: {
            src: faCloudRain,
            tailwindClasses: 'text-blue-400'
        }
    },
    {
        key: 'uvIndex',
        title: 'Uv index',
        scale: '%',
        icon: {
            src: faSun,
            tailwindClasses: 'text-yellow-400'
        }
    },

]

export const SECONDARY_WEATHER_HOURLY_ELEMENTS: WeatherConditionElement[] = [
    {
        key: 'tempF',
        title: 'Temperature in Fahrenheit',
        scale: 'F',
        icon: {
            src: faTemperatureThreeQuarters,
            tailwindClasses: '' 
        }
    }, 
    {
        key: 'cloudcover',
        title: 'Cloud cover',
        scale: '%',
        
        icon: {
            src: faCloudSun,
            tailwindClasses: 'text-yellow-400' 
        }
    },
    {
        key: 'humidity',
        title: 'Humidity',
        scale: '%',
        icon: {
            src: faDroplet,
            tailwindClasses: 'text-blue-400'
        }
    },
    {
        key: 'visibility',
        title: 'Visibility',
        scale: 'Km',
        icon: {
            src: faEye,
            tailwindClasses: 'text-blue-400'
        }
    },
    {
        key: 'chanceoffog',
        title: 'Chance of fog',
        scale: '%',
        icon: {
            src: faCloud,
            tailwindClasses: 'text-blue-400'
        }
    },
    {
        key: 'chanceofsnow',
        title: 'Chance of snow',
        scale: '%',
        icon: {
            src: faSnowflake,
            tailwindClasses: 'text-white'
        }
    },
    {
        key: 'chanceofthunder',
        title: 'Chance of thunder',
        scale: '%',
        icon: {
            src: faBolt,
            tailwindClasses: 'text-yellow-500'
        }
    },
]

export const HOURLY_SAMPLES_STEP = 100;
export const TEMPERATURE_READINGS_STEP = 50;
export const TEMPERATURE_CHART_Y_AXIS_STEPS = 10;
export const TEMPERATURE_CHART_ANIMATION_DURATION = 1000;
export const TEMPERATURE_CHART_ANIMATION_STAGGER = 100;
export const WEATHER_SAMPLES_STARTING_HOUR = 0
export const WEATHER_SAMPLES_ENDING_HOUR = 2300
export const PRIMARY_COLOR = '#0e2648'
export const MEDIUM_GRAY = "#6f7681"
export const CHART_LINE_WIDTH = 3;

export const KEYBOARD_KEYS = [
    {
        key: 'enter',
        code: 'Enter'
    },
    {
        key: 'arrowUp',
        code: "ArrowUp"
    },
    {
        key: 'arrowDown',
        code: "ArrowDown"
    },
]
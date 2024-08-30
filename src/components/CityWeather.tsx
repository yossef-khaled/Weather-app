import {useState} from 'react';
import CityWeatherSummary from '../components/CityWeatherSummary';
import { MAIN_WEATHER_HOURLY_ELEMENTS } from '../utils/consts';
import { useGeoLocation } from '../utils/hooks';
import Card from '../widgets/Card'

const CityWeather = () => {

    const [coords, setCords] = useState<GeolocationCoordinates>();
    const [error, setError] = useState<GeolocationPositionError | null>(null);

    useGeoLocation(setCords, setError);

    return(
        <main className='w-full h-screen grid grid-cols-[2fr_3fr]'>
            <CityWeatherSummary/>
            <div className='m-0 h-max flex flex-wrap justify-around gap-y-4 p-2rem'>
                {
                    MAIN_WEATHER_HOURLY_ELEMENTS.filter((MAIN_WEATHER_HOURLY_ELEMENT) => !MAIN_WEATHER_HOURLY_ELEMENT.key.includes('temp')).map((MAIN_WEATHER_HOURLY_ELEMENT) => (
                        <Card classNames='bg-light-gray basis-5/12 flex justify-between'>
                            <span className='text-medium-gray'>{MAIN_WEATHER_HOURLY_ELEMENT.title}</span>
                            <span className='text-medium-gray text-primary-color font-bold'>{MAIN_WEATHER_HOURLY_ELEMENT.scale}</span>
                        </Card>
                    ))
                }
            </div>
        </main>
    )
}

export default CityWeather;
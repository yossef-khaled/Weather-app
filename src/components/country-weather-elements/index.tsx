import {useRef} from 'react';
import { MAIN_WEATHER_HOURLY_ELEMENTS, SECONDARY_WEATHER_HOURLY_ELEMENTS } from '../../utils/consts';
import Card from '../../widgets/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import './style.css'
import WeatherALert from '../../widgets/WeatherAlert';
import { useScrollHorizontally } from '../../utils/hooks';

interface WeatherElementsProps {
    weather: any;
    alertMessage?: string;
}

const CountryWeatherElements = ({weather, alertMessage}: WeatherElementsProps) => {

    const weatherElementsBarRef = useRef<HTMLDivElement>(null)

    const {scroll, isScrolledToMostLeft, isScrolledToMostRight} = useScrollHorizontally(weatherElementsBarRef)

    return (
        <div className='w-10/12 flex flex-col justify-center items-center mb-8'>
            <div className='flex justify-center items-center w-full'>
                <button onClick={() => scroll('left')} disabled={isScrolledToMostLeft} className='disabled:opacity-5'>
                    <FontAwesomeIcon icon={faChevronLeft} size='2xl'/>
                </button>
                <div className='w-full shrink max-w-2xl overflow-x-auto flex pt-24 px-14 gap-4' id="weather-elements-bar" ref={weatherElementsBarRef}>
                    {[...MAIN_WEATHER_HOURLY_ELEMENTS, ...SECONDARY_WEATHER_HOURLY_ELEMENTS].filter((MAIN_WEATHER_HOURLY_ELEMENT) => !MAIN_WEATHER_HOURLY_ELEMENT.key.includes('temp')).map((MAIN_WEATHER_HOURLY_ELEMENT, i) => (
                        <Card key={i} classNames='card text-md inline-block hover:-translate-y-1/4 hover:scale-150 transition ease-in duration-300'>
                            <div className='h-full flex flex-col justify-evenly items-center'>
                                <FontAwesomeIcon icon={MAIN_WEATHER_HOURLY_ELEMENT.icon.src} className={` ${MAIN_WEATHER_HOURLY_ELEMENT.icon.tailwindClasses}`} size='xl'/>
                                <span className='text-white text-sm invisible flex justify-between gap-2'>
                                    <span className='font-bold'>{MAIN_WEATHER_HOURLY_ELEMENT.title}</span>
                                    {weather[MAIN_WEATHER_HOURLY_ELEMENT.key]}{MAIN_WEATHER_HOURLY_ELEMENT.scale}
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>
                <button onClick={() => scroll('right')} disabled={isScrolledToMostRight} className='disabled:opacity-5'>
                    <FontAwesomeIcon icon={faChevronRight} size='2xl'/>
                </button>
            </div>
            {alertMessage ? <WeatherALert alertMessage={alertMessage}/> : null}
        </div>
    )
}

export default CountryWeatherElements;
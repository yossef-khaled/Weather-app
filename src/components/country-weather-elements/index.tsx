import { MAIN_WEATHER_HOURLY_ELEMENTS, SECONDARY_WEATHER_HOURLY_ELEMENTS } from '../../utils/consts';
import Card from '../../widgets/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css'

interface WeatherElementsProps {
    weather: any;
}

const CountryWeatherElements = ({weather}: WeatherElementsProps) => {

    return (
        <div className='w-full max-w-xl overflow-x-auto flex pt-24 gap-4 relative'>
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
    )
}

export default CountryWeatherElements;
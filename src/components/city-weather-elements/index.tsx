import { MAIN_WEATHER_HOURLY_ELEMENTS } from '../../utils/consts';
import Card from '../../widgets/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface WeatherElementsProps {
    weather: any;
}

const CityWeatherElements = ({weather}: WeatherElementsProps) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-[1fr_1fr] w-full'>
            {MAIN_WEATHER_HOURLY_ELEMENTS.filter((MAIN_WEATHER_HOURLY_ELEMENT) => !MAIN_WEATHER_HOURLY_ELEMENT.key.includes('temp')).map((MAIN_WEATHER_HOURLY_ELEMENT, i) => (
                <Card key={i} classNames='bg-light-gray flex justify-between text-xl mx-1'>
                    <span className='text-medium-gray'>
                        <FontAwesomeIcon icon={MAIN_WEATHER_HOURLY_ELEMENT.icon.src} className={`mr-2 ${MAIN_WEATHER_HOURLY_ELEMENT.icon.tailwindClasses}`}/>
                        {MAIN_WEATHER_HOURLY_ELEMENT.title}
                    </span>
                    <span className='text-medium-gray text-primary-color font-bold'>{weather[MAIN_WEATHER_HOURLY_ELEMENT.key]}{MAIN_WEATHER_HOURLY_ELEMENT.scale}</span>
                </Card>
            ))}
        </div>
    )
}

export default CityWeatherElements;
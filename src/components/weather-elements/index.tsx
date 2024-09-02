import { MAIN_WEATHER_HOURLY_ELEMENTS } from '../../utils/consts';
import Card from '../../widgets/Card';

interface WeatherElementsProps {
    weather: any;
}

const WeatherElements = ({weather}: WeatherElementsProps) => {
    return (
        <>
            {MAIN_WEATHER_HOURLY_ELEMENTS.filter((MAIN_WEATHER_HOURLY_ELEMENT) => !MAIN_WEATHER_HOURLY_ELEMENT.key.includes('temp')).map((MAIN_WEATHER_HOURLY_ELEMENT, i) => (
                <Card key={i} classNames='bg-light-gray basis-5/12 flex justify-between text-xl mx-1'>
                    <span className='text-medium-gray'>{MAIN_WEATHER_HOURLY_ELEMENT.title}</span>
                    <span className='text-medium-gray text-primary-color font-bold'>{weather[MAIN_WEATHER_HOURLY_ELEMENT.key]}{MAIN_WEATHER_HOURLY_ELEMENT.scale}</span>
                </Card>
            ))}
        </>
    )
}

export default WeatherElements;
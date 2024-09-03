import Card from "../../widgets/Card";
import CityName from "../../widgets/CityName";
import TemperatureDetails from "../TemperatureDetails";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSun, faMoon} from '@fortawesome/free-solid-svg-icons'

export interface WeatherSummaryProps {
    city: string;
    country: string;
    state?: string;
    currentTemperature: string | number;
    maxTemperature: string | number;
    minTemperature: string | number;
    temperatureScale: string;
    sunrise: string;
    sunset: string;
}

const WeatherSummary = (props: WeatherSummaryProps) => {
    return (
        <>
            <CityName
                city={props.city}
                country={props.country}
                state={props.state}
            />
            <TemperatureDetails
                current={props.currentTemperature}
                max={props.maxTemperature}
                min={props.minTemperature}
                scale={props.temperatureScale}
            />
            <p className="mt-4rem text-3xl font-bold">Sunrise & Sunset</p>
            <div className="flex flex-col sm:flex-row wrap gap-4 lg:block">
                <Card classNames="bg-secondary-color grow flex wrap justify-between lg:mt-4 font-bold text-2xl">
                    <span>
                        <FontAwesomeIcon icon={faSun} className="mr-2 text-yellow-500"/>
                        Sunrise
                    </span>
                    <span>{props.sunrise}</span>
                </Card>
                <Card classNames="bg-secondary-color grow flex justify-between lg:mt-8 font-bold text-2xl">
                    <span>
                        <FontAwesomeIcon icon={faMoon} className="mr-2 text-white"/>
                        Sunset
                    </span>
                    <span>{props.sunset}</span>
                </Card>
            </div>
        </>
    )
}

export default WeatherSummary;
import Card from "../../widgets/Card";
import CityName from "../../widgets/CityName";
import TemperatureDetails from "../TemperatureDetails";

interface WeatherSummaryProps {
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
            <Card classNames="bg-secondary-color flex justify-between mt-4 font-bold text-2xl">
                <span>Sunrise</span>
                <span>{props.sunrise}</span>
            </Card>
            <Card classNames="bg-secondary-color flex justify-between mt-8 font-bold text-2xl">
                <span>Sunrise</span>
                <span>{props.sunset}</span>
            </Card>
        </>
    )
}

export default WeatherSummary;
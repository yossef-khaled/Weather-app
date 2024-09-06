import CountryName from "../../widgets/CountryName";
import Temperature from "../../widgets/Temperature";
import TemperatureLimit from "../../widgets/TemperatureLimit";
import { WeatherSummaryProps } from "../city-weather-summary";

const CountryWeatherSummary = (props: WeatherSummaryProps) => {
    return (
        <div className="flex flex-col justify-center">
            <CountryName
                country={props.country}
                city={props.city}
            />
            <div className="text-6xl font-bold">
                <Temperature
                    temperature={props.currentTemperature}
                    scale={props.temperatureScale}
                    classNames="justify-center"
                />
            </div>
            <div className="flex flex-col items-center text-2xl">
                <TemperatureLimit
                    temperature={props.maxTemperature}
                    scale={props.temperatureScale}
                    isMin={false}
                    classNames="border-t-2 border-red-800 mt-2 p-0 w-1/2"
                />
                <TemperatureLimit
                    temperature={props.minTemperature}
                    scale={props.temperatureScale}
                    isMin
                    classNames="border-b-2 border-blue-800 mt-2 p-0 w-1/2"
                />
            </div>
        </div>
    )
}

export default CountryWeatherSummary;
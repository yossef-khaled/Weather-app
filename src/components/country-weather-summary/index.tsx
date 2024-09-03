import CountryName from "../../widgets/CountryName";
import { WeatherSummaryProps } from "../city-weather-summary";

const CountryWeatherSummary = (props: WeatherSummaryProps) => {
    return (
        <div>
            <CountryName
                country={props.country}
                city={props.city}
            />
        </div>
    )
}

export default CountryWeatherSummary;
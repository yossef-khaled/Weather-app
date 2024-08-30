import Card from "../widgets/Card";
import CityName from "../widgets/CityName";
import TemperatureDetails from "./TemperatureDetails";

interface CityWeatherSummaryProps {

}

const CityWeatherSummary = ({}: CityWeatherSummaryProps) => {
    return (
        <section className="bg-primary-color p-2rem h-full">
            <CityName
                city="San Francisco"
                country="United states of america"
                state="Some state"
            />
            <TemperatureDetails
                current={22}
                max={30}
                min={19}
                scale="C"
            />
            <p className="mt-4rem text-3xl font-bold">Sunrise & Sunset</p>
            <Card classNames="bg-secondary-color flex justify-between mt-4 font-bold text-2xl">
                <span>Sunrise</span>
                <span>4:00 AM</span>
            </Card>
            <Card classNames="bg-secondary-color flex justify-between mt-8 font-bold text-2xl">
                <span>Sunrise</span>
                <span>4:00 AM</span>
            </Card>
        </section>
    )
}

export default CityWeatherSummary;
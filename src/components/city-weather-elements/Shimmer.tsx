import { MAIN_WEATHER_HOURLY_ELEMENTS } from "../../utils/consts";
import BaseShimmer from "../../widgets/BaseShimmer";

const WeatherElementsShimmer = () => {
    return (
        <>
            {MAIN_WEATHER_HOURLY_ELEMENTS.filter((MAIN_WEATHER_HOURLY_ELEMENT) => !MAIN_WEATHER_HOURLY_ELEMENT.key.includes('temp')).map((MAIN_WEATHER_HOURLY_ELEMENT, i) => (
                <BaseShimmer
                    width="basis-5/12"
                    height="h-20"
                    classNames={"opacity-30"}
                />
            ))}
        </>
    )
}

export default WeatherElementsShimmer;
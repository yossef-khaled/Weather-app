import { MAIN_WEATHER_HOURLY_ELEMENTS } from "../../utils/consts";
import BaseShimmer from "../../widgets/BaseShimmer";

const WeatherElementsShimmer = () => {
    return (
        <>
            {MAIN_WEATHER_HOURLY_ELEMENTS.filter((MAIN_WEATHER_HOURLY_ELEMENT) => !MAIN_WEATHER_HOURLY_ELEMENT.key.includes('temp')).map((MAIN_WEATHER_HOURLY_ELEMENT) => (
                <BaseShimmer
                    width="basis-5/12"
                    height="h-20"
                    classNames={"opacity-30"}
                    key={MAIN_WEATHER_HOURLY_ELEMENT.key}
                />
            ))}
        </>
    )
}

export default WeatherElementsShimmer;
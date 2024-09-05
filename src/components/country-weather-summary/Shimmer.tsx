import BaseShimmer from "../../widgets/BaseShimmer";

const CountryWeatherSummaryShimmer = () => {
    return (
        <>
            <BaseShimmer
                width="w-1/4 min-w-48"
                height="h-36"
            />
            <BaseShimmer
                width="w-1/4 min-w-48"
                height="h-40"
                classNames="mt-2rem"
            />
        </>
    )
}

export default CountryWeatherSummaryShimmer;
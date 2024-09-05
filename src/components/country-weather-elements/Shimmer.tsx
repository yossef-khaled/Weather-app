import BaseShimmer from "../../widgets/BaseShimmer";

const CountryWeatherElementsShimmer = () => {
    return (
        <>
            <BaseShimmer
                width="w-full max-w-64"
                height="h-20"
                classNames="mt-8"
            />
            <BaseShimmer
                width="w-10/12"
                height="h-36"
                classNames="mt-8"
            />
        </>
    )
}

export default CountryWeatherElementsShimmer;
import BaseShimmer from "../../widgets/BaseShimmer";

const WeatherSummaryShimmer = () => {
    return (
        <>
            <BaseShimmer
                width="w-1/2"
                height="h-20"
            />
            <BaseShimmer
                width="w-full"
                height="h-32"
                classNames="mt-4rem"
            />
            <BaseShimmer
                width="w-full"
                height="h-24"
                classNames="mt-4rem"
            />
            <BaseShimmer
                width="w-full"
                height="h-24"
                classNames="mt-5"
            />
        </>
    )
}

export default WeatherSummaryShimmer;
import useSWR from 'swr';
import WeatherSummary from '../../components/weather-summary';
import { HOURLY_SAMPLES_STEP, WEATHER_SAMPLES_ENDING_HOUR, WEATHER_SAMPLES_STARTING_HOUR } from '../../utils/consts';
import { useGeoLocationCords } from '../../utils/hooks';
import Card from '../../widgets/Card'
import { extractTimeFromLocalDateTime, fetcher } from '../../utils/functions';
import WeatherElements from '../../components/weather-elements';
import WeatherElementsShimmer from '../../components/weather-elements/Shimmer';
import WeatherSummaryShimmer from '../../components/weather-summary/Shimmer';
import WeatherChart from '../../components/weather-chart';

type WeatherHourlySample = {
    time: string;
    tempC: string;
}

const CityWeather = () => {

    const {coords, error: geoLocationError} = useGeoLocationCords();
    const isSettingCoords = !coords && !geoLocationError;

    if(geoLocationError && !coords) {
        // TO DO: Create an error component
        return <div>{geoLocationError.message}</div>
    }

    const shouldFetch = !isSettingCoords;

    const { data: fetchRes, error, isLoading: isLoadingData } = useSWR(shouldFetch ? `${import.meta.env.VITE_LOCAL_WEATHER_END_POINT}?key=${import.meta.env.VITE_API_KEY}&q=${coords?.latitude},${coords?.longitude}&num_of_days=1&tp=1&format=json&includelocation=yes&showlocaltime=yes` : null, fetcher)
    const startedLoading = isLoadingData || !!error || !!fetchRes; // Retrieving coords takes a while at the beginning  as it is setting a state. So, isLoading is false still, it did not even start yet.

    const currentTime = !isLoadingData && fetchRes ? extractTimeFromLocalDateTime(fetchRes.data.time_zone[0].localtime) : null;
    const currentHourData = currentTime ? fetchRes.data.weather[0].hourly.find((hourlyObj: WeatherHourlySample) => 0 <= parseInt(hourlyObj.time) - parseInt(currentTime) && parseInt(hourlyObj.time) - parseInt(currentTime) < HOURLY_SAMPLES_STEP) : null

    return(
        <main className='w-full h-screen grid grid-cols-[2fr_3fr]'>
            <section className="bg-primary-color p-2rem h-full">
                {!startedLoading || isLoadingData ?
                    <WeatherSummaryShimmer/>
                    :
                    <WeatherSummary
                        city={fetchRes.data.nearest_area[0].areaName[0].value}
                        country={fetchRes.data.nearest_area[0].country[0].value}
                        state={fetchRes.data.nearest_area[0].region[0].value}
                        currentTemperature={currentHourData.tempC}
                        maxTemperature={fetchRes.data.weather[0].maxtempC}
                        minTemperature={fetchRes.data.weather[0].mintempC}
                        sunrise={fetchRes.data.weather[0].astronomy[0].sunrise}
                        sunset={fetchRes.data.weather[0].astronomy[0].sunset}
                        temperatureScale={'C'}
                    />
                }

            </section>
            <div id='weather-elements-wrapper' className='m-0 h-max flex flex-wrap justify-between gap-y-4 p-2rem'>
                {!startedLoading || isLoadingData ?
                    <WeatherElementsShimmer/>
                :
                <>
                    <WeatherElements
                        weather={currentHourData}
                    />
                    <Card classNames='bg-light-gray p-1rem text-center'>
                        <span className='font-bold m-auto text-primary-color text-xl'>Temperature throughout the day</span>
                        <WeatherChart
                            data={fetchRes.data.weather[0].hourly.map((hourlyObj: WeatherHourlySample) => {return {time: hourlyObj.time, temperature: parseInt(hourlyObj.tempC)}})}
                            xScaleDomain={[WEATHER_SAMPLES_STARTING_HOUR, WEATHER_SAMPLES_ENDING_HOUR]}
                            width={document.querySelector('#weather-elements-wrapper')!.scrollWidth}
                        />
                    </Card>
                </>
                }
            </div>
        </main>
    )
}

export default CityWeather;
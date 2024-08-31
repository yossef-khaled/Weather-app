import useSWR from 'swr';
import WeatherSummary from '../../components/weather-summary';
import { HOURLY_SAMPLES__STEP, MAIN_WEATHER_HOURLY_ELEMENTS } from '../../utils/consts';
import { useGeoLocationCords } from '../../utils/hooks';
import Card from '../../widgets/Card'
import { extractTimeFromLocalDateTime, fetcher } from '../../utils/functions';
import { DUMMY_DATA } from '../../utils/dummy-data';
import Shimmer from '../../widgets/BaseShimmer';
import WeatherElements from '../../components/weather-elements';
import WeatherElementsShimmer from '../../components/weather-elements/Shimmer';
import WeatherSummaryShimmer from '../../components/weather-summary/Shimmer';

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
    const currentHourData = currentTime ? fetchRes.data.weather[0].hourly.find((hourlyObj: any) => 0 <= parseInt(hourlyObj.time) - parseInt(currentTime) && parseInt(hourlyObj.time) - parseInt(currentTime) < HOURLY_SAMPLES__STEP) : null

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
            <div className='m-0 h-max flex flex-wrap justify-around gap-y-4 p-2rem'>
                { !startedLoading || isLoadingData ?
                    <WeatherElementsShimmer/>
                :
                    <WeatherElements
                        weather={currentHourData}
                    />
                }
            </div>
        </main>
    )
}

export default CityWeather;
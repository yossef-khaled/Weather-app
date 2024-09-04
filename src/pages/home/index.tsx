import useSWR from 'swr';
import { HOURLY_SAMPLES_STEP } from '../../utils/consts';
import { useGeoLocationCords } from '../../utils/hooks';
import { extractTimeFromLocalDateTime, fetcher } from '../../utils/functions';
import CountryWeatherSummary from '../../components/country-weather-summary';
import WeatherSummaryShimmer from '../../components/city-weather-summary/Shimmer';
import WeatherElementsShimmer from '../../components/city-weather-elements/Shimmer';
import CountryWeatherElements from '../../components/country-weather-elements';

type WeatherHourlySample = {
    time: string;
    tempC: string;
}

const Home = () => {

    const {position, error: geoLocationError} = useGeoLocationCords();
    const isSettingGeoLocation = !position && !geoLocationError;

    if(geoLocationError && !position) {
        // TO DO: Create an error component
        return <div>{geoLocationError.message}</div>
    }

    const shouldFetch = !isSettingGeoLocation;

    const { data: fetchRes, error, isLoading: isLoadingData } = useSWR(shouldFetch ? `${import.meta.env.VITE_LOCAL_WEATHER_END_POINT}?key=${import.meta.env.VITE_API_KEY}&q=${position?.capital}&num_of_days=1&tp=1&format=json&includelocation=yes&showlocaltime=yes` : null, fetcher)
    const startedLoading = isLoadingData || !!error || !!fetchRes; // Retrieving coords takes a while at the beginning  as it is setting a state. So, isLoading is false still, it did not even start yet.

    const currentTime = !isLoadingData && fetchRes ? extractTimeFromLocalDateTime(fetchRes.data.time_zone[0].localtime) : null;
    const currentHourData = currentTime ? fetchRes.data.weather[0].hourly.find((hourlyObj: WeatherHourlySample) => 0 <= Math.abs(parseInt(hourlyObj.time) - parseInt(currentTime)) && parseInt(hourlyObj.time) - parseInt(currentTime) < HOURLY_SAMPLES_STEP) : null

    return(
        <main className='bg-primary-color h-screen flex flex-col justify-start items-center text-center pt-28'>
            {!startedLoading || isLoadingData ?
                    <WeatherSummaryShimmer/>
                    :
                    <CountryWeatherSummary
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
            {!startedLoading || isLoadingData ?
                    <WeatherElementsShimmer/>
                :
                    <CountryWeatherElements
                        weather={currentHourData}
                    />
                }
        </main>
    )
}

export default Home;
import useSWR from 'swr';
import { HOURLY_SAMPLES_STEP } from '../../utils/consts';
import { useGeoLocationCords } from '../../utils/hooks';
import { extractTimeFromLocalDateTime, fetcher } from '../../utils/functions';
import CountryWeatherSummary from '../../components/country-weather-summary';
import CountryWeatherElements from '../../components/country-weather-elements';
import DebounceSearchInput from '../../widgets/DebounceSearchInput';
import { useState } from 'react';
import CountryWeatherSummaryShimmer from '../../components/country-weather-summary/Shimmer';
import CountryWeatherElementsShimmer from '../../components/country-weather-elements/Shimmer';

type WeatherHourlySample = {
    time: string;
    tempC: string;
}

type APISearchResult = {
    areaName: {value: string}[];
    country: {value: string}[];
    latitude: string;
    longitude: string,
    population: string,
    "weatherUrl": {value: string}[];
}

const Home = () => {

    const [cityName, setCityName] = useState('');

    const {position, error: geoLocationError} = useGeoLocationCords();
    const isSettingGeoLocation = !position && !geoLocationError;

    if(geoLocationError && !position) {
        // TO DO: Create an error component
        return <div>{geoLocationError.message}</div>
    }

    const shouldFetch = !isSettingGeoLocation;

    const { data: fetchRes, error, isLoading: isLoadingData } = useSWR(shouldFetch ? `${import.meta.env.VITE_LOCAL_WEATHER_END_POINT}?key=${import.meta.env.VITE_API_KEY}&q=${position?.capital}&num_of_days=1&tp=1&format=json&includelocation=yes&showlocaltime=yes&alerts=yes` : null, fetcher)
    const startedLoading = isLoadingData || !!error || !!fetchRes; // Retrieving coords takes a while at the beginning  as it is setting a state. So, isLoading is false still, it did not even start yet.

    const currentTime = !isLoadingData && fetchRes ? extractTimeFromLocalDateTime(fetchRes.data.time_zone[0].localtime) : null;
    const currentHourData = currentTime ? fetchRes.data.weather[0].hourly.find((hourlyObj: WeatherHourlySample) => 0 <= Math.abs(parseInt(hourlyObj.time) - parseInt(currentTime)) && parseInt(hourlyObj.time) - parseInt(currentTime) < HOURLY_SAMPLES_STEP) : null

    const SEARCH_CITY_QUERY_PARAMETER = !cityName ? null : `${cityName}`

    const { data: searchCitiesRes, error: searchCitiesError, isLoading: isLoadingSearchCities } = useSWR(SEARCH_CITY_QUERY_PARAMETER ? `${import.meta.env.VITE_SEARCH_END_POINT}?key=${import.meta.env.VITE_API_KEY}&q=${SEARCH_CITY_QUERY_PARAMETER}&format=json` : null, fetcher)

    const viewCityWeather = (cityName: string) => {
        location.href = `/cities/${cityName}`
    }

    return(
        <main className='bg-primary-color h-max min-h-screen flex flex-col justify-start items-center text-center pt-8 p-4 mb-16'>
            <DebounceSearchInput
                textAlreadyWritten={cityName}
                setText={setCityName}
                searchResults={searchCitiesRes?.search_api ? searchCitiesRes?.search_api.result.map((r: APISearchResult) => {
                    return {
                        value: r.areaName[0].value,
                        label: `${r.areaName[0].value}, ${r.country[0].value}`
                    }
                }) : []}
                isLoading={isLoadingSearchCities}
                onSelectSearchOption={viewCityWeather}
            />
            {!startedLoading || isLoadingData ?
                    <CountryWeatherSummaryShimmer/>
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
                    <CountryWeatherElementsShimmer/>
                :
                    <CountryWeatherElements
                        weather={currentHourData}
                        alertMessage={fetchRes.data.alerts.alert[0]?.desc}
                    />
            }
        </main>
    )
}

export default Home;
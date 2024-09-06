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
import ErrorMessage from '../../widgets/ErrorMessage';

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
    const [errorMessage, setErrorMessage] = useState('')

    const {position, error: geoLocationError} = useGeoLocationCords();
    let isSettingGeoLocation = !position && !geoLocationError;

    if(geoLocationError && !position && !errorMessage) {
        setErrorMessage(geoLocationError.message)
    }

    const shouldFetch = !isSettingGeoLocation && !errorMessage;

    const { data: fetchRes, error, isLoading: isLoadingData } = useSWR(shouldFetch ? `${import.meta.env.VITE_LOCAL_WEATHER_END_POINT}?key=${import.meta.env.VITE_API_KEY}&q=${position?.capital}&num_of_days=1&tp=1&format=json&includelocation=yes&showlocaltime=yes&alerts=yes` : null, fetcher)
    
    
    const currentTime = !isLoadingData && fetchRes?.data?.time_zone ? extractTimeFromLocalDateTime(fetchRes.data.time_zone[0].localtime) : null;
    const currentHourData = currentTime ? fetchRes.data.weather[0].hourly.find((hourlyObj: WeatherHourlySample) => 0 <= Math.abs(parseInt(hourlyObj.time) - parseInt(currentTime)) && parseInt(hourlyObj.time) - parseInt(currentTime) < HOURLY_SAMPLES_STEP) : null
    
    const SEARCH_CITY_QUERY_PARAMETER = !cityName ? null : `${cityName}`
    
    const { data: searchCitiesRes, error: searchCitiesError, isLoading: isLoadingSearchCities } = useSWR(SEARCH_CITY_QUERY_PARAMETER ? `${import.meta.env.VITE_SEARCH_END_POINT}?key=${import.meta.env.VITE_API_KEY}&q=${SEARCH_CITY_QUERY_PARAMETER}&format=json` : null, fetcher)
    
    // Handle errors
    if(fetchRes?.data?.error) {
        setErrorMessage(fetchRes?.data?.error[0].msg)
    }

    if(error || searchCitiesError) {
        setErrorMessage('Something went wrong, please try again');
    }

    const viewCityWeather = (cityName: string) => {
        location.href = `/cities/${cityName}`
    }

    return(
        <main className='bg-primary-color h-max min-h-screen flex flex-col justify-start items-center text-center pt-8 p-4 mb-16'>
            {errorMessage && <ErrorMessage message={errorMessage}/>}
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
            {isSettingGeoLocation || isLoadingData ?
                    <CountryWeatherSummaryShimmer/>
                    :
                    <CountryWeatherSummary
                        city={fetchRes?.data?.nearest_area ? fetchRes.data.nearest_area[0].areaName[0].value : ''}
                        country={fetchRes?.data?.nearest_area ? fetchRes.data.nearest_area[0].country[0].value : '--'}
                        state={fetchRes?.data?.nearest_area ? fetchRes.data.nearest_area[0].region[0].value : '--'}
                        currentTemperature={currentHourData ? currentHourData.tempC : '--'}
                        maxTemperature={fetchRes?.data?.weather ? fetchRes.data.weather[0].maxtempC : '--'}
                        minTemperature={fetchRes?.data?.weather ? fetchRes.data.weather[0].mintempC : '--'}
                        sunrise={fetchRes?.data?.weather ? fetchRes.data.weather[0].astronomy[0].sunrise : '--'}
                        sunset={fetchRes?.data?.weather ? fetchRes.data.weather[0].astronomy[0].sunset : '--'}
                        temperatureScale={'C'}
                    />
            }
            {isSettingGeoLocation || isLoadingData ?
                    <CountryWeatherElementsShimmer/>
                :
                    <>
                        <p className='text-4xl font-bold mt-14'>Weather elements</p>
                        {fetchRes ? 
                            <CountryWeatherElements
                                weather={currentHourData}
                                alertMessage={fetchRes.data.alerts ? fetchRes.data.alerts.alert[0]?.desc : ''}
                            />
                            : <>No data is available</>
                        }
                    </>
            }
        </main>
    )
}

export default Home;
import {useState} from 'react';
import useSWR from 'swr';
import WeatherSummary from '../../components/city-weather-summary';
import { HOURLY_SAMPLES_STEP } from '../../utils/consts';
import { useParams } from "react-router-dom";
import { extractTimeFromLocalDateTime, fetcher } from '../../utils/functions';
import CityWeatherElements from '../../components/city-weather-elements';
import WeatherElementsShimmer from '../../components/city-weather-elements/Shimmer';
import WeatherSummaryShimmer from '../../components/city-weather-summary/Shimmer';
import WeatherChart from '../../components/weather-chart';
import ErrorMessage from '../../widgets/ErrorMessage';

type WeatherHourlySample = {
    time: string;
    tempC: string;
}

const CityWeather = () => {
    const [errorMessage, setErrorMessage] = useState('');

    const { cityName } = useParams();

    const { data: fetchRes, error, isLoading: isLoadingData } = useSWR(`${import.meta.env.VITE_LOCAL_WEATHER_END_POINT}?key=${import.meta.env.VITE_API_KEY}&q=${cityName}&num_of_days=1&tp=1&format=json&includelocation=yes&showlocaltime=yes`, fetcher)

    // Handle errors
    if(fetchRes?.data?.error && !errorMessage) {
        setErrorMessage(fetchRes?.data?.error[0].msg)
    }
    if(error) {
        setErrorMessage('Something went wrong, please try again');
    }

    const currentTime = !isLoadingData && fetchRes.data.time_zone ? extractTimeFromLocalDateTime(fetchRes.data.time_zone[0].localtime) : null;
    const currentHourData = currentTime ? fetchRes.data.weather[0].hourly.find((hourlyObj: WeatherHourlySample) => 0 <= Math.abs(parseInt(hourlyObj.time) - parseInt(currentTime)) && parseInt(hourlyObj.time) - parseInt(currentTime) < HOURLY_SAMPLES_STEP) : null

    return(
        <main className='w-full h-screen grid lg:grid-cols-[2fr_3fr] auto-rows-max lg:grid-rows-[1fr]'>
            <section className="bg-primary-color p-2rem lg:h-full">
                {isLoadingData ?
                    <WeatherSummaryShimmer/>
                    :
                    <WeatherSummary
                        city={fetchRes.data.nearest_area ? fetchRes.data.nearest_area[0].areaName[0].value : '--'}
                        country={fetchRes.data.nearest_area ? fetchRes.data.nearest_area[0].country[0].value : ''}
                        state={fetchRes.data.nearest_area ? fetchRes.data.nearest_area[0].region[0].value : ''}
                        currentTemperature={currentHourData ? currentHourData.tempC : ''}
                        maxTemperature={fetchRes.data.weather ? fetchRes.data.weather[0].maxtempC : '--'}
                        minTemperature={fetchRes.data.weather ? fetchRes.data.weather[0].mintempC : '--'}
                        sunrise={fetchRes.data.weather ? fetchRes.data.weather[0].astronomy[0].sunrise : '--'}
                        sunset={fetchRes.data.weather ? fetchRes.data.weather[0].astronomy[0].sunset : '--'}
                        temperatureScale={'C'}
                    />
                }

            </section>
            {
                errorMessage ? 
                    <div className='flex justify-center p-2rem'>
                        <ErrorMessage message={errorMessage}/>
                    </div>
                :
                <div id='weather-elements-wrapper' className='m-0 h-max flex flex-wrap justify-between gap-y-4 p-1rem'>
                    {isLoadingData ?
                        <WeatherElementsShimmer/>
                    :
                    <>
                        <CityWeatherElements
                            weather={currentHourData}
                        />
                        <div className='bg-light-gray text-center w-full weather-elements-wrapper flex flex-col'>
                            <span className='font-bold m-4 text-primary-color text-xl'>Temperature throughout the day</span>
                            {fetchRes.data.weather ?
                                <WeatherChart
                                    data={fetchRes.data.weather[0].hourly.map((hourlyObj: WeatherHourlySample) => {return {time: hourlyObj.time, temperature: parseInt(hourlyObj.tempC)}})}
                                    width={document.querySelector('#weather-elements-wrapper')!.clientWidth}
                                    margin={50}
                                />
                                : <span className='text-primary-color pb-2rem'>No data was found</span>
                            }
                        </div>
                    </>
                    }
                </div>}
        </main>
    )
}

export default CityWeather;
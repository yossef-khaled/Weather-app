import {useState} from 'react';

export const useGeoLocationCords = () => {
    const [coords, setCoords] = useState<GeolocationCoordinates>();
    const [error, setError] = useState<GeolocationPositionError | null>(null);
    
    if(!coords && !error) {
        navigator.geolocation.getCurrentPosition((position) => setCoords(position.coords), (e) => setError(e));
    }
    else if(coords && error) {
        setError(null);
    }
    return {coords, error}
}
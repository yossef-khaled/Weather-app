
/**
 * 
 * @param onSuccess A setState function to set location coordinates on success
 * @param onFailure A setState function to set error on failure
 */
export const useGeoLocation = (onSuccess: (coords: GeolocationCoordinates) => void, onFailure: (error: GeolocationPositionError) => void) => {
    navigator.geolocation.getCurrentPosition((position) => onSuccess(position.coords), onFailure);
}
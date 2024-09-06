import { useState, useRef, useEffect, Dispatch, MutableRefObject } from "react";
import {ResizeObserver} from "@juggle/resize-observer";
import { AxisDimensions, combineChartDimensions } from "./functions";
import { COUNTRY_WEATHER_ELEMENTS_SCROLL_STEP } from "./consts";

interface UserLocation extends GeolocationPosition {
    capital: string;
}

export const useGeoLocationCords = () => {
  const [position, setPosition] = useState<UserLocation>();
  const [error, setError] = useState<GeolocationPositionError | null>(null);

  if (!position && !error) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    navigator.geolocation.getCurrentPosition(
      (geoLocationPosition) => setPosition({
        coords: geoLocationPosition.coords,
        timestamp: geoLocationPosition.timestamp,
        capital: timeZone.split('/')[1]
    }),
      (e) => setError(e)
    );
  } else if (position && error) {
    setError(null);
  }
  return { position, error };
};

export const useChartDimensions = (passedSettings: AxisDimensions) => {
    const ref = useRef<SVGSVGElement>(null);
    const dimensions = combineChartDimensions(passedSettings);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    if (dimensions.width && dimensions.height) {
        return {ref, dimensions}
    };

    useEffect(() => {

        const element = ref.current;
        const resizeObserver = new ResizeObserver((entries) => {
            if (!Array.isArray(entries)) return;
            if (!entries.length) return;

            const entry = entries[0];

            if (width != entry.contentRect.width) setWidth(entry.contentRect.width);
            if (height != entry.contentRect.height) setHeight(entry.contentRect.height);
        });
        resizeObserver.observe(element as SVGSVGElement);

        return () => resizeObserver.unobserve(element as SVGSVGElement);
    }, []);

    const newSettings = combineChartDimensions({
        ...dimensions,
        width: dimensions.width || width,
        height: dimensions.height || height,
    });

    return {ref, newSettings};
};

export const useDebounce = (
    text: string,
    setText: (text: string) => void | Dispatch<React.SetStateAction<string>>
) => {

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setText(text)
        }, 800)
        return () => clearTimeout(timeoutID);
    }, [text])

}

export const useScrollHorizontally = (elementRef: MutableRefObject<HTMLDivElement | null>, scrollStep: number | undefined = COUNTRY_WEATHER_ELEMENTS_SCROLL_STEP) => {

    const [isScrolledToMostLeft, setIsScrolledToMostLeft] = useState<boolean>();
    const [isScrolledToMostRight, setIsScrolledToMostRight] = useState<boolean>();

    const handleScrollPosition = () => {
        const currentScrollLeft = elementRef.current?.scrollLeft ?? 0;
        const scrollWidth = elementRef.current?.scrollWidth ?? 0;

        setIsScrolledToMostLeft(!elementRef.current?.scrollLeft);
        setIsScrolledToMostRight(Math.floor(scrollWidth - currentScrollLeft) === elementRef.current?.clientWidth);
    }

    const scroll = (direction: 'left' | 'right' = 'right') => {
        handleScrollPosition()
        elementRef.current?.scrollBy({
            left: direction === 'left' ? -scrollStep : scrollStep,
            behavior: 'smooth'
        })
    }
    
    useEffect(() => {
        
        handleScrollPosition()
        elementRef.current?.addEventListener('scroll', handleScrollPosition)

        return () => {
            removeEventListener('scroll', handleScrollPosition);
        }
    }, [elementRef]);

    return {scroll, isScrolledToMostLeft, isScrolledToMostRight}
}

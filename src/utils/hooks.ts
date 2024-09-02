import { useState, useRef, useEffect } from "react";
import {ResizeObserver} from "@juggle/resize-observer";
import { AxisDimensions, combineChartDimensions } from "./functions";

export const useGeoLocationCords = () => {
  const [coords, setCoords] = useState<GeolocationCoordinates>();
  const [error, setError] = useState<GeolocationPositionError | null>(null);

  if (!coords && !error) {
    navigator.geolocation.getCurrentPosition(
      (position) => setCoords(position.coords),
      (e) => setError(e)
    );
  } else if (coords && error) {
    setError(null);
  }
  return { coords, error };
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

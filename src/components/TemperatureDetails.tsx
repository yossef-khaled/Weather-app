import Temperature from "../widgets/Temperature";
import TemperatureLimit from "../widgets/TemperatureLimit";

interface TemperatureDetailsProps {
    current: number | string;
    min: number | string;
    max: number | string;
    scale: string;
}

const TemperatureDetails = ({current, max, min, scale}: TemperatureDetailsProps) => {
    return (
        <div className="flex justify-between items-center mt-2rem">
            <div className="text-6xl font-bold">
                <Temperature
                    temperature={current}
                    scale={scale}
                />
            </div>
            <div className="flex flex-col text-3xl gap-y-5">
                <TemperatureLimit
                    temperature={max}
                    scale={scale}
                />
                <TemperatureLimit
                    temperature={min}
                    scale={scale}
                />
            </div>
        </div>
    )
}

export default TemperatureDetails;
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
        <div className="flex flex-wrap justify-between text-center items-center mt-2rem">
            <div className="text-6xl font-bold basis-2/3">
                <Temperature
                    temperature={current}
                    scale={scale}
                />
            </div>
            <div className="flex lg:flex-col text-2xl gap-5">
                <TemperatureLimit
                    temperature={max}
                    scale={scale}
                    isMin={false}
                />
                <TemperatureLimit
                    temperature={min}
                    scale={scale}
                    isMin
                />
            </div>
        </div>
    )
}

export default TemperatureDetails;
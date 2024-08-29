import Temperature from "./Temperature";

interface TemperatureLimitProps {
    temperature: number | string;
    scale: string;
}

const TemperatureLimit = ({temperature, scale}: TemperatureLimitProps) => {
    return (
        <span className="flex justify-between items-center text-md font-bold min-w-max">
            <Temperature
                temperature={temperature}
                scale={scale}
            />
        </span>
    )
}

export default TemperatureLimit;
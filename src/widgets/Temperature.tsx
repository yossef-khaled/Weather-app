interface TemperatureProps {
    temperature: number | string;
    scale: string;
}

const Temperature = ({temperature, scale}: TemperatureProps) => {
    return (
        <div className="flex justify-start">
            <span>{`${temperature}°`}</span>
            <span>{scale.charAt(0).toLocaleUpperCase()}</span>
        </div>
    )
}

export default Temperature;
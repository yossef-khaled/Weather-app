interface TemperatureProps {
    temperature: number | string;
    scale: string;
    classNames?: string;
}

const Temperature = ({temperature, scale, classNames}: TemperatureProps) => {
    return (
        <div className={`flex justify-start ${classNames}`}>
            <span>{`${temperature}°`}</span>
            <span>{scale.charAt(0).toLocaleUpperCase()}</span>
        </div>
    )
}

export default Temperature;
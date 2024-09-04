interface CountryNameProps {
    country: string;
    city: string;
}

const CountryName = ({city, country}: CountryNameProps) => {
    return (
        <div className="flex flex-col">
            <span className="text-6xl">{country}</span>
            <span>Capital: {city}</span>
        </div>
    )
}

export default CountryName;
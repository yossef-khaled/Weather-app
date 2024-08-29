interface CityNameProps {
    city: string;
    country: string;
    state?: string;
}

const CityName = ({city, country, state}: CityNameProps) => {
    return (
        <div className="flex flex-col">
            <span className="text-6xl">{city}</span>
            <span>{state ? `${state}, ` : ''}{country}</span>
        </div>
    )
}

export default CityName
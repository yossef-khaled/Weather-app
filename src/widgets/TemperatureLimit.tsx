import Temperature from "./Temperature";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons'

interface TemperatureLimitProps {
    temperature: number | string;
    scale: string;
    isMin: boolean;
    classNames?: string;
}

const ICON_STYLES = {
    max: {
        icon: faArrowUp,
        color: 'text-green-800'
    },
    min: {
        icon: faArrowDown,
        color: 'text-red-800'
    }
}

const TemperatureLimit = ({temperature, scale, isMin, classNames}: TemperatureLimitProps) => {
    const tempStyle = isMin ? ICON_STYLES.min : ICON_STYLES.max
    return (
        <span className={`flex justify-between items-center text-md font-bold min-w-max ${classNames}`}>
            <Temperature
                temperature={temperature}
                scale={scale}
            />
            <FontAwesomeIcon icon={tempStyle.icon} className={`${tempStyle.color} m-2`}/>
        </span>
    )
}

export default TemperatureLimit;
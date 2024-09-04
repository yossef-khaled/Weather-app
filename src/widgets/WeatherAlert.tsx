import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const WeatherALert = ({alertMessage}: {alertMessage: string}) => {
    return (
        <span className='text-medium-gray'>
            <FontAwesomeIcon icon={faTriangleExclamation} className='mr-2'/>
            {alertMessage.split(',').join(', ')}.
        </span>
    )
}

export default WeatherALert;
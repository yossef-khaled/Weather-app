import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'

const ErrorMessage = ({message} : {message: string}) => {
    return (
        <span className="text-red-600 rounded p-2 w-full max-w-md text-left bg-red-200 text-lg m-2 flex h-max">
            <FontAwesomeIcon icon={faXmark} className={'mr-2 w-4 h-4 rounded-full border-2 border-red-600 p-1'}/>
            {message}
        </span>
    )
}

export default ErrorMessage;
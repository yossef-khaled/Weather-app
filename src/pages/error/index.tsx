import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'
import {useRouteError, isRouteErrorResponse} from 'react-router-dom'

const ErrorPage = () => {

    const error = useRouteError();
    const [errorMessage, setErrorMessage] = useState('');

    if(!errorMessage) {
        if (isRouteErrorResponse(error)) {
            setErrorMessage(`${error.status} ${error.statusText}`);
        } 
        else if (error instanceof Error) {
            setErrorMessage(error.message);
        } 
        else if (typeof error === 'string') {
            setErrorMessage(error);
        }
        else {
            setErrorMessage('Unknown error');
        }
    }

    return (
        <div className="w-full h-screen bg-primary-color flex flex-col justify-center items-center">
            <label className=' flex flex-col justify-center items-center w-2/3'>
                <FontAwesomeIcon icon={faTriangleExclamation} className='text-medium-gray h-36'/>
                <span className='font-bold text-4xl'>Ooops !!</span>
                <i>{errorMessage}</i>
            </label>
        </div>
    )
}

export default ErrorPage;
import {useState, ChangeEvent, Dispatch, KeyboardEvent} from 'react';
import { useDebounce } from '../../utils/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import './style.scss';
import { KEYBOARD_KEYS } from '../../utils/consts';

type SearchResult = {
    value: string;
    label: string;
}

interface DebounceInputProps {
    textAlreadyWritten?: string;
    setText: Dispatch<React.SetStateAction<string>>;
    searchResults: SearchResult[];
    isLoading: boolean;
    onSelectSearchOption: any;
    placeholder?: string;
}

const DebounceSearchInput = ({textAlreadyWritten, setText, searchResults, onSelectSearchOption, isLoading, placeholder = "Search location here"}: DebounceInputProps) => {
    const [inputText, setInputText] = useState(textAlreadyWritten ?? '');

    console.log(searchResults)

    useDebounce(inputText, setText);

    const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    }

    const onSelectResult = () => {
        const searchResultElements = Array.from(document.querySelectorAll('.search-result'))
        const selectedSearchElement = searchResultElements.find((searchResultElement) => (searchResultElement as HTMLElement).dataset.isCurrentStation === "true")

        onSelectSearchOption(selectedSearchElement? selectedSearchElement.innerHTML : inputText);
    }

    const handleMovingInList = (isMovingDown: boolean) => {
        const searchResultElements = Array.from(document.querySelectorAll('.search-result'))
        
        const currentStation = searchResultElements?.find((searchResultElement) => (searchResultElement as HTMLElement).dataset.isCurrentStation === "true")
        const currentStationIndex = currentStation ? searchResultElements.indexOf(currentStation) : -1;

        const isThereAnElementAlreadySelected = currentStationIndex >= 0;
        let nextStationIndex = isMovingDown ? currentStationIndex + 1 : currentStationIndex - 1;

        if(nextStationIndex >= searchResultElements.length) nextStationIndex = 0;
        else if(nextStationIndex < 0) nextStationIndex = searchResultElements.length - 1;

        searchResultElements[nextStationIndex].scrollIntoView();

        searchResultElements?.map((searchResultElement, i) => {
            delete (searchResultElement as HTMLElement).dataset.isCurrentStation;
            
            if(!isThereAnElementAlreadySelected) {
                if(isMovingDown && i === nextStationIndex) {
                    (searchResultElement as HTMLElement).dataset.isCurrentStation = "true"
                }
                else if(!isMovingDown && i === searchResultElements.length - 1) {
                    (searchResultElement as HTMLElement).dataset.isCurrentStation = "true"
                }
            }
            else if(i === nextStationIndex) (searchResultElement as HTMLElement).dataset.isCurrentStation = "true"
        })

    }

    const handlePressedKey = (event: KeyboardEvent<HTMLInputElement>) => {
        if(!KEYBOARD_KEYS.some((KEYBOARD_KEY) => KEYBOARD_KEY.code === event.key) || !searchResults.length) return;
        if(event.key === KEYBOARD_KEYS.find((KEYBOARD_KEY) => KEYBOARD_KEY.key === 'enter')?.code) {
            onSelectResult()
        }
        else {
            handleMovingInList(event.key === KEYBOARD_KEYS.find((KEYBOARD_KEY) => KEYBOARD_KEY.key === 'arrowDown')?.code)
        }
    }

    const onHoverOnElement = () => {
        const searchResultElements = Array.from(document.querySelectorAll('.search-result'));

        searchResultElements?.map((searchResultElement) => {
            delete (searchResultElement as HTMLElement).dataset.isCurrentStation;
        })
    }

    return (
        <div className='w-full max-w-md mb-8 relative'>
            <input 
                onKeyDown={(e) => handlePressedKey(e)}
                type="search" 
                className="bg-light-gray py-1 px-4 w-full rounded text-medium-gray selection:bg-primary-color selection:text-white"
                onChange={(e) => onTextChange(e)}
                value={inputText}
                placeholder={placeholder}
            />
            {
                textAlreadyWritten ? 
                    <div className='w-full absolute max-h-48 overflow-y-auto bg-white rounded text-left text-primary-color mt-1'>
                        {searchResults.length ?
                                searchResults?.map((result, i) => <span onMouseEnter={() => onHoverOnElement()} key={result.value} data-is-current-station={"false"} data-index={i} className='p-2 block search-result'>
                                    {result.label}
                                </span>)
                            : <span className='p-2 block'>
                                {isLoading ? <FontAwesomeIcon icon={faSpinner} spinPulse className='self-center text-primary-color'/> : "No results found"}
                            </span>
                        }
                    </div>
                : null
            }
        </div>
    )
}

export default DebounceSearchInput;
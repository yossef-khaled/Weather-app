import {ReactNode} from 'react';

interface CardProps {
    classNames: string;
    children: ReactNode | ReactNode[];
}

const Card = ({classNames, children}: CardProps) => {
    return (
        <div className={`p-2rem rounded-md bg-primary-color mt-2 ${classNames}`}>
            {children}
        </div>
    )
}

export default Card;
interface ShimmerProps {
    width: string;
    height: string;
    classNames?: string;
}

const Shimmer = ({width, height, classNames}: ShimmerProps) => {
    return (
        <div className={`${width} ${height} opacity-10 animate-shimmer bg-left rounded-md bg-white bg-gradient-to-r from-gray-300 to-gray-100 ${classNames}`}>
        </div>
    )
}

export default Shimmer;
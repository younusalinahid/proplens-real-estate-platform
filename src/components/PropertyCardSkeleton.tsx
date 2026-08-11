function PropertyCardSkeleton () {
    return (
        <div className="rounded-lg overflow-hidden border border-gray-200 animate-pulse">
            <div className="w-full h-48 bg-gray-200" />
            <div className="p-4">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
                <div className="h-5 bg-gray-200 rounded w-1/3" />
            </div>
        </div>
    )
}

export default PropertyCardSkeleton;
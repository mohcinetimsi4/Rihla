function DestinationCard({ image, title, rating, description }) {
    return (
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

            <img
                src={image}
                className="w-full h-40 object-cover"
            />

            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-sm">{title}</h3>
                    <span className="text-orange-500 text-sm">⭐ {rating}</span>
                </div>

                <p className="text-xs text-gray-500">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default DestinationCard;
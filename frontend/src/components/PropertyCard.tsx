import { Heart } from "lucide-react";

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string;
}

interface PropertyCardProps {
  property: Property;
  isFavourite: boolean;
  onToggleFavourite: (id: string) => void;
}

const PropertyCard = ({
  property,
  isFavourite,
  onToggleFavourite,
}: PropertyCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <img
        src={property.imageUrl}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">
            {property.title}
          </h3>
          <button
            onClick={() => onToggleFavourite(property.id)}
            className={`p-1.5 rounded-full transition-colors ${
              isFavourite
                ? "bg-red-50 text-red-500"
                : "bg-gray-50 text-gray-400 hover:text-red-500"
            }`}
          >
            <Heart size={20} fill={isFavourite ? "currentColor" : "none"} />
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-1">{property.location}</p>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {property.description}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-indigo-600">
            ${property.price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

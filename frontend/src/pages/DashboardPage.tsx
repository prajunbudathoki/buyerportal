import { useState, useEffect } from "react";
import { LogOut, LayoutDashboard, Heart } from "lucide-react";
import api from "../utils/api";
import PropertyCard, { Property } from "../components/PropertyCard";
import { User } from "../hooks/useAuth";

interface DashboardPageProps {
  user: User;
  onLogout: () => void;
}

const DashboardPage = ({ user, onLogout }: DashboardPageProps) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [favouriteIds, setFavouriteIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState<"all" | "favourites">("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [propsRes, favRes] = await Promise.all([
        api.get("/properties"),
        api.get("/favourites"),
      ]);
      setProperties(propsRes.data);
      setFavouriteIds(favRes.data.map((p: Property) => p.id));
    } catch (err: any) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavourite = async (propertyId: string) => {
    const isFavourite = favouriteIds.includes(propertyId);
    try {
      if (isFavourite) {
        await api.delete(`/favourites/${propertyId}`);
        setFavouriteIds(favouriteIds.filter((id) => id !== propertyId));
      } else {
        await api.post("/favourites", { propertyId });
        setFavouriteIds([...favouriteIds, propertyId]);
      }
    } catch (err: any) {
      console.error("Error toggling favourite", err);
    }
  };

  const displayedProperties =
    view === "all"
      ? properties
      : properties.filter((p) => favouriteIds.includes(p.id));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">
                BuyerPortal
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right mr-4 hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 uppercase">{user.role}</p>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut size={20} className="mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
          <h1 className="text-3xl font-extrabold text-gray-900">
            {view === "all" ? "Available Properties" : "My Favourites"}
          </h1>
          <div className="flex bg-white rounded-lg shadow-sm p-1 border">
            <button
              onClick={() => setView("all")}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                view === "all"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <LayoutDashboard size={18} className="mr-2" />
              All Properties
            </button>
            <button
              onClick={() => setView("favourites")}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                view === "favourites"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Heart size={18} className="mr-2" />
              Favourites ({favouriteIds.length})
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {displayedProperties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">No properties found.</p>
            {view === "favourites" && (
              <button
                onClick={() => setView("all")}
                className="mt-4 text-indigo-600 hover:underline"
              >
                Go browse some properties!
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavourite={favouriteIds.includes(property.id)}
                onToggleFavourite={toggleFavourite}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;

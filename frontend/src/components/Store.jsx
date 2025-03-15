import React, { useState, useMemo } from "react";
import { Search, Coins, Shield, Magnet, Rocket, Target, ZapOff, Zap, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Item Card Component
const ItemCard = ({ item, onBuy, onUse }) => {
  const getItemIcon = (name) => {
    switch (name) {
      case "coin_doubler":
        return <Coins className="w-8 h-8" />;
      case "shield":
        return <Shield className="w-8 h-8" />;
      case "magnet":
        return <Magnet className="w-8 h-8" />;
      case "booster":
        return <Rocket className="w-8 h-8" />;
      case "ammo":
        return <Target className="w-8 h-8" />;
      default:
        return <Coins className="w-8 h-8" />;
    }
  };

  const getItemName = (name) => {
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400">
          {getItemIcon(item.name)}
        </div>

        <h3 className="text-xl font-bold text-white">{getItemName(item.name)}</h3>

        <div className="flex items-center gap-2 text-yellow-400">
          <Coins className="w-4 h-4" />
          <span>{item.cost}</span>
        </div>

        <div className="bg-blue-900/30 px-3 py-1 rounded-full text-blue-300">Count: {item.count}</div>

        <div className="flex gap-3 w-full">
          <button
            onClick={() => onBuy(item)}
            disabled={!item.canBuy}
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ${
              item.canBuy ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            {item.canBuy ? <Zap className="w-4 h-4" /> : <ZapOff className="w-4 h-4" />}
            Buy
          </button>

          <button
            onClick={() => onUse(item)}
            disabled={item.count === 0}
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ${
              item.count > 0 ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Rocket className="w-4 h-4" />
            Use
          </button>
        </div>
      </div>
    </div>
  );
};

// Search Bar Component
const SearchBar = ({ value, onChange }) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search items..."
      className="w-full md:w-96 pl-10 pr-4 py-2 bg-gray-800/50 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-200"
    />
  </div>
);

// Main Store Component
const SpaceStore = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Static data
  const [userCoins, setUserCoins] = useState(500); // Hardcoded coin count
  const [items, setItems] = useState([
    { id: 1, name: "coin_doubler", cost: 100, count: 2, canBuy: true },
    { id: 2, name: "shield", cost: 200, count: 1, canBuy: false },
    { id: 3, name: "magnet", cost: 150, count: 3, canBuy: true },
    { id: 4, name: "booster", cost: 250, count: 0, canBuy: true },
    { id: 5, name: "ammo", cost: 300, count: 5, canBuy: true },
  ]);

  // Search filtering
  const filteredItems = useMemo(() => {
    return items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [items, searchQuery]);

  // Handle Buy (mock)
  const handleBuy = (item) => {
    if (!item.canBuy || userCoins < item.cost) return;
    setUserCoins(userCoins - item.cost);
    setItems(items.map((i) => (i.id === item.id ? { ...i, count: i.count + 1 } : i)));
    alert("Item purchased successfully!");
  };

  // Handle Use (mock)
  const handleUse = (item) => {
    if (item.count === 0) return;
    setItems(items.map((i) => (i.id === item.id ? { ...i, count: i.count - 1 } : i)));
    alert("Item used successfully!");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-gray-900 to-black text-white">
      <div className="container mx-auto p-4 md:p-8 relative z-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Mission Control</span>
        </button>

        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Space Station Store.<br />Coins Left: {userCoins}
            </h1>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Search className="w-12 h-12 mb-4" />
              <p className="text-xl">No items found matching your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <ItemCard key={item.id} item={item} onBuy={handleBuy} onUse={handleUse} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpaceStore;

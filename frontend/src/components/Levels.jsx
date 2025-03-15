import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Rocket, Trophy, Lock, Play, RefreshCw, User, ShoppingCart } from "lucide-react";

const levels = [
  { id: 1, from: "Pluto", to: "Neptune", distance: 1.43e9 },
  { id: 2, from: "Neptune", to: "Uranus", distance: 1.61e9 },
  { id: 3, from: "Uranus", to: "Saturn", distance: 1.27e9 },
  { id: 4, from: "Saturn", to: "Jupiter", distance: 6.46e8 },
  { id: 5, from: "Jupiter", to: "Mars", distance: 5.50e8 },
  { id: 6, from: "Mars", to: "Earth", distance: 2.25e8 },
];

const StarField = () => {
  const stars = Array(100)
    .fill(0)
    .map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      animationDelay: `${Math.random() * 3}s`,
    }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

export default function Levels() {
  const navigate = useNavigate();
  const [currentRun, setCurrentRun] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "Guest"; 
    setUsername(storedUsername);
  }, []);

  const handleLevelNavigation = (levelId) => {
    if (levelId <= (currentRun?.level || 1)) {
      navigate(`/level${levelId}`);
    }
  };

  const handleStoreNavigation = () => {
    navigate('/store');
  };

  const handleAuth = () => {
    navigate("/auth");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-gray-900 text-white p-8 relative overflow-hidden">
      <StarField />
      <div className="max-w-7xl mx-auto relative">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Rocket className="w-10 h-10 text-blue-400" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Cosmic Journey
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex flex-col items-center bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-xl border border-purple-500/20">
              <Trophy className="w-8 h-8 text-yellow-400 mb-2" />
              <div className="font-semibold text-purple-200">Current Level</div>
              <div className="text-2xl font-bold text-yellow-400">{currentRun?.level || 1}</div>
            </div>

            {/* Username Display */}
            <div className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-purple-500/20" onClick={handleAuth}>
              <User className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-semibold text-white">{username}</span>
            </div>

            {/* Store Button */}
            <button
              onClick={handleStoreNavigation}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 transition-colors px-6 py-3 rounded-xl border border-purple-400/30"
            >
              <ShoppingCart className="w-6 h-6 text-white" />
              <span className="font-semibold">Ship Store</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level) => (
            <div
              key={level.id}
              className={`bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                level.id > (currentRun?.level || 1) ? "opacity-50" : ""
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-purple-200">Level {level.id}</h2>
                  {level.id > (currentRun?.level || 1) ? (
                    <Lock className="w-6 h-6 text-gray-400" />
                  ) : (
                    <Star className="w-6 h-6 text-yellow-400" />
                  )}
                </div>
                <div className="space-y-4">
                  <p className="text-blue-300">
                    <span className="font-semibold">{level.from}</span> →{" "}
                    <span className="font-semibold">{level.to}</span>
                  </p>
                  <p className="text-lg font-semibold text-purple-200">
                    Distance: {(level.distance / 1e6).toFixed(2)} million km
                  </p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          level.id === currentRun?.level
                            ? currentRun?.progress
                            : level.id < (currentRun?.level || 1)
                            ? 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <button
                    className={`w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 ${
                      level.id <= (currentRun?.level || 1)
                        ? "bg-blue-600/50 hover:bg-blue-600/70 text-white border border-blue-500/20"
                        : "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={level.id > (currentRun?.level || 1)}
                    onClick={() => handleLevelNavigation(level.id)}
                  >
                    {level.id <= (currentRun?.level || 1) ? (
                      <>
                        {level.id < (currentRun?.level || 1) ? (
                          <RefreshCw className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )}
                        <span>{level.id < (currentRun?.level || 1) ? "Replay Mission" : "Launch Mission"}</span>
                      </>
                    ) : (
                      <span>Mission Locked</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
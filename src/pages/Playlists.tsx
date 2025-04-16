
import React from 'react';
import { Play, MoreHorizontal, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for playlists
const playlists = [
  {
    id: 1,
    title: "Summer Vibes",
    description: "Perfect for those sunny days",
    coverUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    songCount: 24,
    duration: "1h 42m",
  },
  {
    id: 2,
    title: "Chill Out",
    description: "Relax and unwind with these tracks",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    songCount: 18,
    duration: "1h 15m",
  },
  {
    id: 3,
    title: "Workout Mix",
    description: "High energy beats to keep you moving",
    coverUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    songCount: 32,
    duration: "2h 10m",
  },
  {
    id: 4,
    title: "Focus Flow",
    description: "Concentration enhancing instrumentals",
    coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    songCount: 15,
    duration: "1h 24m",
  },
  {
    id: 5,
    title: "Throwback Hits",
    description: "Classic songs from the past decades",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    songCount: 42,
    duration: "3h 12m",
  },
  {
    id: 6,
    title: "Late Night Drive",
    description: "Perfect soundtrack for night drives",
    coverUrl: "https://images.unsplash.com/photo-1493225458945-fb3a42a269b3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    songCount: 28,
    duration: "2h 05m",
  },
];

const Playlists: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-white">Your <span className="italic">Playlists</span></h1>
        
        <button className="flex items-center gap-2 glass-morphism px-4 py-2 rounded-full text-white hover:bg-white/10 transition-all duration-300">
          <PlusCircle size={18} />
          <span>Create Playlist</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map(playlist => (
          <Link key={playlist.id} to={`/playlist/${playlist.id}`} className="block">
            <div className="glass-morphism rounded-2xl overflow-hidden group hover-lift">
              <div className="relative h-48">
                <img 
                  src={playlist.coverUrl} 
                  alt={playlist.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-xl font-bold text-white">{playlist.title}</h3>
                  <p className="text-sm text-gray-300">{playlist.description}</p>
                </div>
                
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 rounded-full glass-morphism hover:bg-white/20 transition-colors">
                    <MoreHorizontal size={18} className="text-white" />
                  </button>
                </div>
                
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    className="p-3 rounded-full bg-fuzzler-500 hover:bg-fuzzler-400 transition-colors shadow-lg hover:shadow-fuzzler-500/30 transform hover:scale-105 active:scale-95"
                    onClick={(e) => {
                      e.preventDefault();
                      // Play logic would go here
                    }}
                  >
                    <Play size={18} className="text-white" fill="white" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{playlist.songCount} songs</span>
                  <span>{playlist.duration}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Playlists;

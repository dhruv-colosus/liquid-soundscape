
import React from 'react';
import { Play, Clock, Heart } from 'lucide-react';

// Mock data for recently played
const recentlyPlayed = [
  {
    id: 1,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    coverUrl: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    playedAt: "Today, 2:45 PM",
    duration: "5:55"
  },
  {
    id: 2,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    coverUrl: "https://images.unsplash.com/photo-1598387846148-47e82ee120cc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    playedAt: "Today, 1:30 PM",
    duration: "3:22"
  },
  {
    id: 3,
    title: "Bad Guy",
    artist: "Billie Eilish",
    album: "When We All Fall Asleep, Where Do We Go?",
    coverUrl: "https://images.unsplash.com/photo-1598550473832-a7c3a51b1ebd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    playedAt: "Yesterday, 9:15 PM",
    duration: "3:14"
  },
  {
    id: 4,
    title: "DNA",
    artist: "Kendrick Lamar",
    album: "DAMN.",
    coverUrl: "https://images.unsplash.com/photo-1604077137850-c6d2e2a44cce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    playedAt: "Yesterday, 8:20 PM",
    duration: "2:59"
  },
  {
    id: 5,
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    album: "X",
    coverUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    playedAt: "Yesterday, 6:40 PM",
    duration: "4:41"
  },
  {
    id: 6,
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷",
    coverUrl: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    playedAt: "Yesterday, 6:35 PM",
    duration: "3:53"
  },
  {
    id: 7,
    title: "Uptown Funk",
    artist: "Mark Ronson ft. Bruno Mars",
    album: "Uptown Special",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    playedAt: "2 days ago",
    duration: "4:30"
  },
  {
    id: 8,
    title: "Someone Like You",
    artist: "Adele",
    album: "21",
    coverUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    playedAt: "2 days ago",
    duration: "4:45"
  },
  {
    id: 9,
    title: "Believer",
    artist: "Imagine Dragons",
    album: "Evolve",
    coverUrl: "https://images.unsplash.com/photo-1493225458945-fb3a42a269b3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    playedAt: "3 days ago",
    duration: "3:24"
  },
  {
    id: 10,
    title: "Take Me to Church",
    artist: "Hozier",
    album: "Hozier",
    coverUrl: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    playedAt: "3 days ago",
    duration: "4:02"
  }
];

const RecentlyPlayed: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-white">Recently <span className="italic">Played</span></h1>
        
        <div className="flex gap-4">
          <button className="flex items-center gap-2 glass-morphism px-4 py-2 rounded-full text-white hover:bg-white/10 transition-all duration-300">
            <Clock size={16} />
            <span>Sort by Time</span>
          </button>
        </div>
      </div>
      
      <div className="glass-morphism rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <div className="grid grid-cols-12 gap-4 text-sm text-gray-400 px-2">
            <div className="col-span-1">#</div>
            <div className="col-span-5 md:col-span-4">Title</div>
            <div className="hidden md:block md:col-span-3">Album</div>
            <div className="col-span-4 md:col-span-2">Played</div>
            <div className="col-span-2 flex justify-end">Duration</div>
          </div>
        </div>
        
        <div className="divide-y divide-white/5">
          {recentlyPlayed.map((track, index) => (
            <div 
              key={track.id} 
              className="p-2 hover:bg-white/5 group transition-colors duration-200"
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1 flex items-center justify-center">
                  <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
                  <button className="hidden group-hover:block text-white">
                    <Play size={16} fill="white" />
                  </button>
                </div>
                
                <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                  <img 
                    src={track.coverUrl} 
                    alt={track.title}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div className="min-w-0">
                    <h4 className="text-white text-sm font-medium truncate">{track.title}</h4>
                    <p className="text-gray-400 text-xs truncate">{track.artist}</p>
                  </div>
                </div>
                
                <div className="hidden md:block md:col-span-3 text-gray-400 text-sm truncate">
                  {track.album}
                </div>
                
                <div className="col-span-4 md:col-span-2 text-gray-400 text-sm">
                  {track.playedAt}
                </div>
                
                <div className="col-span-2 flex items-center justify-end gap-3">
                  <button className="text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                    <Heart size={16} />
                  </button>
                  <span className="text-gray-400 text-sm">{track.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyPlayed;


import React, { useState } from 'react';
import AlbumCarousel from '@/components/AlbumCarousel';
import Background from '@/components/Background';
import { usePlayer } from '@/context/PlayerContext';

// Mock data for the music player
const albums = [
  {
    id: 1,
    title: "Dreamland",
    artist: "Glass Animals",
    coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2500&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    coverUrl: "https://images.unsplash.com/photo-1598387846148-47e82ee120cc?q=80&w=2500&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "After Hours",
    artist: "The Weeknd",
    coverUrl: "https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?q=80&w=2500&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Random Access Memories",
    artist: "Daft Punk",
    coverUrl: "https://images.unsplash.com/photo-1602848597941-0d3d3a2c1241?q=80&w=2500&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Dark Side of the Moon",
    artist: "Pink Floyd",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2500&auto=format&fit=crop",
  },
];

const songs = [
  { id: 1, title: "Heat Waves", artist: "Glass Animals", duration: 238, albumId: 1 },
  { id: 2, title: "Tangerine", artist: "Glass Animals", duration: 202, albumId: 1 },
  { id: 3, title: "Levitating", artist: "Dua Lipa", duration: 203, albumId: 2 },
  { id: 4, title: "Blinding Lights", artist: "The Weeknd", duration: 200, albumId: 3 },
  { id: 5, title: "Get Lucky", artist: "Daft Punk", duration: 248, albumId: 4 },
];

const favorites = [
  { id: 1, title: "Heat Waves", artist: "Glass Animals", albumId: 1, coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2500&auto=format&fit=crop" },
  { id: 3, title: "Levitating", artist: "Dua Lipa", albumId: 2, coverUrl: "https://images.unsplash.com/photo-1598387846148-47e82ee120cc?q=80&w=2500&auto=format&fit=crop" },
  { id: 4, title: "Blinding Lights", artist: "The Weeknd", albumId: 3, coverUrl: "https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?q=80&w=2500&auto=format&fit=crop" },
  { id: 5, title: "Get Lucky", artist: "Daft Punk", albumId: 4, coverUrl: "https://images.unsplash.com/photo-1602848597941-0d3d3a2c1241?q=80&w=2500&auto=format&fit=crop" },
];

const Favorites: React.FC = () => {
  const [dominantColor, setDominantColor] = useState('#0d93ea');
  const { setCurrentAlbum, setCurrentSong, togglePlayPause } = usePlayer();

  const handleSelectAlbum = (album: typeof albums[0]) => {
    // Find the first song from this album
    const firstSong = songs.find(song => song.albumId === album.id);
    if (firstSong) {
      // Set the selected album and song in the global player context
      setCurrentAlbum(album);
      setCurrentSong(firstSong);
      // Automatically start playing when a new album is selected
      togglePlayPause();
    }
    
    // Simulate extracting dominant color from album cover
    const colors = ['#0d93ea', '#e91e63', '#ff9800', '#673ab7', '#009688'];
    setDominantColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden pb-24">
      <Background dominantColor={dominantColor} />
      
      <main className="pt-16 pb-16 px-4 md:px-8 mx-auto w-full max-w-6xl">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
            Your <span className="italic text-fuzzler-400">Favorites</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Your most loved albums and tracks, all in one place
          </p>
        </div>
        
        <AlbumCarousel 
          albums={albums} 
          onSelectAlbum={handleSelectAlbum} 
        />
        
        <div className="mt-16">
          <h2 className="text-2xl font-display font-bold text-white mb-6">Favorite Tracks</h2>
          <div className="grid gap-4">
            {favorites.map(track => (
              <div 
                key={track.id}
                className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 transition-all group cursor-pointer"
                onClick={() => {
                  const album = albums.find(a => a.id === track.albumId);
                  if (album) {
                    setCurrentAlbum(album);
                    setCurrentSong({ 
                      id: track.id, 
                      title: track.title, 
                      artist: track.artist, 
                      duration: 0, 
                      albumId: track.albumId 
                    });
                    togglePlayPause();
                  }
                }}
              >
                <div className="w-12 h-12 rounded-md overflow-hidden">
                  <img 
                    src={track.coverUrl} 
                    alt={track.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{track.title}</h3>
                  <p className="text-white/60 text-sm">{track.artist}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-8 w-8 rounded-full bg-fuzzler-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Favorites;

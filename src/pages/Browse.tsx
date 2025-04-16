import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Clock, Star, Disc, Music, Flame } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Background from '@/components/Background';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '@/context/SearchContext';

// Mock data for browsing
const categories = [
  { id: 1, name: "Top Hits", icon: <TrendingUp size={18} /> },
  { id: 2, name: "New Releases", icon: <Clock size={18} /> },
  { id: 3, name: "Featured", icon: <Star size={18} /> },
  { id: 4, name: "Albums", icon: <Disc size={18} /> },
  { id: 5, name: "Genres", icon: <Music size={18} /> },
  { id: 6, name: "Trending", icon: <Flame size={18} /> },
];

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
  {
    id: 6,
    title: "Cosmic Echoes",
    artist: "Stellar Dreams",
    coverUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=2500&auto=format&fit=crop",
  },
];

const featuredBanners = [
  {
    id: 1,
    title: "Discover Weekly",
    description: "Your personal playlist, updated every Monday",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2500&auto=format&fit=crop",
    color: "from-purple-600/80 to-fuzzler-700/80",
  },
  {
    id: 2,
    title: "New Releases",
    description: "Stay updated with the latest music",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2500&auto=format&fit=crop",
    color: "from-orange-500/80 to-red-600/80",
  },
  {
    id: 3,
    title: "Coding Focus",
    description: "Music to help you concentrate",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2500&auto=format&fit=crop",
    color: "from-blue-600/80 to-teal-500/80",
  },
];

const Browse: React.FC = () => {
  const navigate = useNavigate();
  const [dominantColor, setDominantColor] = useState('#0d93ea');
  const { searchQuery, setSearchQuery, isSearching, searchResults } = useSearch();
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [localSearchResults, setLocalSearchResults] = useState<typeof albums>([]);

  // Handle input changes for local search
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearchQuery);
  };

  // Use the global search when it's active
  useEffect(() => {
    if (isSearching && searchQuery) {
      // Filter albums based on search query (this uses local data as fallback)
      const results = albums.filter(album =>
        album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setLocalSearchResults(results);
    } else if (localSearchQuery) {
      // Use the local search if there's a query but global search isn't active
      const results = albums.filter(album =>
        album.title.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
        album.artist.toLowerCase().includes(localSearchQuery.toLowerCase())
      );
      setLocalSearchResults(results);
    } else {
      setLocalSearchResults([]);
    }
  }, [searchQuery, isSearching, localSearchQuery]);

  // Function to handle playlist click
  const handlePlaylistClick = (playlistId: number) => {
    navigate(`/playlist/${playlistId}`);
  };

  // Function to handle category click
  const handleCategoryClick = (categoryId: number) => {
    // Navigate to a category specific page
    // For now we'll just navigate to a mock playlist based on the category
    navigate(`/playlist/${categoryId}`);
  };

  // Function to handle album click
  const handleAlbumClick = (albumId: number) => {
    navigate(`/album/${albumId}`);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden pb-24">
      <Background dominantColor={dominantColor} />

      <main className="pt-20 pb-16 px-4 md:px-8 mx-auto w-full max-w-6xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
            Browse & <span className="italic text-fuzzler-400">Discover</span>
          </h1>

          <form onSubmit={handleSearch} className="relative mb-8">
            <div className="glass-morphism rounded-full flex items-center p-1 pr-2 overflow-hidden">
              <input
                type="text"
                value={localSearchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search for artists, albums, or songs..."
                className="bg-transparent w-full px-4 py-2 text-white outline-none placeholder:text-white/50"
              />
              <Button
                type="submit"
                size="sm"
                className="rounded-full bg-fuzzler-600 hover:bg-fuzzler-500 text-white transition-all duration-300"
              >
                <Search size={16} className="mr-1" />
                <span>Search</span>
              </Button>
            </div>
          </form>

          {localSearchResults.length > 0 || (isSearching && searchResults.length > 0) ? (
            <div className="mb-8 animate-fade-in">
              <h2 className="text-xl font-medium text-white mb-4">Search Results</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {isSearching && searchResults.length > 0 ? (
                  // Global search results from context
                  searchResults.map(item => (
                    <div
                      key={item.id}
                      className="album-card ripple-effect cursor-pointer transform transition-transform hover:scale-105"
                      onClick={() => item.type === 'playlist'
                        ? handlePlaylistClick(Number(item.id))
                        : handleAlbumClick(Number(item.id))
                      }
                    >
                      <img src={item.coverImage} alt={item.title} className="w-full aspect-square object-cover rounded-xl" />
                      <div className="mt-2">
                        <h3 className="text-white font-medium text-sm truncate">{item.title}</h3>
                        <p className="text-white/70 text-xs truncate">{item.artist || (item.type === 'playlist' ? 'Playlist' : '')}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  // Local search results
                  localSearchResults.map(album => (
                    <div
                      key={album.id}
                      className="album-card ripple-effect cursor-pointer transform transition-transform hover:scale-105"
                      onClick={() => handleAlbumClick(album.id)}
                    >
                      <img src={album.coverUrl} alt={album.title} className="w-full aspect-square object-cover rounded-xl" />
                      <div className="mt-2">
                        <h3 className="text-white font-medium text-sm truncate">{album.title}</h3>
                        <p className="text-white/70 text-xs truncate">{album.artist}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-xl font-medium text-white mb-4">Featured Playlists</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {featuredBanners.map(banner => (
                    <div
                      key={banner.id}
                      className="search-banner ripple-effect cursor-pointer transform transition-transform hover:scale-[1.02]"
                      onClick={() => handlePlaylistClick(banner.id)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r opacity-80 z-10 rounded-2xl" style={{ backgroundImage: `linear-gradient(to right, ${banner.color.split(" ")[0].replace("from-", "")}, ${banner.color.split(" ")[1].replace("to-", "")})` }}></div>
                      <img
                        src={banner.imageUrl}
                        alt={banner.title}
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 z-20 p-4 flex flex-col justify-end">
                        <h3 className="text-white text-xl font-bold">{banner.title}</h3>
                        <p className="text-white/80 text-sm">{banner.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-medium text-white mb-4">Browse Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {categories.map(category => (
                    <Button
                      key={category.id}
                      variant="outline"
                      className="glass-morphism border-white/10 hover:bg-white/10 hover-lift ripple-effect h-auto py-4 flex flex-col gap-2 cursor-pointer"
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <div className="w-10 h-10 rounded-full bg-fuzzler-600/20 flex items-center justify-center text-fuzzler-400">
                        {category.icon}
                      </div>
                      <span className="text-sm font-medium">{category.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-medium text-white mb-4">Trending Albums</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {albums.map(album => (
                    <div
                      key={album.id}
                      className="album-card ripple-effect cursor-pointer transform transition-transform hover:scale-105"
                      onClick={() => handleAlbumClick(album.id)}
                    >
                      <img src={album.coverUrl} alt={album.title} className="w-full aspect-square object-cover rounded-xl" />
                      <div className="mt-2">
                        <h3 className="text-white font-medium text-sm truncate">{album.title}</h3>
                        <p className="text-white/70 text-xs truncate">{album.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Browse;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MusicGlobe from '@/components/MusicGlobe';
import PlaylistSection from '@/components/PlaylistSection';
import RecentlyPlayed from '@/components/RecentlyPlayed';
import Background from '@/components/Background';
import { usePlayer } from '@/context/PlayerContext';
import { Play, Headphones, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { featuredAlbum, trendingArtists, albums } from '@/data/albums';
import { featuredPlaylists } from '@/data/playlists';
import { songs } from '@/data/songs';
import { usePlaySong } from '@/utils/songUtils';

const recentlyPlayed = [
  {
    id: 1,
    title: "Evil Jordan",
    artist: "Playboi Carti",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=600&auto=format&fit=crop",
    playTime: "2h ago"
  },
  {
    id: 2,
    title: "My Eyes",
    artist: "Travis Scott",
    coverUrl: "https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?q=80&w=600&auto=format&fit=crop",
    playTime: "Yesterday"
  },
  {
    id: 3,
    title: "Parda",
    artist: "Shreya Ghoshal",
    coverUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop",
    playTime: "3 days ago"
  },
];

const Index: React.FC = () => {
  const [dominantColor, setDominantColor] = useState('#0d93ea');
  const navigate = useNavigate();
  const { togglePlayPause } = usePlayer();
  const { play } = usePlaySong();

  const handleSelectAlbum = (album: typeof albums[0]) => {
    // Find the first song from this album
    const firstSong = songs.find(song => song.album === album.title);
    if (firstSong) {
      // Play the song using our utility (which ensures a real audio file is used)
      play(firstSong);
    }

    // Simulate extracting dominant color from album cover
    const colors = ['#0d93ea', '#e91e63', '#ff9800', '#673ab7', '#009688'];
    setDominantColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  const handleFeaturedAlbumPlay = () => {
    // Navigate to the first featured playlist
    navigate('/playlist/featured-1');
  };

  const handleArtistClick = (artist: typeof trendingArtists[0]) => {
    // Extract artist ID number
    const artistIdNum = parseInt(artist.id.split('-')[1]);

    // Map artist IDs to featured playlist IDs
    const playlistIds = ['featured-1', 'featured-2', 'featured-3'];
    const playlistId = artistIdNum <= 3 ? playlistIds[artistIdNum - 1] : playlistIds[0];

    navigate(`/playlist/${playlistId}`);
  };

  const handleRecentlyPlayedClick = (track: typeof recentlyPlayed[0]) => {
    const song = songs.find(s => s.title === track.title && s.artist === track.artist);
    if (song) {
      // Play the song using our utility (which ensures a real audio file is used)
      play(song);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden pb-12 sm:pb-16 md:pb-24">
      <Background dominantColor={dominantColor} />

      <main className="pt-3 sm:pt-6 md:pt-8 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6 md:px-8 mx-auto w-full max-w-6xl">
        {/* Hero Section */}
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 mb-8 md:mb-16 mt-2 sm:mt-4 md:mt-8">
          {/* Left Hero Content - 3 columns */}
          <div className="md:col-span-1 lg:col-span-3 flex flex-col justify-center order-1 md:order-1">
            <div className="text-center md:text-left animate-fade-in">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
                Discover the Future of <span className="italic text-fuzzler-400">Music</span> Today
              </h1>
              <p className="text-gray-400 mb-5 max-w-xl mx-auto md:mx-0 text-sm sm:text-base">
                Explore our vast collection of albums and playlists, expertly curated to match your unique taste and elevate your listening experience
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-5">
                <Button className="bg-fuzzler-500 hover:bg-fuzzler-400 text-white h-10 px-4" onClick={() => navigate('/browse')}>
                  <Play className="mr-2 h-4 w-4" fill="white" />
                  Start Listening
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-10 px-4" onClick={() => navigate('/playlists')}>
                  <Headphones className="mr-2 h-4 w-4" />
                  Browse Playlists
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 max-w-sm mx-auto md:mx-0">
                <div className="flex flex-col items-center p-2 sm:p-3 bg-black/20 rounded-lg">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">40M+</span>
                  <span className="text-xs sm:text-sm text-gray-400">Songs</span>
                </div>
                <div className="flex flex-col items-center p-2 sm:p-3 bg-black/20 rounded-lg">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">2.5M+</span>
                  <span className="text-xs sm:text-sm text-gray-400">Artists</span>
                </div>
                <div className="flex flex-col items-center p-2 sm:p-3 bg-black/20 rounded-lg">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">15M+</span>
                  <span className="text-xs sm:text-sm text-gray-400">Listeners</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Content - 2 columns */}
          <div className="md:col-span-1 lg:col-span-2 flex flex-col space-y-5 order-2 md:order-2 mt-6 md:mt-0">
            {/* Featured Album Card */}
            <div className="glass-morphism rounded-xl overflow-hidden hover:scale-102 transition-transform duration-300">
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-medium text-white mb-3">Featured Album</h3>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={featuredAlbum.coverUrl}
                      alt={featuredAlbum.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/fallback-album-cover.jpg";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg text-white font-bold mb-1 truncate">{featuredAlbum.title}</h4>
                    <p className="text-sm text-gray-400 mb-1">{featuredAlbum.artist}</p>
                    <p className="text-xs text-gray-500 mb-2">{featuredAlbum.tracks} tracks • {featuredAlbum.duration}</p>
                    <p className="text-xs sm:text-sm text-gray-300 mb-3 line-clamp-2 hidden sm:block">{featuredAlbum.description}</p>
                    <Button
                      size="sm"
                      className="bg-fuzzler-500 hover:bg-fuzzler-400 h-8 w-full sm:w-auto px-3"
                      onClick={handleFeaturedAlbumPlay}
                    >
                      <Play className="h-3 w-3 mr-1.5" fill="white" />
                      Play Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Trending Artists */}
            <div className="glass-morphism rounded-xl overflow-hidden">
              <div className="p-4">
                <h3 className="text-base sm:text-lg font-medium text-white mb-3">Trending Artists</h3>
                <div className="grid grid-cols-1 gap-2">
                  {trendingArtists.slice(0, 3).map(artist => (
                    <div
                      key={artist.id}
                      className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors active:bg-white/10"
                      onClick={() => handleArtistClick(artist)}
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={artist.imageUrl}
                          alt={artist.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/fallback-album-cover.jpg";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-medium truncate">{artist.name}</p>
                        <p className="text-xs text-gray-400 truncate">{artist.monthlyListeners.toLocaleString()} monthly listeners</p>
                      </div>
                      <Music className="text-gray-400 h-3.5 w-3.5 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Globe Section */}
        <div className="mt-10 sm:mt-12 md:mt-16 mb-5 sm:mb-8 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Pick any album from around the globe</h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-400 mb-4 sm:mb-6 max-w-md sm:max-w-lg md:max-w-2xl mx-auto px-1">
            Explore our diverse collection of music from all corners of the world. Click on any album to discover its playlist.
          </p>
        </div>
        <div className="w-full overflow-hidden -mx-4 px-4">
          <MusicGlobe
            albums={albums}
            onSelectAlbum={handleSelectAlbum}
          />
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 md:gap-8 mt-8 sm:mt-12 md:mt-16">
          <div className="lg:col-span-2">
            <PlaylistSection
              playlists={featuredPlaylists.slice(0, 3)}
            />
          </div>

          <div>
            <RecentlyPlayed
              tracks={recentlyPlayed}
              onTrackClick={handleRecentlyPlayedClick}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

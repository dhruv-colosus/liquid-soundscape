import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Play, Pause, Heart, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePlayer } from '@/context/PlayerContext';
import { featuredPlaylists, userPlaylists } from '@/data/playlists';
import { Song } from '@/data/songs';

// Format seconds to mm:ss format
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const PlaylistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setCurrentAlbum, playSong, isPlaying, togglePlayPause } = usePlayer();

  // Combine featured and user playlists
  const allPlaylists = [...featuredPlaylists, ...userPlaylists];

  // Find the playlist by ID - handle both string IDs and numeric IDs
  const playlist = allPlaylists.find(p => {
    // Case 1: Direct match with the ID as is (e.g., "featured-1")
    if (p.id === id) return true;

    // Case 2: Numeric ID matching (e.g., "1" should match "featured-1")
    if (id && !isNaN(parseInt(id))) {
      const numericId = parseInt(id);
      if (numericId <= 3) {
        // Map 1, 2, 3 to featured playlists 0, 1, 2
        return p.id === `featured-${numericId}`;
      } else if (numericId <= 5) {
        // Map 4, 5 to user playlists 0, 1
        return p.id === `user-${numericId - 3}`;
      }
    }

    return false;
  });

  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Playlist Not Found</h2>
          <Link to="/playlists" className="text-fuzzler-400 hover:underline">
            Return to Playlists
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaySong = (song: Song) => {
    if (song) {
      // Extract the numeric part for the album ID
      const playlistIdParts = playlist.id.split('-');
      const numericId = playlistIdParts.length > 1
        ? parseInt(playlistIdParts[1])
        : parseInt(playlist.id);

      // Create a mock album from the playlist
      const mockAlbum = {
        id: numericId,
        title: playlist.name,
        artist: playlist.createdBy,
        coverUrl: playlist.coverImage
      };

      // Set the album first
      setCurrentAlbum(mockAlbum);

      // Choose which real song file to use based on the song title or artist
      let songFile = '/songs/goatshit.mp3'; // default

      if (song.title === 'Goat Shit' || song.artist === 'King') {
        songFile = '/songs/goatshit.mp3';
      } else if (song.title === 'Timeless' || song.artist === 'The Weeknd') {
        songFile = '/songs/timeless.mp3';
      } else if (song.title === 'My Eyes' || song.artist === 'Travis Scott') {
        songFile = '/songs/myeyes.mp3';
      } else if (song.title === 'Parda' || song.artist === 'Shreya Ghoshal') {
        songFile = '/songs/parda.mp3';
      } else if (song.title === 'Evil Jordan' || song.artist === 'Playboi Carti') {
        songFile = '/songs/eviljordan.mp3';
      }

      // Create PlayerSong object with the real file path
      const playerSong = {
        id: typeof song.id === 'string' ? parseInt(song.id) : song.id,
        title: song.title,
        artist: song.artist,
        duration: song.duration,
        albumId: numericId,
        file: songFile
      };

      console.log(`Playing song: ${song.title} with audio file: ${songFile}`);

      // Use playSong to ensure proper audio handling
      playSong(playerSong);
    }
  };

  const handlePlayPauseClick = () => {
    if (!isPlaying && playlist.songs.length > 0) {
      // If not currently playing, start with the first song
      handlePlaySong(playlist.songs[0]);
    } else {
      // If already playing, just toggle play/pause
      togglePlayPause();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back button */}
      <Link to="/playlists" className="flex items-center text-gray-400 hover:text-white mb-6">
        <ChevronLeft size={20} />
        <span>Back to Playlists</span>
      </Link>

      {/* Playlist header */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="w-48 h-48 flex-shrink-0">
          <img
            src={playlist.coverImage}
            alt={playlist.name}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="flex-1">
          <h5 className="text-gray-400 mb-1">PLAYLIST</h5>
          <h1 className="text-4xl font-serif font-bold text-white mb-2">{playlist.name}</h1>
          <p className="text-gray-400 mb-4">{playlist.description}</p>

          <div className="flex items-center text-sm text-gray-400 mb-6">
            <span>Created by {playlist.createdBy}</span>
            <span className="mx-2">•</span>
            <span>{playlist.followers.toLocaleString()} followers</span>
            <span className="mx-2">•</span>
            <span>{playlist.songs.length} songs</span>
          </div>

          <div className="flex gap-4">
            <Button
              className="bg-fuzzler-500 hover:bg-fuzzler-400 text-white"
              onClick={handlePlayPauseClick}
            >
              {isPlaying ? (
                <Pause className="mr-2 h-4 w-4" />
              ) : (
                <Play className="mr-2 h-4 w-4" fill="white" />
              )}
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Heart className="mr-2 h-4 w-4" />
              Like
            </Button>
          </div>
        </div>
      </div>

      {/* Song list */}
      <div className="glass-morphism rounded-xl overflow-hidden">
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-left border-b border-white/10">
                <th className="py-2 w-10">#</th>
                <th className="py-2">Title</th>
                <th className="py-2 hidden md:table-cell">Album</th>
                <th className="py-2 text-right">
                  <Clock size={16} />
                </th>
                <th className="py-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {playlist.songs.map((song, index) => (
                <tr
                  key={song.id}
                  className="text-left border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => handlePlaySong(song)}
                >
                  <td className="py-3 text-gray-400">{index + 1}</td>
                  <td className="py-3">
                    <div className="flex flex-col">
                      <span className="text-white font-medium">{song.title}</span>
                      <span className="text-sm text-gray-400">{song.artist}</span>
                    </div>
                  </td>
                  <td className="py-3 text-gray-400 hidden md:table-cell">{song.album}</td>
                  <td className="py-3 text-gray-400 text-right">{formatTime(song.duration)}</td>
                  <td className="py-3 text-right">
                    <Heart
                      size={16}
                      className="text-gray-400 hover:text-fuzzler-500"
                      fill="none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetail;

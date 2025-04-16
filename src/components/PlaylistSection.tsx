import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Playlist } from '@/data/playlists';

interface PlaylistSectionProps {
  playlists: Playlist[];
}

const PlaylistSection: React.FC<PlaylistSectionProps> = ({ playlists }) => {
  const navigate = useNavigate();

  const handlePlaylistClick = (playlist: Playlist) => {
    navigate(`/playlist/${playlist.id}`);
  };

  return (
    <div className="mt-12 w-full">
      <h2 className="text-2xl font-display font-bold text-white mb-6">Upcoming Playlists</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {playlists.map(playlist => (
          <div
            key={playlist.id}
            className="group album-card bg-dark-800 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
            onClick={() => handlePlaylistClick(playlist)}
          >
            <div className="relative overflow-hidden">
              <img
                src={playlist.coverImage}
                alt={playlist.name}
                className="w-full aspect-square object-cover transform transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div className="text-white">
                  <p className="text-sm">{playlist.songs.length} tracks</p>
                  <p className="text-xs text-gray-300 mt-1">{playlist.followers.toLocaleString()} followers</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-medium text-sm truncate">{playlist.name}</h3>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{playlist.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistSection;

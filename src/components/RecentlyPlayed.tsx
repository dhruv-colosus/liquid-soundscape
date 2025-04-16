import React from 'react';
import { Clock } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  coverUrl: string;
  playTime: string;
}

interface RecentlyPlayedProps {
  tracks: Track[];
  onTrackClick: (track: Track) => void;
}

const RecentlyPlayed: React.FC<RecentlyPlayedProps> = ({ tracks, onTrackClick }) => {
  return (
    <div className="w-full glass-morphism rounded-2xl p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-display font-semibold text-white">Recently Played</h2>
        <Clock size={18} className="text-gray-400" />
      </div>

      <div className="space-y-4">
        {tracks.map(track => (
          <div
            key={track.id}
            className="flex items-center space-x-4 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            onClick={() => onTrackClick(track)}
          >
            <img
              src={track.coverUrl}
              alt={track.title}
              className="w-12 h-12 rounded-md object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-white truncate">{track.title}</h3>
              <p className="text-xs text-gray-400 truncate">{track.artist}</p>
            </div>
            <span className="text-xs text-gray-400">{track.playTime}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyPlayed;

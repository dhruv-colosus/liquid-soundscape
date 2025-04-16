import { Play, Pause } from 'lucide-react';
import { PlayingIcon } from './PlayingIcon';
import { Song } from '../data/songs';

interface PlaylistItemProps {
    song: Song;
    isPlaying: boolean;
    onPlay: () => void;
    onPause: () => void;
    index: number;
}

export const PlaylistItem = ({ song, isPlaying, onPlay, onPause, index }: PlaylistItemProps) => {
    return (
        <div className="group flex items-center gap-4 p-2 rounded-lg hover:bg-white/5 transition-colors">
            <div className="w-8 text-center text-white/40 group-hover:text-white">
                {isPlaying ? (
                    <PlayingIcon />
                ) : (
                    <span className="text-sm">{index + 1}</span>
                )}
            </div>

            <img
                src={song.coverImage}
                alt={song.title}
                className="w-12 h-12 rounded-md object-cover"
            />

            <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate">{song.title}</h3>
                <p className="text-sm text-white/60 truncate">{song.artist}</p>
            </div>

            <button
                onClick={isPlaying ? onPause : onPlay}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
            >
                {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                ) : (
                    <Play className="w-5 h-5 text-white" />
                )}
            </button>
        </div>
    );
}; 
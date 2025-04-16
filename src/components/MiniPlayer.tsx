import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, ChevronUp } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { usePlayer } from '@/context/PlayerContext';

interface MiniPlayerProps {
  onExpand: () => void;
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({
  onExpand
}) => {
  const {
    currentAlbum,
    currentSong,
    isPlaying,
    volume,
    togglePlayPause,
    playNext,
    playPrevious,
    seekTo,
    setVolume,
    currentTime
  } = usePlayer();

  const [isDragging, setIsDragging] = useState(false);
  const [localProgress, setLocalProgress] = useState(0);

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Update local progress whenever currentTime from audio changes
  useEffect(() => {
    if (!isDragging) {
      setLocalProgress(currentTime);
    }
  }, [currentTime, isDragging]);

  // Reset local progress when song changes
  useEffect(() => {
    setLocalProgress(0);
  }, [currentSong.id]);

  const handleProgressChange = (value: number[]) => {
    const newProgress = value[0];
    setLocalProgress(newProgress);
  };

  const handleProgressDragStart = () => {
    setIsDragging(true);
  };

  const handleProgressDragEnd = () => {
    seekTo(localProgress);
    setIsDragging(false);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  // Desktop layout
  const DesktopLayout = () => (
    <div className="hidden sm:flex sm:items-center sm:justify-between max-w-screen-2xl mx-auto">
      {/* Left section: Song info */}
      <div className="flex items-center gap-3 w-[30%]">
        <div
          className="relative cursor-pointer transform hover:scale-105 transition-transform duration-300"
          onClick={onExpand}
        >
          <img
            src={currentAlbum.coverUrl}
            alt={currentAlbum.title}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 rounded-md transition-opacity duration-200">
            <ChevronUp size={16} className="text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-white truncate">{currentSong.title}</h4>
          <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
        </div>
      </div>

      {/* Center section: Controls and progress */}
      <div className="flex flex-col items-center w-[40%]">
        {/* Playback controls */}
        <div className="flex items-center justify-center gap-6 mb-2">
          <button
            onClick={playPrevious}
            className="p-1 rounded-full hover:bg-white/10 transition-colors ripple-effect"
          >
            <SkipBack size={18} className="text-white/80" />
          </button>

          <button
            onClick={togglePlayPause}
            className="p-2 rounded-full bg-fuzzler-500 hover:bg-fuzzler-400 transition-colors ripple-effect"
          >
            {isPlaying ? <Pause size={18} className="text-white" /> : <Play size={18} className="text-white" />}
          </button>

          <button
            onClick={playNext}
            className="p-1 rounded-full hover:bg-white/10 transition-colors ripple-effect"
          >
            <SkipForward size={18} className="text-white/80" />
          </button>
        </div>

        {/* Progress bar with draggable slider (desktop) */}
        <div className="w-full flex items-center gap-2">
          <span className="text-xs text-gray-400 min-w-[40px] text-right">{formatTime(localProgress)}</span>
          <Slider
            value={[localProgress]}
            max={currentSong.duration}
            step={0.1}
            onValueChange={handleProgressChange}
            onValueCommit={handleProgressDragEnd}
            onPointerDown={handleProgressDragStart}
            className="flex-1 h-1.5 cursor-pointer"
          />
          <span className="text-xs text-gray-400 min-w-[40px]">{formatTime(currentSong.duration)}</span>
        </div>
      </div>

      {/* Right section: Volume */}
      <div className="flex items-center justify-end gap-2 w-[30%]">
        <Volume2 size={18} className="text-gray-400" />
        <Slider
          value={[volume]}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          className="w-24 h-0.5"
        />
      </div>
    </div>
  );

  // Mobile layout
  const MobileLayout = () => (
    <div className="flex flex-col sm:hidden">
      <div className="flex items-center justify-between">
        {/* Left section: Song info */}
        <div className="flex items-center gap-3">
          <div
            className="relative cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={onExpand}
          >
            <img
              src={currentAlbum.coverUrl}
              alt={currentAlbum.title}
              className="w-12 h-12 rounded-md object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 rounded-md transition-opacity duration-200">
              <ChevronUp size={16} className="text-white" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-white truncate">{currentSong.title}</h4>
            <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-end">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={playPrevious}
              className="p-1 rounded-full hover:bg-white/10 transition-colors ripple-effect"
            >
              <SkipBack size={18} className="text-white/80" />
            </button>

            <button
              onClick={togglePlayPause}
              className="p-2 rounded-full bg-fuzzler-500 hover:bg-fuzzler-400 transition-colors ripple-effect"
            >
              {isPlaying ? <Pause size={18} className="text-white" /> : <Play size={18} className="text-white" />}
            </button>

            <button
              onClick={playNext}
              className="p-1 rounded-full hover:bg-white/10 transition-colors ripple-effect"
            >
              <SkipForward size={18} className="text-white/80" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar at bottom */}
      <div className="w-full flex items-center gap-2 mt-2">
        <span className="text-xs text-gray-400 min-w-[40px] text-right">{formatTime(localProgress)}</span>
        <Slider
          value={[localProgress]}
          max={currentSong.duration}
          step={0.1}
          onValueChange={handleProgressChange}
          onValueCommit={handleProgressDragEnd}
          onPointerDown={handleProgressDragStart}
          className="flex-1 h-1.5 cursor-pointer"
        />
        <span className="text-xs text-gray-400 min-w-[40px]">{formatTime(currentSong.duration)}</span>
      </div>
    </div>
  );

  return (
    <div className="w-full glass-morphism backdrop-blur-xl bg-black/40 border-t border-white/10 py-2 px-4 z-50">
      <DesktopLayout />
      <MobileLayout />
    </div>
  );
};

export default MiniPlayer;

import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import { Slider } from '@/components/ui/slider';

const VinylPlayer: React.FC = () => {
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
  const [waveformBars, setWaveformBars] = useState<number[]>([]);

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Generate random waveform bars when song changes
  useEffect(() => {
    const bars = Array.from({ length: 40 }, () => Math.random() * 100);
    setWaveformBars(bars);
  }, [currentSong.id]);

  // Update local progress whenever currentTime from audio changes
  useEffect(() => {
    if (!isDragging) {
      setLocalProgress(currentTime);
    }
  }, [currentTime, isDragging]);

  const handleProgressChange = (value: number[]) => {
    const newProgress = value[0];
    setLocalProgress(newProgress);
  };

  const handleProgressDragStart = () => {
    setIsDragging(true);
  };

  const handleProgressDragEnd = () => {
    // Apply the seek
    seekTo(localProgress);
    setIsDragging(false);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-morphism rounded-3xl p-0 sm:p-3 mt-4 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Vinyl and Album Art */}
        <div className="relative w-56 h-56 perspective-1000 transform-style-3d mt-4 md:mt-0">
          {/* Vinyl Record */}
          <div
            className={`vinyl-record absolute inset-0 ${isPlaying ? 'animate-spin-slow' : ''}`}
            style={{
              clipPath: 'circle(50%)',
              boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8)',
            }}
          >
            <div className="vinyl-grooves"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gray-900 border-4 border-gray-800"></div>
            </div>

            {/* Vinyl Marker */}
            <div className="absolute h-1 w-8 bg-fuzzler-400 top-1/2 right-0 transform -translate-y-1/2 opacity-60"></div>
          </div>

          {/* Album Cover - positioned to partially cover the vinyl */}
          <div
            className={`absolute inset-0 z-10 rounded-full overflow-hidden transition-all duration-500 ease-in-out ${isPlaying ? 'w-1/3 h-1/3 top-1/3 left-1/3' : 'w-full h-full'}`}
            style={{
              clipPath: 'circle(50%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
          >
            <img
              src={currentAlbum.coverUrl}
              alt={currentAlbum.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Song Info and Controls */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="text-center md:text-left mb-3">
            <h2 className="text-2xl font-serif font-bold text-white">{currentSong.title}</h2>
            <p className="text-gray-300">{currentSong.artist}</p>
          </div>

          {/* Waveform progress */}
          <div className="h-14 w-full flex items-center justify-center mb-2">
            <div className="w-full flex items-end justify-between h-10">
              {waveformBars.map((height, i) => {
                // Calculate if this bar should be active based on current progress
                const barPosition = (i / waveformBars.length) * currentSong.duration;
                const isActive = barPosition <= localProgress;

                return (
                  <div
                    key={i}
                    className={`waveform-bar transition-all duration-200 ${isActive ? 'bg-fuzzler-400' : 'bg-gray-600'}`}
                    style={{
                      height: `${Math.max(15, height * 0.4)}%`,
                      '--delay': i % 10,
                      animationPlayState: isPlaying ? 'running' : 'paused'
                    } as React.CSSProperties}
                  ></div>
                );
              })}
            </div>
          </div>

          {/* Time and Progress Bar */}
          <div className="w-full mb-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>{formatTime(localProgress)}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
            <Slider
              value={[localProgress]}
              max={currentSong.duration}
              step={0.1}
              onValueChange={handleProgressChange}
              onValueCommit={handleProgressDragEnd}
              onPointerDown={handleProgressDragStart}
              className="w-full h-1.5"
            />
          </div>

          {/* Controls - centered */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <button
              onClick={playPrevious}
              className="p-2 rounded-full glass-morphism hover:bg-gray-700 transition-colors liquid-button"
            >
              <SkipBack size={18} />
            </button>

            <button
              onClick={togglePlayPause}
              className="p-3 rounded-full bg-gradient-to-br from-fuzzler-500 to-fuzzler-600 text-white hover:from-fuzzler-400 hover:to-fuzzler-500 transition-all shadow-lg shadow-fuzzler-500/20 hover:shadow-fuzzler-500/30 liquid-button"
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} />}
            </button>

            <button
              onClick={playNext}
              className="p-2 rounded-full glass-morphism hover:bg-gray-700 transition-colors liquid-button"
            >
              <SkipForward size={18} />
            </button>
          </div>

          {/* Volume control - only visible on desktop, centered */}
          <div className="hidden sm:flex items-center justify-center gap-2 mb-3">
            <Volume2 size={16} className="text-gray-300" />
            <Slider
              value={[volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="w-28 h-1.5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VinylPlayer;

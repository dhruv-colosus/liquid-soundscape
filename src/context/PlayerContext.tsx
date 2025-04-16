import React, { createContext, useState, useContext, ReactNode, useRef, useEffect } from 'react';

// Define the types for our context
interface Album {
  id: number;
  title: string;
  artist: string;
  coverUrl: string;
}

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: number;
  albumId: number;
  file: string;
}

interface PlayerContextType {
  currentAlbum: Album;
  currentSong: Song;
  isPlaying: boolean;
  volume: number;
  setCurrentAlbum: (album: Album) => void;
  setCurrentSong: (song: Song) => void;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seekTo: (position: number) => void;
  setVolume: (volume: number) => void;
  playSong: (song: Song) => void;
  songs: Song[];
  currentTime: number;
}

// Create initial album and song data
const initialAlbum: Album = {
  id: 1,
  title: "Underground Anthems",
  artist: "Various Artists",
  coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2500&auto=format&fit=crop",
};

const initialSong: Song = {
  id: 1,
  title: "Goat Shit",
  artist: "King",
  duration: 210,
  albumId: 1,
  file: "/songs/goatshit.mp3"
};

const initialSongs: Song[] = [
  {
    id: 1,
    title: "Goat Shit",
    artist: "King",
    duration: 210,
    albumId: 1,
    file: "/songs/goatshit.mp3"
  },
  {
    id: 2,
    title: "Timeless",
    artist: "The Weeknd",
    duration: 240,
    albumId: 1,
    file: "/songs/timeless.mp3"
  },
  {
    id: 3,
    title: "My Eyes",
    artist: "Travis Scott",
    duration: 280,
    albumId: 1,
    file: "/songs/myeyes.mp3"
  },
  {
    id: 4,
    title: "Parda",
    artist: "Shreya Ghoshal",
    duration: 300,
    albumId: 1,
    file: "/songs/parda.mp3"
  },
  {
    id: 5,
    title: "Evil Jordan",
    artist: "Playboi Carti",
    duration: 185,
    albumId: 1,
    file: "/songs/eviljordan.mp3"
  }
];

// Create the context
const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Create a provider component
export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentAlbum, setCurrentAlbum] = useState<Album>(initialAlbum);
  const [currentSong, setCurrentSong] = useState<Song>(initialSong);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(70);
  const [songs] = useState<Song[]>(initialSongs);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playNextRef = useRef<() => void>(() => { });
  const lastPlayedSongId = useRef<number>(currentSong.id);
  const audioSourceChanging = useRef<boolean>(false);

  // Initialize playNext reference to handle circular dependency
  useEffect(() => {
    playNextRef.current = playNext;
  }, [currentSong]);

  // Reset currentTime when song changes
  useEffect(() => {
    if (lastPlayedSongId.current !== currentSong.id) {
      setCurrentTime(0);
      lastPlayedSongId.current = currentSong.id;
    }
  }, [currentSong.id]);

  // Initialize audio element
  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio();

      // Set initial source to the current song
      audioRef.current.src = currentSong.file;
      audioRef.current.volume = volume / 100;
      audioRef.current.preload = "auto";
      audioRef.current.crossOrigin = "anonymous";

      // Setup audio event listeners
      const onLoadedMetadata = () => {
        console.log("Audio loaded:", audioRef.current?.src);
        audioSourceChanging.current = false;

        if (audioRef.current && isPlaying) {
          const playPromise = audioRef.current.play();
          if (playPromise) {
            playPromise.catch(err => console.error("Error playing audio:", err));
          }
        }
      };

      const onEnded = () => {
        console.log("Audio ended, playing next");
        playNextRef.current();
      };

      const onTimeUpdate = () => {
        if (audioRef.current && !audioSourceChanging.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      };

      const onError = (e: ErrorEvent) => {
        console.error("Audio error:", e);
        // Try to recover by reloading the audio
        if (audioRef.current) {
          const songPath = currentSong.file.startsWith('/') ? currentSong.file : `/${currentSong.file}`;
          audioRef.current.src = songPath;
          audioRef.current.load();
        }
      };

      audioRef.current.addEventListener('loadedmetadata', onLoadedMetadata);
      audioRef.current.addEventListener('ended', onEnded);
      audioRef.current.addEventListener('timeupdate', onTimeUpdate);
      audioRef.current.addEventListener('error', onError as EventListener);

      // Cleanup on unmount
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener('loadedmetadata', onLoadedMetadata);
          audioRef.current.removeEventListener('ended', onEnded);
          audioRef.current.removeEventListener('timeupdate', onTimeUpdate);
          audioRef.current.removeEventListener('error', onError as EventListener);
          audioRef.current.src = '';
          audioRef.current = null;
        }
      };
    }
  }, []);

  const togglePlayPause = () => {
    console.log("Toggle play/pause");
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Make sure we have a source
        if (!audioRef.current.src || audioRef.current.src.endsWith('/')) {
          const songPath = currentSong.file.startsWith('/') ? currentSong.file : `/${currentSong.file}`;
          audioRef.current.src = songPath;
          audioRef.current.load();
        }

        const playPromise = audioRef.current.play();
        if (playPromise) {
          playPromise.catch(err => {
            console.error("Error playing audio:", err);
            // Try to recover by reloading
            if (audioRef.current) {
              const songPath = currentSong.file.startsWith('/') ? currentSong.file : `/${currentSong.file}`;
              audioRef.current.src = songPath;
              audioRef.current.load();
              audioRef.current.play().catch(e => console.error("Second attempt failed:", e));
            }
          });
        }
      }
      setIsPlaying(!isPlaying);
    } else {
      console.error("Audio element not initialized");
    }
  };

  const playNext = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    playSong(songs[nextIndex]);
  };

  const playPrevious = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(songs[prevIndex]);
  };

  const seekTo = (position: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = position;
      setCurrentTime(position);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const playSong = (song: Song) => {
    console.log('Playing song:', song);

    // Mark that we're changing the audio source
    audioSourceChanging.current = true;

    // Update the current song in state
    setCurrentSong(song);

    // Set the audio source
    if (audioRef.current) {
      try {
        // Completely stop current playback
        audioRef.current.pause();

        // Update audio source with absolute path - ensure path starts with /
        const songPath = song.file.startsWith('/') ? song.file : `/${song.file}`;
        console.log("Setting audio source to:", songPath);

        // Set source and force reload
        audioRef.current.src = songPath;
        audioRef.current.load();

        // Explicitly reset time
        audioRef.current.currentTime = 0;
        setCurrentTime(0);

        // Start playing with a slight delay to ensure loading
        setTimeout(() => {
          if (audioRef.current) {
            console.log("Starting playback of new song");

            const playPromise = audioRef.current.play();
            if (playPromise) {
              playPromise
                .then(() => {
                  console.log("Playback started successfully");
                  setIsPlaying(true);
                  audioSourceChanging.current = false;
                })
                .catch(err => {
                  console.error("Error playing new song:", err);
                  audioSourceChanging.current = false;

                  // One more attempt with a longer delay
                  setTimeout(() => {
                    if (audioRef.current) {
                      audioRef.current.play()
                        .then(() => {
                          setIsPlaying(true);
                        })
                        .catch(e => console.error("Final attempt failed:", e));
                    }
                  }, 500);
                });
            } else {
              audioSourceChanging.current = false;
            }
          }
        }, 200);
      } catch (error) {
        console.error("Error in playSong:", error);
        audioSourceChanging.current = false;
      }
    } else {
      console.error("Audio element not initialized");
      audioSourceChanging.current = false;
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentAlbum,
        currentSong,
        isPlaying,
        volume,
        setCurrentAlbum,
        setCurrentSong,
        togglePlayPause,
        playNext,
        playPrevious,
        seekTo,
        setVolume,
        playSong,
        songs,
        currentTime
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

// Create a custom hook to use the context
export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

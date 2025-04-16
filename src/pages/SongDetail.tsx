import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { songs } from '@/data/songs';
import { Heart, Share2, Volume2, Clock, Disc, Play, BarChart2, PlayCircle } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { formatDuration } from '@/lib/utils';
import { usePlaySong } from '@/utils/songUtils';

const SongDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { togglePlayPause, isPlaying, currentSong } = usePlayer();
    const { play } = usePlaySong();
    const [liked, setLiked] = useState(false);
    const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);

    // Find the song from our data
    const song = songs.find(s => s.id === id);

    // Check if this song is currently playing
    useEffect(() => {
        if (currentSong && Number(id) === currentSong.id) {
            setIsCurrentlyPlaying(isPlaying);
        } else {
            setIsCurrentlyPlaying(false);
        }
    }, [id, currentSong, isPlaying]);

    // Handle play button click
    const handlePlay = () => {
        if (song) {
            // Play the song using our utility, which will use one of our real audio files
            play(song);
        }
    };

    // If song not found, show error
    if (!song) {
        return (
            <div className="flex items-center justify-center h-[80vh] text-white/70">
                <div className="text-center">
                    <Disc size={80} className="mx-auto mb-4 text-fuzzler-400 opacity-60" />
                    <h2 className="text-2xl font-medium mb-2">Song not found</h2>
                    <p className="mb-6">The song you're looking for doesn't exist or has been removed.</p>
                    <Button
                        variant="default"
                        className="bg-fuzzler-500 hover:bg-fuzzler-600"
                        onClick={() => navigate('/')}
                    >
                        Go to Home
                    </Button>
                </div>
            </div>
        );
    }

    // Sample lyrics (would come from an API in a real app)
    const lyrics = `
Verse 1:
Midnight dreams, electric skies
Neon lights that never die
In the city's cold embrace
Time slows down, a perfect chase

Chorus:
Chasing shadows through the night
Digital dreams in endless flight
Synthetic hearts that beat as one
Until the rising of the sun

Verse 2:
Cyber love in digital rain
Memories lost, found again
In this world of binary code
Your presence is all I know

Bridge:
Pixels fade and systems crash
But our connection's built to last
Beyond the grid, beyond the screen
In a world that's yet unseen

Chorus:
Chasing shadows through the night
Digital dreams in endless flight
Synthetic hearts that beat as one
Until the rising of the sun
  `;

    return (
        <div className="pt-6 pb-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left column - Album art and main info */}
                    <div className="col-span-1">
                        <motion.div
                            className="relative group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="relative overflow-hidden rounded-xl glass-morphism p-1 aspect-square">
                                <img
                                    src={song.coverImage || '/covers/default-cover.jpg'}
                                    alt={song.title}
                                    className="w-full h-full object-cover rounded-lg"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/covers/default-cover.jpg';
                                    }}
                                />

                                {/* Play button overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                                    <Button
                                        onClick={handlePlay}
                                        className="w-16 h-16 rounded-full bg-fuzzler-500/90 hover:bg-fuzzler-500 text-white shadow-lg flex items-center justify-center"
                                    >
                                        {isCurrentlyPlaying ? <Volume2 size={28} /> : <PlayCircle size={32} />}
                                    </Button>
                                </div>

                                {/* Ripple effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                                    <div className="absolute inset-0 animate-ripple"></div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="mt-6 space-y-4">
                            <motion.div
                                className="space-y-1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <h1 className="text-2xl font-bold text-white">{song.title}</h1>
                                <h2 className="text-xl text-white/80">{song.artist}</h2>
                                <p className="text-sm text-white/60">{song.album} • {song.releaseDate}</p>
                            </motion.div>

                            <motion.div
                                className="flex items-center gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <Button
                                    className={`rounded-full px-4 py-6 flex items-center gap-2 ${liked ? 'bg-fuzzler-500 hover:bg-fuzzler-600' : 'bg-white/10 hover:bg-white/20'}`}
                                    onClick={() => setLiked(!liked)}
                                >
                                    <Heart className={liked ? 'fill-white' : ''} size={18} />
                                    <span>{liked ? 'Liked' : 'Like'}</span>
                                </Button>

                                <Button className="rounded-full px-4 py-6 bg-white/10 hover:bg-white/20 flex items-center gap-2">
                                    <Share2 size={18} />
                                    <span>Share</span>
                                </Button>
                            </motion.div>

                            <motion.div
                                className="glass-morphism p-4 rounded-xl space-y-3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <div className="flex items-center justify-between text-white/70">
                                    <div className="flex items-center gap-2">
                                        <BarChart2 size={16} />
                                        <span>Monthly Listeners</span>
                                    </div>
                                    <span className="font-medium text-white">{song.monthlyListeners.toLocaleString()}</span>
                                </div>

                                <div className="flex items-center justify-between text-white/70">
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} />
                                        <span>Duration</span>
                                    </div>
                                    <span className="font-medium text-white">{formatDuration(song.duration)}</span>
                                </div>

                                <div className="flex items-center justify-between text-white/70">
                                    <div className="flex items-center gap-2">
                                        <Disc size={16} />
                                        <span>Genre</span>
                                    </div>
                                    <span className="font-medium text-white">{song.genre}</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right column - Lyrics and additional info */}
                    <motion.div
                        className="col-span-1 md:col-span-2 glass-morphism p-6 rounded-xl"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-xl font-medium text-white mb-4">Lyrics</h3>
                        <div className="text-white/80 whitespace-pre-line leading-relaxed font-light custom-scrollbar max-h-[60vh] overflow-y-auto pr-4">
                            {lyrics}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SongDetail; 
import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSearch, SearchResult } from '../context/SearchContext';
import { usePlayer } from '../context/PlayerContext';
import { PlayCircle, Disc, Music, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { songs } from '../data/songs';

interface SearchResultItemProps {
    result: SearchResult;
    index: number;
    onSelect: () => void;
}

// Loading animation component
const SearchLoading: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-10"
        >
            <div className="relative w-16 h-16 flex items-center justify-center">
                {/* Pulsing circle */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{
                        scale: [0.8, 1.2, 0.8],
                        opacity: [0.5, 0.2, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full bg-fuzzler-500/20"
                />

                {/* Rotating circle */}
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute w-12 h-12 rounded-full border-2 border-transparent border-t-fuzzler-400 border-l-fuzzler-400/50"
                />

                {/* Center icon */}
                <Search size={24} className="text-white z-10" />
            </div>
            <p className="mt-4 text-white/60 text-sm">Searching...</p>
        </motion.div>
    );
};

const SearchResultItem: React.FC<SearchResultItemProps> = ({ result, index, onSelect }) => {
    const resultRef = useRef<HTMLDivElement>(null);
    const { setCurrentSong, togglePlayPause } = usePlayer();
    const navigate = useNavigate();

    // Handle playing a song directly from search results
    const handlePlay = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (result.type === 'song') {
            // Find the song by id and play it
            const song = songs.find(s => s.id === result.id);
            if (song) {
                // Convert the Song from our data to the expected format for PlayerContext
                setCurrentSong({
                    id: Number(song.id),
                    title: song.title,
                    artist: song.artist,
                    duration: song.duration,
                    albumId: 1 // Default albumId since our data model might differ
                });
                togglePlayPause();
            }
        }
        onSelect();
    };

    const handleItemClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (result.type === 'song') {
            // For songs, navigate to song page and play the song
            const song = songs.find(s => s.id === result.id);
            if (song) {
                setCurrentSong({
                    id: Number(song.id),
                    title: song.title,
                    artist: song.artist,
                    duration: song.duration,
                    albumId: 1
                });
                togglePlayPause();
            }
            navigate(result.path);
        } else {
            // For playlists, just navigate to the playlist page
            navigate(result.path);
        }

        onSelect();
    };

    return (
        <motion.div
            ref={resultRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
            }}
            className="relative group glass-morphism p-3 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
            onClick={handleItemClick}
        >
            <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                    {/* Fix for image display by using a default fallback image */}
                    <img
                        src={result.coverImage || '/covers/default-cover.jpg'}
                        alt={result.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            // Fallback if the primary image fails to load
                            (e.target as HTMLImageElement).src = '/covers/default-cover.jpg';
                        }}
                    />

                    {/* Liquid ripple effect on hover */}
                    <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 animate-ripple rounded-lg"></div>
                    </div>

                    {/* Show appropriate icon based on result type */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {result.type === 'song' ? (
                            <PlayCircle size={24} className="text-white" onClick={handlePlay} />
                        ) : (
                            <Disc size={24} className="text-white" />
                        )}
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">{result.title}</h3>
                    <p className="text-white/70 text-sm truncate">
                        {result.type === 'song' ? result.artist : 'Playlist'}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const SearchResults: React.FC = () => {
    const { searchResults, isSearching, searchQuery, clearSearch } = useSearch();
    const resultsContainerRef = useRef<HTMLDivElement>(null);
    const isLoadingResults = isSearching && searchQuery.trim() !== '' && searchResults.length === 0;

    // Add scroll animation when results change
    useEffect(() => {
        if (resultsContainerRef.current) {
            resultsContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [searchResults]);

    const handleResultSelect = () => {
        // Close search results while preserving the query
        // This ensures when search is reopened, it shows the last results
        if (isSearching) {
            clearSearch();
        }
    };

    if (!isSearching || searchQuery.trim() === '') {
        return null;
    }

    return (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 w-full max-w-xl z-50 p-2">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-morphism backdrop-blur-xl bg-black/60 rounded-2xl p-4 shadow-2xl border border-white/10"
            >
                <h2 className="text-white font-medium mb-3 flex items-center justify-between">
                    <span>{searchQuery ? `Results for "${searchQuery}"` : 'Search'}</span>

                    {/* Category pills */}
                    <div className="flex gap-1.5">
                        <div className="px-2 py-0.5 rounded-full text-xs bg-fuzzler-500/20 text-fuzzler-300 flex items-center">
                            <Music size={10} className="mr-1" />
                            <span>Songs</span>
                        </div>
                        <div className="px-2 py-0.5 rounded-full text-xs bg-fuzzler-500/20 text-fuzzler-300 flex items-center">
                            <Disc size={10} className="mr-1" />
                            <span>Playlists</span>
                        </div>
                    </div>
                </h2>

                <div
                    ref={resultsContainerRef}
                    className="max-h-[60vh] overflow-y-auto space-y-3 pr-2 custom-scrollbar"
                >
                    <AnimatePresence>
                        {/* Show loading animation when searching */}
                        {isLoadingResults ? (
                            <SearchLoading />
                        ) : (
                            <>
                                {searchResults.map((result, index) => (
                                    <SearchResultItem
                                        key={`${result.type}-${result.id}`}
                                        result={result}
                                        index={index}
                                        onSelect={handleResultSelect}
                                    />
                                ))}

                                {searchQuery && searchResults.length === 0 && !isLoadingResults && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-white/60 text-center py-6"
                                    >
                                        <div className="mb-2">
                                            <Disc size={40} className="mx-auto text-fuzzler-400 opacity-50" />
                                        </div>
                                        <p>No matches found. Try a different search term.</p>
                                    </motion.div>
                                )}
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default SearchResults; 
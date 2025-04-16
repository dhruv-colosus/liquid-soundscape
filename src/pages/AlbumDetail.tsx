import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Clock, Heart, MoreHorizontal, ChevronLeft, ListMusic, Disc } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import { Button } from '@/components/ui/button';
import Background from '@/components/Background';

// Mock data for albums
const albums = [
    {
        id: 1,
        title: "Dreamland",
        artist: "Glass Animals",
        coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2500&auto=format&fit=crop",
        releaseYear: "2020",
        genre: "Indie Pop",
        tracks: [
            { id: 1, title: "Heat Waves", artist: "Glass Animals", duration: 238, liked: true },
            { id: 2, title: "Tangerine", artist: "Glass Animals", duration: 202, liked: false },
            { id: 3, title: "Space Ghost Coast To Coast", artist: "Glass Animals", duration: 227, liked: true },
            { id: 4, title: "Tokyo Drifting", artist: "Glass Animals", duration: 243, liked: false },
            { id: 5, title: "Melon and the Coconut", artist: "Glass Animals", duration: 188, liked: true },
            { id: 6, title: "Your Love (Déjà Vu)", artist: "Glass Animals", duration: 240, liked: false },
        ]
    },
    {
        id: 2,
        title: "Future Nostalgia",
        artist: "Dua Lipa",
        coverUrl: "https://images.unsplash.com/photo-1598387846148-47e82ee120cc?q=80&w=2500&auto=format&fit=crop",
        releaseYear: "2020",
        genre: "Pop, Disco",
        tracks: [
            { id: 7, title: "Levitating", artist: "Dua Lipa", duration: 203, liked: true },
            { id: 8, title: "Don't Start Now", artist: "Dua Lipa", duration: 183, liked: false },
            { id: 9, title: "Physical", artist: "Dua Lipa", duration: 193, liked: true },
            { id: 10, title: "Break My Heart", artist: "Dua Lipa", duration: 222, liked: false },
            { id: 11, title: "Hallucinate", artist: "Dua Lipa", duration: 211, liked: true },
        ]
    },
    {
        id: 3,
        title: "After Hours",
        artist: "The Weeknd",
        coverUrl: "https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?q=80&w=2500&auto=format&fit=crop",
        releaseYear: "2020",
        genre: "R&B, Synth-pop",
        tracks: [
            { id: 12, title: "Blinding Lights", artist: "The Weeknd", duration: 200, liked: true },
            { id: 13, title: "In Your Eyes", artist: "The Weeknd", duration: 216, liked: false },
            { id: 14, title: "Save Your Tears", artist: "The Weeknd", duration: 215, liked: true },
            { id: 15, title: "After Hours", artist: "The Weeknd", duration: 361, liked: false },
            { id: 16, title: "Heartless", artist: "The Weeknd", duration: 198, liked: true },
        ]
    },
    {
        id: 4,
        title: "Random Access Memories",
        artist: "Daft Punk",
        coverUrl: "https://images.unsplash.com/photo-1602848597941-0d3d3a2c1241?q=80&w=2500&auto=format&fit=crop",
        releaseYear: "2013",
        genre: "Electronic, Disco",
        tracks: [
            { id: 17, title: "Get Lucky", artist: "Daft Punk ft. Pharrell Williams", duration: 248, liked: true },
            { id: 18, title: "Instant Crush", artist: "Daft Punk ft. Julian Casablancas", duration: 337, liked: false },
            { id: 19, title: "Lose Yourself to Dance", artist: "Daft Punk ft. Pharrell Williams", duration: 353, liked: true },
            { id: 20, title: "Giorgio by Moroder", artist: "Daft Punk", duration: 544, liked: false },
            { id: 21, title: "Touch", artist: "Daft Punk ft. Paul Williams", duration: 498, liked: true },
        ]
    },
    {
        id: 5,
        title: "Dark Side of the Moon",
        artist: "Pink Floyd",
        coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2500&auto=format&fit=crop",
        releaseYear: "1973",
        genre: "Progressive Rock",
        tracks: [
            { id: 22, title: "Speak to Me/Breathe", artist: "Pink Floyd", duration: 234, liked: true },
            { id: 23, title: "Time", artist: "Pink Floyd", duration: 421, liked: false },
            { id: 24, title: "The Great Gig in the Sky", artist: "Pink Floyd", duration: 284, liked: true },
            { id: 25, title: "Money", artist: "Pink Floyd", duration: 382, liked: false },
            { id: 26, title: "Us and Them", artist: "Pink Floyd", duration: 470, liked: true },
        ]
    },
    {
        id: 6,
        title: "Cosmic Echoes",
        artist: "Stellar Dreams",
        coverUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=2500&auto=format&fit=crop",
        releaseYear: "2022",
        genre: "Ambient, Electronic",
        tracks: [
            { id: 27, title: "Orbital Motion", artist: "Stellar Dreams", duration: 298, liked: true },
            { id: 28, title: "Stellar Wind", artist: "Stellar Dreams", duration: 343, liked: false },
            { id: 29, title: "Nebula Drift", artist: "Stellar Dreams", duration: 319, liked: true },
            { id: 30, title: "Cosmic Journey", artist: "Stellar Dreams", duration: 426, liked: false },
            { id: 31, title: "Astral Projection", artist: "Stellar Dreams", duration: 387, liked: true },
        ]
    },
];

// Format time from seconds to MM:SS
const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const AlbumDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { setCurrentAlbum, setCurrentSong, togglePlayPause } = usePlayer();
    const [dominantColor, setDominantColor] = useState('#0d93ea');

    // Find the album by id
    const album = albums.find(a => a.id === parseInt(id || '0'));

    if (!album) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Album Not Found</h2>
                    <Link to="/browse" className="text-fuzzler-400 hover:underline">
                        Return to Browse
                    </Link>
                </div>
            </div>
        );
    }

    // Initialize the player with the album when the button is clicked
    const handlePlayAlbum = () => {
        if (album.tracks && album.tracks.length > 0) {
            // Create a simplified album for the player context
            const playerAlbum = {
                id: album.id,
                title: album.title,
                artist: album.artist,
                coverUrl: album.coverUrl
            };

            // Set the first track as the current song
            const firstTrack = album.tracks[0];
            setCurrentAlbum(playerAlbum);
            setCurrentSong({
                id: firstTrack.id,
                title: firstTrack.title,
                artist: firstTrack.artist || album.artist,
                duration: firstTrack.duration,
                albumId: album.id
            });

            // Start playing
            togglePlayPause();
        }
    };

    // Play a specific track from the album
    const handlePlayTrack = (trackId: number) => {
        const track = album.tracks.find(t => t.id === trackId);
        if (track) {
            // Create a simplified album for the player context
            const playerAlbum = {
                id: album.id,
                title: album.title,
                artist: album.artist,
                coverUrl: album.coverUrl
            };

            // Set the selected track as the current song
            setCurrentAlbum(playerAlbum);
            setCurrentSong({
                id: track.id,
                title: track.title,
                artist: track.artist || album.artist,
                duration: track.duration,
                albumId: album.id
            });

            // Start playing
            togglePlayPause();

            // Simulate extracting dominant color from album cover
            const colors = ['#0d93ea', '#e91e63', '#ff9800', '#673ab7', '#009688'];
            setDominantColor(colors[Math.floor(Math.random() * colors.length)]);
        }
    };

    return (
        <div className="min-h-screen pb-24">
            <Background dominantColor={dominantColor} />

            <div className="max-w-6xl mx-auto px-4 pt-24 pb-8">
                {/* Back button */}
                <Link to="/browse" className="flex items-center text-white/70 hover:text-white mb-8">
                    <ChevronLeft size={20} />
                    <span>Back to Browse</span>
                </Link>

                {/* Album header */}
                <div className="flex flex-col md:flex-row gap-8 mb-10 glass-morphism p-8 rounded-2xl">
                    <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 album-effect">
                        <img
                            src={album.coverUrl}
                            alt={album.title}
                            className="w-full h-full object-cover rounded-xl shadow-lg"
                        />

                        {/* Vinyl effect overlay (shown on hover) */}
                        <div className="vinyl-overlay rounded-xl">
                            <div className="vinyl-disc">
                                <div className="vinyl-center"></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <Disc size={16} className="text-fuzzler-400" />
                            <h5 className="text-white/70 uppercase text-sm tracking-wider">Album</h5>
                        </div>

                        <h1 className="text-4xl font-serif font-bold text-white mb-2">{album.title}</h1>
                        <p className="text-xl text-fuzzler-400 mb-4">{album.artist}</p>

                        <div className="flex items-center text-sm text-white/60 mb-6 flex-wrap gap-2">
                            <span>{album.releaseYear}</span>
                            <span className="inline-block w-1 h-1 bg-white/40 rounded-full mx-2"></span>
                            <span>{album.genre}</span>
                            <span className="inline-block w-1 h-1 bg-white/40 rounded-full mx-2"></span>
                            <span className="flex items-center gap-1">
                                <ListMusic size={14} />
                                {album.tracks.length} songs
                            </span>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                className="bg-fuzzler-500 hover:bg-fuzzler-400 text-white ripple-effect"
                                onClick={handlePlayAlbum}
                            >
                                <Play className="mr-2 h-4 w-4" fill="white" />
                                Play
                            </Button>
                            <Button
                                variant="outline"
                                className="border-white/20 text-white hover:bg-white/10 ripple-effect"
                            >
                                <Heart className="mr-2 h-4 w-4" />
                                Save
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Song list */}
                <div className="glass-morphism rounded-xl overflow-hidden">
                    <div className="p-4">
                        <table className="w-full">
                            <thead>
                                <tr className="text-white/60 text-left border-b border-white/10">
                                    <th className="py-3 w-10">#</th>
                                    <th className="py-3">Title</th>
                                    <th className="py-3 text-right">
                                        <Clock size={16} />
                                    </th>
                                    <th className="py-3 w-10"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {album.tracks.map((track, index) => (
                                    <tr
                                        key={track.id}
                                        className="text-left border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
                                        onClick={() => handlePlayTrack(track.id)}
                                    >
                                        <td className="py-4 text-white/60 group-hover:text-fuzzler-400">{index + 1}</td>
                                        <td className="py-4">
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium">{track.title}</span>
                                                <span className="text-sm text-white/60">{track.artist || album.artist}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-white/60 text-right">{formatTime(track.duration)}</td>
                                        <td className="py-4 text-right">
                                            <Heart
                                                size={16}
                                                className={`${track.liked ? "text-fuzzler-500" : "text-white/60 opacity-0 group-hover:opacity-100"}`}
                                                fill={track.liked ? "currentColor" : "none"}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlbumDetail; 
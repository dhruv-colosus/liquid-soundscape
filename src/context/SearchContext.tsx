import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { songs } from '../data/songs';
import { featuredPlaylists, userPlaylists } from '../data/playlists';

// Define the types for our search context
export interface SearchResult {
    type: 'song' | 'playlist';
    id: string;
    title: string;
    artist?: string;
    coverImage: string;
    path: string;
}

interface SearchContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchResults: SearchResult[];
    isSearching: boolean;
    setIsSearching: (isSearching: boolean) => void;
    clearSearch: () => void;
    clearResults: () => void;
}

// Create the context
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Create a provider component
export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    // Perform search when query changes
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);

        // Search through songs
        const foundSongs = songs
            .filter(song =>
                song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                song.album.toLowerCase().includes(searchQuery.toLowerCase()) ||
                song.genre.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(song => ({
                type: 'song' as const,
                id: song.id,
                title: song.title,
                artist: song.artist,
                coverImage: song.coverImage,
                path: `/song/${song.id}`
            }));

        // Search through playlists
        const allPlaylists = [...featuredPlaylists, ...userPlaylists];
        const foundPlaylists = allPlaylists
            .filter(playlist =>
                playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                playlist.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (playlist.genre && playlist.genre.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            .map(playlist => ({
                type: 'playlist' as const,
                id: playlist.id,
                title: playlist.name,
                coverImage: playlist.coverImage,
                path: `/playlist/${playlist.id}`
            }));

        // Combine results and limit to avoid overwhelming results
        setSearchResults([...foundSongs, ...foundPlaylists].slice(0, 20));
    }, [searchQuery]);

    // Clear both query and results, and hide search
    const clearSearch = () => {
        setIsSearching(false);
    };

    // Clear results but keep the query
    const clearResults = () => {
        setSearchResults([]);
    };

    return (
        <SearchContext.Provider
            value={{
                searchQuery,
                setSearchQuery,
                searchResults,
                isSearching,
                setIsSearching,
                clearSearch,
                clearResults
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

// Create a custom hook to use the context
export const useSearch = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}; 
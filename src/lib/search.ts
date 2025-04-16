import { Song } from "../data/songs";
import { Playlist } from "../data/playlists";

export interface SearchResult {
  songs: Song[];
  playlists: Playlist[];
}

export const searchContent = (
  query: string,
  songs: Song[],
  playlists: Playlist[]
): SearchResult => {
  const normalizedQuery = query.toLowerCase().trim();

  const matchingSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(normalizedQuery) ||
      song.artist.toLowerCase().includes(normalizedQuery) ||
      song.album.toLowerCase().includes(normalizedQuery)
  );

  const matchingPlaylists = playlists.filter(
    (playlist) =>
      playlist.name.toLowerCase().includes(normalizedQuery) ||
      playlist.description.toLowerCase().includes(normalizedQuery) ||
      playlist.genre?.toLowerCase().includes(normalizedQuery)
  );

  return {
    songs: matchingSongs,
    playlists: matchingPlaylists,
  };
};

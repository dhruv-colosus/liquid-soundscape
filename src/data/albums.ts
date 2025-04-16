import { Song } from "./songs";

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  monthlyListeners: number;
  albums: Album[];
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseDate: string;
  tracks: number;
  duration: string;
  description: string;
  songs: Song[];
}

export const featuredAlbum: Album = {
  id: "featured-1",
  title: "Future Nostalgia",
  artist: "Dua Lipa",
  coverUrl:
    "https://images.unsplash.com/photo-1598387846148-47e82ee120cc?q=80&w=600&auto=format&fit=crop",
  releaseDate: "March 27, 2020",
  tracks: 11,
  duration: "43 min",
  description: "A vibrant blend of disco, funk, and pop music",
  songs: [], // Will be populated with actual songs
};

export const trendingArtists: Artist[] = [
  {
    id: "artist-1",
    name: "Playboi Carti",
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300&auto=format&fit=crop",
    monthlyListeners: 28500000,
    albums: [], // Will be populated with actual albums
  },
  {
    id: "artist-2",
    name: "Travis Scott",
    imageUrl:
      "https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?q=80&w=300&auto=format&fit=crop",
    monthlyListeners: 38200000,
    albums: [], // Will be populated with actual albums
  },
  {
    id: "artist-3",
    name: "King",
    imageUrl:
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&auto=format&fit=crop",
    monthlyListeners: 950000,
    albums: [], // Will be populated with actual albums
  },
];

export const albums: Album[] = [
  {
    id: "album-1",
    title: "Dreamland",
    artist: "Glass Animals",
    coverUrl:
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=600&auto=format&fit=crop",
    releaseDate: "August 7, 2020",
    tracks: 12,
    duration: "45 min",
    description: "A psychedelic journey through modern pop",
    songs: [], // Will be populated with actual songs
  },
  {
    id: "album-2",
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    coverUrl:
      "https://images.unsplash.com/photo-1598387846148-47e82ee120cc?q=80&w=600&auto=format&fit=crop",
    releaseDate: "March 27, 2020",
    tracks: 11,
    duration: "43 min",
    description: "A vibrant blend of disco, funk, and pop music",
    songs: [], // Will be populated with actual songs
  },
  {
    id: "album-3",
    title: "After Hours",
    artist: "The Weeknd",
    coverUrl:
      "https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?q=80&w=600&auto=format&fit=crop",
    releaseDate: "March 20, 2020",
    tracks: 14,
    duration: "56 min",
    description: "A dark and atmospheric journey through the night",
    songs: [], // Will be populated with actual songs
  },
];

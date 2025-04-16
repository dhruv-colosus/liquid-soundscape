import { Song, songs } from "./songs";

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  songs: Song[];
  isFeatured?: boolean;
  genre?: string;
  followers: number;
  createdBy: string;
  createdAt: string;
}

// Helper function to get the actual songs we have audio files for
const getActualSongs = () => {
  // Get only songs that we have actual audio files for (songs 1-5)
  return songs.filter((song) => parseInt(song.id) <= 5);
};

const actualSongs = getActualSongs();

export const featuredPlaylists: Playlist[] = [
  {
    id: "featured-1",
    name: "Synthwave Dreams",
    description: "The best of modern synthwave and retro-futuristic beats",
    coverImage:
      "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=600&auto=format&fit=crop",
    songs: [
      actualSongs[0], // Goat Shit by King
      actualSongs[2], // My Eyes by Travis Scott
      actualSongs[4], // Evil Jordan by Playboi Carti
    ],
    isFeatured: true,
    genre: "Synthwave",
    followers: 250000,
    createdBy: "Fuzzler",
    createdAt: "2024-01-01",
  },
  {
    id: "featured-2",
    name: "Cyberpunk Vibes",
    description:
      "Dark and gritty electronic beats for your cyberpunk adventures",
    coverImage:
      "https://images.unsplash.com/photo-1557682260-96773eb01377?q=80&w=600&auto=format&fit=crop",
    songs: [
      actualSongs[1], // Timeless by The Weeknd
      actualSongs[2], // My Eyes by Travis Scott
      actualSongs[3], // Parda by Shreya Ghoshal
    ],
    isFeatured: true,
    genre: "Cyberpunk",
    followers: 180000,
    createdBy: "Fuzzler",
    createdAt: "2024-02-01",
  },
  {
    id: "featured-3",
    name: "Ambient Waves",
    description: "Calming ambient tracks for focus and relaxation",
    coverImage:
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    songs: [
      actualSongs[0], // Goat Shit by King
      actualSongs[1], // Timeless by The Weeknd
      actualSongs[4], // Evil Jordan by Playboi Carti
    ],
    isFeatured: true,
    genre: "Ambient",
    followers: 150000,
    createdBy: "Fuzzler",
    createdAt: "2024-03-01",
  },
];

export const userPlaylists: Playlist[] = [
  {
    id: "user-1",
    name: "My Favorites",
    description: "Collection of my favorite tracks",
    coverImage:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
    songs: [
      actualSongs[1], // Timeless by The Weeknd
      actualSongs[3], // Parda by Shreya Ghoshal
      actualSongs[4], // Evil Jordan by Playboi Carti
    ],
    followers: 0,
    createdBy: "User",
    createdAt: "2024-03-15",
  },
  {
    id: "user-2",
    name: "Workout Mix",
    description: "High-energy tracks for my workout sessions",
    coverImage:
      "https://images.unsplash.com/photo-1498673394965-85cb14905c89?q=80&w=600&auto=format&fit=crop",
    songs: [
      actualSongs[0], // Goat Shit by King
      actualSongs[2], // My Eyes by Travis Scott
      actualSongs[3], // Parda by Shreya Ghoshal
    ],
    followers: 0,
    createdBy: "User",
    createdAt: "2024-03-16",
  },
];

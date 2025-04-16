export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverImage: string;
  monthlyListeners: number;
  genre: string;
  releaseDate: string;
  audioUrl: string;
}

export const songs: Song[] = [
  {
    id: "1",
    title: "Goat Shit",
    artist: "King",
    album: "Underground Anthems",
    duration: 210,
    coverImage:
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2500&auto=format&fit=crop",
    monthlyListeners: 95000,
    genre: "Electronic",
    releaseDate: "2023-11-15",
    audioUrl: "/songs/goatshit.mp3",
  },
  {
    id: "2",
    title: "Timeless",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 240,
    coverImage:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2500&auto=format&fit=crop",
    monthlyListeners: 42000000,
    genre: "R&B",
    releaseDate: "2023-12-01",
    audioUrl: "/songs/timeless.mp3",
  },
  {
    id: "3",
    title: "My Eyes",
    artist: "Travis Scott",
    album: "Utopia",
    duration: 280,
    coverImage:
      "https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?q=80&w=2500&auto=format&fit=crop",
    monthlyListeners: 38000000,
    genre: "Hip-Hop",
    releaseDate: "2023-07-28",
    audioUrl: "/songs/myeyes.mp3",
  },
  {
    id: "4",
    title: "Parda",
    artist: "Shreya Ghoshal",
    album: "Bollywood Hits",
    duration: 300,
    coverImage:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2500&auto=format&fit=crop",
    monthlyListeners: 15000000,
    genre: "Bollywood",
    releaseDate: "2023-09-12",
    audioUrl: "/songs/parda.mp3",
  },
  {
    id: "5",
    title: "Evil Jordan",
    artist: "Playboi Carti",
    album: "Opium Dreams",
    duration: 185,
    coverImage:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2500&auto=format&fit=crop",
    monthlyListeners: 28000000,
    genre: "Hip-Hop",
    releaseDate: "2024-01-28",
    audioUrl: "/songs/eviljordan.mp3",
  },
  {
    id: "6",
    title: "Midnight Dreams",
    artist: "Luna Echo",
    album: "Night Sky",
    duration: 180,
    coverImage: "/covers/midnight-dreams.jpg",
    monthlyListeners: 1200000,
    genre: "Synthwave",
    releaseDate: "2024-01-15",
    audioUrl: "/audio/midnight-dreams.mp3",
  },
  {
    id: "7",
    title: "Electric Soul",
    artist: "Neon Pulse",
    album: "Retro Future",
    duration: 210,
    coverImage: "/covers/electric-soul.jpg",
    monthlyListeners: 850000,
    genre: "Electronic",
    releaseDate: "2024-02-01",
    audioUrl: "/audio/electric-soul.mp3",
  },
  {
    id: "8",
    title: "Crystal Waves",
    artist: "Aqua Dreams",
    album: "Ocean Breeze",
    duration: 195,
    coverImage: "/covers/crystal-waves.jpg",
    monthlyListeners: 950000,
    genre: "Ambient",
    releaseDate: "2024-02-15",
    audioUrl: "/audio/crystal-waves.mp3",
  },
  {
    id: "9",
    title: "Digital Sunset",
    artist: "Cyber Wave",
    album: "Binary Dreams",
    duration: 225,
    coverImage: "/covers/digital-sunset.jpg",
    monthlyListeners: 1100000,
    genre: "Cyberpunk",
    releaseDate: "2024-03-01",
    audioUrl: "/audio/digital-sunset.mp3",
  },
  {
    id: "10",
    title: "Neon Lights",
    artist: "Synth City",
    album: "Urban Pulse",
    duration: 200,
    coverImage: "/covers/neon-lights.jpg",
    monthlyListeners: 1300000,
    genre: "Synthwave",
    releaseDate: "2024-03-15",
    audioUrl: "/audio/neon-lights.mp3",
  },
];

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  premium: boolean;
  followers: number;
  following: number;
  recentlyPlayed: string[];
  favoriteGenres: string[];
  accountSettings: {
    theme: "dark" | "light";
    language: string;
    notifications: boolean;
    autoplay: boolean;
    crossfade: boolean;
  };
}

export const currentUser: User = {
  id: "user-1",
  username: "SynthWave",
  email: "synthwave@example.com",
  avatar: "/avatars/user-avatar.jpg",
  premium: true,
  followers: 1250,
  following: 890,
  recentlyPlayed: ["1", "2", "3", "4", "5"],
  favoriteGenres: ["Synthwave", "Cyberpunk", "Ambient"],
  accountSettings: {
    theme: "dark",
    language: "English",
    notifications: true,
    autoplay: true,
    crossfade: true,
  },
};

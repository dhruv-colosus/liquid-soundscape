import { Song as DataSong } from "@/data/songs";
import { usePlayer } from "@/context/PlayerContext";

// Define an interface for the album data structure
interface Album {
  id: number;
  title: string;
  artist: string;
  coverUrl: string;
}

// Define an interface for the player song data structure
interface PlayerSong {
  id: number;
  title: string;
  artist: string;
  duration: number;
  albumId: number;
  file: string;
}

/**
 * Maps data from the songs.ts format to our player format
 * For real songs (goatshit.mp3, timeless.mp3, myeyes.mp3), it will return the actual song data
 * For other songs, it will return one of our real songs but with the metadata of the selected song
 */
export const mapToPlayerSong = (
  dataSong: DataSong
): { playerSong: PlayerSong; album: Album } => {
  // Create album data
  const album: Album = {
    id: 1,
    title: dataSong.album,
    artist: dataSong.artist,
    coverUrl: dataSong.coverImage,
  };

  // Check if this is one of our real songs
  const isRealSong =
    dataSong.audioUrl.includes("/songs/goatshit.mp3") ||
    dataSong.audioUrl.includes("/songs/timeless.mp3") ||
    dataSong.audioUrl.includes("/songs/myeyes.mp3");

  // If it's a real song, use its actual file path
  // Otherwise, use one of our real songs but keep the metadata
  const audioFile = isRealSong
    ? dataSong.audioUrl
    : parseInt(dataSong.id) % 3 === 0
    ? "/songs/myeyes.mp3"
    : parseInt(dataSong.id) % 3 === 1
    ? "/songs/goatshit.mp3"
    : "/songs/timeless.mp3";

  // Make sure we have the correct artist based on the audio file
  let artist = dataSong.artist;
  if (audioFile.includes("goatshit.mp3")) {
    artist = "King";
  } else if (audioFile.includes("timeless.mp3")) {
    artist = "The Weeknd";
  } else if (audioFile.includes("myeyes.mp3")) {
    artist = "Travis Scott";
  }

  // Create player song data
  const playerSong: PlayerSong = {
    id: parseInt(dataSong.id),
    title: dataSong.title,
    artist: artist,
    duration: dataSong.duration,
    albumId: 1,
    file: audioFile,
  };

  return { playerSong, album };
};

/**
 * Hook to play a song from the songs.ts data format
 * This logs the selected song details but plays one of our real songs
 */
export const usePlaySong = () => {
  const { setCurrentAlbum, playSong } = usePlayer();

  const play = (dataSong: DataSong) => {
    console.log("Selected song to play:", dataSong);

    const { playerSong, album } = mapToPlayerSong(dataSong);

    // Set the current album and play the song
    setCurrentAlbum(album);
    playSong(playerSong);
  };

  return { play };
};

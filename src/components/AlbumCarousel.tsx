
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Album {
  id: number;
  title: string;
  artist: string;
  coverUrl: string;
}

interface AlbumCarouselProps {
  albums: Album[];
  onSelectAlbum: (album: Album) => void;
}

const AlbumCarousel: React.FC<AlbumCarouselProps> = ({ albums, onSelectAlbum }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const visibleCount = 5; // Number of albums visible in carousel
  const centerIndex = Math.floor(visibleCount / 2);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % albums.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + albums.length) % albums.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleSelect = (album: Album, index: number) => {
    if (index === centerIndex) {
      onSelectAlbum(album);
    } else {
      setIsTransitioning(true);
      const diff = index - centerIndex;
      let targetIndex = (currentIndex + diff) % albums.length;
      if (targetIndex < 0) targetIndex += albums.length;
      setCurrentIndex(targetIndex);
      setTimeout(() => {
        setIsTransitioning(false);
        onSelectAlbum(albums[targetIndex]);
      }, 500);
    }
  };

  const getVisibleAlbums = () => {
    const result = [];
    const halfCount = Math.floor(visibleCount / 2);
    
    for (let i = -halfCount; i <= halfCount; i++) {
      let index = (currentIndex + i) % albums.length;
      if (index < 0) index += albums.length;
      
      const position = i + halfCount;
      const zIndex = visibleCount - Math.abs(i * 2);
      const scale = 1 - Math.abs(i) * 0.15;
      const translateX = i * 120;
      const translateZ = -Math.abs(i) * 100;
      const opacity = 1 - Math.abs(i) * 0.2;
      const rotateY = i * 10;
      
      result.push({
        album: albums[index],
        style: {
          zIndex,
          transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`,
          opacity,
        },
        isCurrent: i === 0,
        position,
      });
    }
    
    return result;
  };

  return (
    <div className="relative w-full max-w-4xl py-16 overflow-hidden">
      <div className="carousel-container h-80 relative">
        {getVisibleAlbums().map(({ album, style, isCurrent, position }, idx) => (
          <div
            key={`${album.id}-${position}`}
            className={`carousel-item album-card ${isCurrent ? 'z-50' : ''} ${isTransitioning ? 'transition-all duration-500' : ''}`}
            style={style}
            onClick={() => handleSelect(album, position)}
          >
            <div 
              className={`w-48 h-48 rounded-xl overflow-hidden shadow-lg ${isCurrent ? 'shadow-fuzzler-500/30' : ''}`}
            >
              <img 
                src={album.coverUrl} 
                alt={album.title} 
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            {isCurrent && (
              <div className="absolute -bottom-16 left-0 right-0 text-center animate-fade-in">
                <h3 className="text-lg font-display font-semibold text-white">{album.title}</h3>
                <p className="text-sm text-gray-300">{album.artist}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <button 
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/30 glass-morphism rounded-full p-2 text-white/80 hover:text-white transition-all hover:scale-110 focus:outline-none"
        disabled={isTransitioning}
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 glass-morphism rounded-full p-2 text-white/80 hover:text-white transition-all hover:scale-110 focus:outline-none"
        disabled={isTransitioning}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default AlbumCarousel;

import React, { useState } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import MiniPlayer from './MiniPlayer';
import VinylPlayer from './VinylPlayer';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Minimize2 } from 'lucide-react';

const GlobalPlayer: React.FC = () => {
  const { currentAlbum, currentSong } = usePlayer();

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  if (!currentAlbum || !currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            key="expanded"
            initial={{ height: "60px", opacity: 0.9 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: "60px", opacity: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full glass-morphism backdrop-blur-xl bg-black/60 border-t border-white/10 pb-6 px-2 sm:px-4"
          >
            <div className="flex justify-end px-4 pt-2">
              <button
                onClick={toggleExpand}
                className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                title="Minimize player"
              >
                <ChevronDown size={20} />
              </button>
            </div>
            <VinylPlayer />
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.9 }}
          >
            <MiniPlayer
              onExpand={toggleExpand}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalPlayer;

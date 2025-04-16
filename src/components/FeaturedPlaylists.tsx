import { motion } from 'framer-motion';
import { featuredPlaylists } from '../data/playlists';
import { Play } from 'lucide-react';

export const FeaturedPlaylists = () => {
    return (
        <section className="py-8">
            <h2 className="text-2xl font-bold text-white mb-6">Featured Playlists</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPlaylists.map((playlist, index) => (
                    <motion.div
                        key={playlist.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
                    >
                        <div className="aspect-square relative">
                            <img
                                src={playlist.coverImage}
                                alt={playlist.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <button className="absolute bottom-4 right-4 p-3 rounded-full bg-white text-black opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                                <Play className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-white mb-1">{playlist.name}</h3>
                            <p className="text-sm text-white/60 mb-2">{playlist.description}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-white/40">{playlist.followers.toLocaleString()} followers</span>
                                <span className="text-xs text-white/40">•</span>
                                <span className="text-xs text-white/40">{playlist.genre}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}; 
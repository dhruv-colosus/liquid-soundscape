
import React from 'react';
import Background from '@/components/Background';
import { Headphones, Music, Radio as RadioIcon, Waves } from 'lucide-react';

const Radio: React.FC = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden pb-24">
      <Background dominantColor="#673ab7" />
      
      <main className="pt-16 pb-16 px-4 md:px-8 mx-auto w-full max-w-6xl flex flex-col items-center justify-center min-h-[80vh]">
        <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/60 to-blue-600/60 backdrop-blur-sm z-0"></div>
          
          <div className="relative z-10 py-20 px-8 text-center">
            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-yellow-500/30 backdrop-blur-lg animate-pulse-slow"></div>
            <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full bg-pink-500/20 backdrop-blur-lg animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            
            {/* Radio waves animation left */}
            <div className="absolute top-8 right-8 flex space-x-1">
              <div className="w-2 h-8 bg-white/80 rounded-full animate-wave" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-12 bg-white/80 rounded-full animate-wave" style={{ animationDelay: '100ms' }}></div>
              <div className="w-2 h-6 bg-white/80 rounded-full animate-wave" style={{ animationDelay: '200ms' }}></div>
              <div className="w-2 h-10 bg-white/80 rounded-full animate-wave" style={{ animationDelay: '300ms' }}></div>
              <div className="w-2 h-4 bg-white/80 rounded-full animate-wave" style={{ animationDelay: '400ms' }}></div>
            </div>
            
            {/* Radio waves animation right */}
            <div className="absolute bottom-8 left-8 flex space-x-1">
              <div className="w-2 h-5 bg-white/80 rounded-full animate-wave" style={{ animationDelay: '250ms' }}></div>
              <div className="w-2 h-7 bg-white/80 rounded-full animate-wave" style={{ animationDelay: '350ms' }}></div>
              <div className="w-2 h-9 bg-white/80 rounded-full animate-wave" style={{ animationDelay: '450ms' }}></div>
              <div className="w-2 h-6 bg-white/80 rounded-full animate-wave" style={{ animationDelay: '550ms' }}></div>
              <div className="w-2 h-8 bg-white/80 rounded-full animate-wave" style={{ animationDelay: '650ms' }}></div>
            </div>
            
            {/* Radio icon */}
            <div className="mb-6 inline-flex">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping"></div>
                <div className="relative bg-gradient-to-br from-purple-400 to-purple-600 p-5 rounded-full">
                  <RadioIcon size={48} className="text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">
              Radio <span className="text-yellow-300">Coming Soon</span>
            </h1>
            
            <p className="text-white/90 text-lg md:text-xl max-w-xl mx-auto mb-8">
              We're tuning our frequencies to bring you personalized radio stations based on your favorite artists and genres.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-full flex items-center">
                <Headphones className="mr-2 text-purple-300" size={20} />
                <span className="text-white">Curated Playlists</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-full flex items-center">
                <Music className="mr-2 text-pink-300" size={20} />
                <span className="text-white">Genre Stations</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-full flex items-center">
                <Waves className="mr-2 text-blue-300" size={20} />
                <span className="text-white">Live Broadcasts</span>
              </div>
            </div>
            
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
              <div className="mr-3 relative">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse-subtle"></div>
                <div className="relative w-3 h-3 bg-red-600 rounded-full"></div>
              </div>
              <span className="text-white/90 font-medium">Stay tuned for updates</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Radio;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Browse from "./pages/Browse";
import NotFound from "./pages/NotFound";
import { PlayerProvider, usePlayer } from "./context/PlayerContext";
import { SearchProvider } from "./context/SearchContext";
import GlobalPlayer from "./components/GlobalPlayer";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";
import Navbar from "./components/Navbar";
import SearchResults from "./components/SearchResults";
import Playlists from "./pages/Playlists";
import RecentlyPlayed from "./pages/RecentlyPlayed";
import Radio from "./pages/Radio";
import Favorites from "./pages/Favorites";
import PlaylistDetail from "./pages/PlaylistDetail";
import SongDetail from "./pages/SongDetail";
import React, { useEffect } from "react";
import { AnimatedBackground } from './components/AnimatedBackground';

// Create a client outside of the component
const queryClient = new QueryClient();

// KeyboardControls component to handle spacebar control
const KeyboardControls = () => {
  const { togglePlayPause } = usePlayer();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if the event target is not an input field or textarea
      const target = e.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();

      if (tagName === 'input' || tagName === 'textarea' || target.isContentEditable) {
        return; // Skip if user is typing in an input field
      }

      // Handle spacebar press
      if (e.code === 'Space' || e.keyCode === 32) {
        e.preventDefault(); // Prevent page scrolling
        togglePlayPause();
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [togglePlayPause]);

  return null; // This component doesn't render anything
};

// Main App with routing
const AppContent = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen w-full bg-dark-900">
        <AnimatedBackground />

        <AppSidebar />
        <div className="flex-1 relative flex flex-col">
          <Navbar />
          <SearchResults />
          <div className="flex-1 pt-16">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/radio" element={<Radio />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/playlist/:id" element={<PlaylistDetail />} />
              <Route path="/song/:id" element={<SongDetail />} />
              <Route path="/recents" element={<RecentlyPlayed />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <GlobalPlayer />
          <KeyboardControls />
        </div>
      </div>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PlayerProvider>
          <SearchProvider>
            <SidebarProvider>
              <Toaster />
              <Sonner />
              <AppContent />
            </SidebarProvider>
          </SearchProvider>
        </PlayerProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

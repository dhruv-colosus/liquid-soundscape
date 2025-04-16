import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Home, Search, Radio, ListMusic, User, X, Music, Disc, Command, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearch } from '@/context/SearchContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchHotkey } from '@/hooks/useSearchHotkey';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const sheetCloseRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const { searchQuery, setSearchQuery, isSearching, clearSearch } = useSearch();

  // Check if a route is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Toggle search open/closed
  const toggleSearch = useCallback(() => {
    setSearchOpen(prev => !prev);
  }, []);

  // Use our custom hotkey hook
  useSearchHotkey(toggleSearch);

  // Focus input when search is opened
  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();

      // If there's a previous query but search is not active, reactivate search with existing query
      if (searchQuery && !isSearching) {
        setSearchQuery(searchQuery);
      }
    } else {
      // When closing, we don't clear the query, just the search results visibility
      // This preserves the query for when search is reopened
      if (isSearching) {
        clearSearch();
      }
    }
  }, [searchOpen, searchQuery, isSearching, setSearchQuery, clearSearch]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle ESC key to close search
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setSearchOpen(false);
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    // Only close the menu when the location actually changes, not when the menu opens
    const handleLocationChange = () => {
      if (mobileMenuOpen) {
        sheetCloseRef.current?.click();
        setMobileMenuOpen(false);
      }
    };

    // Create a clean-up function that runs when the component unmounts or dependencies change
    return () => {
      // No cleanup needed here since we're using the dependency array to track location changes
    };
  }, [location.pathname, mobileMenuOpen]); // Only run when the pathname changes, not on every location object change

  // Handle navigation link click
  const handleNavLinkClick = () => {
    // This is a backup in case the sheet doesn't close automatically
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full glass-morphism py-3.5 px-4 flex justify-between items-center fixed top-0 left-0 right-0 z-40 backdrop-blur-lg bg-black/30">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-1.5 group">
          <div className="w-8 h-8 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-110">
            <img src="/uploads/3f905ac8-3dcf-4871-81ab-578fd3757cd0.png" alt="Fuzzler" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-lg font-serif font-bold text-white hidden md:block transition-all duration-300 group-hover:text-fuzzler-400">Fuzzler</h1>
        </Link>
      </div>

      <div className="flex-1 max-w-md mx-4">
        <AnimatePresence mode="wait">
          {searchOpen ? (
            <motion.div
              key="search-input"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full flex items-center"
            >
              <Input
                ref={searchInputRef}
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                placeholder="Search for artists, albums, or songs..."
                className="bg-white/10 border-none text-white placeholder-white/50 pl-8 pr-8 h-8 text-sm max-w-xs rounded-full focus:ring-1 focus:ring-fuzzler-400/50 transition-all glass-morphism"
                autoFocus
              />
              <Search className="absolute left-3 text-white/70" size={16} />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 text-white/70 hover:text-white rounded-full"
                onClick={() => setSearchOpen(false)}
              >
                <X size={16} />
              </Button>

              {/* Quick icons for search filter categories */}
              {searchQuery.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-10 left-0 flex gap-2"
                >
                  <Button variant="ghost" size="sm" className="h-7 px-2.5 py-1 text-xs text-white/70 hover:text-white rounded-full bg-white/5 flex items-center gap-1">
                    <Music size={12} />
                    Songs
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 px-2.5 py-1 text-xs text-white/70 hover:text-white rounded-full bg-white/5 flex items-center gap-1">
                    <Disc size={12} />
                    Albums
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.nav
              key="navigation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              {/* Desktop Navigation */}
              <ul className="hidden md:flex glass-morphism rounded-full px-2 py-1">
                <li>
                  <Link
                    to="/"
                    className={`px-3 py-1.5 text-white/80 hover:text-white transition-all duration-300 flex items-center gap-1.5 rounded-full hover:bg-white/5 ${isActive('/') ? 'bg-white/10 text-white' : ''}`}
                  >
                    <Home size={16} />
                    <span className="text-sm font-medium">Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className={`px-3 py-1.5 text-white/80 hover:text-white transition-all duration-300 flex items-center gap-1.5 rounded-full hover:bg-white/5 ${isActive('/browse') ? 'bg-white/10 text-white' : ''}`}
                  >
                    <Search size={16} />
                    <span className="text-sm font-medium">Browse</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/radio"
                    className={`px-3 py-1.5 text-white/80 hover:text-white transition-all duration-300 flex items-center gap-1.5 rounded-full hover:bg-white/5 ${isActive('/radio') ? 'bg-white/10 text-white' : ''}`}
                  >
                    <Radio size={16} />
                    <span className="text-sm font-medium">Radio</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/favorites"
                    className={`px-3 py-1.5 text-white/80 hover:text-white transition-all duration-300 flex items-center gap-1.5 rounded-full hover:bg-white/5 ${isActive('/favorites') ? 'bg-white/10 text-white' : ''}`}
                  >
                    <ListMusic size={16} />
                    <span className="text-sm font-medium">Favorites</span>
                  </Link>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3">
        {/* Search button - desktop only */}
        <Button
          variant="ghost"
          size="icon"
          className="glass-morphism rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-0.5 px-3 py-1.5 h-8 w-auto hidden md:flex"
          onClick={toggleSearch}
        >
          <Search size={16} className="text-white/80 hover:text-white" />
          <span className="text-white/60 text-xs hidden sm:inline ml-1.5">Search</span>
          <kbd className="hidden sm:flex items-center text-[10px] font-sans font-medium bg-white/10 text-white/70 px-1.5 ml-1.5 h-5 rounded">
            <Command size={10} className="mr-0.5" /> K
          </kbd>
        </Button>

        {/* Search button - mobile only */}
        <Button
          variant="ghost"
          size="icon"
          className="glass-morphism rounded-full hover:bg-white/10 transition-all duration-300 md:hidden"
          onClick={toggleSearch}
        >
          <Search size={18} className="text-white/80 hover:text-white" />
        </Button>

        {/* Account dropdown - desktop only */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="glass-morphism p-1.5 w-8 h-8 rounded-full hover:bg-white/10 transition-all duration-300 hidden md:flex">
              <User size={18} className="text-white/80 hover:text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="glass-morphism backdrop-blur-xl bg-black/90 border-white/10 text-white shadow-lg">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 cursor-pointer">Settings</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 cursor-pointer">Subscription</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 cursor-pointer text-red-400">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile menu hamburger button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden glass-morphism rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <Menu size={18} className="text-white/80" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="glass-morphism bg-black/90 border-white/10 pr-6 max-w-[300px]">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-white font-serif">Fuzzler</SheetTitle>
              <SheetClose ref={sheetCloseRef} className="absolute top-4 right-4 rounded-full p-1 text-white/70 hover:text-white hover:bg-white/10">
                <X size={18} />
              </SheetClose>
            </SheetHeader>

            <div className="flex flex-col gap-6">
              {/* Navigation Links */}
              <div className="space-y-5">
                <h3 className="text-xs uppercase font-medium text-white/50 tracking-wider">Navigation</h3>
                <div className="flex flex-col space-y-4">
                  <Link
                    to="/"
                    className={`flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300 ${isActive('/') ? 'text-white font-medium' : ''}`}
                    onClick={handleNavLinkClick}
                  >
                    <Home size={18} />
                    <span>Home</span>
                  </Link>
                  <Link
                    to="/browse"
                    className={`flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300 ${isActive('/browse') ? 'text-white font-medium' : ''}`}
                    onClick={handleNavLinkClick}
                  >
                    <Search size={18} />
                    <span>Browse</span>
                  </Link>
                  <Link
                    to="/radio"
                    className={`flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300 ${isActive('/radio') ? 'text-white font-medium' : ''}`}
                    onClick={handleNavLinkClick}
                  >
                    <Radio size={18} />
                    <span>Radio</span>
                  </Link>
                  <Link
                    to="/favorites"
                    className={`flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300 ${isActive('/favorites') ? 'text-white font-medium' : ''}`}
                    onClick={handleNavLinkClick}
                  >
                    <ListMusic size={18} />
                    <span>Favorites</span>
                  </Link>
                </div>
              </div>

              {/* Account Section in Mobile Menu */}
              <div className="space-y-5 pt-4 border-t border-white/10">
                <h3 className="text-xs uppercase font-medium text-white/50 tracking-wider">Account</h3>
                <div className="flex flex-col space-y-4">
                  <button className="flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300 text-left">
                    <User size={18} />
                    <span>Profile</span>
                  </button>
                  <button className="flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300 text-left">
                    <span>Settings</span>
                  </button>
                  <button className="flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300 text-left">
                    <span>Subscription</span>
                  </button>
                  <button className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-all duration-300 text-left mt-2">
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;

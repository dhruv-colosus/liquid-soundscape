
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Radio, ListMusic, User, Heart, Clock, BarChart2, Settings, PlusCircle } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';

// Mock data for playlist thumbnails
const sidebarPlaylists = [
  { id: 1, title: "Summer Vibes", coverUrl: "https://images.unsplash.com/photo-1534196511436-921a4e99f297?q=80&w=150&auto=format&fit=crop" },
  { id: 2, title: "Chill Out", coverUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=150&auto=format&fit=crop" },
  { id: 3, title: "Workout Mix", coverUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=150&auto=format&fit=crop" },
];

const AppSidebar: React.FC = () => {
  const location = useLocation();

  // Check if a route is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar>
      <SidebarHeader className="pt-3">
        <div className="flex items-center justify-center gap-2 px-2 py-1.5">
          <div className="w-9 h-9 rounded-full overflow-hidden shadow-lg">
            <img
              src="/uploads/3f905ac8-3dcf-4871-81ab-578fd3757cd0.png"
              alt="Fuzzler Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl font-serif font-bold text-white">Fuzzler</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="opacity-40">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={`relative overflow-hidden ${isActive('/') ? 'bg-sidebar-accent/50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-fuzzler-500/20 before:to-transparent' : ''} hover:before:absolute hover:before:inset-0 hover:before:bg-gradient-to-r hover:before:from-fuzzler-500/20 hover:before:to-transparent`}>
                  <Link to="/">
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={`relative overflow-hidden ${isActive('/browse') ? 'bg-sidebar-accent/50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-fuzzler-500/20 before:to-transparent' : ''} hover:before:absolute hover:before:inset-0 hover:before:bg-gradient-to-r hover:before:from-fuzzler-500/20 hover:before:to-transparent`}>
                  <Link to="/browse">
                    <Search />
                    <span>Browse</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={`relative overflow-hidden ${isActive('/radio') ? 'bg-sidebar-accent/50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-fuzzler-500/20 before:to-transparent' : ''} hover:before:absolute hover:before:inset-0 hover:before:bg-gradient-to-r hover:before:from-fuzzler-500/20 hover:before:to-transparent`}>
                  <Link to="/radio">
                    <Radio />
                    <span>Radio</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="opacity-40">Your Library</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={`relative overflow-hidden ${isActive('/playlists') ? 'bg-sidebar-accent/50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-fuzzler-500/20 before:to-transparent' : ''} hover:before:absolute hover:before:inset-0 hover:before:bg-gradient-to-r hover:before:from-fuzzler-500/20 hover:before:to-transparent`}>
                  <Link to="/playlists">
                    <ListMusic />
                    <span>Playlists</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={`relative overflow-hidden ${isActive('/recents') ? 'bg-sidebar-accent/50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-fuzzler-500/20 before:to-transparent' : ''} hover:before:absolute hover:before:inset-0 hover:before:bg-gradient-to-r hover:before:from-fuzzler-500/20 hover:before:to-transparent`}>
                  <Link to="/recents">
                    <Clock />
                    <span>Recently Played</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={`relative overflow-hidden ${isActive('/favorites') ? 'bg-sidebar-accent/50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-fuzzler-500/20 before:to-transparent' : ''} hover:before:absolute hover:before:inset-0 hover:before:bg-gradient-to-r hover:before:from-fuzzler-500/20 hover:before:to-transparent`}>
                  <Link to="/favorites">
                    <Heart />
                    <span>Favorites</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between items-center opacity-40">
            <span>Your Playlists</span>
            <PlusCircle size={16} className="cursor-pointer hover:text-white" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarPlaylists.map((playlist) => (
                <SidebarMenuItem key={playlist.id}>
                  <SidebarMenuButton asChild className="relative overflow-hidden hover:before:absolute hover:before:inset-0 hover:before:bg-gradient-to-r hover:before:from-fuzzler-500/20 hover:before:to-transparent">
                    <Link to={`/playlist/${playlist.id}`}>
                      <div className="w-4 h-4 rounded-sm overflow-hidden">
                        <img
                          src={playlist.coverUrl}
                          alt={playlist.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span>{playlist.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="relative overflow-hidden hover:before:absolute hover:before:inset-0 hover:before:bg-gradient-to-r hover:before:from-fuzzler-500/20 hover:before:to-transparent">
              <Link to="/account">
                <User />
                <span>Dhruv Deora</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="relative overflow-hidden hover:before:absolute hover:before:inset-0 hover:before:bg-gradient-to-r hover:before:from-fuzzler-500/20 hover:before:to-transparent">
              <Link to="/stats">
                <BarChart2 />
                <span>Stats</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="relative overflow-hidden hover:before:absolute hover:before:inset-0 hover:before:bg-gradient-to-r hover:before:from-fuzzler-500/20 hover:before:to-transparent">
              <Link to="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;


import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-dark-950 relative overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #121212 100%)'
      }}
    >
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
        <div className="absolute top-1/4 -left-20 w-60 h-60 rounded-full bg-fuzzler-500/20 filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-10 w-80 h-80 rounded-full bg-purple-500/10 filter blur-3xl"></div>
      </div>
      
      <div className="relative z-10 glass-morphism rounded-3xl p-12 text-center max-w-md animate-fade-in">
        <h1 className="text-7xl font-display font-bold bg-gradient-to-r from-fuzzler-300 to-fuzzler-500 bg-clip-text text-transparent mb-6">
          404
        </h1>
        <p className="text-xl text-white mb-8">
          This track doesn't exist in our library
        </p>
        <Link 
          to="/" 
          className="flex items-center justify-center gap-2 bg-fuzzler-500 hover:bg-fuzzler-600 text-white py-3 px-6 rounded-full transition-all hover:shadow-lg hover:shadow-fuzzler-500/20 liquid-button"
        >
          <ArrowLeft size={18} />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

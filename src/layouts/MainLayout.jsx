import { Link } from 'react-router-dom';
import { Home, Code2, Briefcase, Award, Mail, Moon, Sun } from 'lucide-react';
import FloatingLines from '../components/FloatingLines';
import { useTheme } from '../contexts/ThemeContext';

const MainLayout = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Skills', path: '/skills', icon: <Code2 className="w-5 h-5" /> },
    { name: 'Projects', path: '/projects', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'Certificates', path: '/certificates', icon: <Award className="w-5 h-5" /> },
    { name: 'Contact', path: '/contact', icon: <Mail className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-salmon selection:text-white overflow-x-hidden relative transition-colors duration-300">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-60">
        <FloatingLines 
          linesGradient={isDark ? ['#1e3a8a', '#3b82f6', '#60a5fa'] : ['#ffffff', '#f9f9f9', '#ffe4e1']}
          animationSpeed={1.5}
          parallax={true}
          interactive={true}
        />
      </div>
      
      {/* Navbar Responsiva */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl font-bold tracking-tighter hover:text-salmon transition-colors">
                Guilherme<span className="text-salmon">.</span>Martins
              </Link>
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="ml-10 flex items-baseline space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center gap-2 text-muted-foreground hover:text-salmon hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-all"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>
              <button 
                onClick={toggleTheme} 
                className="p-2 ml-4 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                aria-label="Alternar Tema"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
               <button 
                 onClick={toggleTheme} 
                 className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
               >
                 {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
               </button>
               <button className="text-muted-foreground hover:text-foreground focus:outline-none ml-2">
                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                 </svg>
               </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-muted-foreground text-sm relative z-10 transition-colors duration-300">
        <p>© {new Date().getFullYear()} Guilherme Martins. Construído com React & Vite.</p>
      </footer>
    </div>
  );
};

export default MainLayout;

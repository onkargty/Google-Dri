import React from 'react';
import { BookOpen, ShoppingCart, Phone, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, onCartClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { items } = useCart();

  const navigation = [
    { name: 'Home', key: 'home' },
    { name: 'About', key: 'about' },
    { name: 'Courses', key: 'courses' },
    { name: 'Services', key: 'services' },
    { name: 'Contact', key: 'contact' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Technolearn</h1>
              <p className="text-sm text-gray-600">Trainings</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.key}
                onClick={() => setCurrentPage(item.key)}
                className={`text-lg font-medium transition-colors duration-200 hover:text-blue-600 ${
                  currentPage === item.key ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <a
              href="tel:+918857096492"
              className="hidden md:flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>
            
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {navigation.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setCurrentPage(item.key);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 px-4 text-lg font-medium transition-colors duration-200 hover:text-blue-600 hover:bg-blue-50 rounded ${
                  currentPage === item.key ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                }`}
              >
                {item.name}
              </button>
            ))}
            <a
              href="tel:+918857096492"
              className="flex items-center space-x-2 mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
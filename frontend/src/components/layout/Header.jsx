import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useData } from '../../context/DataContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { categories, siteSettings } = useData();
  const navigate = useNavigate();

  const LOGO_URL = siteSettings.logo || "https://customer-assets.emergentagent.com/job_70b8c44d-b0eb-46ab-b798-c90870274405/artifacts/5olvlaa7_WhatsApp%20Image%202025-12-26%20at%2013.46.33.jpeg";
  const callLink = `tel:+91${siteSettings.phone}`;

  // Get colors from pageStyles or use defaults
  const pageStyles = siteSettings.pageStyles?.global || {};
  const headerBg = pageStyles.headerBg || '#3d2518';
  const headerText = pageStyles.headerText || '#ffffff';
  const headerNavHover = pageStyles.headerNavHover || '#f59e0b';
  const accentColor = pageStyles.accentColor || '#f59e0b';

  const handleHomeClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/');
    setIsMenuOpen(false);
  };

  // Dynamic styles
  const topBarStyle = { backgroundColor: headerBg, filter: 'brightness(0.85)' };
  const mainHeaderStyle = { backgroundColor: headerBg };
  const textStyle = { color: headerText };
  const hoverClass = `hover:text-[${headerNavHover}]`;

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div style={topBarStyle} className="text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <a href={callLink} className="hover:opacity-80 transition-colors" style={{ color: accentColor }}>
              Call us: {siteSettings.phone}
            </a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>Free Shipping on orders above ₹500</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div style={mainHeaderStyle} className="shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" onClick={handleHomeClick} className="flex items-center gap-3">
              <img 
                src={LOGO_URL} 
                alt={siteSettings.businessName} 
                className="h-14 w-14 rounded-full object-cover border-2"
                style={{ borderColor: accentColor }}
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold" style={textStyle}>{siteSettings.businessName}</h1>
                <p className="text-xs italic" style={{ color: accentColor }}>{siteSettings.slogan}</p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a 
                href="/" 
                onClick={handleHomeClick} 
                className="transition-colors font-medium nav-link"
                style={{ color: headerText }}
                onMouseEnter={(e) => e.target.style.color = headerNavHover}
                onMouseLeave={(e) => e.target.style.color = headerText}
              >
                Home
              </a>
              <div className="relative group">
                <button 
                  className="transition-colors font-medium flex items-center gap-1"
                  style={{ color: headerText }}
                >
                  Shop
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products?category=${cat.slug}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-amber-50 transition-colors"
                      style={{ '--hover-color': accentColor }}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link 
                to="/bulk-order" 
                className="transition-colors font-medium"
                style={{ color: headerText }}
                onMouseEnter={(e) => e.target.style.color = headerNavHover}
                onMouseLeave={(e) => e.target.style.color = headerText}
              >
                Bulk Order
              </Link>
              <Link 
                to="/career" 
                className="transition-colors font-medium"
                style={{ color: headerText }}
                onMouseEnter={(e) => e.target.style.color = headerNavHover}
                onMouseLeave={(e) => e.target.style.color = headerText}
              >
                Career
              </Link>
              <Link 
                to="/about" 
                className="transition-colors font-medium"
                style={{ color: headerText }}
                onMouseEnter={(e) => e.target.style.color = headerNavHover}
                onMouseLeave={(e) => e.target.style.color = headerText}
              >
                About Us
              </Link>
              <a 
                href="#contact" 
                className="transition-colors font-medium"
                style={{ color: headerText }}
                onMouseEnter={(e) => e.target.style.color = headerNavHover}
                onMouseLeave={(e) => e.target.style.color = headerText}
              >
                Contact
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
              style={{ color: headerText }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div style={{ backgroundColor: headerBg, filter: 'brightness(0.85)' }} className="lg:hidden border-t border-amber-900/30">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <nav className="flex flex-col gap-3">
                <a 
                  href="/" 
                  className="py-2 transition-colors"
                  style={{ color: headerText }}
                  onClick={handleHomeClick}
                >
                  Home
                </a>
                <div className="border-t border-amber-900/30 pt-2">
                  <p className="text-sm font-medium mb-2" style={{ color: accentColor }}>Shop</p>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products?category=${cat.slug}`}
                      className="block py-1.5 pl-2 transition-colors"
                      style={{ color: headerText }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
                <Link 
                  to="/bulk-order" 
                  className="py-2 border-t border-amber-900/30 transition-colors"
                  style={{ color: headerText }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Bulk Order
                </Link>
                <Link 
                  to="/career" 
                  className="py-2 transition-colors"
                  style={{ color: headerText }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Career
                </Link>
                <Link 
                  to="/about" 
                  className="py-2 border-t border-amber-900/30 transition-colors"
                  style={{ color: headerText }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <a 
                  href="#contact" 
                  className="py-2 transition-colors"
                  style={{ color: headerText }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

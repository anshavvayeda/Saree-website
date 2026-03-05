import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram } from 'lucide-react';

export const Navbar = ({ brandName = "Tamara's" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Collection' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const menuVariants = {
    closed: {
      x: '-100%',
      transition: { type: 'tween', duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    },
    open: {
      x: 0,
      transition: { type: 'tween', duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: 0.1 + i * 0.1, duration: 0.4 }
    })
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-sm border-b border-[#E8E4DE]" data-testid="main-navbar">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Desktop Layout - Three Column */}
          <div className="hidden md:grid md:grid-cols-3 items-center h-20">
            {/* Left Nav Links */}
            <div className="flex items-center gap-6">
              {menuItems.slice(0, 2).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm uppercase tracking-[0.15em] transition-colors border-gold-animated pb-1 ${
                    location.pathname === item.path ? 'text-[#B8860B]' : 'text-[#1A1A1A] hover:text-[#B8860B]'
                  }`}
                  data-testid={`nav-link-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Center Logo */}
            <div className="flex justify-center">
              <Link to="/" data-testid="brand-logo">
                <img 
                  src="https://customer-assets.emergentagent.com/job_initial-setup-16/artifacts/hnjvyi1w_Screenshot_2026-03-05_212806-removebg-preview.png"
                  alt="Tamara's"
                  className="h-16 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Right Nav Links */}
            <div className="flex items-center justify-end gap-10">
              {menuItems.slice(2).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm uppercase tracking-[0.15em] transition-colors border-gold-animated pb-1 whitespace-nowrap ${
                    location.pathname === item.path ? 'text-[#B8860B]' : 'text-[#1A1A1A] hover:text-[#B8860B]'
                  }`}
                  data-testid={`nav-link-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://www.instagram.com/tamara_handloomsilksarees/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#1A1A1A] hover:text-[#B8860B] transition-colors"
                aria-label="Instagram"
                data-testid="instagram-link"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="flex md:hidden items-center justify-between h-16">
            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 -ml-2 text-[#1A1A1A] hover:text-[#B8860B] transition-colors"
              aria-label="Open menu"
              data-testid="menu-button"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo - Center */}
            <Link to="/" data-testid="brand-logo-mobile">
              <h1 className="font-['Playfair_Display'] text-xl tracking-wide text-[#1A1A1A]">
                {brandName}
              </h1>
            </Link>

            {/* Instagram Icon */}
            <a
              href="https://www.instagram.com/tamara_handloomsilksarees/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 -mr-2 text-[#1A1A1A] hover:text-[#B8860B] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/40 drawer-backdrop"
              onClick={() => setIsMenuOpen(false)}
              data-testid="menu-backdrop"
            />

            {/* Drawer */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 left-0 bottom-0 z-50 w-[80%] max-w-[320px] bg-[#FDFBF7] border-r border-[#E8E4DE]"
              data-testid="mobile-menu-drawer"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#E8E4DE]">
                  <h2 className="font-['Playfair_Display'] text-xl text-[#1A1A1A]">{brandName}</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 -mr-2 text-[#1A1A1A] hover:text-[#B8860B] transition-colors"
                    aria-label="Close menu"
                    data-testid="close-menu-button"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 p-6">
                  <ul className="space-y-6">
                    {menuItems.map((item, i) => (
                      <motion.li
                        key={item.path}
                        custom={i}
                        variants={itemVariants}
                      >
                        <Link
                          to={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block text-2xl font-['Playfair_Display'] transition-colors ${
                            location.pathname === item.path ? 'text-[#B8860B]' : 'text-[#1A1A1A] hover:text-[#B8860B]'
                          }`}
                          data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-[#E8E4DE]">
                  <a
                    href="https://www.instagram.com/tamara_handloomsilksarees/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-[#666666] hover:text-[#B8860B] transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="text-sm uppercase tracking-wider">Follow us on Instagram</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

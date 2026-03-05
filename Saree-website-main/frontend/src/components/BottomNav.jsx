import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Instagram, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/shop', label: 'Shop', icon: ShoppingBag },
    { path: 'https://www.instagram.com/tamara_handloomsilksarees/', label: 'Instagram', icon: Instagram, external: true },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-sm border-t border-[#E8E4DE] md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      data-testid="bottom-nav"
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = !item.external && location.pathname === item.path;
          const Icon = item.icon;

          if (item.external) {
            return (
              <a
                key={item.path}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex flex-col items-center justify-center w-16 h-full text-[#666666] hover:text-[#B8860B] transition-colors"
                data-testid={`bottom-nav-${item.label.toLowerCase()}`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-[10px] uppercase tracking-wider">{item.label}</span>
              </a>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center w-16 h-full transition-colors bottom-nav-item ${
                isActive ? 'active text-[#B8860B]' : 'text-[#666666] hover:text-[#B8860B]'
              }`}
              data-testid={`bottom-nav-${item.label.toLowerCase()}`}
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#B8860B]"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] uppercase tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

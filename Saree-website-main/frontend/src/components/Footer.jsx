import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F8F5F0] border-t border-[#E8E4DE] pb-20 md:pb-0" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-['Playfair_Display'] text-2xl text-[#B8860B] mb-4">
              Tamara's Silk Handloom
            </h3>
            <p className="text-[#666666] text-sm leading-relaxed mb-6 max-w-md">
              Crafting a new aesthetic for the traditional. Hand-picked saree collections 
              curated with love. Pan-India & Worldwide Shipping.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/tamara_handloomsilksarees/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-[#E8E4DE] text-[#666666] hover:text-[#B8860B] hover:border-[#B8860B] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/917041297390"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-[#E8E4DE] text-[#666666] hover:text-[#25D366] hover:border-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@tamarasilk.com"
                className="w-10 h-10 flex items-center justify-center border border-[#E8E4DE] text-[#666666] hover:text-[#B8860B] hover:border-[#B8860B] transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#1A1A1A] mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-[#666666] hover:text-[#B8860B] transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-[#666666] hover:text-[#B8860B] transition-colors text-sm">
                  Collection
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#666666] hover:text-[#B8860B] transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#666666] hover:text-[#B8860B] transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#1A1A1A] mb-6">Get in Touch</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/917041297390"
                  className="flex items-center space-x-3 text-[#666666] hover:text-[#B8860B] transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>+91 7041297390</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/tamara_handloomsilksarees/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-[#666666] hover:text-[#B8860B] transition-colors text-sm"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@tamara_handloomsilksarees</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="luxury-divider my-10" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between text-[#666666] text-xs">
          <p>© {currentYear} Tamara's Silk Handloom. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Crafted with love for silk enthusiasts worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, MessageCircle } from 'lucide-react';
import { getProxiedImageUrl } from '@/utils/imageProxy';

export const ProductCard = ({ product, index = 0 }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Get first image from media array and proxy it
  const mainImage = getProxiedImageUrl(product.media?.[0]?.url);
  
  // Generate short title (2-3 words)
  const shortTitle = product.title?.split(' ').slice(0, 3).join(' ') || 'Elegant Saree';
  
  // Get fabric display
  const fabricDisplay = product.fabric || 'Silk';

  // Generate item code from title
  const generateItemCode = (title) => {
    if (!title) return 'TMS-001';
    const words = title.split(' ').slice(0, 2).map(w => w.charAt(0).toUpperCase()).join('');
    const num = title.length % 900 + 100;
    return `TMS-${words}${num}`;
  };

  const itemCode = generateItemCode(product.title);

  // WhatsApp message handler
  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const message = `Hi! I'm interested in purchasing this saree:\n\n*${product.title}*\nItem Code: ${itemCode}\n\nPlease share more details about availability and pricing.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917041297390?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
      data-testid={`product-card-${product.title?.toLowerCase().replace(/\s+/g, '-') || index}`}
    >
      <Link to={`/product/${encodeURIComponent(product.title)}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F8F5F0]">
          {/* Loading Skeleton */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 skeleton-loading" />
          )}
          
          {/* Main Image - Use actual product image from JSON */}
          {mainImage && !imageError && (
            <img
              src={mainImage}
              alt={product.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Fallback when no image or error */}
          {(!mainImage || imageError) && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#F8F5F0]">
              <span className="text-[#999999] text-sm text-center px-4">{product.title || 'Image unavailable'}</span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* View Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
          >
            <span className="flex items-center space-x-2 px-6 py-2 bg-[#B8860B] text-white text-xs uppercase tracking-widest font-medium">
              <Eye className="w-4 h-4" />
              <span>View</span>
            </span>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-1">
          <h3 className="font-['Playfair_Display'] text-base md:text-lg text-[#1A1A1A] group-hover:text-[#B8860B] transition-colors line-clamp-2">
            {shortTitle}
          </h3>
          <p className="text-xs text-[#666666] uppercase tracking-wider">
            {fabricDisplay}
          </p>
        </div>
      </Link>

      {/* Buy on WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs uppercase tracking-wider font-medium transition-colors duration-300 rounded-sm"
        data-testid={`whatsapp-btn-${product.title?.toLowerCase().replace(/\s+/g, '-') || index}`}
      >
        <MessageCircle className="w-4 h-4" />
        <span>Buy on WhatsApp</span>
      </button>
    </motion.div>
  );
};

export default ProductCard;

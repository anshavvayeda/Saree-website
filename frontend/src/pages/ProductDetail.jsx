import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Instagram, MessageCircle, Share2 } from 'lucide-react';
import { ImageGallery } from '@/components/ImageGallery';
import { ProductCard } from '@/components/ProductCard';
import storeData from '@/data/data.json';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find product by title (URL encoded)
    const decodedTitle = decodeURIComponent(productId);
    const foundProduct = storeData.products?.find(
      p => p.title === decodedTitle
    );

    if (foundProduct) {
      setProduct(foundProduct);
      
      // Find related products (same fabric or work type)
      const related = storeData.products?.filter(
        p => p.title !== foundProduct.title && 
        (p.fabric === foundProduct.fabric || p.work_type === foundProduct.work_type)
      ).slice(0, 4);
      setRelatedProducts(related);
    }
    
    setLoading(false);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [productId]);

  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in the "${product?.title}" saree from your collection. Could you please share more details and the price?`
    );
    window.open(`https://wa.me/917041297390?text=${message}`, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.title,
          text: product?.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="spinner" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-[#FDFBF7]">
        <h1 className="font-['Playfair_Display'] text-2xl text-[#1A1A1A] mb-4">
          Product Not Found
        </h1>
        <p className="text-[#666666] mb-8">
          The saree you're looking for might have been sold or moved.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-[#B8860B] text-white text-xs uppercase tracking-wider hover:bg-[#996F0A] transition-colors"
        >
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 md:pt-20 pb-32 md:pb-16 bg-[#FDFBF7]" data-testid="product-detail-page">
      {/* Back Button - Mobile */}
      <div className="md:hidden px-4 py-3 border-b border-[#E8E4DE] bg-[#FDFBF7]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-[#666666] hover:text-[#B8860B] transition-colors"
          data-testid="back-button"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-0 md:gap-12 md:px-8 md:py-8">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ImageGallery media={product.media} productTitle={product.title} />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="px-4 md:px-0 py-6 md:py-0"
          >
            {/* Breadcrumb - Desktop */}
            <div className="hidden md:flex items-center space-x-2 text-xs text-[#666666] mb-6">
              <Link to="/" className="hover:text-[#B8860B] transition-colors">Home</Link>
              <span>/</span>
              <Link to="/shop" className="hover:text-[#B8860B] transition-colors">Collection</Link>
              <span>/</span>
              <span className="text-[#1A1A1A]">{product.title?.split(' ').slice(0, 2).join(' ')}</span>
            </div>

            {/* Work Type Badge */}
            {product.work_type && (
              <span className="inline-block px-3 py-1 bg-[#F8F5F0] text-[#B8860B] text-xs uppercase tracking-wider mb-4 border border-[#E8E4DE]">
                {product.work_type}
              </span>
            )}

            {/* Title */}
            <h1 className="font-['Playfair_Display'] text-2xl md:text-4xl text-[#1A1A1A] mb-4">
              {product.title}
            </h1>

            {/* Attributes */}
            <div className="flex flex-wrap gap-4 mb-6">
              {product.fabric && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-[#666666] uppercase tracking-wider">Fabric:</span>
                  <span className="text-sm text-[#1A1A1A]">{product.fabric}</span>
                </div>
              )}
              {product.color && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-[#666666] uppercase tracking-wider">Color:</span>
                  <span className="text-sm text-[#1A1A1A]">{product.color}</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="py-4 border-y border-[#E8E4DE] mb-6">
              <span className="text-lg text-[#B8860B] font-['Playfair_Display']">
                Price on Request
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-[#666666] leading-relaxed mb-6">
                {product.description}
              </p>
            )}

            {/* Actions - Desktop */}
            <div className="hidden md:flex items-center space-x-4 mb-8">
              <button
                onClick={handleWhatsAppInquiry}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-[#25D366] text-white text-sm uppercase tracking-wider hover:bg-[#128C7E] transition-colors whatsapp-pulse"
                data-testid="whatsapp-inquiry-btn"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Inquire via WhatsApp</span>
              </button>
              
              <button
                onClick={handleShare}
                className="p-4 border border-[#E8E4DE] text-[#666666] hover:text-[#B8860B] hover:border-[#B8860B] transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Instagram Link */}
            {product.instagram_url && (
              <a
                href={product.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-[#666666] hover:text-[#B8860B] transition-colors mb-8"
                data-testid="instagram-product-link"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm">View on Instagram</span>
              </a>
            )}

            {/* Accordions */}
            <Accordion type="single" collapsible className="border-t border-[#E8E4DE]">
              <AccordionItem value="details" className="border-[#E8E4DE]">
                <AccordionTrigger className="text-[#1A1A1A] hover:text-[#B8860B] text-sm uppercase tracking-wider">
                  Product Details
                </AccordionTrigger>
                <AccordionContent className="text-[#666666] text-sm leading-relaxed">
                  <ul className="space-y-2">
                    {product.fabric && <li>• Fabric: {product.fabric}</li>}
                    {product.work_type && <li>• Work: {product.work_type}</li>}
                    {product.color && <li>• Color: {product.color}</li>}
                    <li>• Includes: Saree with matching blouse piece</li>
                    <li>• Length: 5.5 meters (approx)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="care" className="border-[#E8E4DE]">
                <AccordionTrigger className="text-[#1A1A1A] hover:text-[#B8860B] text-sm uppercase tracking-wider">
                  Care Instructions
                </AccordionTrigger>
                <AccordionContent className="text-[#666666] text-sm leading-relaxed">
                  <ul className="space-y-2">
                    <li>• Dry clean recommended for first few washes</li>
                    <li>• Store in a cool, dry place</li>
                    <li>• Keep away from direct sunlight</li>
                    <li>• Iron on low heat with cloth protection</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="shipping" className="border-[#E8E4DE]">
                <AccordionTrigger className="text-[#1A1A1A] hover:text-[#B8860B] text-sm uppercase tracking-wider">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="text-[#666666] text-sm leading-relaxed">
                  <ul className="space-y-2">
                    <li>• Pan-India delivery available</li>
                    <li>• Worldwide shipping</li>
                    <li>• Delivery within 5-7 business days</li>
                    <li>• Contact us for custom orders</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="px-4 md:px-8 py-12 md:py-16 border-t border-[#E8E4DE]">
            <h2 className="font-['Playfair_Display'] text-2xl text-[#1A1A1A] text-center mb-8">
              You May Also Like
            </h2>
            
            {/* Mobile: Horizontal Scroll */}
            <div className="md:hidden flex overflow-x-auto space-x-4 pb-4 hide-scrollbar snap-x-mandatory">
              {relatedProducts.map((item, index) => (
                <div key={item.title} className="flex-shrink-0 w-[45%] snap-start">
                  <ProductCard product={item} index={index} />
                </div>
              ))}
            </div>
            
            {/* Desktop: Grid */}
            <div className="hidden md:grid grid-cols-4 gap-6">
              {relatedProducts.map((item, index) => (
                <ProductCard key={item.title} product={item} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky Bottom Bar - Mobile */}
      <div className="fixed bottom-16 left-0 right-0 z-30 p-4 bg-[#FDFBF7]/95 backdrop-blur-sm border-t border-[#E8E4DE] md:hidden">
        <button
          onClick={handleWhatsAppInquiry}
          className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-[#25D366] text-white text-sm uppercase tracking-wider active:bg-[#128C7E] transition-colors"
          data-testid="mobile-whatsapp-btn"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Inquire via WhatsApp</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;

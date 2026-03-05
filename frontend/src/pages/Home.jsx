import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Instagram, ChevronDown } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import storeData from '@/data/data.json';

// Hero carousel images
const HERO_IMAGES = [
  'https://customer-assets.emergentagent.com/job_frontend-preview-19/artifacts/xt9rgsyl_image%20%283%29.png',
  'https://customer-assets.emergentagent.com/job_frontend-preview-19/artifacts/85h2rb38_image%20%282%29.png',
  'https://customer-assets.emergentagent.com/job_frontend-preview-19/artifacts/q4ahzobe_image%20%281%29.png',
  'https://customer-assets.emergentagent.com/job_frontend-preview-19/artifacts/by8uji3k_image.png',
];

export const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Get latest 6 products
    const products = storeData.products || [];
    const sorted = [...products].sort((a, b) => 
      new Date(b.posted_date) - new Date(a.posted_date)
    );
    setFeaturedProducts(sorted.slice(0, 6));
  }, []);

  const scrollToCollection = () => {
    const element = document.getElementById('featured-collection');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Slide animation variants - right to left (faster transition)
  const slideVariants = {
    enter: {
      x: '100%',
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: '-100%',
      opacity: 0,
    },
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]" data-testid="home-page">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden" data-testid="hero-section">
        {/* Background Image Carousel */}
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          {/* Overlay for text readability on light images */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/70 via-[#1A1A1A]/40 to-transparent z-10" />
          
          {/* Image Carousel */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={HERO_IMAGES[currentImageIndex]}
              alt="Tamara's Silk Handloom Collection"
              className="w-full h-full object-cover object-top"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </AnimatePresence>
        </motion.div>

        {/* Hero Content - positioned on left side */}
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-20 flex flex-col items-start justify-center h-full text-left px-8 md:px-16 lg:px-24 max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#B8860B] mb-4 font-medium"
          >
            Silk Saree Aesthetics
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-['Playfair_Display'] text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
          >
            Tamara's
            <br />
            <span className="text-[#D4AF37]">Silk Handloom</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-white/95 text-sm md:text-base max-w-md mb-8 leading-relaxed"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.6)' }}
          >
            Crafting a new aesthetic for the traditional. 
            Hand-picked saree collections curated with love.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Link
              to="/shop"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.2em] hover:bg-[#B8860B] hover:text-white transition-colors duration-500 font-medium border border-[#1A1A1A] hover:border-[#B8860B]"
              data-testid="explore-collection-btn"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Image Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex space-x-2 mt-8"
          >
            {HERO_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-[#B8860B] w-8' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={scrollToCollection}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-[#1A1A1A]/70 hover:text-[#B8860B] transition-colors"
          data-testid="scroll-indicator"
          style={{ textShadow: '0 1px 8px rgba(255,255,255,0.8)' }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] mb-2 font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </section>

      {/* Featured Collection */}
      <section 
        id="featured-collection" 
        className="py-16 md:py-24 px-4 md:px-8 bg-[#FDFBF7]"
        data-testid="featured-section"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#B8860B] mb-4">
              Latest Arrivals
            </p>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl text-[#1A1A1A]">
              Featured Collection
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.title} product={product} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 border border-[#B8860B] text-[#B8860B] px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-[#B8860B] hover:text-white transition-colors duration-500"
              data-testid="view-all-btn"
            >
              <span>View All Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section - Parallax */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-[#F8F5F0]" data-testid="about-section">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[#B8860B] mb-4">
                Our Story
              </p>
              <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl text-[#1A1A1A] mb-6">
                The Art of
                <br />
                <span className="text-[#B8860B]">Silk Weaving</span>
              </h2>
              <p className="text-[#666666] leading-relaxed mb-6">
                At Tamara's Silk Handloom, we celebrate the timeless art of traditional 
                silk weaving. Each saree in our collection is a testament to the skilled 
                artisans who pour their heart and soul into creating these masterpieces.
              </p>
              <p className="text-[#666666] leading-relaxed mb-8">
                From the rich Banarasi weaves to the delicate Chikankari embroidery, 
                our hand-picked collection represents the finest in Indian textile heritage.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 text-[#B8860B] text-sm uppercase tracking-wider hover:text-[#996F0A] transition-colors"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="hidden md:block"
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border border-[#B8860B]/30" />
                <img
                  src="https://customer-assets.emergentagent.com/job_initial-setup-16/artifacts/5lzr2bpe_image%20%284%29.png"
                  alt="Craftsman at work"
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white" data-testid="instagram-section">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Instagram className="w-12 h-12 text-[#B8860B] mx-auto mb-6" />
            <p className="text-xs uppercase tracking-[0.3em] text-[#666666] mb-4">
              Follow Our Journey
            </p>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1A1A1A] mb-6">
              @tamara_handloomsilksarees
            </h2>
            <p className="text-[#666666] mb-8 max-w-md mx-auto">
              Get inspired by our latest collections, behind-the-scenes moments, 
              and styling tips on Instagram.
            </p>
            <a
              href="https://www.instagram.com/tamara_handloomsilksarees/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-3 border border-[#B8860B] text-[#B8860B] text-xs uppercase tracking-[0.2em] hover:bg-[#B8860B] hover:text-white transition-colors duration-500"
              data-testid="instagram-follow-btn"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow on Instagram</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="luxury-divider mx-auto max-w-md" />
    </div>
  );
};

export default Home;

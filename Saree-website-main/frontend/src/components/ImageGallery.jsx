import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { getProxiedImageUrl } from '@/utils/imageProxy';

export const ImageGallery = ({ media = [], productTitle = 'Product' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [failedImages, setFailedImages] = useState({});
  const scrollContainerRef = useRef(null);
  const videoRef = useRef(null);

  // Proxy all media URLs
  const proxiedMedia = useMemo(() => {
    return media.map(item => ({
      ...item,
      url: item.type === 'video' ? item.url : getProxiedImageUrl(item.url)
    }));
  }, [media]);

  // Use the proxied media
  const currentMedia = proxiedMedia[currentIndex];
  const isVideo = currentMedia?.type === 'video';

  // Handle thumbnail click
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Handle swipe on mobile
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const width = scrollContainerRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / width);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < proxiedMedia.length) {
        setCurrentIndex(newIndex);
      }
    }
  };

  // Scroll to current index
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: currentIndex * scrollContainerRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % proxiedMedia.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + proxiedMedia.length) % proxiedMedia.length);
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!proxiedMedia || proxiedMedia.length === 0) {
    return (
      <div className="aspect-[3/4] bg-[#F8F5F0] flex items-center justify-center">
        <span className="text-[#666666]">No images available</span>
      </div>
    );
  }

  return (
    <div className="relative" data-testid="image-gallery">
      {/* Mobile: Horizontal Swipe Gallery */}
      <div className="md:hidden">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x-mandatory hide-scrollbar touch-pan-x"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {proxiedMedia.map((item, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-full aspect-[3/4] snap-start bg-[#F8F5F0]"
            >
              {item.type === 'video' ? (
                <div className="relative w-full h-full bg-[#F8F5F0]">
                  <video
                    ref={index === currentIndex ? videoRef : null}
                    src={item.url}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    onClick={toggleVideo}
                  />
                  <button
                    onClick={toggleVideo}
                    className="absolute inset-0 flex items-center justify-center bg-black/30"
                  >
                    {isPlaying ? (
                      <Pause className="w-12 h-12 text-white" />
                    ) : (
                      <Play className="w-12 h-12 text-white" />
                    )}
                  </button>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  {!loadedImages[index] && !failedImages[index] && (
                    <div className="absolute inset-0 skeleton-loading bg-[#F8F5F0]" />
                  )}
                  <img
                    src={item.url}
                    alt={`${productTitle} - Image ${index + 1}`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    referrerPolicy="no-referrer"
                    onLoad={() => setLoadedImages(prev => ({ ...prev, [index]: true }))}
                    onError={() => setFailedImages(prev => ({ ...prev, [index]: true }))}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      loadedImages[index] ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  {failedImages[index] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#F8F5F0]">
                      <span className="text-[#999999] text-sm">Image unavailable</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {proxiedMedia.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 rounded-full transition-all duration-300 gallery-indicator ${
                index === currentIndex ? 'active w-6 bg-[#B8860B]' : 'w-2 bg-[#1A1A1A]/30'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Main Image + Thumbnails */}
      <div className="hidden md:grid md:grid-cols-[100px_1fr] gap-4">
        {/* Thumbnails - Left Side */}
        <div className="flex flex-col space-y-2 max-h-[600px] overflow-y-auto hide-scrollbar">
          {proxiedMedia.map((item, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`relative aspect-[3/4] overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex ? 'border-[#B8860B]' : 'border-transparent hover:border-[#E8E4DE]'
              }`}
              data-testid={`thumbnail-${index}`}
            >
              <img
                src={item.url}
                alt={`Thumbnail ${index + 1}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setFailedImages(prev => ({ ...prev, [`thumb-${index}`]: true }))}
                className="w-full h-full object-cover"
              />
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Play className="w-6 h-6 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F8F5F0]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {isVideo ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    src={currentMedia.url}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    onClick={toggleVideo}
                  />
                  <button
                    onClick={toggleVideo}
                    className="absolute bottom-4 right-4 p-3 bg-white/80 text-[#1A1A1A] hover:bg-[#B8860B] hover:text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                </div>
              ) : (
                <>
                  <img
                    src={currentMedia?.url}
                    alt={`${productTitle} - Image ${currentIndex + 1}`}
                    referrerPolicy="no-referrer"
                    onError={() => setFailedImages(prev => ({ ...prev, [currentIndex]: true }))}
                    className="w-full h-full object-cover"
                  />
                  {failedImages[currentIndex] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#F8F5F0]">
                      <span className="text-[#999999] text-sm">Image unavailable</span>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {proxiedMedia.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 text-[#1A1A1A] hover:bg-[#B8860B] hover:text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 text-[#1A1A1A] hover:bg-[#B8860B] hover:text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/80 text-[#1A1A1A] text-sm">
            {currentIndex + 1} / {proxiedMedia.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;

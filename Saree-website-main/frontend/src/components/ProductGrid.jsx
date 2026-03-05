import { ProductCard } from './ProductCard';
import { motion } from 'framer-motion';

export const ProductGrid = ({ products, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" data-testid="product-grid-loading">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-[3/4] skeleton-loading" />
            <div className="space-y-2">
              <div className="h-4 w-3/4 skeleton-loading" />
              <div className="h-3 w-1/2 skeleton-loading" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center" data-testid="no-products">
        <p className="font-['Playfair_Display'] text-2xl text-[#1A1A1A] mb-2">No products found</p>
        <p className="text-[#666666] text-sm">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.05
          }
        }
      }}
      data-testid="product-grid"
    >
      {products.map((product, index) => (
        <ProductCard 
          key={product.title || index} 
          product={product} 
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default ProductGrid;

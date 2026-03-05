import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ProductGrid } from '@/components/ProductGrid';
import { FilterDrawer } from '@/components/FilterDrawer';
import storeData from '@/data/data.json';

export const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    fabric: null,
    color: null,
    workType: null
  });
  const [sortBy, setSortBy] = useState('newest');

  const allProducts = storeData.products || [];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Apply filters
    if (filters.fabric) {
      result = result.filter(p => p.fabric === filters.fabric);
    }
    if (filters.color) {
      result = result.filter(p => p.color === filters.color);
    }
    if (filters.workType) {
      result = result.filter(p => p.work_type === filters.workType);
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.posted_date) - new Date(a.posted_date));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.posted_date) - new Date(b.posted_date));
        break;
      case 'alphabetical':
        result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      default:
        break;
    }

    return result;
  }, [allProducts, filters, sortBy]);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-24 md:pb-16 bg-[#FDFBF7]" data-testid="shop-page">
      {/* Header */}
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#B8860B] mb-3">
            Explore
          </p>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-5xl text-[#1A1A1A] mb-4">
            Our Collection
          </h1>
          <p className="text-[#666666] text-sm max-w-md mx-auto">
            Discover our curated selection of handcrafted silk sarees, 
            each piece telling its own story of tradition and elegance.
          </p>
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-[#666666]">
            <span className="text-[#1A1A1A]">{filteredProducts.length}</span> 
            {' '}products found
            {activeFiltersCount > 0 && (
              <span className="text-[#B8860B]"> ({activeFiltersCount} filters active)</span>
            )}
          </p>
        </div>

        {/* Filters */}
        <FilterDrawer
          products={allProducts}
          filters={filters}
          setFilters={setFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} loading={loading} />
      </div>
    </div>
  );
};

export default Shop;

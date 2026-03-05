import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from '@/components/ui/drawer';

export const FilterDrawer = ({ 
  products = [], 
  filters, 
  setFilters, 
  sortBy, 
  setSortBy 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Extract unique values from products
  const filterOptions = useMemo(() => {
    const fabrics = new Set();
    const colors = new Set();
    const workTypes = new Set();

    products.forEach(product => {
      if (product.fabric) fabrics.add(product.fabric);
      if (product.color) colors.add(product.color);
      if (product.work_type) workTypes.add(product.work_type);
    });

    return {
      fabrics: Array.from(fabrics).sort(),
      colors: Array.from(colors).sort(),
      workTypes: Array.from(workTypes).sort(),
    };
  }, [products]);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'alphabetical', label: 'A-Z' },
  ];

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? null : value
    }));
  };

  const clearFilters = () => {
    setFilters({
      fabric: null,
      color: null,
      workType: null
    });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const FilterSection = ({ title, options, filterKey, currentValue }) => (
    <div className="mb-6">
      <h4 className="text-xs uppercase tracking-[0.2em] text-[#666666] mb-4">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleFilterChange(filterKey, option)}
            className={`px-4 py-2 text-xs uppercase tracking-wider border transition-all duration-300 ${
              currentValue === option
                ? 'bg-[#B8860B] text-white border-[#B8860B]'
                : 'bg-transparent text-[#1A1A1A] border-[#E8E4DE] hover:border-[#B8860B]'
            }`}
            data-testid={`filter-${filterKey}-${option.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-between mb-6 md:mb-8">
      {/* Filter Button - Mobile */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <button
            className="flex items-center space-x-2 px-4 py-2 border border-[#E8E4DE] text-[#1A1A1A] hover:border-[#B8860B] transition-colors md:hidden"
            data-testid="filter-trigger"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 flex items-center justify-center bg-[#B8860B] text-white text-[10px] rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </DrawerTrigger>
        
        <DrawerContent className="bg-[#FDFBF7] border-[#E8E4DE] max-h-[85vh]">
          <DrawerHeader className="border-b border-[#E8E4DE]">
            <DrawerTitle className="font-['Playfair_Display'] text-xl text-[#1A1A1A]">
              Refine Selection
            </DrawerTitle>
          </DrawerHeader>
          
          <div className="p-6 overflow-y-auto">
            {filterOptions.fabrics.length > 0 && (
              <FilterSection
                title="Fabric"
                options={filterOptions.fabrics}
                filterKey="fabric"
                currentValue={filters.fabric}
              />
            )}
            
            {filterOptions.colors.length > 0 && (
              <FilterSection
                title="Color"
                options={filterOptions.colors}
                filterKey="color"
                currentValue={filters.color}
              />
            )}
            
            {filterOptions.workTypes.length > 0 && (
              <FilterSection
                title="Work Type"
                options={filterOptions.workTypes}
                filterKey="workType"
                currentValue={filters.workType}
              />
            )}
          </div>

          <DrawerFooter className="border-t border-[#E8E4DE]">
            <div className="flex gap-4">
              <button
                onClick={clearFilters}
                className="flex-1 py-3 border border-[#E8E4DE] text-[#1A1A1A] text-xs uppercase tracking-wider hover:border-[#B8860B] transition-colors"
                data-testid="clear-filters"
              >
                Clear All
              </button>
              <DrawerClose asChild>
                <button
                  className="flex-1 py-3 bg-[#B8860B] text-white text-xs uppercase tracking-wider hover:bg-[#996F0A] transition-colors"
                  data-testid="apply-filters"
                >
                  View Results
                </button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Desktop Filters */}
      <div className="hidden md:flex items-center space-x-4">
        {filterOptions.fabrics.length > 0 && (
          <FilterDropdown
            label="Fabric"
            options={filterOptions.fabrics}
            value={filters.fabric}
            onChange={(value) => handleFilterChange('fabric', value)}
          />
        )}
        {filterOptions.colors.length > 0 && (
          <FilterDropdown
            label="Color"
            options={filterOptions.colors}
            value={filters.color}
            onChange={(value) => handleFilterChange('color', value)}
          />
        )}
        {filterOptions.workTypes.length > 0 && (
          <FilterDropdown
            label="Work Type"
            options={filterOptions.workTypes}
            value={filters.workType}
            onChange={(value) => handleFilterChange('workType', value)}
          />
        )}
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-[#B8860B] hover:underline"
            data-testid="desktop-clear-filters"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="appearance-none bg-transparent border border-[#E8E4DE] px-4 py-2 pr-10 text-xs uppercase tracking-wider text-[#1A1A1A] cursor-pointer hover:border-[#B8860B] transition-colors focus:outline-none focus:border-[#B8860B]"
          data-testid="sort-select"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#FDFBF7]">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666] pointer-events-none" />
      </div>
    </div>
  );
};

// Desktop Filter Dropdown Component
const FilterDropdown = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 border transition-colors ${
          value ? 'border-[#B8860B] text-[#B8860B]' : 'border-[#E8E4DE] text-[#1A1A1A] hover:border-[#B8860B]'
        }`}
        data-testid={`filter-dropdown-${label.toLowerCase()}`}
      >
        <span className="text-xs uppercase tracking-wider">{value || label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 min-w-[180px] bg-[#FDFBF7] border border-[#E8E4DE] z-50 shadow-lg"
            >
              {value && (
                <button
                  onClick={() => {
                    onChange(null);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-xs uppercase tracking-wider text-[#666666] hover:text-[#B8860B] hover:bg-[#F8F5F0] transition-colors border-b border-[#E8E4DE]"
                >
                  Clear
                </button>
              )}
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-xs uppercase tracking-wider transition-colors ${
                    value === option 
                      ? 'bg-[#B8860B] text-white' 
                      : 'text-[#1A1A1A] hover:bg-[#F8F5F0]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterDrawer;
